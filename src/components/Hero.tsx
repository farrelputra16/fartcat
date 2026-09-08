import React, { useEffect, useRef, useState } from 'react';
import { GlitchText } from './GlitchText';

const FARTSYM = ['~', '^', '*', 'o', '.', '`', '°', '·', '≈', '~'];

// Ticker data
const TICKER_ITEMS = [
  '● FARTCAT ON SOLANA',
  '● OTC REWARDS ACTIVE',
  '● HOLD = EARN $FARTCOIN',
  '● META-MASHUP ACTIVE',
  '● CAT + FARTCOIN SYNERGY',
  '● NO STAKING REQUIRED',
  '● ZERO TX TAX',
  '● DIRECT WALLET REWARDS',
  '● COMING SOON',
];

export const Hero: React.FC = () => {
  const [farting, setFarting] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; dx: number; dy: number; char: string; color: string; size: number; opacity: number}>>([]);
  const nextId = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const runningRef = useRef(false);

  const triggerFart = React.useCallback(() => {
    if (farting) return;
    setFarting(true);

    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.0;
      const speed = 80 + Math.random() * 160;
      newParticles.push({
        id: nextId.current++,
        x: 72 + Math.random() * 6,
        y: 58 + Math.random() * 10,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        char: FARTSYM[Math.floor(Math.random() * FARTSYM.length)],
        color: Math.random() > 0.45 ? '#00ff41' : '#ffb000',
        size: 16 + Math.random() * 18,
        opacity: 1,
      });
    }
    setParticles(newParticles);
    lastTimeRef.current = performance.now();
    runningRef.current = true;

    const animate = (now: number) => {
      if (!runningRef.current) return;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p,
          x: p.x + p.dx * dt,
          y: p.y + p.dy * dt,
          dy: p.dy + 45 * dt,
          dx: p.dx * (1 - 1.4 * dt),
          opacity: Math.max(0, p.opacity - dt * 0.85),
        })).filter(p => p.opacity > 0);
        if (updated.length > 0) {
          rafRef.current = requestAnimationFrame(animate);
        }
        return updated;
      });
    };
    rafRef.current = requestAnimationFrame(animate);

    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 350);

    setTimeout(() => {
      runningRef.current = false;
      setFarting(false);
      setParticles([]);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }, 2000);
  }, [farting]);

  useEffect(() => {
    const interval = setInterval(() => {
      triggerFart();
    }, 4500 + Math.random() * 2000);
    return () => {
      clearInterval(interval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [triggerFart]);

  return (
    <section
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── TICKER MARQUEE ── */}
      <div
        style={{
          background: 'var(--border)',
          borderBottom: '1px solid var(--border-bright)',
          padding: '6px 0',
          overflow: 'hidden',
          position: 'relative',
          zIndex: 10,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        <div
          style={{
            display: 'flex',
            gap: 0,
            animation: 'ticker-scroll 40s linear infinite',
            whiteSpace: 'nowrap',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.08em',
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ padding: '0 32px', color: i % 3 === 0 ? 'var(--primary)' : i % 3 === 1 ? 'var(--amber)' : 'var(--text-dim)' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── MAIN HERO BODY ── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px 60px',
          position: 'relative',
        }}
      >
        {/* Background grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(var(--border) 1px, transparent 1px),
              linear-gradient(90deg, var(--border) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            opacity: 0.12,
            pointerEvents: 'none',
          }}
        />

        {/* Ambient glows */}
        <div aria-hidden="true" style={{ position: 'absolute', top: '10%', left: '5%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(0,255,65,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: '10%', right: '5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(255,176,0,0.04) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* ── SPLIT LAYOUT ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: 48,
              alignItems: 'center',
              maxWidth: 1000,
              margin: '0 auto',
            }}
          >
            {/* LEFT: Text */}
            <div>
              {/* Eyebrow */}
              <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: 'var(--amber)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255,176,0,0.3)',
                  padding: '3px 10px',
                  background: 'rgba(255,176,0,0.05)',
                }}>
                  live on solana
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--primary)', animation: 'cursor-blink 1s step-end infinite' }}>
                  ●
                </span>
              </div>

              {/* Headline */}
              <h1
                className="crt-flicker"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(80px, 12vw, 148px)',
                  lineHeight: 0.88,
                  color: 'var(--primary)',
                  textShadow: '0 0 50px rgba(0,255,65,0.6), 0 0 100px rgba(0,255,65,0.25)',
                  letterSpacing: '-0.02em',
                  userSelect: 'none',
                  marginBottom: 4,
                }}
              >
                <GlitchText>FART</GlitchText>
              </h1>
              <h1
                className="crt-flicker"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(80px, 12vw, 148px)',
                  lineHeight: 0.88,
                  color: 'var(--amber)',
                  textShadow: '0 0 50px rgba(255,176,0,0.6), 0 0 100px rgba(255,176,0,0.25)',
                  letterSpacing: '-0.02em',
                  userSelect: 'none',
                  marginBottom: 16,
                }}
              >
                CAT
              </h1>

              {/* Sub-token */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(16px, 2.5vw, 26px)',
                color: 'var(--text-dim)',
                marginBottom: 24,
                letterSpacing: '0.05em',
              }}>
                $FARTCAT — $FARTCOIN OTC REWARD ENGINE
              </div>

              {/* Tagline */}
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(13px, 1.8vw, 16px)',
                color: 'var(--text-dim)',
                maxWidth: 440,
                lineHeight: 1.8,
                marginBottom: 36,
              }}>
                holding $FARTCAT continuously feeds $FARTCOIN rewards<br />
                straight into your wallet. no staking. no lock. pure OTC.
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
                <a
                  href="https://pump.fun"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ fontSize: 18, padding: '12px 28px' }}
                  title="Buy FARTCAT on Pump.fun"
                >
                  <span>BUY $FARTCAT</span>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M7 7h10v10"/>
                  </svg>
                </a>
                <a href="#about" className="btn-secondary" style={{ fontSize: 14, padding: '12px 24px' }}>
                  LEARN_MORE
                </a>
              </div>

              {/* Stats row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 0,
                border: '1px solid var(--border)',
                maxWidth: 380,
              }}>
                {[
                  { label: 'CHAIN', value: 'SOLANA' },
                  { label: 'REWARDS', value: '$FARTCOIN' },
                  { label: 'MECHANISM', value: 'OTC REWARDS' },
                  { label: 'TX TAX', value: '0%' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 16px',
                      borderRight: i % 2 === 0 && i < 3 ? '1px solid var(--border)' : 'none',
                      borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: 'var(--muted)', letterSpacing: '0.18em', marginBottom: 2 }}>
                      {stat.label}
                    </div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--primary)', textShadow: '0 0 6px rgba(0,255,65,0.4)' }}>
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Cat image + particles */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {/* Glowing ring behind cat */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 280,
                  height: 280,
                  borderRadius: '50%',
                  background: farting
                    ? 'radial-gradient(circle, rgba(255,176,0,0.2) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(0,255,65,0.12) 0%, transparent 70%)',
                  transition: 'background 0.4s',
                  pointerEvents: 'none',
                  animation: 'pulse-glow 3s ease-in-out infinite',
                }}
              />

              {/* Terminal window frame */}
              <div
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border-bright)',
                  borderRadius: 4,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: farting
                    ? '0 0 40px rgba(255,176,0,0.3), 0 0 80px rgba(0,255,65,0.1)'
                    : '0 0 30px rgba(0,255,65,0.15), 0 0 60px rgba(0,255,65,0.05)',
                  transition: 'box-shadow 0.4s',
                  cursor: 'pointer',
                }}
                onClick={triggerFart}
                title="click to fart!"
              >
                {/* Title bar */}
                <div style={{
                  background: 'var(--border)',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  borderBottom: '1px solid var(--border-bright)',
                }}>
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#ff3333' }} />
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--amber)' }} />
                  <div style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--primary)' }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', marginLeft: 6 }}>
                    fartcat@node:~ — $FARTCAT
                  </span>
                  {farting && (
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--amber)', marginLeft: 8, animation: 'cursor-blink 0.3s step-end infinite' }}>
                      [ FARTING... ]
                    </span>
                  )}
                </div>

                {/* Cat image */}
                <div style={{ position: 'relative', padding: 16, animation: 'cat-float 4s ease-in-out infinite' }}>
                  <img
                    src="/fartcat.jpg"
                    alt="FARTCAT — the ultimate meta-mashup memecoin on Solana"
                    style={{
                      width: 'clamp(200px, 22vw, 280px)',
                      height: 'clamp(200px, 22vw, 280px)',
                      objectFit: 'contain',
                      display: 'block',
                      filter: farting
                        ? 'drop-shadow(0 0 20px rgba(255,176,0,0.8)) brightness(1.1)'
                        : 'drop-shadow(0 0 12px rgba(0,255,65,0.4))',
                      transition: 'filter 0.3s',
                    }}
                    onError={e => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* ASCII fallback below image */}
                  <pre style={{
                    display: 'none',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    lineHeight: 1.2,
                    color: 'var(--primary)',
                    textShadow: '0 0 6px rgba(0,255,65,0.4)',
                  }}>

                  </pre>

                  {/* Particles */}
                  {particles.map(p => (
                    <span
                      key={p.id}
                      style={{
                        position: 'absolute',
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        fontSize: `${p.size}px`,
                        color: p.color,
                        textShadow: `0 0 10px ${p.color}`,
                        fontFamily: 'var(--font-display)',
                        userSelect: 'none',
                        opacity: p.opacity,
                        pointerEvents: 'none',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10,
                      }}
                    >
                      {p.char}
                    </span>
                  ))}
                </div>

                {/* Status bar */}
                <div style={{
                  background: 'var(--border)',
                  padding: '6px 14px',
                  borderTop: '1px solid var(--border-bright)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)' }}>
                    click cat to emit reward signal
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--primary)' }}>
                    status: ACTIVE
                  </span>
                </div>
              </div>

              {/* Click hint */}
              <div style={{
                marginTop: 12,
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: 'var(--muted)',
                letterSpacing: '0.1em',
              }}>
                [ click cat to fart ]
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        zIndex: 5,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.1em' }}>SCROLL</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" strokeWidth="1.5">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes cat-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @media (max-width: 768px) {
          .hero-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
