"use client";
import { useState, useEffect, useRef } from "react";
import ComicHeader from "@/components/Header";
import ComicHero from "@/components/Hero";
import ComicAbout from "@/components/About";
import ComicSkills from "@/components/Skills";
import ComicProjects from "@/components/Projects";
import ComicContact from "@/components/Contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState("about");
  const [dark, setDark] = useState(false);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  /* ── Dark mode: toggle class on <html> ── */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "");
  }, [dark]);

  /* ── Custom cursor ── */
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      dot.style.left = e.clientX + "px";
      dot.style.top = e.clientY + "px";
    };
    window.addEventListener("mousemove", onMove);

    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.13);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.13);
      ring.style.left = pos.current.x + "px";
      ring.style.top = pos.current.y + "px";
      raf.current = requestAnimationFrame(tick);
    };
    tick();

    const expand = () => ring.classList.add("expanded");
    const shrink = () => ring.classList.remove("expanded");
    const attach = () => {
      document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", expand);
        el.addEventListener("mouseleave", shrink);
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMove);
      mo.disconnect();
    };
  }, []);

  /* ── Active section tracker ── */
  useEffect(() => {
    const SECTIONS = ["about", "skills", "projects", "contact"];
    const handle = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (
          el &&
          scrollPos >= el.offsetTop &&
          scrollPos < el.offsetTop + el.offsetHeight
        ) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="comic-cursor-dot"
        style={{
          position: "fixed",
          zIndex: 9999,
          pointerEvents: "none",
          willChange: "left,top",
        }}
      />
      <div
        ref={ringRef}
        className="comic-cursor-ring"
        style={{
          position: "fixed",
          zIndex: 9998,
          pointerEvents: "none",
          willChange: "left,top",
        }}
      />

      <ComicHeader
        activeSection={activeSection}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
      />

      <main>
        <ComicHero />
        <ComicAbout />
        <ComicSkills />
        <ComicProjects />
        <ComicContact />
      </main>
    </>
  );
}
