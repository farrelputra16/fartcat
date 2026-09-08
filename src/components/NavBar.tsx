import React, { useState, useEffect } from 'react';

export const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 56,
        zIndex: 9990,
        background: scrolled ? 'rgba(5, 10, 5, 0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--primary)', textShadow: '0 0 8px rgba(0,255,65,0.4)' }}>
          <span>$FARTCAT</span>
          <span style={{ color: 'var(--muted)' }}>&nbsp;&gt;</span>
          <span className="cursor" style={{ height: '0.8em', width: 8 }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a
            href="https://x.com/fartcat_otc"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: 'var(--text-dim)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--primary)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-dim)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            @fartcat_otc
          </a>
        </div>
      </div>
    </nav>
  );
};
