'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    if (!url.includes('http')) return alert('Please enter a valid URL (https://...)');
    setLoading(true);
    try {
      // نطلب البيانات من الـ API الذي سيتصل بسيرفر AWS
      const res = await fetch(`/api/scan?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Engine error. Please check your AWS server.');
    }
    setLoading(false);
  };

  return (
    <div style={{ backgroundColor: '#fff', color: '#000', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Header مع روابط تعمل */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 8%', borderBottom: '1px solid #f0f0f0', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 100 }}>
        <div style={{ fontWeight: '900', fontSize: '22px' }}>FIXATA.</div>
        <div style={{ display: 'flex', gap: '30px', fontSize: '14px', fontWeight: '500' }}>
          <a href="#how" style={{ textDecoration: 'none', color: '#666' }}>How it works</a>
          <a href="#pricing" style={{ textDecoration: 'none', color: '#666' }}>Pricing</a>
          <a href="mailto:support@fixata.shop" style={{ textDecoration: 'none', color: '#000', fontWeight: 'bold' }}>Contact Support</a>
        </div>
      </nav>

      <main style={{ padding: '80px 8%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '64px', fontWeight: '900', letterSpacing: '-2px', marginBottom: '20px' }}>Global Web Intelligence.</h1>
        <p style={{ color: '#666', fontSize: '20px', marginBottom: '60px' }}>Identify vulnerabilities before they become liabilities.</p>

        {/* حقل الفحص الاحترافي */}
        <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', border: '2px solid #000', padding: '5px', borderRadius: '4px' }}>
          <input 
            type="text" placeholder="https://target-website.com" 
            value={url} onChange={(e) => setUrl(e.target.value)}
            style={{ flex: 1, border: 'none', padding: '15px', outline: 'none', fontSize: '16px' }}
          />
          <button onClick={handleScan} style={{ backgroundColor: '#000', color: '#fff', border: 'none', padding: '0 30px', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'ANALYZING...' : 'SCAN NOW'}
          </button>
        </div>

        {/* قسم النتائج والـ PayPal */}
        {result && (
          <div id="results" style={{ marginTop: '60px', textAlign: 'left', border: '1px solid #eee', padding: '40px' }}>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>Initial Recon for: {url}</h2>
            <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '4px', fontFamily: 'monospace', fontSize: '13px' }}>
              <p>Target IP: {result.ip}</p>
              <p>Scan Status: 100% Complete</p>
              <p style={{ color: 'red' }}>Risk Level: High - Full Report Required</p>
            </div>
            
            <div id="pricing" style={{ marginTop: '40px', padding: '40px', backgroundColor: '#000', color: '#fff', textAlign: 'center' }}>
              <h3>Unlock Full AI Security Report (PDF)</h3>
              <p style={{ opacity: 0.8 }}>Deep vulnerability analysis, SSL audit, and remediation steps.</p>
              <input 
                type="email" placeholder="Your Email Address" 
                value={email} onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '12px', width: '250px', margin: '20px 0', borderRadius: '4px', border: 'none' }}
              />
              <br/>
              <button 
                onClick={() => window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&amount=10.00&item_name=Security_Report_for_${url}`}
                style={{ padding: '15px 40px', backgroundColor: '#fff', color: '#000', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
              >
                PAY $10 VIA PAYPAL
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
