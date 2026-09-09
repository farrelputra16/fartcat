import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GlitchText } from './GlitchText';

const FARTSYM = ['~', '^', '*', 'o', '.', '`', '°'];

const TICKER = [
  'FARTCAT ON SOLANA', 'STONKS REWARDS ACTIVE', 'HOLD = EARN $FARTCOIN',
  'ZERO TX TAX', 'META-MASHUP', 'CAT + FART SYNERGY', 'DIRECT WALLET REWARDS',
  'NO STAKING REQUIRED', 'PUMP.FUN LISTING', 'SOLANA NETWORK',
];

export const Hero: React.FC = () => {
  const [farting, setFarting] = useState(false);
  const [particles, setParticles] = useState<Array<{id:number; x:number; y:number; dx:number; dy:number; char:string; color:string; sz:number; op:number}>>([]);
  const nid = useRef(0);
  const raf = useRef(0);
  const lt = useRef(0);
  const run = useRef(false);

  const fire = useCallback(() => {
    if (farting) return;
    setFarting(true);
    const ps = Array.from({ length: 18 }, () => {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.0;
      const s = 80 + Math.random() * 140;
      return {
        id: nid.current++,
        x: 70 + Math.random() * 6,
        y: 55 + Math.random() * 10,
        dx: Math.cos(a) * s,
        dy: Math.sin(a) * s,
        char: FARTSYM[Math.floor(Math.random() * FARTSYM.length)],
        color: Math.random() > 0.4 ? 'var(--green)' : 'var(--amber)',
        sz: 14 + Math.random() * 16,
        op: 1,
      };
    });
    setParticles(ps);
    lt.current = performance.now();
    run.current = true;

    const tick = (now: number) => {
      if (!run.current) return;
      const dt = Math.min((now - lt.current) / 1000, 0.05);
      lt.current = now;
      setParticles(prev => {
        const u = prev.map(p => ({
          ...p,
          x: p.x + p.dx * dt,
          y: p.y + p.dy * dt,
          dy: p.dy + 48 * dt,
          dx: p.dx * (1 - 1.3 * dt),
          op: Math.max(0, p.op - dt * 0.85),
        })).filter(p => p.op > 0);
        if (u.length) raf.current = requestAnimationFrame(tick);
        return u;
      });
    };
    raf.current = requestAnimationFrame(tick);
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 300);

    setTimeout(() => {
      run.current = false;
      setFarting(false);
      setParticles([]);
      if (raf.current) cancelAnimationFrame(raf.current);
    }, 2000);
  }, [farting]);

  useEffect(() => {
    const id = setInterval(() => fire(), 5000 + Math.random() * 2000);
    return () => { clearInterval(id); if (raf.current) cancelAnimationFrame(raf.current); };
  }, [fire]);

  return (
    <section style={{ minHeight: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

      {/* ── Ticker ── */}
      <div style={{
        background: 'var(--bg-raised)', borderBottom: '1px solid var(--border-dim)',
        padding: '5px 0', overflow: 'hidden', flexShrink: 0, marginTop: 56,
      }} aria-hidden="true">
        <div style={{
          display: 'flex', animation: 'ticker 50s linear infinite',
          whiteSpace: 'nowrap', fontSize: 10.5,
          letterSpacing: '0.1em', color: 'var(--text-dim)',
        }}>
          {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ padding: '0 32px', color: i % 5 === 0 ? 'var(--green)' : i % 5 === 2 ? 'var(--amber)' : undefined }}>
              {t} <span style={{ color: 'var(--border-mid)', marginLeft: 32 }}>///</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Hero Body ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 0 80px' }}>
        {/* BG grid */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(var(--border-dim) 1px, transparent 1px), linear-gradient(90deg, var(--border-dim) 1px, transparent 1px)`,
          backgroundSize: '72px 72px', opacity: 0.3, pointerEvents: 'none',
        }} />
        {/* Ambient glows */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '30%', left: '-5%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(62,207,106,0.04) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '20%', right: '-5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(232,160,48,0.03) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 64,
            alignItems: 'center',
            maxWidth: 1060,
            margin: '0 auto',
          }}>

            {/* LEFT */}
            <div>
              {/* Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  border: '1px solid var(--green-dim)',
                  background: 'rgba(62,207,106,0.06)',
                  padding: '4px 12px', borderRadius: 3,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 6px var(--green)', animation: 'pulse-glow 1.5s ease-in-out infinite' }} />
                  <span style={{ fontSize: 10.5, color: 'var(--green)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Live on Solana</span>
                </div>
              </div>

              {/* Headline */}
              <h1 style={{
                fontFamily: 'var(--font-mono)', fontWeight: 700,
                fontSize: 'clamp(72px, 11vw, 132px)',
                lineHeight: 0.88, letterSpacing: '-0.03em',
                color: 'var(--text-bright)', marginBottom: 4,
                userSelect: 'none',
              }}>
                <GlitchText>FART</GlitchText>
              </h1>
              <h1 style={{
                fontFamily: 'var(--font-mono)', fontWeight: 700,
                fontSize: 'clamp(72px, 11vw, 132px)',
                lineHeight: 0.88, letterSpacing: '-0.03em',
                color: 'var(--green)', textShadow: '0 0 30px rgba(62,207,106,0.4)',
                marginBottom: 24, userSelect: 'none',
              }}>CAT</h1>

              {/* Sub */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ height: 1, width: 32, background: 'var(--border-mid)' }} />
                <span style={{ fontSize: 12, color: 'var(--amber)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  $FARTCAT — $FARTCOIN Stonks Reward Engine
                </span>
              </div>

              {/* Tagline */}
              <p style={{ fontSize: 14, color: 'var(--text-sub)', lineHeight: 1.75, maxWidth: 420, marginBottom: 32 }}>
                Hold $FARTCAT in your wallet. Earn $FARTCOIN rewards continuously — no staking, no lock, no LP requirements. Pure Stonks mechanism, running on Solana.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 40 }}>
                <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: 12, padding: '11px 24px' }}>
                  BUY $FARTCAT
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M7 7h10v10"/>
                  </svg>
                </a>
                <a href="#about" className="btn-ghost">LEARN MORE</a>
              </div>

              {/* Metrics */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, auto)',
                gap: 0, border: '1px solid var(--border-dim)',
                borderRadius: 4, overflow: 'hidden', maxWidth: 480,
              }}>
                {[
                  { l: 'Network', v: 'Solana' },
                  { l: 'Tax', v: '0%' },
                  { l: 'Rewards', v: '$FARTCOIN' },
                  { l: 'CA', v: 'Soon' },
                ].map((m, i) => (
                  <div key={i} style={{
                    padding: '12px 20px',
                    borderRight: i < 3 ? '1px solid var(--border-dim)' : 'none',
                    background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-raised)',
                  }}>
                    <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 3 }}>{m.l}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: m.v === 'Soon' ? 'var(--amber)' : 'var(--green)' }}>{m.v}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Cat */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Glow ring */}
              <div aria-hidden="true" style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 320, height: 320,
                borderRadius: '50%',
                background: farting
                  ? 'radial-gradient(circle, rgba(232,160,48,0.18) 0%, transparent 70%)'
                  : 'radial-gradient(circle, rgba(62,207,106,0.1) 0%, transparent 70%)',
                transition: 'background 0.5s',
                animation: 'pulse-glow 3s ease-in-out infinite',
                pointerEvents: 'none',
              }} />

              {/* Terminal window */}
              <div
                className="terminal"
                style={{
                  width: 'clamp(240px, 28vw, 320px)',
                  cursor: 'pointer',
                  boxShadow: farting
                    ? '0 0 40px rgba(232,160,48,0.2), var(--shadow-lg)'
                    : '0 0 20px rgba(62,207,106,0.08), var(--shadow-md)',
                  transition: 'box-shadow 0.5s',
                }}
                onClick={fire}
              >
                {/* Title bar */}
                <div className="terminal-titlebar">
                  <div className="terminal-dot red" />
                  <div className="terminal-dot amber" />
                  <div className="terminal-dot green" />
                  <span className="terminal-bar-text">fartcat@node</span>
                  {farting && (
                    <span style={{ marginLeft: 8, fontSize: 10, color: 'var(--amber)', animation: 'blink 0.3s step-end infinite' }}>
                      [ FART ]
                    </span>
                  )}
                </div>

                {/* Image area */}
                <div style={{ position: 'relative', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fade-up 0.5s ease-out' }}>
                  <img
                    src="/fartcat.jpg"
                    alt="FARTCAT"
                    style={{
                      width: '100%',
                      maxWidth: 280,
                      height: 'auto',
                      aspectRatio: '1',
                      objectFit: 'contain',
                      filter: farting
                        ? 'drop-shadow(0 0 24px rgba(232,160,48,0.7))'
                        : 'drop-shadow(0 0 12px rgba(62,207,106,0.35))',
                      transition: 'filter 0.4s',
                    }}
                    onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                  {/* Particles */}
                  {particles.map(p => (
                    <span key={p.id} className="fart-p"
                      style={{
                        left: `${p.x}%`, top: `${p.y}%`,
                        fontSize: `${p.sz}px`, color: p.color,
                        textShadow: `0 0 8px ${p.color}`,
                        opacity: p.op, transform: 'translate(-50%,-50%)',
                        fontFamily: 'var(--font-mono)',
                      }}>
                      {p.char}
                    </span>
                  ))}
                </div>

                {/* Status bar */}
                <div style={{
                  background: 'var(--bg-raised)',
                  padding: '8px 14px',
                  borderTop: '1px solid var(--border-dim)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>click to emit</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: farting ? 'var(--amber)' : 'var(--green)' }} />
                    <span style={{ fontSize: 10, color: farting ? 'var(--amber)' : 'var(--green)' }}>{farting ? 'EMITTING' : 'IDLE'}</span>
                  </div>
                </div>
              </div>

              {/* Hint */}
              <div style={{ marginTop: 10, fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                click cat to emit
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, zIndex: 5 }}>
        <span style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Scroll</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>

      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
};
