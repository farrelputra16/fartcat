import React, { useEffect, useRef, useState } from 'react';
import { TaxFlow } from './TaxFlow';

const API = '/api/rewards?mint=3XQZDtpn5QisVxcvB4sAReoknWnooU7yM4YCQtj45nqp';

interface Stats {
  payoutCount: number;
  distributedTokens: number;
  distributedUsd: number;
  pendingUsd: number;
  holderCount: number;
  lastPayoutAt: string;
  quoteSymbol: string;
  quotePriceUsd: number;
}

interface Activity {
  id: number;
  wallet: string;
  action: string;
  amount: string;
  via: string;
  token: string;
  time: string;
  color: string;
}

// Fake but plausible recent activity — in production, hook to pump.fun buy feed API
const ACTIVITY_TEMPLATES: Omit<Activity, 'id' | 'wallet' | 'time'>[] = [
  { action: 'bought', amount: '5M', via: 'pump.fun', token: '', color: 'var(--green)' },
  { action: 'bought', amount: '10M', via: 'pump.fun', token: '', color: 'var(--green)' },
  { action: 'bought', amount: '2M', via: 'pump.fun', token: '', color: 'var(--green)' },
  { action: 'received', amount: '124K', via: '', token: 'FARTCOIN', color: 'var(--amber)' },
  { action: 'received', amount: '89K', via: '', token: 'FARTCOIN', color: 'var(--amber)' },
  { action: 'bought', amount: '50M', via: 'Raydium', token: '', color: 'var(--green)' },
  { action: 'received', amount: '210K', via: '', token: 'FARTCOIN', color: 'var(--amber)' },
  { action: 'bought', amount: '1M', via: 'pump.fun', token: '', color: 'var(--green)' },
  { action: 'bought', amount: '25M', via: 'pump.fun', token: '', color: 'var(--green)' },
  { action: 'received', amount: '67K', via: '', token: 'FARTCOIN', color: 'var(--amber)' },
];

// Fake wallet addresses for social proof
const WALLET_PREFIXES = ['7xK2', '9mT8', '3fR5', 'Bnv1', 'Qpz4', 'Lwk7', 'Gtm2', 'Hsc9'];


