import React, { useEffect, useRef } from 'react';

const ROWS = [
  { p: 'Total Supply',   v: '1,000,000,000', n: 'FARTCAT',           c: 'var(--text-bright)' },
  { p: 'Network',        v: 'Solana',          n: 'SVM blockchain',    c: 'var(--green)' },
  { p: 'Transaction Tax',v: '0%',              n: 'Buy / sell / transfer', c: 'var(--green)' },
  { p: 'Reward Token',  v: '$FARTCOIN',       n: 'Stonks-distributed',    c: 'var(--amber)' },
  { p: 'Liquidity',     v: 'Locked',           n: 'Stonks + initial LP',   c: 'var(--green)' },
  { p: 'Reward Rate',    v: 'Dynamic',          n: 'Scales with holding', c: 'var(--text-sub)' },
  { p: 'Stonks Mechanism',  v: 'Direct',           n: 'Wallet-to-wallet',   c: 'var(--amber)' },
  { p: 'Contract',       v: 'COMING SOON',     n: 'Public CA on launch', c: 'var(--amber)' },
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
        <div className="reveal terminal" style={{ transitionDelay: '180ms', marginBottom: 24, borderColor: 'var(--amber-dim)' }}>
          <div className="terminal-titlebar" style={{ background: 'rgba(232,160,48,0.06)' }}>
            <div className="terminal-dot red" />
            <div className="terminal-dot amber" />
            <div className="terminal-dot green" />
            <span className="terminal-bar-text" style={{ color: 'var(--amber)' }}>contract.toml</span>
          </div>
          <div className="terminal-body" style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9.5, color: 'var(--amber)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 2 }}>Contract Address</div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>COMING SOON</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 8px var(--amber)', animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
              <span style={{ fontSize: 10, color: 'var(--amber)', letterSpacing: '0.1em' }}>PENDING</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
              announced via <span style={{ color: 'var(--green)' }}>@fartcat_stonks</span>
            </div>
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
                background: r.v === 'COMING SOON' ? 'rgba(232,160,48,0.04)' : (i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-raised)'),
              }}>
                <div style={{ fontSize: 12, color: 'var(--text-sub)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: 10 }}>{String(i+1).padStart(2,'0')}</span>{r.p}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: r.c, display: 'flex', alignItems: 'center' }}>{r.v}</div>
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
              <span>Acquire $FARTCAT via <span className="txt-amber">Stonks</span> — contact <span className="txt-green">@fartcat_stonks</span> on X for terms. No DEX, no slippage.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
