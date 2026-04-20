import { NextRequest, NextResponse } from 'next/server';

const EC2_URL = process.env.EC2_URL;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${EC2_URL}/scan?url=${encodeURIComponent(url)}`,
      { cache: 'no-store' }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Scanner unavailable' }, { status: 503 });
  }
}
