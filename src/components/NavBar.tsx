import React, { useState, useEffect } from 'react';

export const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 56,
      zIndex: 9990,
      background: scrolled ? 'rgba(12, 12, 14, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border-dim)' : '1px solid transparent',
      transition: 'background 0.2s, border-color 0.2s',
      display: 'flex', alignItems: 'center',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--text-bright)', letterSpacing: '0.04em' }}>
          <span style={{ color: 'var(--green)' }}>$</span>FARTCAT
          <span style={{ color: 'var(--border-mid)' }}>on</span>
          <span style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 400 }}>solana</span>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {[
            { label: 'About', href: '#about' },
            { label: 'Rewards', href: '#rewards' },
            { label: 'Tokenomics', href: '#tokenomics' },
            { label: 'Roadmap', href: '#roadmap' },
          ].map(item => (
            <a
              key={item.href}
              href={item.href}
              style={{
                fontSize: 11,
                color: 'var(--text-dim)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text-bright)')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-dim)')}
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ padding: '7px 16px', fontSize: 11 }}
          >
            BUY $FARTCAT
          </a>
        </div>
      </div>
    </nav>
  );
};
