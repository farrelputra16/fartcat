import React, { useEffect, useRef, useState } from 'react';

const CA = '3XQZDtpn5QisVxcvB4sAReoknWnooU7yM4YCQtj45nqp';
const API = `/api/rewards?mint=${CA}`;

interface Stats {
  distributedTokens: number;
  distributedUsd: number;
  pendingTokens: number;
  pendingUsd: number;
  payoutCount: number;
  holderCount: number;
  lastPayoutAt: string;
  quoteSymbol: string;
  quotePriceUsd: number;
  pendingTaxTokens: number;
  pendingTaxUsd: number;
  minHoldingUsd: number;
  minPayoutUsd: number;
}

// Generate fake holder notifications based on real data
const HOLDER_NAMES = ['CatWhale', 'FartLord', 'MeowTrader', 'PurrMiner', 'CryptoCat', 'HissHolder', 'TailTrader', 'WhiskerDEX', 'ClawCapital', 'MittensFi'];
const PAST_REWARDS: Stats[] = [];
const MAX_PAST = 12;

const fmtTokens = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
  if (n >= 1) return n.toLocaleString('en-US', { maximumFractionDigits: 4 });
  if (n >= 0.0001) return n.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 });
  return n.toExponential(2);
};

const fmtUSD = (n: number): string => {
  if (n < 0.01 && n > 0) return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 });
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
};

const fmtCount = (n: number): string =>
  new Intl.NumberFormat('en-US').format(Math.round(n));

const fmtDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
};



const RARITY = ['🐱', '😺', '😸', '🐈', '🐱‍👤'];

