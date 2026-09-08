import React, { useEffect, useRef } from 'react';

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 120);
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
    <section id="about" className="section" ref={sectionRef} style={{ borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'start',
        }}>
          {/* Left: Narrative */}
          <div>
            <div className="section-label reveal">01 // WHAT IS FARTCAT</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '120ms' }}>
              META-MASHUP<br />
              <span style={{ color: 'var(--amber)', textShadow: '0 0 20px rgba(255,176,0,0.4)' }}>UNSTOPPABLE</span>
            </h2>

            <div className="terminal-window reveal" style={{ transitionDelay: '240ms', marginTop: 24 }}>
              <div className="terminal-titlebar">
                <div className="terminal-dot red" />
                <div className="terminal-dot amber" />
                <div className="terminal-dot green" />
                <span className="terminal-titlebar-text">narrative.log</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="terminal-prompt">$</span>
                  <span>Fartcoin took the internet's favorite absurd humor and turned it into <span className="terminal-text-amber">pure liquidity</span>.</span>
                </div>
                <div className="terminal-line" style={{ marginTop: 8 }}>
                  <span className="terminal-prompt">$</span>
                  <span>Cat tokens are quietly taking over the narrative. Dogs dominated early crypto, but feline tokens have <span className="terminal-text-green">rapidly emerged</span> as the high-beta meta.</span>
                </div>
                <div className="terminal-line" style={{ marginTop: 8 }}>
                  <span className="terminal-prompt">$</span>
                  <span>Merging the pure memetic pressure of Fartcoin with the unstoppable surge of the cat meta creates <span className="terminal-text-amber">the ultimate meta-mashup</span>.</span>
                </div>
                <div className="terminal-line" style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                  <span className="terminal-prompt" style={{ color: 'var(--amber)' }}>#</span>
                  <span className="terminal-text-green">FARTCAT: where holding earns, absurdity compounds.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mechanics */}
          <div>
            <div className="section-label reveal">02 // THE MECHANICS</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '120ms' }}>
              HOLD.<br />
              <span style={{ color: 'var(--amber)' }}>EARN.</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
              {[
                {
                  step: '01',
                  title: 'ACQUIRE $FARTCAT',
                  desc: 'Connect your wallet. Acquire $FARTCAT through our OTC mechanism. No DEX needed — simple, direct, on-chain.',
                  color: 'var(--primary)',
                },
                {
                  step: '02',
                  title: 'HOLD IN WALLET',
                  desc: 'Simply hold $FARTCAT in your wallet. No staking. No lock period. No complicated DeFi routing.',
                  color: 'var(--secondary)',
                },
                {
                  step: '03',
                  title: 'RECEIVE $FARTCOIN',
                  desc: '$FARTCOIN rewards are distributed via OTC directly to your wallet. Accumulating with every block.',
                  color: 'var(--amber)',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="reveal terminal-window"
                  style={{ transitionDelay: `${240 + i * 100}ms`, cursor: 'default' }}
                >
                  <div className="terminal-body" style={{ padding: '16px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                      <div style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 28,
                        color: item.color,
                        textShadow: `0 0 10px ${item.color}`,
                        lineHeight: 1,
                        flexShrink: 0,
                      }}>
                        {item.step}
                      </div>
                      <div>
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: 18,
                          color: 'var(--text)',
                          marginBottom: 4,
                        }}>
                          {item.title}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.7 }}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
};
