'use client';
import { useState, useEffect, useRef } from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
  const [activeSection, setActiveSection] = useState('about');
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const pos     = useRef({ x: -100, y: -100 });
  const target  = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove);

    // Dot follows instantly, ring lerps
    const lerp = (a, b, t) => a + (b - a) * t;
    let raf;
    const tick = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.12);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.12);

      // Move dot instantly via target
      dot.style.left  = target.current.x + 'px';
      dot.style.top   = target.current.y + 'px';

      // Move ring with smooth lag
      ring.style.left = pos.current.x + 'px';
      ring.style.top  = pos.current.y + 'px';

      raf = requestAnimationFrame(tick);
    };
    tick();

    // Expand ring on interactive elements
    const expand = () => {
      ring.style.width  = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = '#E10600';
      ring.style.opacity = '1';
    };
    const shrink = () => {
      ring.style.width  = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(225,6,0,0.65)';
      ring.style.opacity = '1';
    };

    const addListeners = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', expand);
        el.addEventListener('mouseleave', shrink);
      });
    };
    addListeners();

    // Re-attach if DOM changes
    const mo = new MutationObserver(addListeners);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      mo.disconnect();
    };
  }, []);

  // Active section tracker
  useEffect(() => {
    const h = () => {
      const sections = ['about', 'skills', 'projects', 'contact'];
      const sp = window.scrollY + 220;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && sp >= el.offsetTop && sp < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <>
      {/* Dot — instant follow */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 7,
          height: 7,
          background: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
          transition: 'width 0.15s, height 0.15s',
          willChange: 'left, top',
        }}
      />

      {/* Ring — laggy lerp follow */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 32,
          height: 32,
          border: '1.5px solid rgba(225,6,0,0.65)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
          willChange: 'left, top',
        }}
      />

      <Background />
      <Header activeSection={activeSection} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}