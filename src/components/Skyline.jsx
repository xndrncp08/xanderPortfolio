"use client";
import { useEffect, useRef } from "react";
import { project } from "@/lib/projection";

const BASE = [31, 31, 29];
const VOLT = [212, 255, 58];
const MIX = [0, 0.3, 0.55, 0.78, 1];
const LIGHT = (() => {
  const v = [-0.5, 0.8, -0.35];
  const n = Math.hypot(...v);
  return v.map((c) => c / n);
})();
const shade = (rgb, normal) => {
  const k = 0.42 + 0.58 * Math.max(0, normal[0] * LIGHT[0] + normal[1] * LIGHT[1] + normal[2] * LIGHT[2]);
  return `rgb(${rgb.map((c) => Math.round(c * k)).join(",")})`;
};

// The real contribution calendar as a city of bars: weeks run left to right,
// weekdays front to back, height is √count. Drag to turn it.
export function buildBars(days) {
  const offset = new Date(days[0].date).getUTCDay();
  const weeks = Math.ceil((days.length + offset) / 7);
  const max = Math.max(1, ...days.map((d) => d.count));
  const cell = 2.2 / weeks;
  return days.map((d, i) => {
    const week = Math.floor((i + offset) / 7);
    const weekday = (i + offset) % 7;
    const rgb = BASE.map((b, c) => b + (VOLT[c] - b) * MIX[d.level ?? 0]);
    return {
      x: (week - weeks / 2) * cell,
      z: (weekday - 3) * cell,
      s: cell * 0.82,
      h: d.count ? 0.03 + Math.sqrt(d.count / max) * 0.55 : 0.006,
      rgb,
    };
  });
}

export default function Skyline({ days, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const bars = buildBars(days);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cam = { yaw: 0.55, pitch: 0.62, dist: 3.6, scale: 1, cx: 0, cy: 0 };
    let w = 0, h = 0, raf = 0, visible = false, grow = still ? 1 : 0, drag = null, yaw = 0.55, t0 = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cam.scale = Math.min(w * 0.34, h * 0.9);
      cam.cx = w / 2;
      cam.cy = h * 0.62;
    };

    const poly = (pts, fill) => {
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      ctx.fillStyle = fill;
      ctx.fill();
    };

    const draw = (now) => {
      if (!still) {
        if (!t0) t0 = now;
        grow = Math.min(1, (now - t0) / 1400);
        if (!drag) yaw += 0.0012;
      }
      cam.yaw = yaw;
      ctx.clearRect(0, 0, w, h);
      const eased = 1 - Math.pow(1 - grow, 3);

      // Painter's algorithm: far bars first, and within a bar, far faces first.
      const order = bars
        .map((b) => ({ b, d: project([b.x, 0, b.z], cam)[2] }))
        .sort((a, b) => b.d - a.d);
      for (const { b } of order) {
        const hh = b.h * eased;
        const x0 = b.x - b.s / 2, x1 = b.x + b.s / 2, z0 = b.z - b.s / 2, z1 = b.z + b.s / 2;
        const P = (x, y, z) => project([x, y, z], cam);
        const faces = [
          { n: [0, 0, -1], v: [[x0, 0, z0], [x1, 0, z0], [x1, hh, z0], [x0, hh, z0]] },
          { n: [0, 0, 1], v: [[x0, 0, z1], [x1, 0, z1], [x1, hh, z1], [x0, hh, z1]] },
          { n: [-1, 0, 0], v: [[x0, 0, z0], [x0, 0, z1], [x0, hh, z1], [x0, hh, z0]] },
          { n: [1, 0, 0], v: [[x1, 0, z0], [x1, 0, z1], [x1, hh, z1], [x1, hh, z0]] },
        ]
          .map((f) => ({ ...f, p: f.v.map((v) => P(...v)) }))
          .map((f) => ({ ...f, d: f.p.reduce((s, p) => s + p[2], 0) / 4 }))
          .sort((a, c) => c.d - a.d);
        if (hh > 0.01) for (const f of faces.slice(2)) poly(f.p, shade(b.rgb, f.n));
        poly([P(x0, hh, z0), P(x1, hh, z0), P(x1, hh, z1), P(x0, hh, z1)], shade(b.rgb, [0, 1, 0]));
      }
      if (visible && !still) raf = requestAnimationFrame(draw);
    };

    const down = (e) => {
      drag = { x: e.clientX, yaw };
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e) => {
      if (!drag) return;
      yaw = drag.yaw + (e.clientX - drag.x) * 0.008;
      if (still) draw(0);
    };
    const up = () => (drag = null);

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(draw);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    canvas.addEventListener("pointerdown", down);
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerup", up);
    canvas.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointerdown", down);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerup", up);
      canvas.removeEventListener("pointercancel", up);
    };
  }, [days]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`block w-full cursor-grab touch-pan-y active:cursor-grabbing ${className}`}
    />
  );
}
