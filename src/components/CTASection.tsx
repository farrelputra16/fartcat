import React, { useEffect, useRef } from 'react';

export const CTASection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 130);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section" style={{ textAlign: 'center' }}>
      <div className="container">
        {/* ── CA COMING SOON BANNER ── */}
        <div
          className="reveal"
          style={{
            transitionDelay: '50ms',
            marginBottom: 40,
            border: '1px solid rgba(255,176,0,0.25)',
            background: 'rgba(255,176,0,0.03)',
            padding: '16px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            maxWidth: 600,
            margin: '0 auto 40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Scanline effect */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            inset: 0,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
            pointerEvents: 'none',
          }} />
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.5" style={{ flexShrink: 0 }}>
            <rect x="3" y="11" width="18" height="11" rx="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--amber)', letterSpacing: '0.15em' }}>
              CONTRACT ADDRESS:{' '}
            </span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              color: 'var(--muted)',
              letterSpacing: '0.12em',
            }}>
              COMING SOON
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-dim)', marginLeft: 12 }}>
              announced via @fartcat_otc
            </span>
          </div>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: 'var(--amber)',
            boxShadow: '0 0 8px var(--amber)',
            animation: 'cursor-blink 1s ease-in-out infinite',
            flexShrink: 0,
          }} />
        </div>

        {/* ASCII separator */}
        <div
          className="reveal"
          aria-hidden="true"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--border-bright)',
            marginBottom: 32,
            letterSpacing: '0.05em',
          }}
        >
          {'////////////////////////////////////////////////////////////////'}
        </div>

        <div className="section-label reveal" style={{ justifyContent: 'center' }}>06 // JOIN THE META</div>

        <h2
          className="reveal crt-flicker"
          style={{
            transitionDelay: '120ms',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 10vw, 120px)',
            lineHeight: 0.9,
            color: 'var(--primary)',
            textShadow: '0 0 50px rgba(0,255,65,0.5), 0 0 100px rgba(0,255,65,0.2)',
            marginBottom: 16,
          }}
        >
          GET IN
        </h2>
        <h2
          className="reveal crt-flicker"
          style={{
            transitionDelay: '180ms',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 10vw, 120px)',
            lineHeight: 0.9,
            color: 'var(--amber)',
            textShadow: '0 0 50px rgba(255,176,0,0.5)',
            marginBottom: 32,
          }}
        >
          BEFORE THE
        </h2>
        <h2
          className="reveal crt-flicker"
          style={{
            transitionDelay: '240ms',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(56px, 10vw, 120px)',
            lineHeight: 0.9,
            color: 'var(--primary)',
            textShadow: '0 0 50px rgba(0,255,65,0.5)',
            marginBottom: 40,
          }}
        >
          FART.
        </h2>

        <p
          className="reveal"
          style={{
            transitionDelay: '300ms',
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            color: 'var(--text-dim)',
            maxWidth: 480,
            margin: '0 auto 36px',
            lineHeight: 1.8,
          }}
        >
          $FARTCAT is live. OTC acquiring now open.<br />
          Hold. Earn $FARTCOIN. Ride the meta.
        </p>

        <div className="reveal" style={{ transitionDelay: '360ms', display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
          <a
            href="https://pump.fun"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ fontSize: 22, padding: '14px 36px', letterSpacing: '0.08em' }}
            title="Buy FARTCAT on Pump.fun"
          >
            <span>ACQUIRE $FARTCAT</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </a>
        </div>

        {/* Contact terminal */}
        <div
          className="reveal terminal-window"
          style={{
            transitionDelay: '420ms',
            maxWidth: 500,
            margin: '0 auto',
          }}
        >
          <div className="terminal-titlebar">
            <div className="terminal-dot red" />
            <div className="terminal-dot amber" />
            <div className="terminal-dot green" />
            <span className="terminal-titlebar-text">contact.otc — @fartcat_otc</span>
          </div>
          <div className="terminal-body" style={{ textAlign: 'left' }}>
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span>Contact <span className="terminal-text-green">@fartcat_otc</span> on X for OTC terms</span>
            </div>
            <div className="terminal-line" style={{ marginTop: 6 }}>
              <span className="terminal-prompt">$</span>
              <span>Network: <span className="terminal-text-green">Solana</span></span>
            </div>
            <div className="terminal-line" style={{ marginTop: 6 }}>
              <span className="terminal-prompt">$</span>
              <span>Status: <span className="terminal-text-amber">OTC OPEN — LIMITED ALLOCATIONS</span></span>
            </div>
            <div className="terminal-line" style={{ marginTop: 6 }}>
              <span className="terminal-prompt">$</span>
              <span>CA: <span style={{ color: 'var(--muted)' }}>[ coming soon — announced on Twitter ]</span></span>
            </div>
            <div className="terminal-line" style={{ marginTop: 14, borderTop: '1px solid var(--border)', paddingTop: 14 }}>
              <span className="terminal-prompt" style={{ color: 'var(--amber)' }}>#</span>
              <span className="terminal-text-dim">Do NOT reply to DMs claiming to be us. Only reach via <strong style={{ color: 'var(--primary)' }}>@fartcat_otc</strong></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
