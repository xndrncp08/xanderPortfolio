"use client";

// Leans its child toward the pointer. CSS owns the transform (see .tilt), so
// reduced-motion users get a flat card for free.
export default function TiltCard({ children, className = "" }) {
  const lean = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--ry", `${x * 6}deg`);
    e.currentTarget.style.setProperty("--rx", `${-y * 6}deg`);
  };
  const reset = (e) => {
    e.currentTarget.style.setProperty("--ry", "0deg");
    e.currentTarget.style.setProperty("--rx", "0deg");
  };
  return (
    <div className={`tilt ${className}`} onPointerMove={lean} onPointerLeave={reset}>
      {children}
    </div>
  );
}
