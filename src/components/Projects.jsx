'use client';

import { useState } from 'react';

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes xtr-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes xtr-fade-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .xtr-proj-fade { animation: xtr-fade-up .6s ease both; }

  .xtr-proj-card {
    transition: transform .35s cubic-bezier(.25,.46,.45,.94), box-shadow .35s ease;
    overflow: hidden;
  }
  .xtr-proj-card:hover { transform: translateY(-8px); }

  .xtr-proj-img {
    transition: transform .6s cubic-bezier(.25,.46,.45,.94);
    width: 100%; height: 220px; object-fit: cover; display: block;
  }
  .xtr-proj-card:hover .xtr-proj-img { transform: scale(1.07); }

  .xtr-tag { transition: all .2s ease; }

  .xtr-shimmer-dark {
    background: linear-gradient(90deg,#fff 15%,#a5b4fc 35%,#c4b5fd 50%,#a5b4fc 65%,#fff 85%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: xtr-shimmer 4s linear infinite;
  }
  .xtr-shimmer-light {
    background: linear-gradient(90deg,#0f172a 15%,#4f46e5 35%,#7c3aed 50%,#4f46e5 65%,#0f172a 85%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: xtr-shimmer 4s linear infinite;
  }
`;

const PROJECTS = [
  {
    title: 'Basketbol',
    tech: 'Next.js',
    description: 'A web app displaying NBA games, teams, and player info in a clean, responsive interface. Pulls data from multiple sports APIs with graceful loading and fallback states.',
    image: 'https://i.postimg.cc/d0dX1VGs/image.png',
    tags: ['React', 'Next.js', 'JavaScript', 'ESPN API', 'BallDontLie API'],
    accent: '#61DAFB',
  },
  {
    title: 'YYC Track',
    tech: 'MERN Stack',
    description: 'Capstone project helping Calgary Transit riders view stations on an interactive map, submit feedback, and track real-time station ratings via a Commuter Experience Index.',
    image: 'https://i.postimg.cc/1zpCSYZ0/image.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Express'],
    accent: '#68A063',
  },
  {
    title: 'Gym Management System',
    tech: '.NET MAUI Blazor Hybrid',
    description: 'Cross-platform gym management app with secure authentication, membership tracking, scheduling, and full database integration.',
    image: 'https://i.postimg.cc/t4trHsnd/FitZone.png',
    tags: ['C#', '.NET MAUI Blazor', 'MariaDB'],
    accent: '#9B59B6',
  },
  {
    title: 'NV Closet',
    tech: 'UI/UX Design',
    description: 'Digital wardrobe management app with AI-powered outfit recommendations — designed with a modern, intuitive interface focused on user experience.',
    image: 'https://i.postimg.cc/Kj2kF8ML/NV.png',
    tags: ['Figma', 'UI/UX', 'Design'],
    accent: '#EC4899',
  },
  {
    title: 'Punch Music',
    tech: 'React Native',
    description: 'Team-built music discovery app integrating the Spotify API — swipe through songs with smooth gesture controls, real-time playback, and a polished UI.',
    image: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80',
    tags: ['React.js', 'Supabase', 'Spotify API'],
    accent: '#1DB954',
  },
];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '99,102,241';
}

export default function Projects({ isDarkMode: dark }) {
  const muted  = dark ? '#64748b' : '#94a3b8';
  const text   = dark ? '#94a3b8' : '#64748b';
  const bold   = dark ? '#ffffff' : '#0f172a';
  const accent = dark ? '#818cf8' : '#4f46e5';
  const border = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)';
  const cardBg = dark ? '#0d1117' : '#ffffff';
  const tagBg  = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  return (
    <>
      <style>{CSS}</style>
      <section id="projects" style={{
        padding: '120px 28px',
        background: dark
          ? 'linear-gradient(180deg,#060812 0%,#0d1117 100%)'
          : 'linear-gradient(180deg,#f8fafc 0%,#ffffff 100%)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ marginBottom: 56, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 28, height: 3, borderRadius: 99, background: 'linear-gradient(90deg,#6366f1,#a78bfa)' }}/>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '.10em', textTransform: 'uppercase', color: accent }}>
                Portfolio
              </span>
              <div style={{ width: 28, height: 3, borderRadius: 99, background: 'linear-gradient(90deg,#a78bfa,#6366f1)' }}/>
            </div>
            <h2 className={`xtr-shimmer-${dark ? 'dark' : 'light'}`}
              style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', margin: '0 0 12px', letterSpacing: '-1px' }}>
              Featured Projects
            </h2>
            <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 16, color: muted, maxWidth: 480, margin: '0 auto' }}>
              A selection of things I've built — from full-stack web apps to mobile experiences.
            </p>
          </div>

          {/* Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 24,
          }}>
            {PROJECTS.map((p, i) => (
              <ProjectCard
                key={p.title} project={p} index={i}
                dark={dark} cardBg={cardBg} border={border}
                text={text} bold={bold} muted={muted} tagBg={tagBg}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectCard({ project: p, index: i, dark, cardBg, border, text, bold, muted, tagBg }) {
  const [hov, setHov] = useState(false);
  const rgb = hexToRgb(p.accent);

  return (
    <div
      className="xtr-proj-card xtr-proj-fade"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        animationDelay: `${i * 80}ms`,
        borderRadius: 20,
        background: cardBg,
        border: `1px solid ${hov ? `rgba(${rgb},.35)` : border}`,
        boxShadow: hov
          ? `0 20px 60px -10px rgba(${rgb},.3), 0 4px 20px rgba(0,0,0,${dark ? '.4' : '.08'})`
          : `0 4px 20px rgba(0,0,0,${dark ? '.3' : '.06'})`,
        cursor: 'pointer',
      }}
    >
      {/* Image */}
      <div style={{ overflow: 'hidden', position: 'relative', borderRadius: '20px 20px 0 0' }}>
        <img src={p.image} alt={p.title} className="xtr-proj-img"/>
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to top, ${cardBg} 0%, transparent 60%)`,
          opacity: 0.7,
        }}/>
        <div style={{
          position: 'absolute', top: 14, right: 14,
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 11, fontWeight: 600, letterSpacing: '0.06em',
          padding: '5px 12px', borderRadius: 99,
          background: `rgba(${rgb},.18)`,
          border: `1px solid rgba(${rgb},.35)`,
          color: p.accent,
          backdropFilter: 'blur(8px)',
        }}>{p.tech}</div>
      </div>

      {/* Content */}
      <div style={{ padding: '22px 24px 24px' }}>
        <h3 style={{
          fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 20,
          margin: '0 0 10px', letterSpacing: '-0.3px',
          color: hov ? p.accent : bold,
          transition: 'color .3s',
        }}>{p.title}</h3>

        <p style={{
          fontFamily: "'DM Sans',sans-serif",
          fontSize: 14, lineHeight: 1.75, color: text,
          margin: '0 0 18px',
        }}>{p.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
          {p.tags.map(tag => (
            <span key={tag} className="xtr-tag" style={{
              fontFamily: "'DM Sans',sans-serif",
              fontSize: 11, fontWeight: 500, letterSpacing: '0.03em',
              padding: '4px 11px', borderRadius: 99,
              background: hov ? `rgba(${rgb},.10)` : tagBg,
              border: `1px solid ${hov ? `rgba(${rgb},.25)` : 'transparent'}`,
              color: hov ? p.accent : muted,
            }}>{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}