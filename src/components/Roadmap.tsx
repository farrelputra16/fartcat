import React, { useEffect, useRef } from 'react';

const PHASES = [
  {
    phase: 'PHASE 0',
    title: 'GENESIS',
    status: 'DONE',
    items: ['Deploy FARTCAT token', 'OTC launch', 'Initial holder distribution', 'Twitter/X presence established'],
    color: 'var(--primary)',
  },
  {
    phase: 'PHASE 1',
    title: 'GROWTH',
    status: 'ACTIVE',
    items: ['OTC market maker activation', 'Community airdrop campaigns', 'Influencer onboarding', 'Telegram community launch'],
    color: 'var(--amber)',
  },
  {
    phase: 'PHASE 2',
    title: 'META',
    status: 'UPCOMING',
    items: ['DEX listing preparation', 'Fartcat NFT collection', 'Cross-chain expansion discussion', '$CATS companion token'],
    color: 'var(--muted)',
  },
  {
    phase: 'PHASE 3',
    title: 'MOON',
    status: 'TBA',
    items: ['CEX listing pursuit', 'Fartcat DAO governance', 'Metaverse cat litter box', 'Fartcoin burn mechanism vote'],
    color: 'var(--muted)',
  },
];

export const Roadmap: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
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
    <section
      ref={sectionRef}
      className="section"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container">
        <div className="section-label reveal">05 // ROADMAP</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '120ms', marginBottom: 48 }}>
          THE <span style={{ color: 'var(--amber)' }}>PLAN</span>
        </h2>

        {/* ASCII Timeline */}
        <div
          className="reveal"
          style={{
            transitionDelay: '200ms',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: 'var(--muted)',
            marginBottom: 40,
            overflowX: 'auto',
            paddingBottom: 8,
          }}
        >
          {PHASES.map((_, i) => (
            <span key={i}>
              {'───'}
              <span style={{ color: PHASES[i]?.color || 'var(--muted)' }}>●</span>
              {'───'}
              {i < PHASES.length - 1 ? ' ' : ''}
            </span>
          ))}
          <span style={{ color: 'var(--muted)' }}>●═══</span>
        </div>

        {/* Phase cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 0,
          border: '1px solid var(--border)',
        }}>
          {PHASES.map((phase, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                transitionDelay: `${260 + i * 100}ms`,
                padding: '24px 20px',
                borderRight: i < PHASES.length - 1 ? '1px solid var(--border)' : 'none',
                position: 'relative',
              }}
            >
              {/* Phase label */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--muted)',
                letterSpacing: '0.2em',
                marginBottom: 6,
              }}>
                {phase.phase}
              </div>

              {/* Status badge */}
              <div style={{
                display: 'inline-block',
                fontFamily: 'var(--font-mono)',
                fontSize: 9,
                letterSpacing: '0.15em',
                padding: '2px 8px',
                marginBottom: 10,
                background: phase.status === 'DONE' ? 'rgba(0,255,65,0.1)' :
                             phase.status === 'ACTIVE' ? 'rgba(255,176,0,0.1)' : 'rgba(42,90,42,0.2)',
                border: `1px solid ${phase.status === 'DONE' ? 'rgba(0,255,65,0.3)' : phase.status === 'ACTIVE' ? 'rgba(255,176,0,0.3)' : 'var(--border)'}`,
                color: phase.status === 'DONE' ? 'var(--primary)' :
                       phase.status === 'ACTIVE' ? 'var(--amber)' : 'var(--muted)',
              }}>
                {phase.status}
              </div>

              {/* Title */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 22,
                color: phase.color,
                textShadow: `0 0 8px ${phase.color}40`,
                marginBottom: 14,
              }}>
                {phase.title}
              </div>

              {/* Items */}
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {phase.items.map((item, j) => (
                  <li
                    key={j}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: phase.status === 'DONE' ? 'var(--text-dim)' : 'var(--muted)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 6,
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: phase.status === 'DONE' ? 'var(--primary)' : 'var(--muted)', flexShrink: 0 }}>
                      {phase.status === 'DONE' ? '[x]' : phase.status === 'ACTIVE' ? '[~]' : '[-]'}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              {/* Active indicator */}
              {phase.status === 'ACTIVE' && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, var(--amber), transparent)`,
                    animation: 'cursor-blink 1.5s ease-in-out infinite',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #roadmap-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #roadmap-grid {
            grid-template-columns: 1fr !important;
          }
          #roadmap-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
        }
      `}</style>
    </section>
  );
};
