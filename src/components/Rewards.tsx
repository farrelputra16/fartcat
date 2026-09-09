import React, { useEffect, useRef, useState, useCallback } from 'react';

const FARTSYM = ['~', '^', '*', 'o', '.'];

const TIERS = [
  { l: 'Minimum', v: '1M FARTCAT', r: 'Passive accumulation', icon: '>' },
  { l: 'Medium', v: '10M FARTCAT', r: 'Enhanced reward rate', icon: '>>' },
  { l: 'Whale', v: '100M FARTCAT', r: 'Max Stonks priority', icon: '>>>' },
];

export const Rewards: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const raf = useRef(0);
  const lt = useRef(0);
  const run = useRef(false);
  const [ps, setPs] = useState<Array<{id:number; x:number; y:number; dx:number; dy:number; char:string; color:string; sz:number; op:number}>>([]);
  const nid = useRef(0);

  const emit = useCallback(() => {
    const newP = Array.from({ length: 20 }, () => {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
      const s = 90 + Math.random() * 150;
      return { id: nid.current++, x: 50 + (Math.random() - 0.5) * 8, y: 55,
        dx: Math.cos(a) * s, dy: Math.sin(a) * s,
        char: FARTSYM[Math.floor(Math.random() * FARTSYM.length)],
        color: Math.random() > 0.5 ? 'var(--green)' : 'var(--amber)',
        sz: 16 + Math.random() * 14, op: 1 };
    });
    setPs(newP);
    lt.current = performance.now();
    run.current = true;
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 300);

    const tick = (now: number) => {
      if (!run.current) return;
      const dt = Math.min((now - lt.current) / 1000, 0.05);
      lt.current = now;
      setPs(prev => {
        const u = prev.map(p => ({ ...p, x: p.x + p.dx * dt, y: p.y + p.dy * dt,
          dy: p.dy + 50 * dt, dx: p.dx * (1 - 1.2 * dt), op: Math.max(0, p.op - dt * 0.85) }))
          .filter(p => p.op > 0);
        if (u.length) raf.current = requestAnimationFrame(tick);
        return u;
      });
    };
    raf.current = requestAnimationFrame(tick);
    setTimeout(() => { run.current = false; setPs([]); if (raf.current) cancelAnimationFrame(raf.current); }, 2200);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(emit, 2500);
    const iv = setInterval(emit, 6000);
    return () => { clearTimeout(t1); clearInterval(iv); if (raf.current) cancelAnimationFrame(raf.current); };
  }, [emit]);

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
    <section id="rewards" ref={ref} className="section">
      <div className="container">
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label reveal" style={{ justifyContent: 'center' }}>03 // Stonks Reward Engine</div>
          <h2 className="section-title reveal" style={{ transitionDelay: '90ms', marginBottom: 8 }}>
            Hold <span style={{ color: 'var(--green)' }}>$FARTCAT</span>
          </h2>
          <h2 className="section-title reveal" style={{ transitionDelay: '150ms', fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--amber)', marginBottom: 16 }}>
            Get <span style={{ color: 'var(--amber)' }}>$FARTCOIN</span>
          </h2>
          <p className="reveal section-body" style={{ transitionDelay: '210ms', margin: '0 auto 56px', textAlign: 'center' }}>
            Every $FARTCAT holder receives $FARTCOIN rewards proportionally — no farming, no staking, no LP requirements. Stonks distributes rewards on every block.
          </p>

          {/* Fart visual */}
          <div className="reveal" style={{ transitionDelay: '270ms', position: 'relative', display: 'inline-block', marginBottom: 48, cursor: 'pointer' }} onClick={emit}>
            <div style={{
              fontSize: 72, fontFamily: 'var(--font-mono)', fontWeight: 700,
              color: 'var(--amber)',
              textShadow: '0 0 24px rgba(232,160,48,0.4), 0 0 60px rgba(232,160,48,0.15)',
              lineHeight: 1, userSelect: 'none', transition: 'all 0.3s',
            }}>
              ~^~
            </div>
            {/* Particles */}
            {ps.map(p => (
              <span key={p.id} className="fart-p"
                style={{
                  left: `${p.x}%`, top: `${p.y}%`,
                  fontSize: `${p.sz}px`, color: p.color,
                  textShadow: `0 0 8px ${p.color}`,
                  opacity: p.op, transform: 'translate(-50%,-50%)',
                }}>
                {p.char}
              </span>
            ))}
            <div style={{ marginTop: 12, fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              [ click to emit — reward signal visualization ]
            </div>
          </div>

          {/* Tiers */}
          <div className="reveal" style={{ transitionDelay: '330ms', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, border: '1px solid var(--border-dim)', borderRadius: 4, overflow: 'hidden', marginBottom: 48 }}>
            {TIERS.map((t, i) => (
              <div key={i} style={{ padding: '24px 20px', background: 'var(--bg-surface)', textAlign: 'center' }}>
                <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>{t.l}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: i === 2 ? 'var(--amber)' : 'var(--green)', marginBottom: 6 }}>{t.icon}</div>
                <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-bright)', marginBottom: 4 }}>{t.v}</div>
                <div style={{ fontSize: 11, color: 'var(--text-dim)' }}>{t.r}</div>
              </div>
            ))}
          </div>

          {/* Raffle / Lottery */}
          <div className="reveal terminal" style={{ transitionDelay: '400ms', borderColor: 'rgba(62,207,106,0.2)' }}>
            <div className="terminal-titlebar" style={{ background: 'rgba(62,207,106,0.06)' }}>
              <div className="terminal-dot red" />
              <div className="terminal-dot amber" />
              <div className="terminal-dot green" />
              <span className="terminal-bar-text" style={{ color: 'var(--green)' }}>stonks_lottery.toml</span>
            </div>
            <div className="terminal-body" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'center' }}>
              {/* Left: info */}
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green)', marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
                  STONKS WEEKLY RAFFLE
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-sub)', lineHeight: 1.7, marginBottom: 12 }}>
                  Every week, <span style={{ color: 'var(--green)' }}>StonkFun</span> randomly selects lucky $FARTCAT holders to win bonus $FARTCOIN prizes. The more you hold, the higher your raffle entries.
                </div>
                <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                  {[
                    { l: 'Prize Pool', v: '500K FARTCAT', c: 'var(--amber)' },
                    { l: 'Draws Every', v: '7 Days', c: 'var(--text-bright)' },
                    { l: 'Entry Req', v: '1M FARTCAT', c: 'var(--text-sub)' },
                  ].map((m, i) => (
                    <div key={i} style={{ padding: '8px 14px', background: 'var(--bg-raised)', border: '1px solid var(--border-dim)', borderRadius: 4 }}>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 2 }}>{m.l}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: m.c, fontFamily: 'var(--font-mono)' }}>{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right: Cat slot machine animation */}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8, animation: 'cat-float 2s ease-in-out infinite' }}>🎰</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>auto-qualify</div>
                <div style={{ fontSize: 11, color: 'var(--green)', marginTop: 4 }}>by holding</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
