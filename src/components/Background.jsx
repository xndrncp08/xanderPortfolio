'use client';
import { useEffect, useRef } from 'react';

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let W = window.innerWidth, H = window.innerHeight;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Particles ──
    const PARTICLE_COUNT = 120;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      red: Math.random() < 0.12, // 12% are red
    }));

    // ── Speed lines ──
    const STREAK_COUNT = 18;
    const streaks = Array.from({ length: STREAK_COUNT }, () => ({
      x: Math.random() * W * 1.5 - W * 0.25,
      y: Math.random() * H,
      speed: Math.random() * 6 + 3,
      length: Math.random() * 200 + 60,
      alpha: Math.random() * 0.18 + 0.04,
      red: Math.random() < 0.3,
      width: Math.random() * 1.2 + 0.3,
    }));

    // ── Grid nodes ──
    const GRID_COLS = 16, GRID_ROWS = 10;
    const nodes = [];
    for (let c = 0; c <= GRID_COLS; c++) {
      for (let r = 0; r <= GRID_ROWS; r++) {
        nodes.push({
          bx: (c / GRID_COLS) * W,
          by: (r / GRID_ROWS) * H,
          dx: (Math.random() - 0.5) * 30,
          dy: (Math.random() - 0.5) * 30,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.008 + 0.003,
        });
      }
    }

    // ── Orbs ──
    const orbs = [
      { x: W * 0.15, y: H * 0.25, r: 320, color: 'rgba(225,6,0,', alpha: 0.08 },
      { x: W * 0.85, y: H * 0.6,  r: 280, color: 'rgba(225,6,0,', alpha: 0.05 },
      { x: W * 0.5,  y: H * 1.1,  r: 400, color: 'rgba(180,10,0,', alpha: 0.06 },
    ];

    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      // Background
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0,   '#050507');
      bg.addColorStop(0.5, '#07070A');
      bg.addColorStop(1,   '#050507');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Orbs ──
      orbs.forEach((o, i) => {
        const ox = o.x + Math.sin(t * 0.3 + i) * 60;
        const oy = o.y + Math.cos(t * 0.2 + i) * 40;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.r);
        grad.addColorStop(0,   o.color + (o.alpha * (0.8 + 0.4 * Math.sin(t + i))) + ')');
        grad.addColorStop(0.5, o.color + (o.alpha * 0.4) + ')');
        grad.addColorStop(1,   'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ox, oy, o.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // ── Distorted grid ──
      const nodeW = GRID_COLS + 1;
      nodes.forEach(n => {
        n.dx = Math.sin(t * n.speed + n.phase) * 25;
        n.dy = Math.cos(t * n.speed * 0.8 + n.phase) * 25;
      });

      ctx.strokeStyle = 'rgba(255,255,255,0.025)';
      ctx.lineWidth = 0.5;
      // Horizontal lines
      for (let r = 0; r <= GRID_ROWS; r++) {
        ctx.beginPath();
        for (let c = 0; c <= GRID_COLS; c++) {
          const n = nodes[r * nodeW + c];
          const x = n.bx + n.dx, y = n.by + n.dy;
          c === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      // Vertical lines
      for (let c = 0; c <= GRID_COLS; c++) {
        ctx.beginPath();
        for (let r = 0; r <= GRID_ROWS; r++) {
          const n = nodes[r * nodeW + c];
          const x = n.bx + n.dx, y = n.by + n.dy;
          r === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // ── Speed streaks ──
      streaks.forEach(s => {
        s.x += s.speed;
        if (s.x - s.length > W) {
          s.x = -s.length - Math.random() * 200;
          s.y = Math.random() * H;
          s.speed = Math.random() * 7 + 3;
          s.length = Math.random() * 220 + 60;
          s.alpha = Math.random() * 0.2 + 0.04;
          s.red = Math.random() < 0.3;
        }
        const grad = ctx.createLinearGradient(s.x - s.length, s.y, s.x, s.y);
        const col = s.red ? `rgba(225,6,0,` : `rgba(255,255,255,`;
        grad.addColorStop(0, col + '0)');
        grad.addColorStop(0.6, col + s.alpha + ')');
        grad.addColorStop(1, col + (s.alpha * 0.3) + ')');
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(s.x - s.length, s.y);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
      });

      // ── Particles ──
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.02;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;

        const a = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.red
          ? `rgba(225,6,0,${a})`
          : `rgba(200,180,180,${a * 0.7})`;
        ctx.fill();

        // Glow for red particles
        if (p.red && a > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(225,6,0,${a * 0.15})`;
          ctx.fill();
        }
      });

      // ── Connect nearby particles ──
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            const alpha = (1 - d / 100) * 0.06;
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
            ctx.lineWidth = 0.4;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // ── Noise overlay (vignette) ──
      const vig = ctx.createRadialGradient(W/2, H/2, H*0.2, W/2, H/2, H*1.1);
      vig.addColorStop(0, 'transparent');
      vig.addColorStop(1, 'rgba(0,0,0,0.55)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