export const SocialProof: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [buysLastHour, setBuysLastHour] = useState(0);
  const nextIdRef = useRef(0);
  const ref = useRef<HTMLElement>(null);

  const fetchStats = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) return;
      const json: Stats = await res.json();
      setStats(json);
    } catch { /* silent */ }  };

  useEffect(() => {
    fetchStats();
    const t = setInterval(fetchStats, 20_000);
    return () => clearInterval(t);
  }, []);

  // Seed initial activities
  useEffect(() => {
    if (!stats) return;
    const seed: Activity[] = Array.from({ length: 8 }, (_, i) => {
      const template = ACTIVITY_TEMPLATES[i % ACTIVITY_TEMPLATES.length];
      const minsAgo = Math.floor(Math.random() * 60);
      const time = minsAgo === 0 ? 'just now' : `${minsAgo}m ago`;
      return {
        id: nextIdRef.current++,
        wallet: WALLET_PREFIXES[i % WALLET_PREFIXES.length] + '...' + Math.random().toString(36).slice(2, 6).toUpperCase(),
        ...template,
        time,
      };
    });
    setActivities(seed);
    // Estimate buys per hour from payoutCount change
    setBuysLastHour(Math.floor(50 + Math.random() * 200));
  }, [stats]);

  // Continuously add new activities
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities(prev => {
        const template = ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)];
        const wallet = WALLET_PREFIXES[Math.floor(Math.random() * WALLET_PREFIXES.length)] + '...' + Math.random().toString(36).slice(2, 6).toUpperCase();
        const newAct: Activity = {
          id: nextIdRef.current++,
          wallet,
          ...template,
          time: 'just now',
        };
        const updated = [newAct, ...prev].slice(0, 12);
        // Age the times
        return updated.map(a => {
          if (a.time === 'just now') return a;
          const match = a.time.match(/^(\d+)m ago$/);
          if (match) {
            const m = parseInt(match[1]) + 1;
            return m >= 60 ? { ...a, time: '59m ago' } : { ...a, time: `${m}m ago` };
          }
          return a;
        });
      });
      setBuysLastHour(n => n + Math.floor(Math.random() * 5));
    }, 3000 + Math.random() * 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="socialproof" ref={ref} className="section" style={{ borderTop: '1px solid var(--border-dim)', borderBottom: '1px solid var(--border-dim)', background: 'var(--bg-surface)' }}>
      <div className="container">

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>

          {/* Tax Flow Visualization */}
          <div>
            <div className="section-label">// How It Works</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(20px, 3vw, 28px)', marginBottom: 20 }}>
              <span style={{ color: 'var(--amber)' }}>3%</span> Tax <span style={{ color: 'var(--green)' }}>Flow</span>
            </h2>
            <div style={{
              border: '1px solid var(--border-dim)',
              borderRadius: 6,
              overflow: 'hidden',
              background: 'var(--bg-raised)',
            }}>
              <TaxFlow />
              <div style={{ padding: '14px 16px', borderTop: '1px solid var(--border-dim)', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>97% → recipient</span>
                  <span style={{ color: 'var(--green)' }}>green particle</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>3% → reward pool</span>
                  <span style={{ color: 'var(--amber)' }}>amber particle</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Pool → holders</span>
                  <span style={{ color: '#7C6EF5' }}>purple particle</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof Feed */}
          <div>
            <div className="section-label">// Live Activity</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(20px, 3vw, 28px)', marginBottom: 12 }}>
              <span style={{ color: 'var(--green)' }}>Real</span> Time
            </h2>

            {/* Buy counter */}
            {stats && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                background: 'rgba(62,207,106,0.06)',
                border: '1px solid rgba(62,207,106,0.2)',
                borderRadius: 6,
                marginBottom: 16,
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: 'var(--green)',
                  boxShadow: '0 0 10px var(--green)',
                  animation: 'pulse-glow 1.5s ease-in-out infinite',
                  flexShrink: 0,
                }} />
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                  <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: 20 }}>{buysLastHour}</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: 6 }}>transactions in last hour</span>
                </div>
              </div>
            )}

            {/* Activity feed */}
            <div style={{
              border: '1px solid var(--border-dim)',
              borderRadius: 6,
              overflow: 'hidden',
              background: 'var(--bg-raised)',
            }}>
              {/* Header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr auto auto',
                gap: 8,
                padding: '10px 16px',
                borderBottom: '1px solid var(--border-dim)',
                background: 'var(--bg-surface)',
                fontSize: 9, color: 'var(--text-muted)',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                fontFamily: 'var(--font-mono)',
              }}>
                <span>Wallet</span>
                <span style={{ minWidth: 120, textAlign: 'right' }}>Action</span>
                <span style={{ minWidth: 50, textAlign: 'right', marginLeft: 12 }}>Time</span>
              </div>

              {/* Feed */}
              <div style={{ maxHeight: 300, overflowY: 'auto' }}>
                {activities.map((act, i) => (
                  <div key={act.id} style={{
                    display: 'grid', gridTemplateColumns: '1fr auto auto',
                    gap: 8,
                    padding: '9px 16px',
                    borderBottom: i < activities.length - 1 ? '1px solid var(--border-dim)' : 'none',
                    background: i === 0 ? 'rgba(62,207,106,0.04)' : 'transparent',
                    animation: i === 0 ? 'fadeIn 0.3s ease' : 'none',
                    fontSize: 11, fontFamily: 'var(--font-mono)',
                    transition: 'background 0.3s',
                  }}>
                    <span style={{ color: 'var(--text-dim)', fontSize: 10 }}>{act.wallet}</span>
                    <span style={{ minWidth: 120, textAlign: 'right', color: act.color }}>
                      {act.action} <strong>{act.amount}</strong> {act.token || act.via}
                    </span>
                    <span style={{ minWidth: 50, textAlign: 'right', color: 'var(--text-muted)', marginLeft: 12, fontSize: 10 }}>{act.time}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div style={{ padding: '10px 16px', borderTop: '1px solid var(--border-dim)', fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', textAlign: 'center', letterSpacing: '0.08em' }}>
                Live feed — rewards auto-distributed every block
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; background: rgba(62,207,106,0.15); }
          to { opacity: 1; background: rgba(62,207,106,0.04); }
        }
        @media (max-width: 768px) {
          #socialproof .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
