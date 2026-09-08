import React, { useCallback, useEffect, useRef, useState } from 'react';

const PARTICLE_CHARS = ['~', '^', '*', 'o', '.', '`', '°', '·', '≈', '~'];
const COLORS = ['#00ff41', '#ffb000', '#39ff14', '#c8ffc8'];

interface Particle {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  char: string;
  color: string;
  size: number;
}

interface FartParticlesProps {
  active: boolean;
  originX?: number;
  originY?: number;
  onDone?: () => void;
}

export const FartParticles: React.FC<FartParticlesProps> = ({
  active,
  originX = 60,
  originY = 50,
  onDone,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idRef = useRef(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const spawnBurst = useCallback(() => {
    const count = 14 + Math.floor(Math.random() * 8);
    const newParticles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 40 + Math.random() * 80;
      newParticles.push({
        id: idRef.current++,
        x: originX + (Math.random() - 0.5) * 20,
        y: originY + (Math.random() - 0.5) * 10,
        dx: Math.cos(angle) * speed,
        dy: -Math.abs(Math.sin(angle) * speed) - 20,
        char: PARTICLE_CHARS[Math.floor(Math.random() * PARTICLE_CHARS.length)],
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 14 + Math.random() * 10,
      });
    }
    setParticles(newParticles);
    startTimeRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1400;
      if (elapsed >= 1) {
        setParticles([]);
        if (onDone) onDone();
        return;
      }
      setParticles(prev =>
        prev.map(p => ({
          ...p,
          x: p.x + p.dx * 0.016,
          y: p.y + p.dy * 0.016,
          dy: p.dy + 15 * 0.016, // gravity
          dx: p.dx * 0.99,
        }))
      );
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  }, [originX, originY, onDone]);

  useEffect(() => {
    if (active) {
      spawnBurst();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, spawnBurst]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9997,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {particles.map(p => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${(p.x / 100) * (containerRef.current ? containerRef.current.clientWidth : window.innerWidth)}px`,
            top: `${(p.y / 100) * (containerRef.current ? containerRef.current.clientHeight : window.innerHeight)}px`,
            fontSize: `${p.size}px`,
            color: p.color,
            textShadow: `0 0 8px ${p.color}`,
            fontFamily: 'var(--font-display)',
            userSelect: 'none',
            opacity: 1 - (performance.now() - startTimeRef.current) / 1400,
            transform: `translate(${p.dx * 0.016}px, ${p.dy * 0.016}px) scale(${1 - (performance.now() - startTimeRef.current) / 1400 * 0.5})`,
            transition: 'transform 0.016s linear',
          }}
        >
          {p.char}
        </span>
      ))}
    </div>
  );
};
