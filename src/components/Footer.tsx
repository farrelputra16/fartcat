import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-dim)',
      padding: '40px 0 32px',
      background: 'var(--bg-base)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20,
          marginBottom: 24,
        }}>
          {/* Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--text-bright)', letterSpacing: '0.04em' }}>
              <span style={{ color: 'var(--green)' }}>$</span>FARTCAT
              <span style={{ color: 'var(--border-mid)' }}>on</span>
              <span style={{ color: 'var(--text-muted)', fontSize: 11, fontWeight: 400 }}>Solana</span>
            </div>
            <div style={{ height: 12, width: 1, background: 'var(--border-dim)' }} />
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Stonks Reward Engine</span>
          </div>

          {/* Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {[
              { label: 'About', href: '#about' },
              { label: 'Rewards', href: '#rewards' },
              { label: 'Tokenomics', href: '#tokenomics' },
              { label: 'Roadmap', href: '#roadmap' },
            ].map(item => (
              <a key={item.href} href={item.href}
                style={{ fontSize: 11, color: 'var(--text-dim)', letterSpacing: '0.06em', textTransform: 'uppercase', transition: 'color 0.15s' }}
                onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--text-bright)')}
                onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-dim)')}>
                {item.label}
              </a>
            ))}
          </div>

          {/* Social */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '6px 14px', fontSize: 10 }}>
              BUY $FARTCAT
            </a>
            <a href="https://x.com/Fartcat_Stonk" target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--text-dim)', transition: 'color 0.15s' }}
              onMouseEnter={e => ((e.target as HTMLElement).style.color = 'var(--green)')}
              onMouseLeave={e => ((e.target as HTMLElement).style.color = 'var(--text-dim)')}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.261 5.635 5.903-5.635zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              @Fartcat_Stonk
            </a>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid var(--border-dim)', paddingTop: 20 }}>
          <div style={{
            fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.8,
            textAlign: 'center', maxWidth: 700, margin: '0 auto',
          }}>
            $FARTCAT is a memecoin. Not financial advice. Do your own research.
            Past performance does not guarantee future results. This is not a security.
            Powered by Solana. Rewards distributed via Stonks mechanism.
          </div>
        </div>
      </div>
    </footer>
  );
};
