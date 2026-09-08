import React, { useEffect, useRef } from 'react';

const TOKENOMICS = [
  { label: 'TOTAL SUPPLY', value: '1,000,000,000', note: 'FARTCAT', color: 'var(--primary)' },
  { label: 'NETWORK', value: 'Solana', note: 'SVM blockchain', color: 'var(--primary)' },
  { label: 'REWARDS', value: '$FARTCOIN', note: 'per block, OTC distributed', color: 'var(--amber)' },
  { label: 'TX TAX', value: '0%', note: 'buy / sell / transfer', color: 'var(--primary)' },
  { label: 'LIQUIDITY', value: 'Locked', note: 'OTC + initial liquidity', color: 'var(--primary)' },
  { label: 'REWARD RATE', value: 'Dynamic', note: 'scales with holding size', color: 'var(--secondary)' },
  { label: 'OTC MECHANISM', value: 'Direct', note: 'wallet-to-wallet, no DEX', color: 'var(--amber)' },
  { label: 'CONTRACT', value: 'COMING SOON', note: 'public CA to be released', color: 'var(--muted)' },
];

export const Tokenomics: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tokenomics" className="section" ref={sectionRef}>
      <div className="container">
        <div className="section-label reveal">04 // TOKENOMICS</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '120ms', marginBottom: 24 }}>
          CONTRACT<br />
          <span style={{ color: 'var(--amber)' }}>SPECS</span>
        </h2>

        {/* ── CA COMING SOON BANNER ── */}
        <div
          className="reveal"
          style={{
            transitionDelay: '200ms',
            marginBottom: 32,
            border: '1px solid rgba(255,176,0,0.3)',
            background: 'rgba(255,176,0,0.04)',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            maxWidth: 700,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Animated border glow */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            inset: 0,
            border: '1px solid transparent',
            background: 'linear-gradient(var(--surface), var(--surface)) padding-box, linear-gradient(90deg, var(--amber), var(--primary), var(--amber)) border-box',
            pointerEvents: 'none',
          }} />

          {/* Icon */}
          <div style={{
            width: 48,
            height: 48,
            border: '1px solid rgba(255,176,0,0.4)',
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            background: 'rgba(255,176,0,0.06)',
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>

          {/* Text */}
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--amber)', letterSpacing: '0.18em', marginBottom: 4 }}>
              CONTRACT ADDRESS
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: 'var(--muted)', letterSpacing: '0.1em' }}>
              COMING SOON
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', marginTop: 4 }}>
              Public CA will be announced via <strong style={{ color: 'var(--primary)' }}>@fartcat_otc</strong>
            </div>
          </div>

          {/* Blinking dot */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--amber)',
              boxShadow: '0 0 8px var(--amber)',
              animation: 'cursor-blink 1s ease-in-out infinite',
            }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--amber)', letterSpacing: '0.1em' }}>
              PENDING
            </span>
          </div>
        </div>

        {/* Spec table */}
        <div
          className="terminal-window reveal"
          style={{ transitionDelay: '280ms', maxWidth: 700 }}
        >
          <div className="terminal-titlebar">
            <div className="terminal-dot red" />
            <div className="terminal-dot amber" />
            <div className="terminal-dot green" />
            <span className="terminal-titlebar-text">fartcat_tokenomics.toml</span>
          </div>
          <div className="terminal-body" style={{ padding: 0 }}>
            {/* Header */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              borderBottom: '1px solid var(--border)',
              padding: '8px 24px',
            }}>
              {['PARAM', 'VALUE', 'NOTE'].map((h, i) => (
                <div key={i} style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--muted)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>
                  {h}
                </div>
              ))}
            </div>

            {/* Rows */}
            {TOKENOMICS.map((row, i) => (
              <div
                key={i}
                className="reveal"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  borderBottom: i < TOKENOMICS.length - 1 ? '1px solid var(--border)' : 'none',
                  transitionDelay: `${320 + i * 60}ms`,
                  background: row.value === 'COMING SOON' ? 'rgba(255,176,0,0.02)' : 'transparent',
                }}
              >
                <div style={{
                  padding: '14px 24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  color: 'var(--text-dim)',
                  letterSpacing: '0.05em',
                  borderRight: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <span style={{ color: 'var(--muted)', marginRight: 8 }}>{String(i + 1).padStart(2, '0')}.</span>
                  {row.label}
                </div>
                <div style={{
                  padding: '14px 16px',
                  fontFamily: 'var(--font-display)',
                  fontSize: 20,
                  color: row.color,
                  textShadow: `0 0 6px ${row.color}40`,
                  borderRight: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {row.value}
                </div>
                <div style={{
                  padding: '14px 24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--muted)',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  {row.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* OTC contact */}
        <div
          className="reveal"
          style={{
            transitionDelay: '450ms',
            marginTop: 28,
            padding: '16px 24px',
            border: '1px solid var(--border)',
            borderLeft: '3px solid var(--amber)',
            background: 'var(--surface)',
            maxWidth: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 20,
            color: 'var(--amber)',
            flexShrink: 0,
            lineHeight: 1,
          }}>&gt;</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--amber)' }}>
            To acquire $FARTCAT, contact <strong>@fartcat_otc</strong> on X for OTC terms. No DEX. No slippage. Direct wallet-to-wallet settlement.
          </div>
        </div>
      </div>
    </section>
  );
};
