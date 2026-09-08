import React, { useEffect, useState } from 'react';

const BOOT_LINES = [
  { text: '$ init.fartcat --network solana', color: 'var(--primary)' },
  { text: '> mounting /dev/cat_node ... [OK]', color: 'var(--text-dim)' },
  { text: '> loading memecoin.dll ... [OK]', color: 'var(--text-dim)' },
  { text: '> injecting $FARTCOIN rewards module ... [OK]', color: 'var(--amber)' },
  { text: '> calibrating meta-mashup engine ... [OK]', color: 'var(--text-dim)' },
  { text: '> connecting to OTC relay ... [OK]', color: 'var(--primary)' },
  { text: '> loading cat_face_ascii.bin ... [DONE]', color: 'var(--text-dim)' },
  { text: '> FARTCAT node online. holding = earning.', color: 'var(--secondary)' },
];

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const delays = [0, 200, 400, 600, 800, 1000, 1200, 1400, 1800];
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(i + 1);
        }, delays[i])
      );
    });

    timers.push(
      setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 400);
      }, 2200)
    );

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        opacity: done ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.9, maxWidth: 500, width: '100%', padding: '0 24px' }}>
        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div
            key={i}
            className="boot-line"
            style={{
              color: line.color,
              animationDelay: '0s',
              display: 'flex',
              gap: 8,
            }}
          >
            <span style={{ color: 'var(--muted)', flexShrink: 0 }}>{i + 1}</span>
            <span>{line.text}</span>
          </div>
        ))}
        {visibleLines < BOOT_LINES.length && (
          <span className="cursor" />
        )}
      </div>
    </div>
  );
};
