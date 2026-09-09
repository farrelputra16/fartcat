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

const fmtCount = (n: number): string => new Intl.NumberFormat('en-US').format(Math.round(n));

const fmtDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false });
};

// Pure SVG arc gauge
const GaugeArc: React.FC<{ pct: number; label: string; value: string; sub: string; color: string }> = ({ pct, label, value, sub, color }) => {
  const R = 80;
  const cx = 100;
  const cy = 100;
  const startAngle = -220;
  const endAngle = 40;
  const range = endAngle - startAngle;
  const clampedPct = Math.min(100, Math.max(0, pct));
  const toRad = (a: number) => (a * Math.PI) / 180;
  const arcX = (a: number) => cx + R * Math.cos(toRad(a));
  const arcY = (a: number) => cy + R * Math.sin(toRad(a));
  const bgPath = `M ${arcX(startAngle)} ${arcY(startAngle)} A ${R} ${R} 0 1 1 ${arcX(endAngle)} ${arcY(endAngle)}`;
  const filledAngle = startAngle + (range * clampedPct) / 100;
  const fillPath = clampedPct > 0 ? `M ${arcX(startAngle)} ${arcY(startAngle)} A ${R} ${R} 0 ${filledAngle > startAngle + 180 ? 1 : 0} 1 ${arcX(filledAngle)} ${arcY(filledAngle)}` : '';
  const gradId = color.replace('#', '').replace('var(', '').replace(')', '');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg width="200" height="140" viewBox="0 0 200 140">
        <defs>
          <linearGradient id={`grad-${gradId}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={color} />
          </linearGradient>
          <filter id="glow-svg">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <path d={bgPath} stroke="var(--border-dim)" strokeWidth="8" fill="none" strokeLinecap="round" />
        {clampedPct > 0 && (
          <path d={fillPath} stroke={`url(#grad-${gradId})`} strokeWidth="8" fill="none" strokeLinecap="round" filter="url(#glow-svg)" />
        )}
        <text x={cx} y={cy - 8} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="20" fontWeight="700" fill={color} filter="url(#glow-svg)">{value}</text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--text-muted)" letterSpacing="2">{label}</text>
        {[0, 50, 100].map(p => {
          const a = startAngle + (range * p) / 100;
          const ir = R - 14;
          return (
            <g key={p}>
              <line x1={cx + (ir) * Math.cos(toRad(a))} y1={cy + (ir) * Math.sin(toRad(a))} x2={cx + (R + 5) * Math.cos(toRad(a))} y2={cy + (R + 5) * Math.sin(toRad(a))} stroke="var(--border-mid)" strokeWidth="1.5" />
              <text x={cx + (ir - 10) * Math.cos(toRad(a))} y={cy + (ir - 10) * Math.sin(toRad(a)) + 3} textAnchor="middle" fontSize="7" fill="var(--text-muted)" fontFamily="JetBrains Mono, monospace">{p === 0 ? 'MIN' : 'MAX'}</text>
            </g>
          );
        })}
      </svg>
      <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>{sub}</div>
    </div>
  );
};

// Flip counter display
const FlipCounter: React.FC<{ value: string; label: string; color: string }> = ({ value, label, color }) => (
  <div style={{ textAlign: 'center' }}>
    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, color, textShadow: `0 0 16px ${color}50`, letterSpacing: '0.04em' }}>
      {value}
    </div>
    <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginTop: 4 }}>{label}</div>
  </div>
);

// Pulsing border card
const PulseCard: React.FC<{ children: React.ReactNode; color: string; style?: React.CSSProperties }> = ({ children, color, style }) => {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse(p => !p), 2200);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      border: `1px solid ${pulse ? color : 'var(--border-dim)'}`,
      borderRadius: 6,
      boxShadow: pulse ? `0 0 20px ${color}25, inset 0 0 12px ${color}05` : 'none',
      transition: 'border-color 1s, box-shadow 1s',
      ...style,
    }}>
      {children}
    </div>
  );
};

