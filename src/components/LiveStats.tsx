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

// Formats token amounts: M/K/abbreviated or full decimal for small values
const fmtTokens = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`;
  if (n >= 1) return n.toLocaleString('en-US', { maximumFractionDigits: 4 });
  if (n >= 0.0001) return n.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 });
  return n.toExponential(2);
};

// Formats USD with proper decimal places for small values
const fmtUSD = (n: number): string => {
  if (n < 0.01 && n > 0) {
    return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 });
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
};

// Formats whole numbers with commas
const fmtCount = (n: number): string =>
  new Intl.NumberFormat('en-US').format(Math.round(n));

const fmtDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

export const LiveStats: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  const [dotOn, setDotOn] = useState(true);
  const ref = useRef<HTMLElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error('fetch failed');
      const json = await res.json();
      setStats(json);
      setError(false);
      setLastFetch(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // Blink dot every second
  useEffect(() => {
    const id = setInterval(() => setDotOn(o => !o), 1000);
    return () => clearInterval(id);
  }, []);

  // Fetch on mount + poll every 30s
  useEffect(() => {
    fetchStats();
    pollRef.current = setInterval(fetchStats, 30_000);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        ref.current?.querySelectorAll('.reveal').forEach((el, i) => {
          setTimeout(() => el.classList.add('v'), i * 80);
        });
      }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const k = stats;

  return (
    <section ref={ref} className="section" style={{ borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)', background: 'var(--bg-surface)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 32 }}>
          <div>
            <div className="section-label reveal">// Stonks Live Distribution</div>
            <h2 className="section-title reveal" style={{ transitionDelay: '80ms', marginBottom: 0 }}>
              Reward <span style={{ color: 'var(--green)' }}>Feed</span>
            </h2>
          </div>

          {/* Live indicator */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: error ? 'var(--red)' : dotOn ? 'var(--green)' : 'rgba(62,207,106,0.25)',
              boxShadow: error ? '0 0 8px var(--red)' : '0 0 8px var(--green)',
              transition: 'background 0.2s',
            }} />
            <span style={{ fontSize: 10, color: error ? 'var(--red)' : 'var(--green)', letterSpacing: '0.1em', fontFamily: 'var(--font-mono)' }}>
              {error ? 'CONNECTION ERROR' : 'LIVE'}
            </span>
            {lastFetch && !error && (
              <span style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                — {fmtDate(lastFetch.toISOString())} UTC
              </span>
            )}
          </div>
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, border: '1px solid var(--border-dim)', borderRadius: 4, overflow: 'hidden' }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} style={{ padding: '20px', background: 'var(--bg-raised)', minHeight: 80 }}>
                <div style={{ height: 8, background: 'var(--border)', borderRadius: 2, width: '60%', marginBottom: 8 }} />
                <div style={{ height: 20, background: 'var(--border)', borderRadius: 2, width: '80%' }} />
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {!loading && k && (
          <>
            {/* Main highlight row */}
            <div className="reveal" style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 1, border: '1px solid var(--border-dim)', borderRadius: 4, overflow: 'hidden', marginBottom: 1,
            }}>
              {/* Total Distributed */}
              <div style={{ padding: '28px', background: 'rgba(62,207,106,0.05)', borderRight: '1px solid var(--border-dim)' }}>
                <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Total {k.quoteSymbol} Distributed
                </div>
                <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--green)', lineHeight: 1, marginBottom: 4, fontFamily: 'var(--font-mono)' }}>
                  {fmtTokens(k.distributedTokens)}
                </div>
                <div style={{ fontSize: 18, color: 'var(--text-sub)', fontFamily: 'var(--font-mono)' }}>
                  {fmtUSD(k.distributedUsd)}
                </div>
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />
                  <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>{fmtCount(k.payoutCount)} payouts processed</span>
                </div>
              </div>

              {/* Pending / Waiting */}
              <div style={{ padding: '28px', background: 'rgba(232,160,48,0.04)' }}>
                <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8 }}>
                  Pending Distribution
                </div>
                <div style={{ fontSize: 36, fontWeight: 700, color: 'var(--amber)', lineHeight: 1, marginBottom: 4, fontFamily: 'var(--font-mono)' }}>
                  {fmtTokens(k.pendingTokens)}
                </div>
                <div style={{ fontSize: 18, color: 'var(--text-sub)', fontFamily: 'var(--font-mono)' }}>
                  {fmtUSD(k.pendingUsd)}
                </div>
                <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--amber)' }} />
                  <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>Waiting for next payout cycle</span>
                </div>
              </div>
            </div>

            {/* Secondary metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, border: '1px solid var(--border-dim)', borderRadius: 4, overflow: 'hidden', marginTop: 1 }}>
              {[
                { label: 'Holders', value: fmtCount(k.holderCount), sub: 'wallets holding $FARTCAT', c: 'var(--text-bright)' },
                { label: `${k.quoteSymbol} Price`, value: fmtUSD(k.quotePriceUsd), sub: 'current quote price', c: 'var(--text-bright)' },
                { label: 'Min Payout', value: fmtUSD(k.minPayoutUsd), sub: 'per transaction', c: 'var(--text-sub)' },
                { label: 'Min Hold', value: fmtUSD(k.minHoldingUsd), sub: 'to qualify for rewards', c: 'var(--text-sub)' },
              ].map((m, i) => (
                <div key={i} className="reveal" style={{
                  padding: '18px 20px',
                  background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-raised)',
                  borderRight: i < 3 ? '1px solid var(--border-dim)' : 'none',
                  transitionDelay: `${200 + i * 60}ms`,
                }}>
                  <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>{m.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: m.c, fontFamily: 'var(--font-mono)', marginBottom: 3 }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Tax vault + fee + last payout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, border: '1px solid var(--border-dim)', borderRadius: 4, overflow: 'hidden', marginTop: 1 }}>
              {[
                { label: `${k.quoteSymbol} in Tax Vault`, value: fmtTokens(k.pendingTaxTokens), sub: fmtUSD(k.pendingTaxUsd), c: 'var(--amber)', bg: 'rgba(232,160,48,0.03)' },
                { label: 'Fee Collected', value: '2.5%', sub: 'operating fee bps', c: 'var(--text-sub)', bg: 'var(--bg-surface)' },
                { label: 'Last Payout', value: fmtDate(k.lastPayoutAt), sub: 'UTC timestamp', c: 'var(--text-sub)', bg: 'var(--bg-surface)' },
              ].map((m, i) => (
                <div key={i} style={{
                  padding: '16px 20px',
                  background: m.bg,
                  borderRight: i < 2 ? '1px solid var(--border-dim)' : 'none',
                }}>
                  <div style={{ fontSize: 9.5, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: m.c, fontFamily: 'var(--font-mono)', marginBottom: 2 }}>{m.value}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="reveal" style={{ marginTop: 20, transitionDelay: '460ms' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                <span>DISTRIBUTION PROGRESS</span>
                <span>{fmtUSD(k.distributedUsd)} / {fmtUSD(k.distributedUsd + k.pendingUsd)}</span>
              </div>
              <div style={{ height: 4, background: 'var(--border-dim)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${k.distributedUsd / (k.distributedUsd + k.pendingUsd) * 100}%`,
                  background: 'linear-gradient(90deg, var(--green), var(--green))',
                  borderRadius: 2,
                  boxShadow: '0 0 8px var(--green)',
                  transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                }} />
              </div>
            </div>
          </>
        )}

        {/* Error state */}
        {!loading && error && (
          <div style={{ padding: '32px', border: '1px solid var(--border-dim)', borderRadius: 4, textAlign: 'center' }}>
            <div style={{ fontSize: 18, color: 'var(--red)', marginBottom: 8 }}>!</div>
            <div style={{ fontSize: 13, color: 'var(--text-dim)' }}>Failed to fetch reward data from StonkFun API.</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>Retrying in 30 seconds...</div>
          </div>
        )}
      </div>
    </section>
  );
};
