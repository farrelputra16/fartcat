import React, { useEffect, useState } from 'react';

const LINES = [
  { text: '$ init.fartcat --network solana', color: 'var(--green)' },
  { text: '> mounting /dev/cat_node      ... [OK]', color: 'var(--text-dim)' },
  { text: '> loading memecoin.dll         ... [OK]', color: 'var(--text-dim)' },
  { text: '> injecting $FARTCOIN rewards  ... [OK]', color: 'var(--amber)' },
  { text: '> calibrating meta-mashup      ... [OK]', color: 'var(--text-dim)' },
  { text: '> connecting to STONKS relay     ... [OK]', color: 'var(--green)' },
  { text: '> FARTCAT node online.', color: 'var(--green)' },
];

interface Props { onComplete: () => void; }

export const BootSequence: React.FC<Props> = ({ onComplete }) => {
  const [visible, setVisible] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = LINES.map((_, i) => setTimeout(() => setVisible(i + 1), i * 160));
    const done = setTimeout(() => {
      setGone(true);
      setTimeout(onComplete, 400);
    }, LINES.length * 160 + 400);
    return () => [...t, done].forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--bg-base)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 10000,
      opacity: gone ? 0 : 1,
      transition: 'opacity 0.4s ease',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)', fontSize: 12.5,
        maxWidth: 540, width: '100%', padding: '0 24px',
        lineHeight: 2,
      }}>
        {LINES.slice(0, visible).map((l, i) => (
          <div key={i} className="bline" style={{ color: l.color, display: 'flex', gap: 10 }}>
            <span style={{ color: 'var(--text-muted)', flexShrink: 0, width: 20 }}>{String(i+1).padStart(2,'0')}</span>
            <span>{l.text}</span>
          </div>
        ))}
        {visible < LINES.length && <span className="cursor" />}
      </div>
    </div>
  );
};
