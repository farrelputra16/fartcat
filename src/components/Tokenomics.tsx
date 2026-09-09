import React, { useEffect, useRef } from 'react';

const CA = '3XQZDtpn5QisVxcvB4sAReoknWnooU7yM4YCQtj45nqp';

const ROWS = [
  { p: 'Total Supply',    v: '1,000,000,000',      n: 'FARTCAT',            c: 'var(--text-bright)' },
  { p: 'Network',         v: 'Solana',               n: 'SVM blockchain',     c: 'var(--green)' },
  { p: 'Transaction Tax',  v: '0%',                  n: 'Buy / sell / transfer', c: 'var(--green)' },
  { p: 'Reward Token',    v: '$FARTCOIN',            n: 'Stonks-distributed', c: 'var(--amber)' },
  { p: 'Liquidity',       v: 'Locked',              n: 'Stonks + initial LP', c: 'var(--green)' },
  { p: 'Reward Rate',      v: 'Dynamic',             n: 'Scales with holding', c: 'var(--text-sub)' },
  { p: 'Stonks Mechanism',v: 'Direct',               n: 'Wallet-to-wallet',   c: 'var(--amber)' },
  { p: 'Contract',        v: CA,                     n: 'Live on Solana',     c: 'var(--green)' },
];

export const Tokenomics: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        ref.current?.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('v'), i * 70);
        });
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="tokenomics" ref={ref} className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)' }}>
      <div className="container">
        <div className="section-label reveal">04 // Contract</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '90ms', marginBottom: 32 }}>
          Token<span style={{ color: 'var(--green)' }}>omics</span>
        </h2>

        {/* CA Banner */}
        <div className="reveal terminal" style={{ transitionDelay: '180ms', marginBottom: 24, borderColor: 'rgba(62,207,106,0.25)' }}>
          <div className="terminal-titlebar" style={{ background: 'rgba(62,207,106,0.06)' }}>
            <div className="terminal-dot red" />
            <div className="terminal-dot amber" />
            <div className="terminal-dot green" />
            <span className="terminal-bar-text" style={{ color: 'var(--green)' }}>contract.toml</span>
          </div>
          <div className="terminal-body" style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            {/* Checkmark */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9.5, color: 'var(--green)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 2 }}>Contract Address</div>
              <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--green)', letterSpacing: '0.03em', fontFamily: 'var(--font-mono)' }}>{CA}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
              <span style={{ fontSize: 10, color: 'var(--green)', letterSpacing: '0.1em' }}>LIVE</span>
            </div>
            <a href={`https://pump.fun/${CA}`} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: 11, color: 'var(--green)', textDecoration: 'underline', textDecorationColor: 'rgba(62,207,106,0.4)' }}>
              View on pump.fun →
            </a>
          </div>
        </div>

        {/* Spec table */}
        <div className="reveal terminal" style={{ transitionDelay: '240ms' }}>
          <div className="terminal-titlebar">
            <div className="terminal-dot red" />
            <div className="terminal-dot amber" />
            <div className="terminal-dot green" />
            <span className="terminal-bar-text">fartcat_tokenomics.toml</span>
          </div>
          <div style={{ padding: 0 }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr', padding: '8px 20px', borderBottom: '1px solid var(--border-dim)', background: 'var(--bg-raised)' }}>
              {['Parameter', 'Value', 'Note'].map((h, i) => (
                <div key={i} style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{h}</div>
              ))}
            </div>
            {ROWS.map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1.5fr 1fr 1.5fr',
                padding: '13px 20px',
                borderBottom: i < ROWS.length - 1 ? '1px solid var(--border-dim)' : 'none',
                background: i === ROWS.length - 1 ? 'rgba(62,207,106,0.04)' : (i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-raised)'),
              }}>
                <div style={{ fontSize: 12, color: 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>{String(i+1).padStart(2,'0')}</span>{r.p}
                </div>
                <div style={{ fontSize: r.p === 'Contract' ? 12 : 14, fontWeight: r.p === 'Contract' ? 500 : 600, color: r.c, display: 'flex', alignItems: 'center', fontFamily: r.p === 'Contract' ? 'var(--font-mono)' : 'inherit', letterSpacing: r.p === 'Contract' ? '0.03em' : 'inherit' }}>{r.v}</div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>{r.n}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stonks note */}
        <div className="reveal terminal" style={{ transitionDelay: '400ms', marginTop: 20 }}>
          <div className="terminal-body">
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span>Acquire $FARTCAT via <span className="txt-amber">Stonks</span> or buy directly on <a href={`https://pump.fun/${CA}`} target="_blank" rel="noopener noreferrer" className="txt-green">pump.fun</a>. No DEX slippage. Direct wallet-to-wallet.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
