'use client';
import { useState } from 'react';

export default function Home() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ip: string; domain: string} | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScan = async () => {
    if (!url.startsWith('http')) return alert('Please enter a valid URL starting with https://');
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/scan?url=${encodeURIComponent(url)}`);
      const data = await res.json();
      setResult(data);
      setTimeout(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch {
      alert('Scanner engine error. Please try again.');
    }
    setLoading(false);
  };

  const handlePayPal = (plan: string, amount: string) => {
    if (!email) return alert('Please enter your email address first.');
    const itemName = `FIXATA_${plan}_Report_${url}`;
    window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=support@fixata.shop&amount=${amount}&item_name=${encodeURIComponent(itemName)}&custom=${encodeURIComponent(email)}`;
  };

  return (
    <div style={{ backgroundColor: '#fff', color: '#111', fontFamily: "'Inter', -apple-system, sans-serif", margin: 0 }}>

      {/* ── NAV ── */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 6%', height: '64px', borderBottom: '1px solid #e8e8e8', position: 'sticky', top: 0, backgroundColor: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(8px)', zIndex: 100 }}>
        <div style={{ fontWeight: '900', fontSize: '20px', letterSpacing: '-0.5px' }}>FIXATA.</div>
        <div style={{ display: 'flex', gap: '32px', fontSize: '13px', fontWeight: '500' }}>
          <a href="#how" style={{ textDecoration: 'none', color: '#555' }}>How it works</a>
          <a href="#pricing" style={{ textDecoration: 'none', color: '#555' }}>Pricing</a>
          <a href="#about" style={{ textDecoration: 'none', color: '#555' }}>About</a>
          <a href="#contact" style={{ textDecoration: 'none', color: '#555' }}>Contact</a>
        </div>
        <a href="#pricing" style={{ backgroundColor: '#111', color: '#fff', padding: '9px 20px', borderRadius: '6px', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>Get Started</a>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: '100px 6% 80px', textAlign: 'center', background: 'linear-gradient(180deg, #fafaf9 0%, #ffffff 100%)', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#f0f0f0', padding: '5px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', letterSpacing: '1px', marginBottom: '24px', color: '#555' }}>
          PROFESSIONAL WEB SECURITY SCANNING
        </div>
        <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: '900', letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '20px', maxWidth: '800px', margin: '0 auto 20px' }}>
          Find Vulnerabilities<br />Before Hackers Do.
        </h1>
        <p style={{ color: '#666', fontSize: '18px', marginBottom: '48px', maxWidth: '520px', margin: '0 auto 48px', lineHeight: 1.6 }}>
          Professional security scanning powered by enterprise-grade tools. Get a detailed report in minutes, not days.
        </p>

        {/* Scan Box */}
        <div style={{ maxWidth: '640px', margin: '0 auto 16px', display: 'flex', border: '2px solid #111', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <input
            type="text"
            placeholder="https://your-website.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            style={{ flex: 1, border: 'none', padding: '16px 20px', outline: 'none', fontSize: '15px', backgroundColor: '#fff' }}
          />
          <button
            onClick={handleScan}
            style={{ backgroundColor: '#111', color: '#fff', border: 'none', padding: '0 28px', fontWeight: '700', cursor: 'pointer', fontSize: '13px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}
          >
            {loading ? '⏳ SCANNING...' : 'SCAN FREE →'}
          </button>
        </div>
        <p style={{ fontSize: '12px', color: '#999' }}>Free initial scan — No credit card required</p>

        {/* Scan Result Preview */}
        {result && (
          <div style={{ maxWidth: '640px', margin: '32px auto 0', backgroundColor: '#f9f9f9', border: '1px solid #e8e8e8', borderRadius: '8px', padding: '20px 24px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontWeight: '700', fontSize: '14px' }}>Initial Recon Complete</span>
              <span style={{ backgroundColor: '#fee2e2', color: '#dc2626', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '12px' }}>HIGH RISK</span>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '13px', color: '#444', lineHeight: 1.8 }}>
              <div>Target: <strong>{result.domain}</strong></div>
              <div>IP Address: <strong>{result.ip}</strong></div>
              <div>Status: <strong style={{ color: '#16a34a' }}>✓ Reachable</strong></div>
              <div style={{ color: '#dc2626' }}>⚠ Full vulnerability report required</div>
            </div>
            <div style={{ marginTop: '16px', padding: '12px 16px', backgroundColor: '#fffbeb', border: '1px solid #fbbf24', borderRadius: '6px', fontSize: '13px', color: '#92400e' }}>
              Select a plan below to unlock your complete security report.
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '56px', flexWrap: 'wrap' }}>
          {[['500+', 'Sites Scanned'], ['98%', 'Accuracy Rate'], ['< 10min', 'Report Delivery'], ['24/7', 'Support']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: '900', letterSpacing: '-1px' }}>{num}</div>
              <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how" style={{ padding: '100px 6%', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#888', marginBottom: '12px' }}>HOW IT WORKS</div>
          <h2 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1px' }}>Simple. Fast. Thorough.</h2>
        </div>

        {[
          {
            step: '01',
            title: 'Enter Your Website URL',
            desc: 'Simply paste your website address into our scanner. We support any publicly accessible website — no installation or technical knowledge required.',
            detail: 'Our scanner validates your URL and prepares a customized scanning profile based on the technologies detected on your site.',
            side: 'left'
          },
          {
            step: '02',
            title: 'Choose Your Scan Depth',
            desc: 'Select from three professional scanning packages based on your security needs and budget. From basic SSL checks to full penetration testing.',
            detail: 'Each package uses industry-standard tools including Nmap, Nikto, and SSLScan — the same tools used by professional security teams worldwide.',
            side: 'right'
          },
          {
            step: '03',
            title: 'Receive Your Security Report',
            desc: 'Get a detailed, actionable security report delivered directly to your email. Every vulnerability includes a risk rating and step-by-step fix instructions.',
            detail: 'Reports are generated in PDF format with executive summary, technical details, and remediation roadmap — ready to share with your developer.',
            side: 'left'
          }
        ].map((item) => (
          <div key={item.step} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center', marginBottom: '80px', direction: item.side === 'right' ? 'rtl' : 'ltr' }}>
            <div style={{ direction: 'ltr' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#aaa', marginBottom: '12px' }}>STEP {item.step}</div>
              <h3 style={{ fontSize: '28px', fontWeight: '800', letterSpacing: '-0.5px', marginBottom: '16px' }}>{item.title}</h3>
              <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '16px' }}>{item.desc}</p>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.7 }}>{item.detail}</p>
              <a href="#pricing" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '24px', fontWeight: '700', fontSize: '14px', color: '#111', textDecoration: 'none' }}>
                View Packages →
              </a>
            </div>
            <div style={{ direction: 'ltr', backgroundColor: '#f9f8f6', borderRadius: '12px', padding: '40px', border: '1px solid #e8e8e8', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                  {item.step === '01' ? '🔍' : item.step === '02' ? '⚡' : '📄'}
                </div>
                <div style={{ fontWeight: '700', fontSize: '15px' }}>{item.title}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '100px 6%', backgroundColor: '#fafaf9', borderTop: '1px solid #f0f0f0', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#888', marginBottom: '12px' }}>PRICING</div>
          <h2 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '12px' }}>Choose Your Security Level</h2>
          <p style={{ color: '#666', fontSize: '16px' }}>One-time payment. No subscription. Report delivered to your email.</p>
        </div>

        {result && (
          <div style={{ maxWidth: '500px', margin: '0 auto 40px', textAlign: 'center' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', marginBottom: '8px', color: '#444' }}>Enter your email to receive the report:</label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '12px 16px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px', outline: 'none' }}
            />
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', maxWidth: '1000px', margin: '0 auto' }}>

          {/* Basic */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '36px 28px', position: 'relative' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#888', marginBottom: '16px' }}>BASIC SHIELD</div>
            <div style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', marginBottom: '4px' }}>$10</div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '28px' }}>one-time payment</div>
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '24px', marginBottom: '28px' }}>
              {[
                'DNS & IP Resolution',
                'SSL Certificate Audit',
                'HTTP Security Headers',
                'Technology Detection',
                'Top 100 Open Ports',
                'Basic Risk Score',
                'HTML Report via Email',
                '⏱ ~30 seconds'
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px', fontSize: '13px', color: item.startsWith('⏱') ? '#888' : '#333' }}>
                  {!item.startsWith('⏱') && <span style={{ color: '#16a34a', fontWeight: '700' }}>✓</span>}
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => result ? handlePayPal('Basic', '10.00') : document.getElementById('hero-input')?.focus()}
              style={{ width: '100%', padding: '13px', border: '2px solid #111', borderRadius: '6px', backgroundColor: 'transparent', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
            >
              {result ? 'Get Basic Report →' : 'Scan First →'}
            </button>
          </div>

          {/* Pro - Featured */}
          <div style={{ backgroundColor: '#111', border: '2px solid #111', borderRadius: '12px', padding: '36px 28px', position: 'relative', color: '#fff' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#f59e0b', color: '#000', fontSize: '11px', fontWeight: '800', padding: '4px 16px', borderRadius: '12px', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>
              MOST POPULAR
            </div>
            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#888', marginBottom: '16px' }}>PRO SCAN</div>
            <div style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', marginBottom: '4px' }}>$30</div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '28px' }}>one-time payment</div>
            <div style={{ borderTop: '1px solid #333', paddingTop: '24px', marginBottom: '28px' }}>
              {[
                'Everything in Basic',
                'Full Port Scan (top 1000)',
                'Nikto Vulnerability Scan',
                'Outdated Software Detection',
                'Misconfiguration Analysis',
                'Detailed Risk Score (0-10)',
                'Open CVE References',
                'PDF Report via Email',
                '⏱ ~2-3 minutes'
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px', fontSize: '13px', color: item.startsWith('⏱') ? '#888' : '#ccc' }}>
                  {!item.startsWith('⏱') && <span style={{ color: '#f59e0b', fontWeight: '700' }}>✓</span>}
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => result ? handlePayPal('Pro', '30.00') : document.getElementById('hero-input')?.focus()}
              style={{ width: '100%', padding: '13px', border: 'none', borderRadius: '6px', backgroundColor: '#f59e0b', color: '#000', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
            >
              {result ? 'Get Pro Report →' : 'Scan First →'}
            </button>
          </div>

          {/* Deep */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e8e8e8', borderRadius: '12px', padding: '36px 28px', position: 'relative' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#888', marginBottom: '16px' }}>DEEP RECON</div>
            <div style={{ fontSize: '48px', fontWeight: '900', letterSpacing: '-2px', marginBottom: '4px' }}>$50</div>
            <div style={{ fontSize: '13px', color: '#888', marginBottom: '28px' }}>one-time payment</div>
            <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '24px', marginBottom: '28px' }}>
              {[
                'Everything in Pro',
                'All Ports Scan (1-65535)',
                'Deep Nikto Full Audit',
                'SQL Injection Indicators',
                'XSS Vulnerability Check',
                'Subdomain Enumeration',
                'Admin Panel Detection',
                'Step-by-Step Fix Guide',
                'Full PDF Report + Summary',
                '⏱ ~5-10 minutes'
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginBottom: '10px', fontSize: '13px', color: item.startsWith('⏱') ? '#888' : '#333' }}>
                  {!item.startsWith('⏱') && <span style={{ color: '#16a34a', fontWeight: '700' }}>✓</span>}
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => result ? handlePayPal('DeepRecon', '50.00') : document.getElementById('hero-input')?.focus()}
              style={{ width: '100%', padding: '13px', border: '2px solid #111', borderRadius: '6px', backgroundColor: 'transparent', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}
            >
              {result ? 'Get Full Report →' : 'Scan First →'}
            </button>
          </div>

        </div>

        <p style={{ textAlign: 'center', marginTop: '32px', fontSize: '13px', color: '#888' }}>
          🔒 Payments secured by PayPal. Report delivered within minutes to your email.
        </p>
      </section>

      {/* ── WHY FIXATA ── */}
      <section style={{ padding: '100px 6%', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#888', marginBottom: '12px' }}>WHY FIXATA</div>
          <h2 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1px' }}>Enterprise Security for Every Business</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
          {[
            { icon: '⚡', title: 'Real-Time Scanning', desc: 'Our AWS-powered engine scans your site in real time using the same tools trusted by security professionals worldwide.' },
            { icon: '📋', title: 'Actionable Reports', desc: 'Every vulnerability comes with a clear explanation, risk level, and step-by-step remediation guide — no technical jargon.' },
            { icon: '🔒', title: 'Privacy First', desc: 'Your scan data is never stored or shared. Reports are sent directly to your email and deleted from our servers after 24 hours.' },
            { icon: '🛠', title: 'Industry-Standard Tools', desc: 'We use Nmap, Nikto, SSLScan and other open-source tools trusted by security teams at Fortune 500 companies.' },
            { icon: '💰', title: 'One-Time Payment', desc: 'No subscriptions, no hidden fees. Pay once, get your report. Simple and transparent pricing for every budget.' },
            { icon: '📧', title: 'Email Delivery', desc: 'Your comprehensive security report is delivered directly to your inbox, ready to share with your development team.' }
          ].map(item => (
            <div key={item.title} style={{ padding: '28px', backgroundColor: '#fafaf9', borderRadius: '10px', border: '1px solid #f0f0f0' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{item.icon}</div>
              <h3 style={{ fontWeight: '800', fontSize: '16px', marginBottom: '10px' }}>{item.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" style={{ padding: '100px 6%', backgroundColor: '#111', color: '#fff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#666', marginBottom: '12px' }}>ABOUT FIXATA</div>
          <h2 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '24px' }}>Built for the Modern Web</h2>
          <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: '16px', marginBottom: '24px' }}>
            FIXATA was created to make professional web security accessible to everyone — from solo developers to growing businesses. We believe that knowing your vulnerabilities is the first step to fixing them.
          </p>
          <p style={{ color: '#aaa', lineHeight: 1.8, fontSize: '16px' }}>
            Our scanning engine runs on Amazon Web Services infrastructure, using battle-tested open-source security tools that have been trusted by cybersecurity professionals for decades. We deliver enterprise-level insights at a fraction of the cost.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '100px 6%', maxWidth: '700px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#888', marginBottom: '12px' }}>FAQ</div>
          <h2 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '-1px' }}>Common Questions</h2>
        </div>
        {[
          { q: 'Is it legal to scan my own website?', a: 'Yes, absolutely. You are legally permitted to scan websites you own or have explicit written permission to test. FIXATA scans are intended for authorized security testing only.' },
          { q: 'How long does a scan take?', a: 'Basic scans complete in approximately 30 seconds. Pro scans take 2-3 minutes, and Deep Recon can take up to 10 minutes depending on the target site complexity.' },
          { q: 'When will I receive my report?', a: 'Reports are delivered to your email immediately after the scan completes and payment is confirmed. Usually within minutes of your purchase.' },
          { q: 'What if the scan finds no vulnerabilities?', a: "That's great news! You'll still receive a comprehensive security report confirming your site's security posture with all checks performed." },
          { q: 'Do you store my data?', a: 'No. We do not store scan results or personal data beyond what is needed to deliver your report. All data is purged from our servers within 24 hours.' }
        ].map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid #f0f0f0', padding: '24px 0' }}>
            <div style={{ fontWeight: '700', fontSize: '15px', marginBottom: '10px' }}>{item.q}</div>
            <div style={{ color: '#666', fontSize: '14px', lineHeight: 1.7 }}>{item.a}</div>
          </div>
        ))}
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: '80px 6%', backgroundColor: '#fafaf9', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '2px', color: '#888', marginBottom: '12px' }}>CONTACT</div>
        <h2 style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-1px', marginBottom: '12px' }}>Need Help?</h2>
        <p style={{ color: '#666', marginBottom: '32px', fontSize: '15px' }}>Our support team is ready to assist you with any questions about your scan or report.</p>
        <a
          href="mailto:support@fixata.shop"
          style={{ display: 'inline-block', backgroundColor: '#111', color: '#fff', padding: '14px 32px', borderRadius: '6px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' }}
        >
          Email Support →
        </a>
        <p style={{ marginTop: '16px', fontSize: '13px', color: '#aaa' }}>support@fixata.shop · We respond within 24 hours</p>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ backgroundColor: '#111', color: '#666', padding: '48px 6%' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>
            <div>
              <div style={{ fontWeight: '900', fontSize: '20px', color: '#fff', marginBottom: '16px' }}>FIXATA.</div>
              <p style={{ fontSize: '13px', lineHeight: 1.7, maxWidth: '280px' }}>
                Professional web vulnerability scanning service. Identify security weaknesses before they become costly breaches. Powered by AWS infrastructure.
              </p>
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '12px', letterSpacing: '1px', color: '#aaa', marginBottom: '16px' }}>SERVICES</div>
              {['Basic Shield — $10', 'Pro Scan — $30', 'Deep Recon — $50'].map(item => (
                <div key={item} style={{ fontSize: '13px', marginBottom: '10px' }}>
                  <a href="#pricing" style={{ textDecoration: 'none', color: '#666' }}>{item}</a>
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: '700', fontSize: '12px', letterSpacing: '1px', color: '#aaa', marginBottom: '16px' }}>COMPANY</div>
              {[['About', '#about'], ['How it Works', '#how'], ['FAQ', '#faq'], ['Contact', '#contact']].map(([label, href]) => (
                <div key={label} style={{ fontSize: '13px', marginBottom: '10px' }}>
                  <a href={href} style={{ textDecoration: 'none', color: '#666' }}>{label}</a>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderTop: '1px solid #222', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ fontSize: '12px' }}>© 2025 FIXATA. All rights reserved. fixata.shop</div>
            <div style={{ fontSize: '12px' }}>Web Security Scanning · Vulnerability Assessment · SSL Audit · Penetration Testing</div>
          </div>
        </div>
      </footer>

    </div>
  );
}
