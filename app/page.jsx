'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [email, setEmail] = useState('');

  // 1. Strict Regex to validate URL structure and prevent Script Injection
  const validateUrl = (string) => {
    const pattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
    return !!pattern.test(string);
  };

  const handleScan = async () => {
    // Basic validation before calling the API
    if (!url || !validateUrl(url)) {
      return alert('Please enter a valid website URL (e.g., https://google.com)');
    }

    setLoading(true);
    setResult(null);
    
    try {
      const res = await fetch(`/api/scan?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      // Check if engine returned a valid IP and no error
      if (data.error || !data.ip) {
        alert('Website unreachable or invalid. Please check the URL.');
      } else {
        setResult(data);
        // Smooth scroll to pricing section after result
        setTimeout(() => {
          document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      }
    } catch (err) {
      alert('Scanning engine error. Please try again later.');
    }
    setLoading(false);
  };

  // 2. Function to render PayPal Buttons dynamically
  const renderPayPalButtons = (plan, amount, containerId) => {
    if (window.paypal) {
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = ''; // Clear previous buttons
        
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [{
                amount: { value: amount },
                description: `FIXATA ${plan} Security Report for ${url}`,
                custom_id: email // Links the payment to the user email in your dashboard
              }]
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then(details => {
              alert(`Transaction successful! Report for ${url} will be sent to ${email}`);
            });
          },
          onError: (err) => {
            console.error('PayPal SDK Error:', err);
            alert('Payment could not be processed. Please try again.');
          }
        }).render(`#${containerId}`);
      }
    }
  };

  // 3. Effect to initialize buttons when result is ready and email is entered
  useEffect(() => {
    if (result && email.includes('@')) {
      renderPayPalButtons('Basic', '10.00', 'paypal-basic-container');
      renderPayPalButtons('Pro', '30.00', 'paypal-pro-container');
      renderPayPalButtons('Deep', '50.00', 'paypal-deep-container');
    }
  }, [result, email]);

  return (
    <div style={{ backgroundColor: '#fff', color: '#111', fontFamily: "sans-serif" }}>
      
      {/* Hero Section */}
      <section style={{ padding: '60px 6%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '900' }}>Web Security Scanner</h1>
        <p>Identify vulnerabilities in minutes.</p>

        <div style={{ maxWidth: '600px', margin: '40px auto', display: 'flex', border: '2px solid #000', borderRadius: '8px', overflow: 'hidden' }}>
          <input
            type="text"
            placeholder="https://target-site.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ flex: 1, padding: '15px', border: 'none', outline: 'none' }}
          />
          <button onClick={handleScan} style={{ padding: '0 25px', backgroundColor: '#000', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>
            {loading ? 'SCANNING...' : 'SCAN NOW'}
          </button>
        </div>

        {/* Real-time Result Mockup */}
        {result && (
          <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#f4f4f4', textAlign: 'left', borderRadius: '8px' }}>
            <h4 style={{ margin: 0 }}>Target: {result.domain}</h4>
            <p style={{ color: 'red' }}>Risk Level: High Risk Identified</p>
            <p>IP: {result.ip}</p>
          </div>
        )}
      </section>

      {/* Pricing & PayPal Section */}
      <section id="pricing" style={{ padding: '60px 6%', backgroundColor: '#fafaf9', textAlign: 'center' }}>
        <h2>Choose Your Report</h2>
        
        {result && (
          <div style={{ marginBottom: '40px' }}>
            <p>Enter your email to unlock the full report:</p>
            <input 
              type="email" 
              placeholder="email@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '12px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
            />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', maxWidth: '1000px', margin: '0 auto' }}>
          {/* Basic Card */}
          <div style={{ padding: '30px', background: '#fff', border: '1px solid #eee', borderRadius: '12px' }}>
            <h3>Basic</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$10</p>
            <div id="paypal-basic-container" style={{ marginTop: '20px' }}>
              {!result && <button disabled style={{ width: '100%', padding: '10px' }}>Scan Website First</button>}
            </div>
          </div>

          {/* Pro Card */}
          <div style={{ padding: '30px', background: '#fff', border: '2px solid #000', borderRadius: '12px' }}>
            <h3>Pro</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$30</p>
            <div id="paypal-pro-container" style={{ marginTop: '20px' }}>
              {!result && <button disabled style={{ width: '100%', padding: '10px' }}>Scan Website First</button>}
            </div>
          </div>

          {/* Deep Card */}
          <div style={{ padding: '30px', background: '#fff', border: '1px solid #eee', borderRadius: '12px' }}>
            <h3>Deep Recon</h3>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>$50</p>
            <div id="paypal-deep-container" style={{ marginTop: '20px' }}>
              {!result && <button disabled style={{ width: '100%', padding: '10px' }}>Scan Website First</button>}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
