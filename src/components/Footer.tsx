import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '32px 0',
        background: 'var(--surface)',
      }}
    >
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          {/* Left: brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              color: 'var(--primary)',
              textShadow: '0 0 8px rgba(0,255,65,0.4)',
            }}>
              $FARTCAT
            </span>
            <span style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              |
            </span>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--muted)',
              letterSpacing: '0.08em',
            }}>
              ON SOLANA
            </span>
          </div>

          {/* Center */}
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--muted)',
            textAlign: 'center',
          }}>
            <span style={{ color: 'var(--muted)' }}>holding = earning</span>
            <span style={{ color: 'var(--border-bright)' }}> — </span>
            <span style={{ color: 'var(--muted)' }}>all systems nominal</span>
          </div>

          {/* Right: social */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a
              href="https://x.com/fartcat_otc"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
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
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @fartcat_otc
            </a>
          </div>
        </div>

        {/* Bottom disclaimer */}
        <div style={{
          marginTop: 20,
          paddingTop: 20,
          borderTop: '1px solid var(--border)',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--muted)',
          lineHeight: 1.7,
          textAlign: 'center',
        }}>
          $FARTCAT is a memecoin. not financial advice. do your own research. past performance ≠ future results. this is not a security.
          powered by solana. rewards distributed via OTC mechanism.
        </div>
      </div>
    </footer>
  );
};