export const LiveStats: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  const [dotOn, setDotOn] = useState(true);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLElement>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error('fetch failed');
      const json: Stats = await res.json();
      setStats(json);
      setError(false);
      setLastFetch(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const dotId = setInterval(() => setDotOn(o => !o), 1000);
    const tickId = setInterval(() => setTick(t => t + 1), 1);
    return () => { clearInterval(dotId); clearInterval(tickId); };
  }, []);

  useEffect(() => { fetchStats(); const t = setInterval(fetchStats, 30_000); return () => clearInterval(t); }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        ref.current?.querySelectorAll('.reveal').forEach((el, i) => setTimeout(() => el.classList.add('v'), i * 70));
      }
    }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const k = stats;
  const totalRewardPool = k ? k.distributedUsd + k.pendingUsd : 1;
  const gaugePct = k ? Math.min(100, (k.distributedUsd / totalRewardPool) * 100) : 0;
  const systemUptime = `${String((tick % 9999)).padStart(4, '0')}s`;

  return (
    <section ref={ref} style={{ borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)', background: 'var(--bg-surface)' }}>
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
          <div>
            <div className="section-label reveal">// Stonks Live Distribution</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '70ms', marginBottom: 0 }}>
              Reward <span style={{ color: 'var(--green)' }}>Feed</span>
            </h2>
          </div>
          {/* System monitor */}
          <div className="reveal terminal" style={{ padding: '8px 16px', display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: error ? 'var(--red)' : dotOn ? 'var(--green)' : 'rgba(62,207,106,0.2)', boxShadow: error ? '0 0 6px var(--red)' : '0 0 6px var(--green)', transition: 'background 0.2s' }} />
              <span style={{ color: error ? 'var(--red)' : 'var(--green)', letterSpacing: '0.1em' }}>{error ? 'ERR' : 'OK'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              <span>UPTIME</span>
              <span style={{ color: 'var(--text-sub)', letterSpacing: '0.05em' }}>{k ? systemUptime : '----'}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              <span>NET</span>
              <span style={{ color: 'var(--green)', letterSpacing: '0.05em' }}>stonks.xyz</span>
            </div>
            {lastFetch && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <span>SYNC</span>
                <span style={{ color: 'var(--text-sub)' }}>{fmtDate(lastFetch.toISOString())}</span>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 10, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              <span>PID</span>
              <span style={{ color: 'var(--amber)', letterSpacing: '0.05em' }}>{String(Math.floor(tick * 0.01) % 9999).padStart(4, '0')}</span>
            </div>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: 1, border: '1px solid var(--border-dim)', borderRadius: 6, overflow: 'hidden' }}>
            {[0,1,2].map(i => (
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
            {/* Top row: gauge + counters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: 1, border: '1px solid var(--border-dim)', borderRadius: 6, overflow: 'hidden', marginBottom: 1 }}>
              <PulseCard color="var(--green)" style={{ padding: '24px 32px', background: 'rgba(62,207,106,0.04)' }}>
                <GaugeArc pct={gaugePct} label="POWER" value={fmtTokens(k.distributedTokens)} sub="$FARTCOIN DISTRIBUTED" color="var(--green)" />
              </PulseCard>
              <div style={{ padding: '24px', background: 'var(--bg-raised)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <FlipCounter value={fmtCount(k.payoutCount)} label="Payouts" color="var(--green)" />
                <FlipCounter value={fmtCount(k.holderCount)} label="Holders" color="var(--amber)" />
                <FlipCounter value={k.quoteSymbol} label="Reward Token" color="var(--text-bright)" />
                <FlipCounter value={fmtUSD(k.quotePriceUsd)} label="Token Price" color="var(--green)" />
              </div>
              <div style={{ padding: '24px', background: 'rgba(232,160,48,0.04)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <FlipCounter value={k.pendingTokens > 0 ? fmtTokens(k.pendingTokens) : '0'} label="Pending" color="var(--amber)" />
                <FlipCounter value={fmtTokens(k.pendingTaxTokens)} label="Tax Vault" color="var(--amber)" />
                <FlipCounter value={fmtUSD(k.minPayoutUsd)} label="Min Payout" color="var(--text-sub)" />
                <FlipCounter value={fmtUSD(k.minHoldingUsd)} label="Min Hold" color="var(--text-sub)" />
              </div>
            </div>

            {/* System log + progress */}
            <PulseCard color="var(--green)" style={{ marginTop: 1 }}>
              <div style={{ padding: '20px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
                {/* System log */}
                <div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>System Log</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-dim)', lineHeight: 2 }}>
                    <div><span style={{ color: 'var(--green)' }}>[OK]</span> stonks.distribute active</div>
                    <div><span style={{ color: 'var(--green)' }}>[OK]</span> reward engine running</div>
                    <div><span style={{ color: k.pendingTokens > 0 ? 'var(--amber)' : 'var(--green)' }}>[{k.pendingTokens > 0 ? 'WRN' : 'OK'}]</span> pending queue {k.pendingTokens > 0 ? fmtTokens(k.pendingTokens) : 'empty'}</div>
                    <div><span style={{ color: 'var(--green)' }}>[OK]</span> last payout {k.lastPayoutAt ? fmtDate(k.lastPayoutAt) : '--'}</div>
                  </div>
                </div>

                {/* Progress + breakdown */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-muted)', marginBottom: 10, letterSpacing: '0.1em' }}>
                    <span>DISTRIBUTION PROGRESS</span>
                    <span style={{ color: 'var(--green)' }}>{fmtUSD(k.distributedUsd)} / {fmtUSD(totalRewardPool)}</span>
                  </div>
                  <div style={{ height: 6, background: 'var(--border-dim)', borderRadius: 3, overflow: 'hidden', marginBottom: 14 }}>
                    <div style={{
                      height: '100%',
                      width: `${(k.distributedUsd / totalRewardPool) * 100}%`,
                      background: 'linear-gradient(90deg, var(--green) 0%, var(--amber) 100%)',
                      borderRadius: 3,
                      boxShadow: '0 0 12px rgba(62,207,106,0.4)',
                      transition: 'width 2s cubic-bezier(0.16, 1, 0.3, 1)',
                    }} />
                  </div>
                  <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                    {[
                      { l: 'Distributed', v: fmtUSD(k.distributedUsd), c: 'var(--green)' },
                      { l: 'Pending', v: k.pendingUsd > 0 ? fmtUSD(k.pendingUsd) : '$0.00', c: 'var(--amber)' },
                      { l: 'In Vault', v: fmtUSD(k.pendingTaxUsd), c: 'var(--amber)' },
                      { l: 'Efficiency', v: `${((k.distributedUsd / (k.distributedUsd + k.pendingTaxUsd + 0.01)) * 100).toFixed(1)}%`, c: 'var(--green)' },
                    ].map((m, i) => (
                      <div key={i}>
                        <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.12em', marginBottom: 2 }}>{m.l}</div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: m.c, fontFamily: 'var(--font-mono)' }}>{m.v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </PulseCard>
          </>
        )}

        {error && (
          <div style={{ padding: '28px', border: '1px solid var(--border-dim)', borderRadius: 6, textAlign: 'center', marginTop: 1 }}>
            <div style={{ fontSize: 18, color: 'var(--red)', marginBottom: 8 }}>!</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>Failed to fetch data from StonkFun API.</div>
          </div>
        )}
      </div>
    </section>
  );
};
