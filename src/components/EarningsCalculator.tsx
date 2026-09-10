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

export const EarningsCalculator: React.FC = () => {
  const [holdings, setHoldings] = useState('10');
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [holders, setHolders] = useState<number | null>(null);
  const [dotOn, setDotOn] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) return;
      const json: Stats = await res.json();
      setStats(json);
      setHolders(json.holderCount);
    } catch { /* silent */ }
    setLoading(false);
  };

  useEffect(() => {
    fetchStats();
    const t = setInterval(fetchStats, 20_000);
    const dot = setInterval(() => setDotOn(o => !o), 800);
    return () => { clearInterval(t); clearInterval(dot); };
  }, []);

  const k = stats;
  const holdNum = parseFloat(holdings) || 0;
  const quotePrice = k ? k.quotePriceUsd : 0;

  // APY calculation: distributed tokens / holder count estimate * 365
  const annualPct = k && k.holderCount > 0
    ? ((k.distributedTokens / k.holderCount) / 1_000_000 * 365 * 100)
    : 0.05;
  const dailyReward = (holdNum * annualPct) / 365 / 100;
  const weeklyReward = dailyReward * 7;
  const monthlyReward = dailyReward * 30;
  const annualReward = dailyReward * 365;

  const fmtT = (n: number) => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
    if (n >= 1_000) return (n / 1_000).toFixed(2) + 'K';
    if (n >= 1) return n.toLocaleString('en-US', { maximumFractionDigits: 2 });
    if (n >= 0.0001) return n.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 6 });
    return n.toExponential(2);
  };

  const fmtUSD = (n: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(n);
  };

  const fmtC = (n: number) => new Intl.NumberFormat('en-US').format(n);

  const PRESETS = ['1', '5', '10', '50', '100'];

  const rows = [
    { label: 'Per Day', token: fmtT(dailyReward), usd: fmtUSD(dailyReward * quotePrice), primary: true },
    { label: 'Per Week', token: fmtT(weeklyReward), usd: fmtUSD(weeklyReward * quotePrice), primary: false },
    { label: 'Per Month', token: fmtT(monthlyReward), usd: fmtUSD(monthlyReward * quotePrice), primary: false },
    { label: 'Per Year', token: fmtT(annualReward), usd: fmtUSD(annualReward * quotePrice), primary: false },
  ];

  return (
    <section id="calculator" ref={ref} className="section" style={{ background: 'var(--bg-base)', borderTop: '1px solid var(--border-dim)' }}>
      <div className="container">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 40 }}>
          <div>
            <div className="section-label">// Projected Earnings</div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Earn <span style={{ color: 'var(--green)' }}>Calculator</span>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Holders */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(62,207,106,0.08)', border: '1px solid rgba(62,207,106,0.2)', borderRadius: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: dotOn ? 'var(--green)' : 'rgba(62,207,106,0.3)', boxShadow: dotOn ? '0 0 8px var(--green)' : 'none', transition: 'background 0.3s' }} />
              <div>
                <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' as const }}>Holders</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>
                  {loading ? '...' : holders ? fmtC(holders) : '\u2014'}
                </div>
              </div>
            </div>
            {/* Reward token */}
            {k && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(62,207,106,0.04)', border: '1px solid rgba(62,207,106,0.15)', borderRadius: 6 }}>
                <div>
                  <div style={{ fontSize: 9, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' as const }}>Reward</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--green)', fontFamily: 'var(--font-mono)' }}>{k.quoteSymbol}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Calculator */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--border-dim)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg-surface)' }}>

          {/* Input panel */}
          <div style={{ padding: '32px', borderRight: '1px solid var(--border-dim)' }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 6 }}>
              I Hold (FARTCAT)
            </div>
            <div style={{ marginBottom: 20 }}>
              <input
                type="number"
                value={holdings}
                onChange={e => setHoldings(e.target.value)}
                placeholder="0"
                style={{
                  width: '100%', background: 'var(--bg-raised)', border: '1px solid var(--border-mid)',
                  borderRadius: 4, padding: '10px 14px', fontSize: 28, fontWeight: 700,
                  fontFamily: 'var(--font-mono)', color: 'var(--text-bright)', outline: 'none',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' as const, marginBottom: 24 }}>
              {PRESETS.map(p => (
                <button
                  key={p}
                  onClick={() => setHoldings(p)}
                  style={{
                    padding: '5px 14px', fontSize: 12, fontFamily: 'var(--font-mono)',
                    border: `1px solid ${holdings === p ? 'var(--green)' : 'var(--border-mid)'}`,
                    background: holdings === p ? 'rgba(62,207,106,0.1)' : 'transparent',
                    color: holdings === p ? 'var(--green)' : 'var(--text-dim)',
                    borderRadius: 3, cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {p}M
                </button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Rewards are auto-distributed via <span style={{ color: 'var(--amber)' }}>StonkFun</span> every block. No staking needed — just hold $FARTCAT in your wallet.
            </div>
          </div>

          {/* Results panel */}
          <div style={{ padding: '32px', background: 'rgba(62,207,106,0.03)' }}>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase' as const, marginBottom: 20 }}>
              Projected Earnings — {k ? k.quoteSymbol : '$FARTCOIN'}
            </div>

            {holdNum > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
                {rows.map((row, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '12px 16px',
                    background: 'var(--bg-raised)',
                    borderRadius: 4,
                    border: row.primary ? '1px solid rgba(62,207,106,0.25)' : '1px solid var(--border-dim)',
                    boxShadow: row.primary ? '0 0 16px rgba(62,207,106,0.08)' : 'none',
                  }}>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.08em' }}>{row.label}</div>
                    <div style={{ textAlign: 'right' as const }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: row.primary ? 'var(--green)' : 'var(--amber)', fontFamily: 'var(--font-mono)' }}>
                        {row.token} {k ? k.quoteSymbol : '$FARTCOIN'}
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 2 }}>
                        {row.usd}
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.6, marginTop: 4 }}>
                  * Projections based on current distribution rate. Actual earnings may vary. Not financial advice.
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center' as const, padding: '40px 0', color: 'var(--text-muted)', fontSize: 13 }}>
                Enter your FARTCAT holdings above to see projected earnings.
              </div>
            )}
          </div>
        </div>

        {/* Bottom note */}
        <div style={{ marginTop: 20, textAlign: 'center' as const }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--bg-surface)', border: '1px solid var(--border-dim)', borderRadius: 4, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            <span style={{ color: 'var(--green)' }}>*</span>
            Rewards auto-sent to your wallet — no claim needed.
          </div>
        </div>
      </div>
    </section>
  );
};
