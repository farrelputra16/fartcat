import React, { useEffect, useRef } from 'react';

const PHASES = [
  {
    ph: 'PHASE 0', title: 'Genesis',
    status: 'DONE', items: ['Deploy FARTCAT token', 'OTC launch', 'Twitter presence', 'Initial distribution'],
    c: 'var(--green)',
  },
  {
    ph: 'PHASE 1', title: 'Growth',
    status: 'ACTIVE', items: ['OTC MM activation', 'Airdrop campaigns', 'Influencer onboarding', 'Community launch'],
    c: 'var(--amber)',
  },
  {
    ph: 'PHASE 2', title: 'Meta',
    status: 'UPCOMING', items: ['DEX listing prep', 'FARTCAT NFT collection', 'Cross-chain discussion', 'CATS companion'],
    c: 'var(--text-dim)',
  },
  {
    ph: 'PHASE 3', title: 'Moon',
    status: 'TBA', items: ['CEX listing pursuit', 'DAO governance', 'Metaverse cat litter', 'Burn mechanism vote'],
    c: 'var(--text-muted)',
  },
];

export const Roadmap: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        ref.current?.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('v'), i * 100);
        });
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="roadmap" ref={ref} className="section">
      <div className="container">
        <div className="section-label reveal">05 // Roadmap</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '90ms', marginBottom: 40 }}>
          The <span style={{ color: 'var(--green)' }}>Plan</span>
        </h2>

        {/* ASCII timeline */}
        <div className="reveal" aria-hidden="true" style={{ fontSize: 11, color: 'var(--border-mid)', marginBottom: 32, overflowX: 'auto', paddingBottom: 4 }}>
          {PHASES.map((p, i) => (
            <span key={i}>
              {'─'.repeat(8)}
              <span style={{ color: p.c }}>●</span>
            </span>
          ))}
          <span style={{ color: 'var(--border-mid)' }}>─</span>
        </div>

        {/* Phase cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, border: '1px solid var(--border-dim)', borderRadius: 4, overflow: 'hidden' }}>
          {PHASES.map((p, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${200 + i * 90}ms`, padding: '24px 20px', background: 'var(--bg-surface)', position: 'relative' }}>
              {/* Active top bar */}
              {p.status === 'ACTIVE' && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--amber), transparent)', opacity: 0.8 }} />
              )}

              <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>{p.ph}</div>

              {/* Status badge */}
              <div style={{
                display: 'inline-block', fontSize: 9, letterSpacing: '0.14em',
                padding: '2px 8px', marginBottom: 10,
                border: `1px solid ${p.status === 'DONE' ? 'var(--green-dim)' : p.status === 'ACTIVE' ? 'rgba(232,160,48,0.3)' : 'var(--border-dim)'}`,
                background: p.status === 'DONE' ? 'rgba(62,207,106,0.06)' : p.status === 'ACTIVE' ? 'rgba(232,160,48,0.06)' : 'transparent',
                color: p.status === 'DONE' ? 'var(--green)' : p.status === 'ACTIVE' ? 'var(--amber)' : 'var(--text-muted)',
                textTransform: 'uppercase', borderRadius: 2,
              }}>
                {p.status}
              </div>

              <div style={{ fontSize: 20, fontWeight: 700, color: p.c, marginBottom: 14 }}>{p.title}</div>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {p.items.map((item, j) => (
                  <li key={j} style={{ fontSize: 11, color: p.status === 'DONE' ? 'var(--text-sub)' : 'var(--text-dim)', display: 'flex', gap: 7, alignItems: 'flex-start', lineHeight: 1.5 }}>
                    <span style={{ color: p.status === 'DONE' ? 'var(--green)' : p.status === 'ACTIVE' ? 'var(--amber)' : 'var(--text-muted)', flexShrink: 0 }}>
                      {p.status === 'DONE' ? '[✓]' : p.status === 'ACTIVE' ? '[~]' : '[ ]'}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #roadmap .container > div:last-child {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #roadmap .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
