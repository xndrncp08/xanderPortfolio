'use client';
import { useEffect, useRef } from 'react';

export default function ProfileEffect({
  color = '#E10600',
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className = '',
  style = {},
  children,
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width  = rect.width;
      canvas.height = rect.height;
    };
    resize();

    // Parse color to rgb
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    const draw = () => {
      t += 0.016 * speed;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      const POINTS = 80;
      const cx = W / 2;
      const cy = H / 2;
      const rx = W / 2 - 4;
      const ry = H / 2 - 4;
      const br = borderRadius;

      // Build distorted border path
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i <= POINTS; i++) {
        const angle = (i / POINTS) * Math.PI * 2;
        const noise =
          Math.sin(angle * 3 + t * 1.2) * chaos * 20 +
          Math.sin(angle * 5 - t * 0.8) * chaos * 12 +
          Math.sin(angle * 7 + t * 1.6) * chaos * 8;

        // Rounded-rectangle-like base
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const absC = Math.abs(cos);
        const absS = Math.abs(sin);
        const baseR = Math.min(rx / Math.max(absC, 0.001), ry / Math.max(absS, 0.001));
        const cornerFactor = Math.pow(Math.pow(absC, 4) + Math.pow(absS, 4), -0.25);
        const rad = baseR * cornerFactor + noise;

        const px = cx + cos * rad;
        const py = cy + sin * rad;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();

      // Outer glow layers
      for (let layer = 3; layer >= 1; layer--) {
        ctx.save();
        ctx.shadowColor = `rgba(${r},${g},${b},${0.4 / layer})`;
        ctx.shadowBlur = 20 * layer;
        ctx.strokeStyle = `rgba(${r},${g},${b},${0.15 / layer})`;
        ctx.lineWidth = layer * 4 + 2;
        ctx.stroke();
        ctx.restore();
      }

      // Main stroke
      const grad = ctx.createLinearGradient(0, 0, W, H);
      const alpha1 = 0.6 + 0.4 * Math.sin(t * 0.7);
      const alpha2 = 0.4 + 0.4 * Math.cos(t * 0.9);
      grad.addColorStop(0,   `rgba(${r},${g},${b},${alpha1})`);
      grad.addColorStop(0.4, `rgba(255,107,53,${alpha2})`);
      grad.addColorStop(0.7, `rgba(${r},${g},${b},${alpha1 * 0.8})`);
      grad.addColorStop(1,   `rgba(${r},${g},${b},${alpha1})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5;
      ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Spark particles along the border
      const SPARKS = 4;
      for (let s = 0; s < SPARKS; s++) {
        const sparkAngle = ((t * speed * 0.8 + (s * Math.PI * 2) / SPARKS)) % (Math.PI * 2);
        const cos = Math.cos(sparkAngle);
        const sin = Math.sin(sparkAngle);
        const absC = Math.abs(cos);
        const absS = Math.abs(sin);
        const baseR = Math.min(rx / Math.max(absC, 0.001), ry / Math.max(absS, 0.001));
        const cornerFactor = Math.pow(Math.pow(absC, 4) + Math.pow(absS, 4), -0.25);
        const sparkR = baseR * cornerFactor;
        const sx = cx + cos * sparkR;
        const sy = cy + sin * sparkR;
        const sparkAlpha = 0.6 + 0.4 * Math.sin(t * 2 + s);

        ctx.beginPath();
        ctx.arc(sx, sy, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${sparkAlpha})`;
        ctx.shadowColor = `rgba(${r},${g},${b},1)`;
        ctx.shadowBlur = 16;
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(draw);
    };

    draw();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [color, speed, chaos, borderRadius]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', ...style }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2, width: '100%', height: '100%' }}
      />
      {children}
    </div>
  );
}
