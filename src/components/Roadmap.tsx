import React, { useEffect, useRef } from 'react';

const PHASES = [
  {
    ph: 'PHASE 0', title: 'Genesis', status: 'DONE',
    items: [
      'FARTCAT token deployed',
      'Stonks launch on Solana',
      'Twitter @Fartcat_Stonk live',
      'Initial OTC distribution',
      'pump.fun listing live',
    ],
    c: 'var(--green)',
  },
  {
    ph: 'PHASE 1', title: 'Growth', status: 'ACTIVE',
    items: [
      'Stonks MM activation',
      'Airdrop campaigns',
      'Influencer KOL onboarding',
      'Telegram community launch',
      'Rewards tracking dashboard',
    ],
    c: 'var(--amber)',
  },
  {
    ph: 'PHASE 2', title: 'Meta', status: 'UPCOMING',
    items: [
      'DEX liquidity migration',
      'Fartcoin protocol integration',
      'Cross-chain bridge exploration',
      'Community grants program',
    ],
    c: 'var(--text-sub)',
  },
  {
    ph: 'PHASE 3', title: 'Moon', status: 'TBA',
    items: [
      'CEX listing pursuit',
      'FARTCAT DAO governance',
      'Token buyback mechanism',
      'Burn mechanism proposal',
    ],
    c: 'var(--text-muted)',
  },
];

export const Roadmap: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        ref.current?.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('v'), i * 80);
        });
      }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="roadmap" ref={ref} className="section">
      <div className="container">
        <div className="section-label reveal">05 // Roadmap</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '80ms', marginBottom: 48 }}>
          The <span style={{ color: 'var(--green)' }}>Plan</span>
        </h2>

        {/* Timeline connector */}
        <div className="reveal" aria-hidden="true" style={{
          display: 'flex', alignItems: 'center', gap: 0, marginBottom: 32, position: 'relative',
        }}>
          {/* Line */}
          <div style={{
            position: 'absolute', top: '50%', left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, var(--green) 0%, var(--amber) 25%, var(--text-sub) 50%, var(--text-muted) 75%, var(--border-dim) 100%)',
            opacity: 0.4,
          }} />
          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'relative', zIndex: 1 }}>
            {PHASES.map((p, i) => (
              <div key={i} style={{
                width: 20, height: 20, borderRadius: '50%',
                background: p.status === 'DONE' ? 'var(--green)' : p.status === 'ACTIVE' ? 'var(--amber)' : 'var(--bg-raised)',
                border: `2px solid ${p.status === 'DONE' ? 'var(--green)' : p.status === 'ACTIVE' ? 'var(--amber)' : 'var(--border-mid)'}`,
                boxShadow: p.status === 'DONE' ? '0 0 12px rgba(62,207,106,0.5)' : p.status === 'ACTIVE' ? '0 0 12px rgba(232,160,48,0.4)' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 8, color: p.status === 'DONE' || p.status === 'ACTIVE' ? 'var(--bg-base)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)', fontWeight: 700,
              }}>
                {p.status === 'DONE' ? '✓' : p.status === 'ACTIVE' ? '●' : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Phase cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {PHASES.map((p, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${160 + i * 80}ms` }}>
              {/* Card */}
              <div style={{
                border: `1px solid ${p.status === 'DONE' ? 'rgba(62,207,106,0.2)' : p.status === 'ACTIVE' ? 'rgba(232,160,48,0.25)' : 'var(--border-dim)'}`,
                borderRadius: 6,
                background: p.status === 'DONE' ? 'rgba(62,207,106,0.03)' : p.status === 'ACTIVE' ? 'rgba(232,160,48,0.03)' : 'var(--bg-surface)',
                overflow: 'hidden',
                boxShadow: p.status === 'ACTIVE' ? '0 0 24px rgba(232,160,48,0.1)' : 'none',
                transition: 'all 0.3s',
              }}>
                {/* Top accent */}
                <div style={{
                  height: 3,
                  background: p.status === 'DONE' ? 'var(--green)' : p.status === 'ACTIVE' ? 'var(--amber)' : 'var(--border-dim)',
                  opacity: p.status === 'ACTIVE' ? 1 : 0.6,
                }} />

                <div style={{ padding: '20px 20px 20px' }}>
                  {/* Phase + status */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                    <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>{p.ph}</div>
                    <div style={{
                      fontSize: 9, letterSpacing: '0.1em', padding: '2px 8px', borderRadius: 2,
                      background: p.status === 'DONE' ? 'rgba(62,207,106,0.12)' : p.status === 'ACTIVE' ? 'rgba(232,160,48,0.12)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${p.status === 'DONE' ? 'rgba(62,207,106,0.3)' : p.status === 'ACTIVE' ? 'rgba(232,160,48,0.3)' : 'var(--border-dim)'}`,
                      color: p.status === 'DONE' ? 'var(--green)' : p.status === 'ACTIVE' ? 'var(--amber)' : 'var(--text-muted)',
                      textTransform: 'uppercase',
                    }}>
                      {p.status === 'DONE' ? '✓ Done' : p.status === 'ACTIVE' ? '● Active' : p.status}
                    </div>
                  </div>

                  {/* Title */}
                  <div style={{
                    fontSize: 24, fontWeight: 700,
                    color: p.status === 'DONE' ? 'var(--green)' : p.status === 'ACTIVE' ? 'var(--amber)' : p.c,
                    marginBottom: 14,
                    textShadow: p.status === 'DONE' ? '0 0 10px rgba(62,207,106,0.3)' : 'none',
                  }}>
                    {p.title}
                  </div>

                  {/* Items */}
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {p.items.map((item, j) => (
                      <li key={j} style={{
                        display: 'flex', alignItems: 'flex-start', gap: 8,
                        fontSize: 11.5, color: 'var(--text-dim)', lineHeight: 1.5,
                      }}>
                        <span style={{ flexShrink: 0, marginTop: 2,
                          color: p.status === 'DONE' ? 'var(--green)' : p.status === 'ACTIVE' ? 'var(--amber)' : 'var(--text-muted)',
                          fontSize: 10,
                        }}>
                          {p.status === 'DONE' ? '✓' : '›'}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="reveal" style={{ marginTop: 40, textAlign: 'center', transitionDelay: '500ms' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '10px 24px', border: '1px solid var(--border-dim)', borderRadius: 4,
            background: 'var(--bg-surface)', fontSize: 11, color: 'var(--text-dim)',
            fontFamily: 'var(--font-mono)', letterSpacing: '0.05em',
          }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
            FARTCAT is community-driven. Roadmap is directional and subject to governance.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #roadmap .container > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          #roadmap .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
