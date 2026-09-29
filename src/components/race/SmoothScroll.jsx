"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { publish, setLenis, toKmh } from "@/lib/telemetry";
import { initSfx } from "@/lib/sfx";

const SECTORS = ["grid", "s1", "s2", "s3", "pit"];

// Lenis smooth scroll + the telemetry feed (speed, progress, active sector).
export default function SmoothScroll() {
  useEffect(() => {
    initSfx();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Sector tracking works with or without smooth scroll.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) publish({ sector: e.target.id });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTORS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const onNativeScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      publish({ progress: max > 0 ? scrollY / max : 0 });
    };

    if (reduce) {
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", onNativeScroll);
      };
    }

    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -64 }, autoRaf: false });
    setLenis(lenis);
    document.documentElement.classList.add("lenis", "lenis-smooth");

    const main = document.querySelector("main");
    let raf;
    let lastSpeed = -1;
    const frame = (time) => {
      lenis.raf(time);
      const velocity = lenis.velocity;
      const speed = toKmh(velocity);
      // Publish while moving, plus the frame it settles to zero.
      if (speed !== 0 || lastSpeed !== 0) {
        publish({ velocity, speed, progress: lenis.progress || 0 });
        lastSpeed = speed;
        // Content leans into fast scrolls (transform only, max 1.2°).
        const skew = Math.max(-1.2, Math.min(1.2, velocity * 0.035));
        if (main) main.style.transform = Math.abs(skew) < 0.02 ? "" : `skewY(${skew.toFixed(3)}deg)`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
