'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const startScan = async () => {
    if (!url) return alert('يرجى إدخال رابط أولاً');
    setLoading(true);
    try {
      const res = await fetch(`/api/scan?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('خطأ في الاتصال بمحرك الفحص');
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif', color: '#333' }}>
      <h1 style={{ color: '#0070f3' }}>Fixata Security AI Agent</h1>
      <p>أدخل رابط موقعك للحصول على تقرير أمني ذكي فوراً</p>
      
      <div style={{ marginTop: '30px' }}>
        <input 
          type="text" 
          placeholder="https://example.com" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '12px', width: '350px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
        />
        <button 
          onClick={startScan}
          disabled={loading}
          style={{ padding: '12px 25px', marginLeft: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          {loading ? 'جاري الفحص...' : 'ابدأ الفحص المجاني'}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', border: '1px solid #eee', textAlign: 'left', maxWidth: '800px', margin: '40px auto' }}>
          <h3 style={{ borderBottom: '2px solid #0070f3', paddingBottom: '10px' }}>نتائج الفحص الأولية:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', backgroundColor: '#fff', padding: '15px', borderRadius: '5px' }}>
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </main>
  );
}
