import React, { useEffect, useRef } from 'react';

export const CTASection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        ref.current?.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('v'), i * 110);
        });
      }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-dim)' }}>
      <div className="container">
        {/* CA Banner */}
        <div className="reveal" style={{
          marginBottom: 48, border: '1px solid rgba(232,160,48,0.2)',
          background: 'rgba(232,160,48,0.03)',
          padding: '16px 24px', borderRadius: 4,
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5">
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <div style={{ fontSize: 10.5, color: 'var(--text-sub)' }}>
            Contract Address:{' '}
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>COMING SOON</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--amber)', boxShadow: '0 0 8px var(--amber)', animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
            <span style={{ fontSize: 10, color: 'var(--amber)', letterSpacing: '0.1em' }}>PENDING</span>
          </div>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>via <span style={{ color: 'var(--green)' }}>@fartcat_otc</span></span>
        </div>

        {/* Heading */}
        <div className="section-label reveal" style={{ justifyContent: 'center' }}>06 // Join the Meta</div>

        <div className="reveal" style={{ transitionDelay: '90ms', textAlign: 'center', marginBottom: 12 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(64px, 10vw, 112px)',
            lineHeight: 0.88, letterSpacing: '-0.03em',
            color: 'var(--text-bright)',
          }}>GET IN</div>
        </div>
        <div className="reveal" style={{ transitionDelay: '150ms', textAlign: 'center', marginBottom: 12 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(64px, 10vw, 112px)',
            lineHeight: 0.88, letterSpacing: '-0.03em',
            color: 'var(--amber)',
          }}>BEFORE THE</div>
        </div>
        <div className="reveal" style={{ transitionDelay: '210ms', textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            fontSize: 'clamp(64px, 10vw, 112px)',
            lineHeight: 0.88, letterSpacing: '-0.03em',
            color: 'var(--green)',
            textShadow: '0 0 30px rgba(62,207,106,0.4)',
          }}>FART.</div>
        </div>

        <p className="reveal section-body" style={{ transitionDelay: '270ms', margin: '0 auto 36px', textAlign: 'center' }}>
          $FARTCAT is live. OTC acquiring now open.<br />Hold. Earn $FARTCOIN. Ride the meta.
        </p>

        {/* Main CTA */}
        <div className="reveal" style={{ transitionDelay: '330ms', display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <a href="https://pump.fun" target="_blank" rel="noopener noreferrer"
            className="btn-primary" style={{ fontSize: 13, padding: '13px 32px', letterSpacing: '0.1em' }}>
            ACQUIRE $FARTCAT
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </a>
        </div>

        {/* Terminal contact card */}
        <div className="reveal terminal" style={{ transitionDelay: '390ms', maxWidth: 520, margin: '0 auto' }}>
          <div className="terminal-titlebar">
            <div className="terminal-dot red" />
            <div className="terminal-dot amber" />
            <div className="terminal-dot green" />
            <span className="terminal-bar-text">contact.otc — @fartcat_otc</span>
          </div>
          <div className="terminal-body">
            {[
              { k: '$', v: 'Contact', t: '@fartcat_otc', c: 'var(--green)' },
              { k: '$', v: 'Network:', t: 'Solana', c: 'var(--green)' },
              { k: '$', v: 'Status:', t: 'OTC OPEN — Limited Allocations', c: 'var(--amber)' },
              { k: '$', v: 'CA:', t: '[ coming soon — announced on Twitter ]', c: 'var(--text-muted)' },
            ].map((l, i) => (
              <div key={i} className="terminal-line" style={{ marginTop: i > 0 ? 8 : 0 }}>
                <span className="terminal-prompt">{l.k}</span>
                <span>{l.v} <span style={{ color: l.c }}>{l.t}</span></span>
              </div>
            ))}
            <div className="terminal-line" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-dim)' }}>
              <span className="terminal-prompt" style={{ color: 'var(--amber)' }}>#</span>
              <span className="txt-dim">Do NOT reply to DMs claiming to be us. Only reach via <strong style={{ color: 'var(--green)' }}>@fartcat_otc</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
