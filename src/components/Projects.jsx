"use client";

import { useRef, useState, useEffect, useCallback } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cabinet+Grotesk:wght@300;400;500;700;800&display=swap');

  @keyframes prj-shimmer {
    0%   { background-position:-300% center; }
    100% { background-position: 300% center; }
  }
  @keyframes prj-panel-in {
    from { opacity:0; transform:translateX(32px) scale(0.97); }
    to   { opacity:1; transform:translateX(0)    scale(1); }
  }
  @keyframes prj-tag-pop {
    from { opacity:0; transform:scale(0.82) translateY(5px); }
    to   { opacity:1; transform:scale(1)    translateY(0); }
  }
  @keyframes prj-scan {
    0%   { top:0%;   opacity:0; }
    5%   { opacity:1; }
    95%  { opacity:0.5; }
    100% { top:100%; opacity:0; }
  }
  @keyframes prj-pulse-dot {
    0%,100% { opacity:0.5; transform:scale(1); }
    50%     { opacity:1;   transform:scale(1.18); }
  }

  .prj-section {
    padding: clamp(80px,12vw,140px) clamp(24px,5vw,72px);
    position:relative; overflow:hidden;
    font-family:'Cabinet Grotesk', system-ui, sans-serif;
    -webkit-font-smoothing:antialiased;
  }
  .prj-grain {
    position:absolute; inset:0; pointer-events:none; opacity:0.025;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size:160px;
  }

  /* ── HEADER ── same two-col grid as Skills ── */
  .prj-header {
    max-width:1100px; margin:0 auto clamp(32px,5vw,52px);
    display:grid;
    grid-template-columns:1fr auto;
    align-items:flex-end;
    gap:24px;
  }
  @media(max-width:640px){
    .prj-header { grid-template-columns:1fr; }
    .prj-header-right { display:none; }
  }

  .prj-eyebrow {
    display:inline-flex; align-items:center; gap:8px;
    padding:4px 14px; border-radius:99px;
    font-size:11px; font-weight:600; letter-spacing:0.13em; text-transform:uppercase;
    margin-bottom:16px;
  }
  .prj-eyebrow-dot { width:6px; height:6px; border-radius:50%; display:inline-block; }

  .prj-headline {
    font-family:'Bebas Neue', sans-serif;
    font-size:clamp(52px,7vw,88px);
    line-height:0.9; letter-spacing:0.02em; margin:0 0 10px;
  }
  .prj-shimmer-dark {
    background:linear-gradient(90deg,#e2e8f0 10%,#a5b4fc 32%,#c4b5fd 50%,#a5b4fc 68%,#e2e8f0 90%);
    background-size:300% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:prj-shimmer 5s linear infinite;
  }
  .prj-shimmer-light {
    background:linear-gradient(90deg,#0f172a 10%,#4f46e5 32%,#7c3aed 50%,#4f46e5 68%,#0f172a 90%);
    background-size:300% auto;
    -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    animation:prj-shimmer 5s linear infinite;
  }

  .prj-subhead { font-size:15px; line-height:1.7; font-weight:400; }

  /* right controls */
  .prj-header-right { display:flex; align-items:center; gap:14px; padding-bottom:4px; }

  .prj-dots { display:flex; gap:6px; align-items:center; }
  .prj-dot {
    height:3px; border-radius:99px; cursor:pointer;
    transition:width 0.35s cubic-bezier(0.34,1.56,0.64,1), background 0.3s;
  }

  .prj-nav-btn {
    width:42px; height:42px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; border:none; flex-shrink:0;
    transition:transform 0.2s cubic-bezier(0.34,1.56,0.64,1), background 0.2s;
  }
  .prj-nav-btn:hover  { transform:scale(1.1); }
  .prj-nav-btn:active { transform:scale(0.94); }
  .prj-nav-btn:disabled { opacity:0.28; cursor:default; transform:none; }

  .prj-counter {
    font-family:'Bebas Neue', sans-serif;
    font-size:20px; letter-spacing:0.06em; min-width:52px; text-align:right;
  }

  /* ── TRACK ── */
  .prj-track-wrap {
    max-width:1100px; margin:0 auto;
    position:relative;
  }
  .prj-track {
    display:flex; gap:18px;
    overflow-x:auto; scroll-snap-type:x mandatory;
    -webkit-overflow-scrolling:touch;
    scrollbar-width:none; scroll-behavior:smooth;
    cursor:grab; user-select:none; padding-bottom:4px;
  }
  .prj-track::-webkit-scrollbar { display:none; }
  .prj-track.grabbing { cursor:grabbing; }

  /* ── PANEL ── */
  .prj-panel {
    flex:0 0 clamp(300px,68vw,680px);
    height:clamp(420px,55vw,540px);
    border-radius:24px;
    scroll-snap-align:start;
    position:relative; overflow:hidden;
    animation:prj-panel-in 0.55s cubic-bezier(0.16,1,0.3,1) both;
    transition:opacity 0.4s ease, transform 0.4s ease;
  }
  @media(max-width:640px){
    .prj-panel { flex:0 0 calc(100vw - 48px); height:440px; }
  }

  .prj-panel-img {
    position:absolute; inset:0; width:100%; height:100%; object-fit:cover;
    transition:transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94);
    z-index:0;
  }
  .prj-panel:hover .prj-panel-img { transform:scale(1.06); }

  .prj-vignette {
    position:absolute; inset:0; z-index:2; pointer-events:none;
    background:linear-gradient(to bottom,rgba(0,0,0,.2) 0%,rgba(0,0,0,.08) 28%,rgba(0,0,0,.5) 62%,rgba(0,0,0,.9) 100%);
  }

  .prj-tint {
    position:absolute; inset:0; z-index:3; pointer-events:none;
    opacity:0; transition:opacity 0.4s ease;
  }
  .prj-panel:hover .prj-tint { opacity:1; }

  .prj-scan {
    position:absolute; left:0; right:0; height:80px;
    pointer-events:none; z-index:4; opacity:0;
    transition:opacity 0.35s;
    animation:prj-scan 6s ease-in-out infinite;
  }
  .prj-panel:hover .prj-scan { opacity:1; }

  /* body */
  .prj-body {
    position:absolute; inset:0; z-index:5;
    display:flex; flex-direction:column; justify-content:space-between;
    padding:clamp(18px,2.5vw,28px);
  }

  .prj-body-top { display:flex; justify-content:space-between; align-items:flex-start; }

  .prj-index {
    font-family:'Bebas Neue', sans-serif;
    font-size:clamp(52px,6.5vw,72px);
    line-height:1; color:#fff; opacity:0.15; letter-spacing:0.02em;
  }

  .prj-tech-pill {
    font-size:10px; font-weight:700; letter-spacing:0.07em; text-transform:uppercase;
    padding:5px 12px; border-radius:99px; backdrop-filter:blur(14px);
    white-space:nowrap; max-width:190px; overflow:hidden; text-overflow:ellipsis;
    font-family:'Cabinet Grotesk', sans-serif;
    transition:transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s;
  }
  .prj-panel:hover .prj-tech-pill { transform:translateY(-2px) scale(1.04); }

  .prj-body-bottom {}

  .prj-title {
    font-family:'Bebas Neue', sans-serif;
    font-size:clamp(30px,4.5vw,52px);
    line-height:0.95; color:#fff; letter-spacing:0.02em; margin:0 0 9px;
    text-shadow:0 2px 20px rgba(0,0,0,.45);
    transition:transform 0.32s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .prj-panel:hover .prj-title { transform:translateY(-3px); }

  .prj-desc {
    font-size:clamp(12px,1.3vw,13.5px); line-height:1.72;
    color:rgba(255,255,255,.72); margin:0 0 13px; font-weight:400;
    display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;
  }

  .prj-tags { display:flex; flex-wrap:wrap; gap:5px; }
  .prj-tag {
    font-size:10px; font-weight:600; letter-spacing:0.05em;
    padding:3px 10px; border-radius:99px; backdrop-filter:blur(10px);
    font-family:'Cabinet Grotesk', sans-serif;
    animation:prj-tag-pop 0.3s ease both;
    transition:transform 0.2s;
  }
  .prj-panel:hover .prj-tag { transform:translateY(-1px); }

  /* link buttons */
  .prj-btn-group {
    position:absolute; bottom:clamp(18px,2.5vw,28px); right:clamp(18px,2.5vw,28px);
    display:flex; gap:8px; z-index:6;
  }
  .prj-btn {
    width:42px; height:42px; border-radius:50%;
    display:flex; align-items:center; justify-content:center;
    cursor:pointer; text-decoration:none; border:none;
    transform:scale(0) rotate(-45deg);
    transition:transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s;
  }
  .prj-panel:hover .prj-btn { transform:scale(1) rotate(0deg); }
  .prj-panel:hover .prj-btn:nth-child(2) { transition-delay:0.05s; }

  /* ── PROGRESS ── */
  .prj-progress-wrap {
    max-width:1100px; margin:22px auto 0;
    display:flex; align-items:center; gap:16px;
  }
  .prj-progress-track {
    flex:1; height:2px; border-radius:99px; overflow:hidden; position:relative;
  }
  .prj-progress-bar {
    height:100%; border-radius:99px; position:absolute; left:0; top:0;
    transition:width 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .prj-pulse-dot {
    width:6px; height:6px; border-radius:50%;
    animation:prj-pulse-dot 2s ease-in-out infinite;
    flex-shrink:0;
  }

  /* filter banner */
  .prj-filter-banner {
    max-width:1100px; margin:0 auto 20px;
    display:flex; align-items:center; gap:10px;
    font-size:12px; font-weight:600; letter-spacing:0.05em;
    padding:8px 16px; border-radius:99px; width:fit-content;
    transition:opacity 0.3s;
  }
`;

const PROJECTS = [
  {
    title:"F1Dash", tech:"Next.js",
    description:"Full-stack F1 analytics app with live driver stats, race calendars, and lap telemetry from real F1 APIs.",
    image:"https://i.postimg.cc/RFx66GfX/image.png",
    tags:["React","Next.js","TypeScript","OpenF1 API"],
    accent:"#FF1E00", live:"https://f-juan.vercel.app/",
  },
  {
    title:"Apex F1", tech:"Next.js · Python",
    description:"F1 prediction platform with ML-powered race forecasts and interactive dashboards for historical telemetry.",
    image:"https://i.postimg.cc/Y0tqJ2sF/image.png",
    tags:["Next.js","TypeScript","Supabase","Machine Learning"],
    accent:"#FFBF00", repo:"https://github.com/HanxxFeli/ApexF1",
  },
  {
    title:"BMR Pharmacy", tech:"React · Express",
    description:"Full-stack pharmacy sales tracker with live revenue dashboards backed by Supabase PostgreSQL.",
    image:"https://i.postimg.cc/7LbzW9TW/image.png",
    tags:["React","Node.js","Express","Supabase"],
    accent:"#22c55e", repo:"https://github.com/xndrncp08/bmr-pharmacy",
  },
  {
    title:"WMBA?", tech:"Next.js · PostgreSQL",
    description:"Real-time Calgary bus tracker using live GTFS feeds — map, heatmaps, speed trails, route analytics.",
    image:"https://i.postimg.cc/TPgZcMn1/WMBA.png",
    tags:["Next.js","Prisma","Leaflet","GTFS"],
    accent:"#3b82f6",
  },
  {
    title:"Basketbol", tech:"Next.js",
    description:"NBA games, teams, and player info in a clean interface pulling from multiple sports APIs.",
    image:"https://i.postimg.cc/cL8LRwdT/image.png",
    tags:["React","Next.js","ESPN API","BallDontLie API"],
    accent:"#61DAFB", repo:"https://github.com/xndrncp08/cprg306_basketbol",
  },
  {
    title:"YYC Track", tech:"MERN Stack",
    description:"Transit app for Calgary riders to view stations and track ratings via a Commuter Experience Index.",
    image:"https://i.postimg.cc/1zpCSYZ0/image.png",
    tags:["React","Node.js","MongoDB","Express"],
    accent:"#68A063",
  },
  {
    title:"Gym System", tech:".NET MAUI Blazor",
    description:"Cross-platform gym management with secure auth, membership tracking, and scheduling.",
    image:"https://i.postimg.cc/t4trHsnd/FitZone.png",
    tags:["C#",".NET MAUI Blazor","MariaDB"],
    accent:"#a855f7",
  },
  {
    title:"NV Closet", tech:"UI/UX Design",
    description:"Digital wardrobe app with AI outfit recommendations — intuitive interface, delightful UX.",
    image:"https://i.postimg.cc/Kj2kF8ML/NV.png",
    tags:["Figma","UI/UX","Prototyping"],
    accent:"#EC4899",
  },
  {
    title:"Punch Music", tech:"React Native",
    description:"Music discovery app with Spotify integration — swipe through songs with gesture controls.",
    image:"https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80",
    tags:["React Native","Supabase","Spotify API"],
    accent:"#1DB954",
  },
];

function hexToRgb(h) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h.trim());
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : "99,102,241";
}

function matchesSkill(p, skill) {
  if (!skill) return true;
  const kw = skill.toLowerCase().split(/[\s/]+/)[0].replace('#','sharp');
  return (
    p.tags.some(t => t.toLowerCase().includes(kw)) ||
    p.tech.toLowerCase().includes(kw) ||
    (kw === 'react' && (p.tags.some(t => t.toLowerCase().includes('react')) || p.tech.toLowerCase().includes('react')))
  );
}

/* ── GitHubIcon ── */
const GH = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
);

/* ── ArrowIcon ── */
const AR = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>
  </svg>
);

/* ── Panel ── */
function Panel({ project:p, index:i, filterSkill, dark }) {
  const rgb     = hexToRgb(p.accent);
  const matched = matchesSkill(p, filterSkill);
  return (
    <div
      className="prj-panel"
      style={{
        animationDelay:`${i*55}ms`,
        opacity: matched ? 1 : 0.22,
        transform: matched ? 'scale(1)' : 'scale(0.96)',
      }}
    >
      <img src={p.image} alt={p.title} className="prj-panel-img" draggable={false}/>
      <div className="prj-vignette"/>
      <div className="prj-tint" style={{ background:`linear-gradient(135deg,rgba(${rgb},.2),transparent 60%)` }}/>
      <div className="prj-scan"  style={{ background:`linear-gradient(180deg,transparent,rgba(${rgb},.18),transparent)` }}/>

      <div className="prj-body">
        {/* top */}
        <div className="prj-body-top">
          <span className="prj-index">{String(i+1).padStart(2,"0")}</span>
          <div className="prj-tech-pill" style={{ background:`rgba(${rgb},.2)`, border:`1px solid rgba(${rgb},.4)`, color:p.accent }}>
            {p.tech}
          </div>
        </div>
        {/* bottom */}
        <div className="prj-body-bottom">
          <h3 className="prj-title">{p.title}</h3>
          <p  className="prj-desc">{p.description}</p>
          <div className="prj-tags">
            {p.tags.map((tag,ti) => (
              <span key={tag} className="prj-tag"
                style={{ animationDelay:`${i*55+ti*35}ms`, background:`rgba(${rgb},.18)`, border:`1px solid rgba(${rgb},.28)`, color:p.accent }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* link buttons */}
      {(p.live||p.repo) && (
        <div className="prj-btn-group">
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noopener noreferrer" className="prj-btn"
              style={{ background:"rgba(255,255,255,.14)", border:"1px solid rgba(255,255,255,.22)", color:"#fff", backdropFilter:"blur(12px)" }}
              aria-label="GitHub">
              <GH/>
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noopener noreferrer" className="prj-btn"
              style={{ background:p.accent, color:"#fff", boxShadow:`0 6px 22px rgba(${rgb},.45)` }}
              aria-label="Live site">
              <AR/>
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main ── */
export default function Projects({ isDarkMode: dark }) {
  const trackRef = useRef(null);
  const [active,      setActive]      = useState(0);
  const [isDragging,  setIsDragging]  = useState(false);
  const [filterSkill, setFilterSkill] = useState(null);
  const dragStart = useRef({ x:0, scrollLeft:0 });
  const total = PROJECTS.length;

  /* listen for skill-filter events from Skills */
  useEffect(() => {
    const handler = (e) => {
      const skill = e.detail?.skill || null;
      setFilterSkill(skill);
      if (!skill) return;
      const idx = PROJECTS.findIndex(p => matchesSkill(p, skill));
      if (idx >= 0 && trackRef.current) {
        const pw = (trackRef.current.firstChild?.offsetWidth || 340) + 18;
        trackRef.current.scrollTo({ left: pw * idx, behavior:'smooth' });
      }
    };
    window.addEventListener('skill-filter', handler);
    return () => window.removeEventListener('skill-filter', handler);
  }, []);

  /* scroll → update active */
  const onScroll = useCallback(() => {
    if (!trackRef.current) return;
    const pw = (trackRef.current.firstChild?.offsetWidth || 340) + 18;
    setActive(Math.min(Math.max(Math.round(trackRef.current.scrollLeft / pw), 0), total-1));
  }, [total]);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', onScroll, { passive:true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [onScroll]);

  const scrollTo = useCallback((idx) => {
    if (!trackRef.current) return;
    const pw = (trackRef.current.firstChild?.offsetWidth || 340) + 18;
    trackRef.current.scrollTo({ left: pw * idx, behavior:'smooth' });
  }, []);

  /* drag */
  const onMD = (e) => { setIsDragging(true); dragStart.current={x:e.pageX,scrollLeft:trackRef.current.scrollLeft}; trackRef.current.classList.add('grabbing'); };
  const onMM = (e) => { if (!isDragging) return; trackRef.current.scrollLeft = dragStart.current.scrollLeft-(e.pageX-dragStart.current.x); };
  const onMU = ()  => { setIsDragging(false); trackRef.current?.classList.remove('grabbing'); };

  /* theme */
  const accent   = dark ? '#818cf8'                    : '#4f46e5';
  const bg       = dark ? '#080c14'                    : '#f8f9fc';
  const textHigh = dark ? '#e2e8f0'                    : '#0f172a';
  const muted    = dark ? '#4b5768'                    : '#94a3b8';
  const gridDot  = dark ? 'rgba(255,255,255,0.022)'    : 'rgba(0,0,0,0.028)';
  const navBg    = dark ? 'rgba(255,255,255,0.07)'     : 'rgba(0,0,0,0.06)';
  const navBgH   = dark ? 'rgba(255,255,255,0.13)'     : 'rgba(0,0,0,0.1)';
  const navCol   = dark ? '#e2e8f0'                    : '#1e293b';
  const dotAct   = dark ? '#818cf8'                    : '#4f46e5';
  const dotIn    = dark ? 'rgba(255,255,255,0.14)'     : 'rgba(0,0,0,0.1)';
  const progBg   = dark ? 'rgba(255,255,255,0.07)'     : 'rgba(0,0,0,0.07)';
  const eyeBg    = dark ? 'rgba(99,102,241,.12)'       : 'rgba(99,102,241,.08)';
  const eyeBdr   = dark ? 'rgba(99,102,241,.3)'        : 'rgba(99,102,241,.2)';
  const bannerBg = dark ? 'rgba(99,102,241,.12)'       : 'rgba(99,102,241,.08)';
  const bannerBdr= dark ? 'rgba(99,102,241,.3)'        : 'rgba(99,102,241,.2)';

  const matchCount = filterSkill ? PROJECTS.filter(p => matchesSkill(p, filterSkill)).length : total;

  return (
    <>
      <style>{CSS}</style>

      <section id="projects" className="prj-section" style={{ background:bg }}>
        <div className="prj-grain"/>
        <svg style={{ position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none' }}>
          <defs>
            <pattern id="prj-dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.9" fill={gridDot}/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#prj-dots)"/>
        </svg>

        {/* ── filter banner ── */}
        {filterSkill && (
          <div className="prj-filter-banner" style={{ background:bannerBg, border:`1px solid ${bannerBdr}`, color:accent }}>
            <span style={{ width:5,height:5,borderRadius:'50%',background:accent,display:'inline-block',boxShadow:`0 0 5px ${accent}` }}/>
            Filtering by <strong style={{ marginLeft:3 }}>{filterSkill}</strong>
            <span style={{ marginLeft:2 }}>— {matchCount} project{matchCount!==1?'s':''}</span>
            <button onClick={() => { setFilterSkill(null); window.dispatchEvent(new CustomEvent('skill-filter',{detail:{skill:null}})); }}
              style={{ background:'none',border:'none',cursor:'pointer',color:accent,marginLeft:4,fontSize:14,lineHeight:1,padding:0 }}>✕</button>
          </div>
        )}

        {/* ── HEADER ── */}
        <div className="prj-header">
          <div>
            <div className="prj-eyebrow" style={{ background:eyeBg, border:`1px solid ${eyeBdr}`, color:accent }}>
              <span className="prj-eyebrow-dot" style={{ background:accent, boxShadow:`0 0 6px ${accent}` }}/>
              Portfolio
            </div>
            <h2 className={`prj-headline prj-shimmer-${dark?'dark':'light'}`}>
              Featured<br/>Projects
            </h2>
            <p className="prj-subhead" style={{ color:muted }}>
              A selection of things I've built — drag or swipe to explore.
            </p>
          </div>

          <div className="prj-header-right">
            {/* dots */}
            <div className="prj-dots">
              {PROJECTS.map((_,i) => (
                <div key={i} className="prj-dot" onClick={() => scrollTo(i)}
                  style={{ width:i===active?20:6, background:i===active?dotAct:dotIn }}/>
              ))}
            </div>
            {/* arrows */}
            <button className="prj-nav-btn" style={{ background:navBg }} disabled={active===0}
              onClick={() => scrollTo(active-1)} aria-label="Prev"
              onMouseEnter={e=>e.currentTarget.style.background=navBgH}
              onMouseLeave={e=>e.currentTarget.style.background=navBg}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={navCol} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <button className="prj-nav-btn" style={{ background:navBg }} disabled={active===total-1}
              onClick={() => scrollTo(active+1)} aria-label="Next"
              onMouseEnter={e=>e.currentTarget.style.background=navBgH}
              onMouseLeave={e=>e.currentTarget.style.background=navBg}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={navCol} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
            {/* Bebas counter */}
            <span className="prj-counter" style={{ color:muted }}>
              {String(active+1).padStart(2,"0")}&thinsp;/&thinsp;{String(total).padStart(2,"0")}
            </span>
          </div>
        </div>

        {/* ── TRACK ── */}
        <div className="prj-track-wrap">
          <div ref={trackRef} className="prj-track"
            onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}>
            {PROJECTS.map((p,i) => (
              <Panel key={p.title} project={p} index={i} filterSkill={filterSkill} dark={dark}/>
            ))}
          </div>

          {/* progress */}
          <div className="prj-progress-wrap">
            <div className="prj-pulse-dot" style={{ background:accent }}/>
            <div className="prj-progress-track" style={{ background:progBg }}>
              <div className="prj-progress-bar"
                style={{ background:`linear-gradient(90deg,${accent},#a78bfa)`, width:`${((active+1)/total)*100}%` }}/>
            </div>
            <span style={{ fontSize:11, fontWeight:600, letterSpacing:'0.07em', color:muted, whiteSpace:'nowrap' }}>
              {matchCount} project{matchCount!==1?'s':''}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}