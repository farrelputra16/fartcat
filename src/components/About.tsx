import React, { useEffect, useRef } from 'react';

export const About: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        ref.current?.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('v'), i * 90);
        });
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="section" ref={ref} style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>

          {/* Left: Narrative */}
          <div>
            <div className="section-label reveal">01 // Overview</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '90ms' }}>
              The Meta<br />
              <span style={{ color: 'var(--green)' }}>Mashup</span>
            </h2>
            <p className="section-body reveal" style={{ transitionDelay: '180ms', marginBottom: 28 }}>
              Fartcoin proved that raw absurdity drives real volume. Cat tokens have emerged as the highest-beta narrative in the current cycle. FARTCAT merges both into a single compounding mechanism.
            </p>

            <div className="reveal terminal" style={{ transitionDelay: '270ms' }}>
              <div className="terminal-titlebar">
                <div className="terminal-dot red" />
                <div className="terminal-dot amber" />
                <div className="terminal-dot green" />
                <span className="terminal-bar-text">narrative.log</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="terminal-prompt">$</span>
                  <span>Fartcoin turned absurdist humor into <span className="txt-amber">liquidity</span>. Volume proved the thesis.</span>
                </div>
                <div className="terminal-line" style={{ marginTop: 10 }}>
                  <span className="terminal-prompt">$</span>
                  <span>Cat tokens are now the dominant meta. Internet culture rotates to cats every cycle.</span>
                </div>
                <div className="terminal-line" style={{ marginTop: 10 }}>
                  <span className="terminal-prompt">$</span>
                  <span>FARTCAT = Fartcoin absurdism <span className="txt-green">+</span> Cat meta <span className="txt-green">=</span> maximum narrative pressure.</span>
                </div>
                <div className="terminal-line" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-dim)' }}>
                  <span className="terminal-prompt" style={{ color: 'var(--amber)' }}>#</span>
                  <span className="txt-dim">holding earns. absurdity compounds. the meta compounds.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Mechanics */}
          <div>
            <div className="section-label reveal">02 // Mechanism</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '90ms' }}>
              Hold.<br />
              <span style={{ color: 'var(--amber)' }}>Earn.</span>
            </h2>
            <p className="section-body reveal" style={{ transitionDelay: '180ms', marginBottom: 28 }}>
              The Stonks reward engine distributes $FARTCOIN proportionally to all holders — automatically, continuously, on-chain.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { n: '01', t: 'Acquire $FARTCAT', d: 'Connect your wallet. Acquire via pump.fun or Stonks. No DEX routing required.', c: 'var(--green)' },
                { n: '02', t: 'Hold in Wallet', d: 'Simply hold. No staking, no lock, no LP provision. Zero interaction needed.', c: 'var(--text-sub)' },
                { n: '03', t: 'Receive $FARTCOIN', d: 'Rewards distributed via Stonks directly to your wallet. Every block, automatically.', c: 'var(--amber)' },
              ].map((item, i) => (
                <div key={i} className="reveal terminal" style={{ transitionDelay: `${270 + i * 80}ms`, cursor: 'default' }}>
                  <div className="terminal-body" style={{ padding: '16px 20px', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ fontSize: 22, color: item.c, fontWeight: 700, lineHeight: 1, flexShrink: 0, width: 28 }}>{item.n}</div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-bright)', marginBottom: 4 }}>{item.t}</div>
                      <div style={{ fontSize: 12, color: 'var(--text-dim)', lineHeight: 1.65 }}>{item.d}</div>
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
