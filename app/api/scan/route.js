import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) {
    return NextResponse.json({ error: 'يرجى إدخال الرابط' }, { status: 400 });
  }

  try {
    // استبدل 0.0.0.0 بـ IP سيرفر AWS العام (Public IP)
    const response = await fetch(`http://3.85.50.0:8000/scan?url=${targetUrl}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'تعذر الاتصال بمحرك الفحص في AWS' }, { status: 500 });
  }
}
