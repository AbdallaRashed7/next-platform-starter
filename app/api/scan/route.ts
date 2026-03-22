import { NextRequest, NextResponse } from 'next/server';

const EC2_URL = process.env.EC2_URL; // نحطه في .env

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `${EC2_URL}/scan?url=${encodeURIComponent(url)}`,
      { next: { revalidate: 0 } }
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Scanner engine unavailable' },
      { status: 503 }
    );
  }
}
```

---

**ملف `.env.local`** في جذر المشروع:
```
EC2_URL=http://54.123.45.67:5000
```

وفي **Netlify Dashboard** → Environment Variables أضف نفس المتغير بعد رفع المشروع.

---

**ترتيب الخطوات الآن:**
```
1. ✅ اطلب Elastic IP من AWS وربطه بـ EC2
2. ✅ ثبّت Flask على EC2 وشغّله
3. ✅ أضف port 5000 في Security Group
4. ✅ أنشئ app/api/scan/route.ts
5. ✅ أضف EC2_URL في .env.local
6. ✅ اختبر: http://localhost:3000/api/scan?url=https://google.com
