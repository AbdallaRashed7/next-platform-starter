'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const startScan = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/scan?url=${url}`);
      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert('Error connecting to engine');
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Fixata Security AI Agent</h1>
      <p>Test your website and get an AI Security Report for $10</p>
      
      <div style={{ marginTop: '30px' }}>
        <input 
          type="text" 
          placeholder="https://example.com" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={startScan}
          style={{ padding: '10px 20px', marginLeft: '10px', backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          {loading ? 'Scanning...' : 'Start Scan'}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
          <h3>Scan Results:</h3>
          <pre style={{ textAlign: 'left' }}>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </main>
  );
}
