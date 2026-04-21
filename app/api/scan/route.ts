import { NextRequest, NextResponse } from 'next/server';

const EC2_URL = process.env.EC2_URL;

const BLOCKED_PATTERNS = [
  'localhost', '127.0.0.1', '0.0.0.0', '192.168.', '10.',
  '172.16.', '172.17.', '172.18.', '172.19.', '172.20.',
  '172.21.', '172.22.', '172.23.', '172.24.', '172.25.',
  '172.26.', '172.27.', '172.28.', '172.29.', '172.30.', '172.31.',
  '169.254.'
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  const urlPattern = /^https?:\/\/([a-z0-9]([a-z0-9\-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(\/.*)?$/i;
  if (!urlPattern.test(url)) {
    return NextResponse.json({ error: 'Invalid URL format' }, { status: 400 });
  }

  const urlLower = url.toLowerCase();
  if (BLOCKED_PATTERNS.some(pattern => urlLower.includes(pattern))) {
    return NextResponse.json({ error: 'Private/internal URLs not allowed' }, { status: 403 });
  }

  try {
    const response = await fetch(
      `${EC2_URL}/scan?url=${encodeURIComponent(url)}`,
      { 
        cache: 'no-store',
        signal: AbortSignal.timeout(30000)
      }
    );
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Scanner unavailable' }, { status: 503 });
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Scanner unavailable' }, { status: 503 });
  }
}
