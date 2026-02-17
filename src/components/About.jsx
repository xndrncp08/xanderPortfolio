'use client';

import { useState } from 'react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes xtr-fade-up {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .xtr-about-fade { animation: xtr-fade-up .6s ease both; }

  .xtr-about-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
  }
  .xtr-highlights-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  .xtr-stats-row {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
  }

  @media (max-width: 768px) {
    .xtr-about-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .xtr-highlights-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 480px) {
    .xtr-highlights-grid {
      grid-template-columns: 1fr;
    }
    .xtr-stats-row > div {
      flex: 1 1 calc(33% - 10px);
      min-width: 80px;
    }
  }
`;

export default function About({ isDarkMode: dark }) {
  const muted   = dark ? '#64748b' : '#94a3b8';
  const bold    = dark ? '#ffffff' : '#0f172a';
  const accent  = dark ? '#818cf8' : '#4f46e5';
  const surface = dark ? '#0d1117' : '#ffffff';
  const border  = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const bg      = dark
    ? 'linear-gradient(180deg,#060812 0%,#0d1117 100%)'
    : 'linear-gradient(180deg,#f8fafc 0%,#ffffff 100%)';

  const stats = [
    { value: '3.4', label: 'GPA at SAIT' },
    { value: '5+',  label: 'Projects Built' },
    { value: '2',   label: 'Internships' },
  ];

  const highlights = [
    {title: 'Full-Stack Focus',    desc: 'React, Node.js, .NET — across web and mobile.' },
    {title: 'Team Leadership',     desc: 'Led group projects with clean architecture and OOP.' },
    {title: 'Hardware + Software', desc: 'Robotics immersion at Eduspec, Metro Manila.' },
    {title: 'Always Learning',     desc: 'Diving into Java, CI/CD pipelines, and Mobile Development.' },
  ];

  const paragraphs = [
    <span key={0}>I'm <Hl bold={bold}>Xander Rancap</Hl>, a software developer at SAIT (3.4 GPA). I build things that are clean, practical, and enjoyable to use — where good design meets solid engineering.</span>,
    <span key={1}>My immersion at <Hl bold={bold}>Eduspec Holdings Berhad</Hl> in Metro Manila had me working hands-on with Arduino, SAM Labs, and VEX Robotics — deepening my appreciation for how hardware and software intersect.</span>,
    <span key={2}>I've led group projects applying OOP and scalable design. My favourite was a cross-platform gym app in <Hl bold={bold}>.NET MAUI Blazor Hybrid</Hl>, focused on clean architecture, usability, and keeping the team aligned.</span>,
    <span key={3}>I work across C#, Python, JavaScript, and SQL, and I'm comfortable with React, Node.js, and Tailwind. Always curious — currently exploring Java, MongoDB, and mobile development.</span>,
  ];

  return (
    <>
      <style>{CSS}</style>
      <section id="about" style={{ padding: 'clamp(60px,10vw,120px) 24px', background: bg }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Label */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 48 }}>
            <div style={{ width: 28, height: 3, borderRadius: 99, background: 'linear-gradient(90deg,#6366f1,#a78bfa)' }}/>
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: accent }}>
              About Me
            </span>
          </div>

          <div className="xtr-about-grid">
            {/* Left */}
            <div>
              {paragraphs.map((para, i) => (
                <p key={i} className="xtr-about-fade" style={{
                  animationDelay: `${i * 80}ms`,
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 16, lineHeight: 1.85, color: muted, margin: '0 0 20px',
                }}>{para}</p>
              ))}
              <div className="xtr-stats-row" style={{ marginTop: 32 }}>
                {stats.map((s, i) => (
                  <StatCard key={s.label} s={s} dark={dark} border={border} muted={muted} delay={360 + i * 80}/>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="xtr-highlights-grid">
              {highlights.map((h, i) => (
                <HighlightCard key={h.title} dark={dark} surface={surface} border={border} bold={bold} muted={muted} delay={i * 80} {...h}/>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ s, dark, border, muted, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="xtr-about-fade"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        animationDelay: `${delay}ms`, flex: 1, minWidth: 80,
        background: hov ? dark ? 'rgba(99,102,241,0.12)' : 'rgba(99,102,241,0.07)' : dark ? 'rgba(255,255,255,0.04)' : 'rgba(99,102,241,0.04)',
        border: `1px solid ${hov ? 'rgba(99,102,241,0.4)' : border}`,
        borderRadius: 14, padding: '16px 12px', textAlign: 'center',
        transition: 'all .3s ease', transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? '0 10px 28px rgba(99,102,241,0.18)' : 'none',
      }}>
      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 24,
        background: 'linear-gradient(135deg,#818cf8,#c4b5fd)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, color: muted, marginTop: 4, fontWeight: 500, letterSpacing: '0.04em' }}>{s.label}</div>
    </div>
  );
}

function HighlightCard({ icon, title, desc, dark, surface, border, bold, muted, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="xtr-about-fade"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        animationDelay: `${delay + 200}ms`,
        background: hov ? dark ? 'rgba(99,102,241,0.10)' : 'rgba(99,102,241,0.06)' : dark ? 'rgba(255,255,255,0.03)' : surface,
        border: `1px solid ${hov ? 'rgba(99,102,241,0.45)' : border}`,
        borderRadius: 16, padding: '18px 16px',
        cursor: 'default', transition: 'all .3s ease',
        transform: hov ? 'translateY(-4px)' : 'none',
        boxShadow: hov ? '0 12px 32px rgba(99,102,241,0.15)' : 'none',
      }}>
      <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700, color: bold, marginBottom: 5 }}>{title}</div>
      <div style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13, color: muted, lineHeight: 1.6 }}>{desc}</div>
    </div>
  );
}

function Hl({ children, bold }) {
  return <strong style={{ color: bold, fontWeight: 600 }}>{children}</strong>;
}