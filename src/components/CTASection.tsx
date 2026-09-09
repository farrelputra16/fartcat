import React, { useEffect, useRef } from 'react';

export const CTASection: React.FC = () => {
  const ref = useRef<HTMLElement>(null);

  const CA = '3XQZDtpn5QisVxcvB4sAReoknWnooU7yM4YCQtj45nqp';

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
          marginBottom: 48, border: '1px solid rgba(62,207,106,0.2)',
          background: 'rgba(62,207,106,0.04)',
          padding: '16px 24px', borderRadius: 4,
          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {/* Checkmark icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <div style={{ fontSize: 10.5, color: 'var(--text-sub)' }}>
            Contract Address:{' '}
            <span
              style={{ fontSize: 15, fontWeight: 600, color: 'var(--green)', letterSpacing: '0.02em', fontFamily: 'var(--font-mono)' }}
              title={CA}
            >
              {CA}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 8px var(--green)', animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
            <span style={{ fontSize: 10, color: 'var(--green)', letterSpacing: '0.1em' }}>LIVE</span>
          </div>
          <a href={`https://pump.fun/${CA}`} target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 11, color: 'var(--green)', textDecoration: 'underline', textDecorationColor: 'rgba(62,207,106,0.4)' }}>
            View on pump.fun
          </a>
        </div>

        {/* Heading */}
        <div className="section-label reveal" style={{ justifyContent: 'center' }}>06 // Join the Meta</div>

        <div className="reveal" style={{ transitionDelay: '90ms', textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(64px, 10vw, 112px)', lineHeight: 0.88, letterSpacing: '-0.03em', color: 'var(--text-bright)' }}>GET IN</div>
        </div>
        <div className="reveal" style={{ transitionDelay: '150ms', textAlign: 'center', marginBottom: 12 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(64px, 10vw, 112px)', lineHeight: 0.88, letterSpacing: '-0.03em', color: 'var(--amber)' }}>BEFORE THE</div>
        </div>
        <div className="reveal" style={{ transitionDelay: '210ms', textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 'clamp(64px, 10vw, 112px)', lineHeight: 0.88, letterSpacing: '-0.03em', color: 'var(--green)', textShadow: '0 0 30px rgba(62,207,106,0.4)' }}>FART.</div>
        </div>

        <p className="reveal section-body" style={{ transitionDelay: '270ms', margin: '0 auto 36px', textAlign: 'center' }}>
          $FARTCAT is live. Acquire now on pump.fun.<br />Hold. Earn $FARTCOIN. Ride the meta.
        </p>

        {/* Main CTA */}
        <div className="reveal" style={{ transitionDelay: '330ms', display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <a href={`https://pump.fun/${CA}`} target="_blank" rel="noopener noreferrer"
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
            <span className="terminal-bar-text">contact.stonks — @Fartcat_Stonk</span>
          </div>
          <div className="terminal-body">
            {[
              { k: '$', v: 'Buy:', t: CA, c: 'var(--green)' },
              { k: '$', v: 'Network:', t: 'Solana', c: 'var(--green)' },
              { k: '$', v: 'Status:', t: 'LIVE — Acquire Now', c: 'var(--green)' },
            ].map((l, i) => (
              <div key={i} className="terminal-line" style={{ marginTop: i > 0 ? 8 : 0 }}>
                <span className="terminal-prompt">{l.k}</span>
                <span>{l.v} <span style={{ color: l.c }}>{l.t}</span></span>
              </div>
            ))}
            <div className="terminal-line" style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border-dim)' }}>
              <span className="terminal-prompt" style={{ color: 'var(--amber)' }}>#</span>
              <span className="txt-dim">Join the community: <strong style={{ color: 'var(--green)' }}>@Fartcat_Stonk</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
