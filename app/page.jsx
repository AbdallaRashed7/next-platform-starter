'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: URL, 2: Results/Email/Pay

  // التحقق من صحة الإيميل والروابط
  const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const validateUrl = (u) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(u);

  const handleScan = async () => {
    if (!validateUrl(url)) return alert('Please enter a valid website URL (e.g., https://google.com)');
    setLoading(true);
    
    // محاكاة الفحص السريع (Recon) قبل طلب الإيميل
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#fff', color: '#000', minHeight: '100vh', fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      {/* Navigation */}
      <nav style={{ borderBottom: '1px solid #eee', padding: '20px 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: '900', fontSize: '24px', letterSpacing: '-1px' }}>FIXATA.</span>
        <div style={{ fontSize: '14px', color: '#666', display: 'flex', gap: '20px' }}>
          <span>Solutions</span>
          <span>Pricing</span>
          <span>Contact</span>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main style={{ padding: '100px 10%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '20px' }}>Secure Your Digital Asset.</h1>
        <p style={{ color: '#666', marginBottom: '50px', fontSize: '18px' }}>Professional AI-driven vulnerability assessment for business owners.</p>

        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px', border: '1px solid #000', borderRadius: '2px' }}>
          {step === 1 ? (
            <div>
              <input 
                type="text" placeholder="Enter website URL (https://...)" 
                value={url} onChange={(e) => setUrl(e.target.value)}
                style={{ width: '100%', padding: '15px', marginBottom: '20px', border: '1px solid #ccc', outline: 'none' }}
              />
              <button 
                onClick={handleScan} disabled={loading}
                style={{ width: '100%', padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
              >
                {loading ? 'ANALYZING INFRASTRUCTURE...' : 'START FREE ANALYSIS'}
              </button>
            </div>
          ) : (
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '14px', color: 'red', fontWeight: 'bold' }}>● ACTION REQUIRED: Potential threats detected for {url}</p>
              <div style={{ margin: '20px 0', padding: '15px', backgroundColor: '#f9f9f9', fontSize: '13px', border: '1px dashed #ccc' }}>
                Fetching IP... Done <br/>
                Analyzing SSL... Outdated <br/>
                Header Security... Missing
              </div>
              
              <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>DELIVERY EMAIL</label>
              <input 
                type="email" placeholder="Where should we send the report?" 
                value={email} onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc' }}
              />

              <button 
                onClick={() => {
                  if(!validateEmail(email)) return alert('Enter a valid email address');
                  window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=Security_Report_${url}&amount=10.00&currency_code=USD`;
                }}
                style={{ width: '100%', padding: '15px', backgroundColor: '#000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
              >
                UNBLOCK FULL PDF REPORT ($10)
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ marginTop: '100px', padding: '50px 10%', borderTop: '1px solid #eee', fontSize: '12px', color: '#999', textAlign: 'center' }}>
        © 2026 FIXATA CYBERSECURITY SOLUTIONS. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
