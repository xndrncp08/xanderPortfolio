"use client";
import { useEffect, useRef } from "react";
import { MAX_KMH, subscribe } from "@/lib/telemetry";

// Vertical speed streaks that appear with scroll speed. The canvas is idle
// (no drawing) whenever the car is stationary.
const COUNT = 70;

export default function SpeedLines() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;

    const resize = () => {
      w = innerWidth;
      h = innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const lines = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      len: 0.3 + Math.random() * 0.7,
      speed: 0.6 + Math.random() * 0.8,
      red: Math.random() < 0.12,
    }));

    let intensity = 0;
    let direction = 1;
    let drawing = false;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      if (intensity < 0.02) {
        drawing = false;
        return;
      }
      const visible = Math.floor(COUNT * Math.min(1, intensity * 1.4));
      for (let i = 0; i < visible; i++) {
        const l = lines[i];
        l.y -= direction * l.speed * intensity * 0.06;
        if (l.y < -0.3) l.y = 1.2;
        if (l.y > 1.3) l.y = -0.2;
        const len = l.len * intensity * h * 0.35;
        const x = l.x * w;
        const y = l.y * h;
        const grad = ctx.createLinearGradient(x, y, x, y + len * direction);
        const color = l.red ? "255,40,0" : "242,241,236";
        grad.addColorStop(0, `rgba(${color},0)`);
        grad.addColorStop(1, `rgba(${color},${0.18 * intensity + (l.red ? 0.15 : 0)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = l.red ? 1.5 : 1;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + len * direction);
        ctx.stroke();
      }
      requestAnimationFrame(draw);
    };

    const unsubscribe = subscribe(({ speed, velocity }) => {
      intensity = Math.pow(speed / MAX_KMH, 0.8);
      if (velocity) direction = velocity > 0 ? 1 : -1;
      if (intensity >= 0.02 && !drawing) {
        drawing = true;
        requestAnimationFrame(draw);
      }
    });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", resize);
      intensity = 0;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] size-full motion-reduce:hidden"
    />
  );
}
