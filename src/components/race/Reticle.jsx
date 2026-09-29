"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { play } from "@/lib/sfx";

// A telemetry reticle: the centre dot is glued to the pointer (no latency),
// the bracket ring trails on a critically-damped spring and locks onto
// interactive targets. Fine pointers only.
export default function Reticle() {
  const [enabled, setEnabled] = useState(false);
  const [target, setTarget] = useState(null); // { w, h, x, y, label }
  const [down, setDown] = useState(false);
  const dotRef = useRef(null);
  const coordsRef = useRef(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 600, damping: 45, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 600, damping: 45, mass: 0.6 });

  useEffect(() => {
    const mq = matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => {
      setEnabled(mq.matches);
      document.documentElement.classList.toggle("has-reticle", mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => {
      mq.removeEventListener("change", update);
      document.documentElement.classList.remove("has-reticle");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let current = null;

    let last = null;

    // Lock onto whatever interactive element sits under (px, py).
    const track = (px, py, targetEl) => {
      const el = targetEl?.closest?.("a, button, [data-cursor]") ?? null;
      if (el !== current) {
        current = el;
        if (el) play("tick");
      }
      if (el) {
        const r = el.getBoundingClientRect();
        x.set(r.left + r.width / 2);
        y.set(r.top + r.height / 2);
        setTarget((t) => {
          const label = el.dataset.cursor || (el.tagName === "A" ? "LINK" : "SELECT");
          const w = Math.min(r.width + 14, 420);
          const h = Math.min(r.height + 14, 420);
          return t && t.w === w && t.h === h && t.label === label ? t : { w, h, label };
        });
      } else {
        x.set(px);
        y.set(py);
        setTarget(null);
      }
    };

    const onMove = (e) => {
      last = [e.clientX, e.clientY];
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (coordsRef.current) {
        coordsRef.current.textContent = `${String(e.clientX).padStart(4, "0")} · ${String(e.clientY).padStart(4, "0")}`;
      }
      track(e.clientX, e.clientY, e.target);
    };

    // The page can move under a still pointer (scrolling) — re-test what's beneath it.
    let scrollFrame = 0;
    const onScroll = () => {
      if (!last || scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        track(last[0], last[1], document.elementFromPoint(last[0], last[1]));
      });
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = target ? { width: target.w, height: target.h } : { width: 34, height: 34 };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[300]">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-red"
      />
      <motion.div
        className="brackets absolute top-0 left-0"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", "--b": target ? "var(--yellow)" : "var(--fg)", "--s": "9px" }}
        animate={{ ...size, scale: down ? 0.9 : 1 }}
        transition={{ type: "spring", bounce: 0, duration: 0.3 }}
      >
        {!target && (
          <>
            <span className="absolute top-1/2 left-[-7px] h-px w-[5px] bg-fg/70" />
            <span className="absolute top-1/2 right-[-7px] h-px w-[5px] bg-fg/70" />
            <span className="absolute top-[-7px] left-1/2 h-[5px] w-px bg-fg/70" />
            <span className="absolute bottom-[-7px] left-1/2 h-[5px] w-px bg-fg/70" />
          </>
        )}
        <span
          className={`t-label absolute top-full left-0 mt-1.5 whitespace-nowrap text-[9px] ${
            target ? "text-yellow" : "text-dim"
          }`}
        >
          {target ? `▸ ${target.label}` : <span ref={coordsRef} className="t-data" />}
        </span>
      </motion.div>
    </div>
  );
}
