"use client";
import { useEffect, useRef, useState } from "react";
import { project, sampleLoop } from "@/lib/projection";

// A made-up circuit (no real track was harmed). Points are [x, z] on the ground.
const TRACK = sampleLoop(
  [
    [-0.9, 0.55], [-0.2, 0.62], [0.5, 0.6], [0.88, 0.48], [0.95, 0.18], [0.7, 0.04], [0.42, 0.1],
    [0.28, -0.12], [0.5, -0.36], [0.82, -0.5], [0.72, -0.78], [0.3, -0.72], [-0.1, -0.45],
    [-0.42, -0.66], [-0.78, -0.6], [-0.96, -0.3], [-0.68, -0.02], [-0.96, 0.3],
  ],
  480
).map(([x, z], i, a) => {
  const y = 0.07 * Math.sin((i / a.length) * Math.PI * 4); // a little elevation change
  return [x, y, z];
});
const N = TRACK.length;
const LAP_MS = 11000;
const HALF_WIDTH = 0.034;

// Edge offsets along the ground normal of each sample.
const EDGES = TRACK.map((p, i) => {
  const q = TRACK[(i + 1) % N];
  const dx = q[0] - p[0], dz = q[2] - p[2];
  const len = Math.hypot(dx, dz) || 1;
  const nx = -dz / len, nz = dx / len;
  return [
    [p[0] + nx * HALF_WIDTH, p[1], p[2] + nz * HALF_WIDTH],
    [p[0] - nx * HALF_WIDTH, p[1], p[2] - nz * HALF_WIDTH],
  ];
});

const GRID = [];
for (let x = -1.2; x <= 1.21; x += 0.15) for (let z = -1.0; z <= 1.01; z += 0.15) GRID.push([x, -0.16, z]);

export default function Circuit({ className = "" }) {
  const canvasRef = useRef(null);
  const [laps, setLaps] = useState(0);
  const [sector, setSector] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cam = { yaw: -0.5, pitch: 0.95, dist: 3.4, scale: 1, cx: 0, cy: 0 };
    const target = { lean: 0, pitch: 0.95 };
    let spin = 0;
    let w = 0, h = 0, raf = 0, visible = true, start = performance.now(), lastLap = 0, lastSector = 1;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cam.scale = Math.min(w * 0.3, h * 0.46);
      cam.cx = w / 2;
      cam.cy = h * 0.55;
    };

    const line = (pts, close) => {
      ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      if (close) ctx.closePath();
    };

    const draw = (now) => {
      const t = still ? 0.36 : ((now - start) % LAP_MS) / LAP_MS;
      if (!still) {
        spin += 0.0006; // a slow turntable, plus wherever the pointer leans
        cam.yaw += (-0.5 + spin + target.lean - cam.yaw) * 0.05;
        cam.pitch += (target.pitch - cam.pitch) * 0.05;
      }
      ctx.clearRect(0, 0, w, h);

      ctx.fillStyle = "rgba(241,239,233,0.16)";
      for (const g of GRID) {
        const [x, y, d] = project(g, cam);
        const s = Math.max(0.6, 1.4 - d * 0.5);
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }

      const left = EDGES.map((e) => project(e[0], cam));
      const right = EDGES.map((e) => project(e[1], cam));
      ctx.beginPath();
      left.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      right.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
      ctx.closePath();
      ctx.fillStyle = "rgba(241,239,233,0.06)";
      ctx.fill("evenodd");
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(241,239,233,0.42)";
      line(left, true);
      ctx.stroke();
      line(right, true);
      ctx.stroke();

      // Start/finish line.
      ctx.strokeStyle = "#f1efe9";
      ctx.lineWidth = 2;
      line([left[0], right[0]]);
      ctx.stroke();

      // Car and its trail.
      const head = Math.floor(t * N);
      const trail = 70;
      for (let k = trail; k > 0; k--) {
        const a = project(TRACK[(head - k + N) % N], cam);
        const b = project(TRACK[(head - k + 1 + N) % N], cam);
        ctx.strokeStyle = `rgba(212,255,58,${(1 - k / trail) * 0.9})`;
        ctx.lineWidth = 2.5;
        line([a, b]);
        ctx.stroke();
      }
      const [cx, cy] = project(TRACK[head], cam);
      ctx.shadowColor = "#d4ff3a";
      ctx.shadowBlur = 16;
      ctx.fillStyle = "#d4ff3a";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      if (!still) {
        const lap = Math.floor((now - start) / LAP_MS);
        if (lap !== lastLap) setLaps((lastLap = lap));
        const s = Math.min(3, Math.floor(t * 3) + 1);
        if (s !== lastSector) setSector((lastSector = s));
        if (visible) raf = requestAnimationFrame(draw);
      }
    };

    const onPointer = (e) => {
      target.lean = (e.clientX / window.innerWidth - 0.5) * 0.9;
      target.pitch = 0.95 + (e.clientY / window.innerHeight - 0.5) * 0.3;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (still) draw(0);
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible && !still) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    if (still) draw(0);
    else window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
      <div className="label pointer-events-none absolute top-4 left-4 flex gap-4 sm:top-6 sm:left-6" aria-hidden>
        <span>
          <span className="live-dot mr-1.5 inline-block size-1.5 rounded-full bg-volt align-middle" />
          Live
        </span>
        <span>S{sector}</span>
      </div>
      <p className="label absolute right-4 bottom-4 max-w-[16rem] text-right sm:right-6 sm:bottom-6" aria-live="off">
        {laps === 0 ? "Out lap. Tyres still cold." : `Laps since you arrived: ${laps}. ${laps > 4 ? "Okay, you're committed." : "Keep scrolling, it's fine."}`}
      </p>
    </div>
  );
}
