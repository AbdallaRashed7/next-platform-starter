'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidUrl = (string) => {
    try {
      const newUrl = new URL(string);
      return newUrl.protocol === "http:" || newUrl.protocol === "https:";
    } catch (err) { return false; }
  };

  const startScan = async () => {
    if (!email) return alert('Please enter your email first.');
    if (!isValidUrl(url)) return alert('Please enter a valid URL (including https://)');
    
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/scan?url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Scanning engine is currently offline. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'Inter, sans-serif', padding: '80px 20px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '10px', letterSpacing: '-1px' }}>FIXATA</h1>
        <p style={{ color: '#666', fontSize: '1.2rem', marginBottom: '50px' }}>AI-Powered Web Security Audit & Intelligence.</p>

        <div style={{ backgroundColor: '#f9f9f9', padding: '40px', borderRadius: '12px', border: '1px solid #eaeaea', textAlign: 'left' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Target Email</label>
          <input 
            type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '20px', borderRadius: '6px', border: '1px solid #ddd' }}
          />

          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px' }}>Website URL</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" placeholder="https://your-website.com" value={url} onChange={(e) => setUrl(e.target.value)}
              style={{ flex: 1, padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}
            />
            <button 
              onClick={startScan} disabled={loading}
              style={{ padding: '12px 24px', backgroundColor: '#000', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
            >
              {loading ? 'Analyzing...' : 'Analyze Now'}
            </button>
          </div>
        </div>

        {result && (
          <div style={{ marginTop: '40px', textAlign: 'left', padding: '30px', borderLeft: '4px solid #000', backgroundColor: '#fafafa' }}>
            <h3 style={{ marginBottom: '15px' }}>Partial Scan Results:</h3>
            <p><strong>IP Address:</strong> {result.ip || 'Detecting...'}</p>
            <p><strong>Status:</strong> <span style={{ color: 'red' }}>Vulnerabilities Detected</span></p>
            
            <div style={{ marginTop: '30px', padding: '20px', background: '#000', color: '#fff', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ marginBottom: '15px' }}>Get the full AI-Report & Remediation Guide for $10</p>
              <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=SecurityReport&amount=10.00&currency_code=USD" 
                 style={{ display: 'inline-block', padding: '12px 30px', backgroundColor: '#fff', color: '#000', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
                Pay with PayPal
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
