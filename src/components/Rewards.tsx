import React, { useEffect, useRef, useState } from 'react';

const FARTSYM = ['~', '^', '*', 'o', '.', '`'];

export const Rewards: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; dx: number; dy: number; char: string; color: string; size: number; opacity: number}>>([]);
  const nextId = useRef(0);
  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const runningRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const emitFart = () => {
    const newParticles = [];
    for (let i = 0; i < 20; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.8;
      const speed = 80 + Math.random() * 140;
      newParticles.push({
        id: nextId.current++,
        x: 50 + (Math.random() - 0.5) * 10,
        y: 55,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        char: FARTSYM[Math.floor(Math.random() * FARTSYM.length)],
        color: Math.random() > 0.5 ? '#00ff41' : '#ffb000',
        size: 18 + Math.random() * 14,
        opacity: 1,
      });
    }
    setParticles(newParticles);
    lastTimeRef.current = performance.now();
    runningRef.current = true;
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 300);

    const animate = (now: number) => {
      if (!runningRef.current) return;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.05);
      lastTimeRef.current = now;
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p,
          x: p.x + p.dx * dt,
          y: p.y + p.dy * dt,
          dy: p.dy + 50 * dt,
          dx: p.dx * (1 - 1.2 * dt),
          opacity: Math.max(0, p.opacity - dt * 0.85),
        })).filter(p => p.opacity > 0);
        if (updated.length > 0) {
          rafRef.current = requestAnimationFrame(animate);
        }
        return updated;
      });
    };
    rafRef.current = requestAnimationFrame(animate);

    setTimeout(() => {
      runningRef.current = false;
      setParticles([]);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(emitFart, 3000);
    const interval = setInterval(emitFart, 5000);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

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
    <section
      ref={sectionRef}
      className="section"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        height: 400,
        background: 'radial-gradient(ellipse, rgba(0,255,65,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="section-label reveal" style={{ justifyContent: 'center' }}>03 // OTC REWARD ENGINE</div>
        <h2 className="section-title reveal" style={{ transitionDelay: '120ms', marginBottom: 8 }}>
          HOLD <span style={{ color: 'var(--amber)' }}>$FARTCAT</span>
        </h2>
        <p className="section-title reveal" style={{ transitionDelay: '180ms', fontSize: 'clamp(40px, 6vw, 72px)', color: 'var(--primary)', marginBottom: 16 }}>
          GET <span style={{ color: 'var(--amber)', textShadow: '0 0 20px rgba(255,176,0,0.4)' }}>$FARTCOIN</span>
        </p>
        <p className="reveal" style={{ transitionDelay: '240ms', fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--text-dim)', maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.8 }}>
          The OTC mechanism ensures every $FARTCAT holder receives $FARTCOIN rewards proportionally. No farming. No staking. No LP requirements. Simply hold.
        </p>

        {/* Fart visual */}
        <div
          ref={containerRef}
          className="reveal"
          style={{
            transitionDelay: '300ms',
            position: 'relative',
            display: 'inline-block',
            marginBottom: 48,
            cursor: 'default',
          }}
          onClick={emitFart}
        >
          {/* Animated fart cloud */}
          <div aria-hidden="true" style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontFamily: 'var(--font-display)',
            fontSize: 80,
            color: 'var(--amber)',
            textShadow: '0 0 30px rgba(255,176,0,0.4), 0 0 60px rgba(255,176,0,0.2)',
            opacity: particles.length > 0 ? 1 : 0.6,
            transition: 'opacity 0.3s',
            userSelect: 'none',
            lineHeight: 1,
          }}>
            ~^~
          </div>

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
                textShadow: `0 0 8px ${p.color}`,
                fontFamily: 'var(--font-display)',
                userSelect: 'none',
                opacity: p.opacity,
                pointerEvents: 'none',
                transform: 'translate(-50%, -50%)',
                zIndex: 5,
              }}
            >
              {p.char}
            </span>
          ))}

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--muted)',
            textAlign: 'center',
            marginTop: 12,
            letterSpacing: '0.1em',
          }}>
            [ reward stream visualization — click to emit ]
          </div>
        </div>

        {/* Reward tiers */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          border: '1px solid var(--border)',
          maxWidth: 700,
          margin: '0 auto',
        }}>
          {[
            { label: 'MINIMUM HOLD', value: '1M $FARTCAT', reward: 'Passive accumulation', icon: '>' },
            { label: 'MEDIUM HODLER', value: '10M $FARTCAT', reward: 'Enhanced reward rate', icon: '>>' },
            { label: 'WHALE TIER', value: '100M $FARTCAT', reward: 'Maximum OTC priority', icon: '>>>' },
          ].map((tier, i) => (
            <div
              key={i}
              className="reveal"
              style={{
                transitionDelay: `${360 + i * 100}ms`,
                padding: '24px 20px',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                textAlign: 'center',
              }}
            >
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, color: i === 2 ? 'var(--amber)' : 'var(--primary)', textShadow: `0 0 8px ${i === 2 ? 'rgba(255,176,0,0.5)' : 'rgba(0,255,65,0.4)'}`, marginBottom: 8 }}>
                {tier.icon}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--muted)', letterSpacing: '0.15em', marginBottom: 6 }}>
                {tier.label}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--text)', marginBottom: 4 }}>
                {tier.value}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)' }}>
                {tier.reward}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .rewards-grid {
            grid-template-columns: 1fr !important;
          }
          .rewards-grid > div {
            border-right: none !important;
            border-bottom: 1px solid var(--border) !important;
          }
          .rewards-grid > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
};