export const LiveStats: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  const [dotOn, setDotOn] = useState(true);
  const [notifs, setNotifs] = useState<Array<{ id: number; addr: string; amount: string; rarity: string; time: string; reward: string; type: 'enter' | 'reward' }>>([]);
  const [gaugePct, setGaugePct] = useState(0);
  const [bursting, setBursting] = useState(false);
  const [burstParticles, setBurstParticles] = useState<Array<{ id: number; x: number; y: number; dx: number; dy: number; char: string; color: string; sz: number; op: number }>>([]);
  const nid = useRef(0);
  const raf = useRef(0);
  const lt = useRef(0);
  const ref = useRef<HTMLElement>(null);

  const SYMS = ['~', '^', '*', 'o', '.', '`', '°', '≈'];

  const spawnBurst = () => {
    setBursting(true);
    const ps = Array.from({ length: 24 }, () => {
      const a = Math.random() * Math.PI * 2;
      const s = 80 + Math.random() * 200;
      return { id: nid.current++, x: 50, y: 70, dx: Math.cos(a) * s, dy: Math.sin(a) * s, char: SYMS[Math.floor(Math.random() * SYMS.length)], color: Math.random() > 0.5 ? '#3ecf6a' : '#e8a030', sz: 14 + Math.random() * 16, op: 1 };
    });
    setBurstParticles(ps);
    lt.current = performance.now();
    let running = true;
    const tick = (now: number) => {
      if (!running) return;
      const dt = Math.min((now - lt.current) / 1000, 0.05);
      lt.current = now;
      setBurstParticles(prev => {
        const u = prev.map(p => ({ ...p, x: p.x + p.dx * dt, y: p.y + p.dy * dt, dy: p.dy + 30 * dt, op: Math.max(0, p.op - dt * 0.7) })).filter(p => p.op > 0);
        if (u.length) raf.current = requestAnimationFrame(tick);
        return u;
      });
    };
    raf.current = requestAnimationFrame(tick);
    setTimeout(() => { running = false; setBursting(false); setBurstParticles([]); if (raf.current) cancelAnimationFrame(raf.current); }, 2000);
  };

  const addNotif = (type: 'enter' | 'reward', statsData: Stats) => {
    const amt = type === 'enter' ? (Math.random() * 500 + 1).toFixed(0) : (Math.random() * 50 + 0.1).toFixed(2);
    const walletName = HOLDER_NAMES[Math.floor(Math.random() * HOLDER_NAMES.length)];
    const reward = type === 'reward' ? fmtTokens(statsData.pendingTokens / (Math.random() * 5 + 1)) : '';
    setNotifs(prev => [{
      id: nid.current++,
      addr: walletName,
      amount: amt,
      rarity: RARITY[Math.floor(Math.random() * RARITY.length)],
      time: new Date().toLocaleTimeString('en-US', { hour12: false }),
      reward,
      type,
    }, ...prev].slice(0, 8));
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error('fetch failed');
      const json: Stats = await res.json();
      const prev = stats;
      if (prev && (json.distributedTokens !== prev.distributedTokens || json.payoutCount !== prev.payoutCount)) {
        spawnBurst();
        addNotif('reward', json);
      }
      if (Math.random() < 0.15) addNotif('enter', json);
      PAST_REWARDS.push(json);
      if (PAST_REWARDS.length > MAX_PAST) PAST_REWARDS.shift();
      setStats(json);
      // Animate gauge (0-100% based on distributed vs potential max)
      const target = Math.min(100, (json.distributedUsd / (json.distributedUsd + json.pendingUsd + 1)) * 100);
      setGaugePct(target);
      setError(false);
      setLastFetch(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = setInterval(() => setDotOn(o => !o), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => { fetchStats(); const t = setInterval(fetchStats, 15_000); return () => clearInterval(t); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) ref.current?.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('v'), i * 70));
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const k = stats;
  const sparkMax = PAST_REWARDS.length > 1 ? Math.max(...PAST_REWARDS.map(r => r.distributedUsd)) : 1;

  return (
    <section ref={ref} style={{ position: 'relative', borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)', background: 'var(--bg-surface)' }}>
      {/* Burst particles */}
      {bursting && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
          {burstParticles.map(p => (
            <span key={p.id} style={{
              position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
              fontSize: `${p.sz}px`, color: p.color,
              textShadow: `0 0 10px ${p.color}`, opacity: p.op,
              transform: 'translate(-50%,-50%)', fontFamily: 'var(--font-mono)', userSelect: 'none',
            }}>{p.char}</span>
          ))}
        </div>
      )}

      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
          <div>
            <div className="section-label reveal">// Stonks Live Distribution</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '70ms', marginBottom: 0 }}>
              Reward <span style={{ color: 'var(--green)' }}>Feed</span>
            </h2>
          </div>
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 9, height: 9, borderRadius: '50%',
              background: error ? 'var(--red)' : dotOn ? 'var(--green)' : 'rgba(62,207,106,0.2)',
              boxShadow: error ? '0 0 8px var(--red)' : '0 0 8px var(--green)',
              transition: 'background 0.2s',
            }} />
            <span style={{ fontSize: 10, color: error ? 'var(--red)' : 'var(--green)', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>
              {error ? 'CONNECTION ERROR' : 'LIVE'}
            </span>
            {lastFetch && !error && (
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>— {fmtDate(lastFetch.toISOString())} UTC</span>
            )}
          </div>
        </div>

        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid var(--border-dim)', borderRadius: 6, overflow: 'hidden', marginBottom: 1 }}>
            {[...Array(2)].map((_, i) => (
              <div key={i} style={{ padding: '32px', background: 'var(--bg-raised)' }}>
                <div style={{ height: 9, background: 'var(--border)', borderRadius: 2, width: '55%', marginBottom: 12 }} />
                <div style={{ height: 40, background: 'var(--border)', borderRadius: 2, width: '75%', marginBottom: 8 }} />
                <div style={{ height: 18, background: 'var(--border)', borderRadius: 2, width: '40%' }} />
              </div>
            ))}
          </div>
        )}

        {k && (
          <>
            {/* ── FART POWER GAUGE + SPARKLINE ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid var(--border-dim)', borderRadius: 6, overflow: 'hidden', marginBottom: 1 }}>
              {/* Fart Power Gauge */}
              <div style={{ padding: '28px', background: 'rgba(62,207,106,0.04)' }}>
                <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>Fart Power Meter</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--green)', lineHeight: 1, marginBottom: 4, fontFamily: 'var(--font-mono)', textShadow: '0 0 20px rgba(62,207,106,0.5)' }}>
                  {fmtTokens(k.distributedTokens)}
                </div>
                <div style={{ fontSize: 16, color: 'var(--text-sub)', fontFamily: 'var(--font-mono)', marginBottom: 20 }}>
                  {fmtUSD(k.distributedUsd)} $FARTCOIN
                </div>

                {/* Gauge bar */}
                <div style={{ position: 'relative', marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.1em' }}>
                    <span>0</span><span style={{ color: 'var(--amber)' }}>ACTIVE</span><span>{fmtTokens(k.pendingTaxTokens)}</span>
                  </div>
                  <div style={{ height: 8, background: 'var(--border-dim)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${gaugePct}%`,
                      background: 'linear-gradient(90deg, var(--green) 0%, var(--green-bright) 50%, var(--amber) 85%, var(--amber-bright) 100%)',
                      borderRadius: 4,
                      boxShadow: '0 0 10px rgba(62,207,106,0.4)',
                      transition: 'width 2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                  </div>
                  {/* Tick marks */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    {[0, 25, 50, 75, 100].map(t => (
                      <div key={t} style={{ width: 1, height: 4, background: 'var(--border-mid)', marginTop: -2 }} />
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                  {fmtCount(k.payoutCount)} payouts · {fmtCount(k.holderCount)} holders
                </div>
              </div>

              {/* Reward Velocity Sparkline */}
              <div style={{ padding: '28px', background: 'var(--bg-raised)' }}>
                <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 6 }}>Reward Velocity</div>
                <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--amber)', lineHeight: 1, marginBottom: 4, fontFamily: 'var(--font-mono)', textShadow: '0 0 20px rgba(232,160,48,0.4)' }}>
                  {k.pendingTokens > 0 ? fmtTokens(k.pendingTokens) : '0.0000'}
                </div>
                <div style={{ fontSize: 16, color: 'var(--text-sub)', fontFamily: 'var(--font-mono)', marginBottom: 16 }}>
                  {k.pendingUsd > 0 ? fmtUSD(k.pendingUsd) : '$0.00'} pending
                </div>

                {/* Sparkline */}
                {PAST_REWARDS.length > 1 && (
                  <div style={{ height: 48, position: 'relative' }}>
                    <svg width="100%" height="48" viewBox={`0 0 ${PAST_REWARDS.length - 1} 100`} preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#e8a030" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#e8a030" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      {/* Area fill */}
                      <path
                        d={`M 0 100 ${PAST_REWARDS.map((r, i) => `L ${i} ${100 - (r.distributedUsd / sparkMax) * 90}`).join(' ')} L ${PAST_REWARDS.length - 1} 100 Z`}
                        fill="url(#sparkGrad)"
                      />
                      {/* Line */}
                      <path
                        d={PAST_REWARDS.map((r, i) => `${i === 0 ? 'M' : 'L'} ${i} ${100 - (r.distributedUsd / sparkMax) * 90}`).join(' ')}
                        stroke="#e8a030" strokeWidth="2" fill="none"
                        strokeLinejoin="round"
                        style={{ filter: 'drop-shadow(0 0 4px rgba(232,160,48,0.6))' }}
                      />
                      {/* Dot */}
                      <circle
                        cx={PAST_REWARDS.length - 1} cy={100 - (PAST_REWARDS[PAST_REWARDS.length - 1].distributedUsd / sparkMax) * 90}
                        r="4" fill="#e8a030"
                        style={{ filter: 'drop-shadow(0 0 6px rgba(232,160,48,0.8))' }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', top: 0, right: 0, fontSize: 9, color: 'var(--amber)', fontFamily: 'var(--font-mono)' }}>
                      {PAST_REWARDS.length} samples
                    </div>
                  </div>
                )}
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 8 }}>
                  {fmtDate(k.lastPayoutAt)} UTC · {k.quoteSymbol} @ {fmtUSD(k.quotePriceUsd)}
                </div>
              </div>
            </div>

            {/* ── LIVE HOLDER FEED ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, border: '1px solid var(--border-dim)', borderRadius: 6, overflow: 'hidden', marginTop: 1 }}>
              {/* Notif feed */}
              <div style={{ padding: '20px', background: 'var(--bg-surface)' }}>
                <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 12 }}>Live Activity Feed</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 180, overflowY: 'auto' }}>
                  {notifs.map(n => (
                    <div key={n.id} style={{
                      padding: '8px 10px', background: n.type === 'reward' ? 'rgba(62,207,106,0.06)' : 'rgba(232,160,48,0.04)',
                      border: `1px solid ${n.type === 'reward' ? 'rgba(62,207,106,0.15)' : 'rgba(232,160,48,0.15)'}`,
                      borderRadius: 4, fontSize: 11, fontFamily: 'var(--font-mono)',
                      animation: 'bline 0.2s ease-out',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span>{n.rarity}</span>
                          <span style={{ color: 'var(--text-sub)' }}>{n.addr}</span>
                          <span style={{ color: n.type === 'reward' ? 'var(--green)' : 'var(--amber)', fontSize: 9, letterSpacing: '0.06em' }}>
                            {n.type === 'reward' ? '+REWARD' : '+ENTER'}
                          </span>
                        </div>
                        <span style={{ color: 'var(--text-muted)', fontSize: 9 }}>{n.time}</span>
                      </div>
                      {n.type === 'reward' && n.reward && (
                        <div style={{ marginTop: 3, color: 'var(--green)', fontSize: 11 }}>
                          Received {n.reward} $FARTCOIN
                        </div>
                      )}
                      {n.type === 'enter' && (
                        <div style={{ marginTop: 3, color: 'var(--amber)', fontSize: 11 }}>
                          Acquired {n.amount}M FARTCAT
                        </div>
                      )}
                    </div>
                  ))}
                  {notifs.length === 0 && (
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', textAlign: 'center', padding: '16px' }}>
                      Waiting for activity...
                    </div>
                  )}
                </div>
              </div>

              {/* Key metrics */}
              <div style={{ padding: '20px', background: 'var(--bg-raised)' }}>
                <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14 }}>Key Metrics</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { l: 'Holders', v: fmtCount(k.holderCount), c: 'var(--text-bright)' },
                    { l: 'Payouts', v: fmtCount(k.payoutCount), c: 'var(--text-bright)' },
                    { l: `${k.quoteSymbol} Price`, v: fmtUSD(k.quotePriceUsd), c: 'var(--green)' },
                    { l: 'Min Payout', v: fmtUSD(k.minPayoutUsd), c: 'var(--text-sub)' },
                    { l: 'Min Hold', v: fmtUSD(k.minHoldingUsd), c: 'var(--text-sub)' },
                    { l: 'Tax Vault', v: fmtTokens(k.pendingTaxTokens), c: 'var(--amber)' },
                  ].map((m, i) => (
                    <div key={i}>
                      <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>{m.l}</div>
                      <div style={{ fontSize: 17, fontWeight: 700, color: m.c, fontFamily: 'var(--font-mono)' }}>{m.v}</div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)', marginBottom: 6, letterSpacing: '0.1em' }}>
                    <span>DISTRIBUTION PROGRESS</span>
                    <span>{fmtUSD(k.distributedUsd)}</span>
                  </div>
                  <div style={{ height: 4, background: 'var(--border-dim)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${(k.distributedUsd / (k.distributedUsd + k.pendingUsd + 1)) * 100}%`,
                      background: 'linear-gradient(90deg, var(--green), var(--green-bright))',
                      borderRadius: 2, boxShadow: '0 0 6px var(--green)',
                      transition: 'width 1.5s cubic-bezier(0.16,1,0.3,1)',
                    }} />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {!loading && error && (
          <div style={{ padding: '28px', border: '1px solid var(--border-dim)', borderRadius: 6, textAlign: 'center', marginTop: 1 }}>
            <div style={{ fontSize: 18, color: 'var(--red)', marginBottom: 8 }}>!</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>Failed to fetch data from StonkFun API.</div>
          </div>
        )}
      </div>
    </section>
  );
};
