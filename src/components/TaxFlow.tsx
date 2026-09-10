import React, { useEffect, useRef, useState } from 'react';


export const TaxFlow: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number; y: number; vx: number; vy: number;
    size: number; color: string; alpha: number; life: number; maxLife: number;
    label: string;
  }>>([]);
  const animRef = useRef(0);
  const lastSpawnRef = useRef(0);

  const [activeCount, setActiveCount] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Responsive
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    // Layout positions
    const TX_X = W * 0.15;   // Transaction (left)
    const TX_Y = H * 0.5;
    const TAX_X = W * 0.5;  // Tax pool (center)
    const TAX_Y = H * 0.35;
    const HOLD_X = W * 0.85; // Holders (right)
    const HOLD_Y = H * 0.5;

    const spawn = () => {
      // A transfer "particle" starts from TX
      particlesRef.current.push({
        x: TX_X, y: TX_Y + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
        size: 4 + Math.random() * 4,
        color: '#3ECF6A',
        alpha: 1, life: 0, maxLife: 60 + Math.random() * 30,
        label: 'TX',
      });
      // 3% tax particle splits toward TAX pool
      particlesRef.current.push({
        x: TX_X, y: TX_Y + 20,
        vx: 60 + Math.random() * 40, vy: -40 - Math.random() * 30,
        size: 3 + Math.random() * 3,
        color: '#E8A030',
        alpha: 1, life: 0, maxLife: 40 + Math.random() * 20,
        label: '3%',
      });
    };

    const draw = (ts: number) => {
      ctx.clearRect(0, 0, W, H);

      // Spawn new particles
      if (ts - lastSpawnRef.current > 600 + Math.random() * 800) {
        spawn();
        lastSpawnRef.current = ts;
      }

      // Static nodes
      ctx.save();

      // TX node
      ctx.beginPath();
      ctx.arc(TX_X, TX_Y, 32, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(62,207,106,0.08)';
      ctx.strokeStyle = 'rgba(62,207,106,0.4)';
      ctx.lineWidth = 1.5;
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(62,207,106,0.9)';
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('TRANSFER', TX_X, TX_Y - 5);
      ctx.fillStyle = 'rgba(62,207,106,0.5)';
      ctx.font = '8px JetBrains Mono, monospace';
      ctx.fillText('FARTCAT', TX_X, TX_Y + 7);

      // TAX node
      ctx.beginPath();
      ctx.arc(TAX_X, TAX_Y, 40, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(232,160,48,0.1)';
      ctx.strokeStyle = 'rgba(232,160,48,0.5)';
      ctx.lineWidth = 1.5;
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#E8A030';
      ctx.font = 'bold 11px JetBrains Mono, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('3% TAX', TAX_X, TAX_Y - 6);
      ctx.fillStyle = 'rgba(232,160,48,0.5)';
      ctx.font = '8px JetBrains Mono, monospace';
      ctx.fillText('REWARD POOL', TAX_X, TAX_Y + 8);

      // HOLDERS node
      ctx.beginPath();
      ctx.arc(HOLD_X, HOLD_Y, 36, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(124,110,245,0.08)';
      ctx.strokeStyle = 'rgba(124,110,245,0.4)';
      ctx.lineWidth = 1.5;
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = 'rgba(124,110,245,0.9)';
      ctx.font = 'bold 10px JetBrains Mono, monospace';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('HOLDERS', HOLD_X, HOLD_Y - 5);
      ctx.fillStyle = 'rgba(124,110,245,0.5)';
      ctx.font = '8px JetBrains Mono, monospace';
      ctx.fillText('FARTCOIN', HOLD_X, HOLD_Y + 7);

      // Connecting lines (dashed)
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(62,207,106,0.15)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(TX_X + 32, TX_Y);
      ctx.lineTo(TAX_X - 40, TAX_Y);
      ctx.stroke();

      // Arrow: TX → TAX (3% label)
      ctx.setLineDash([]);
      ctx.strokeStyle = 'rgba(232,160,48,0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(TX_X + 32, TX_Y + 20);
      ctx.quadraticCurveTo(TX_X + 80, TX_Y + 60, TAX_X - 40, TAX_Y);
      ctx.stroke();

      // Arrow: TAX → HOLDERS
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = 'rgba(124,110,245,0.2)';
      ctx.beginPath();
      ctx.moveTo(TAX_X + 40, TAX_Y);
      ctx.lineTo(HOLD_X - 36, HOLD_Y);
      ctx.stroke();

      // 97% label
      ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(62,207,106,0.3)';
      ctx.font = '8px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.fillText('97% to recipient', TX_X + 90, TX_Y - 16);

      ctx.restore();

      // Animate particles
      const particles = particlesRef.current.filter(p => {
        p.life++;
        p.alpha = 1 - (p.life / p.maxLife);
        p.x += p.vx * 0.016;
        p.y += p.vy * 0.016;
        p.vy += 0.3; // gravity
        p.vx *= 0.98;

        // Draw
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();

        // Label
        if (p.label && p.alpha > 0.5) {
          ctx.fillStyle = p.color;
          ctx.font = 'bold 8px JetBrains Mono, monospace';
          ctx.textAlign = 'center';
          ctx.fillText(p.label, p.x, p.y - p.size - 4);
        }
        ctx.restore();

        return p.life < p.maxLife;
      });
      particlesRef.current = particles;
      setActiveCount(particles.length);

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: 160, display: 'block' }} />
      <div style={{
        position: 'absolute', bottom: 8, right: 8,
        fontSize: 9, color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)', letterSpacing: '0.1em',
      }}>
        {activeCount} particles active
      </div>
    </div>
  );
};
