"use client";
import { useRef, useState, useEffect, useCallback } from "react";

const CSS = `
  @keyframes prj-up { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes prj-panel-in { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
  @keyframes prj-scan { 0%{top:0;opacity:0;} 5%{opacity:1;} 95%{opacity:.5;} 100%{top:100%;opacity:0;} }
  @keyframes prj-corner { 0%,100%{opacity:0.6;} 50%{opacity:1;box-shadow:0 0 14px rgba(225,6,0,0.8);} }

  .prj-section { position:relative; z-index:1; padding:clamp(80px,12vw,140px) clamp(20px,4vw,56px); }
  .prj-inner { max-width:1240px; margin:0 auto; }

  .prj-header { display:grid; grid-template-columns:1fr auto; align-items:flex-end; gap:24px; margin-bottom:clamp(28px,4vw,48px); }
  @media (max-width:640px) { .prj-header { grid-template-columns:1fr; } .prj-nav { display:none !important; } }

  .prj-track { display:flex; gap:18px; overflow-x:auto; scroll-snap-type:x mandatory; -webkit-overflow-scrolling:touch; scrollbar-width:none; scroll-behavior:smooth; cursor:none; user-select:none; padding-bottom:4px; }
  .prj-track::-webkit-scrollbar { display:none; }
  .prj-track.grabbing { cursor:none; }

  .prj-panel {
    flex:0 0 clamp(290px,65vw,680px); height:clamp(400px,50vw,540px);
    border-radius:22px; scroll-snap-align:start;
    position:relative; overflow:hidden;
    animation:prj-panel-in 0.55s cubic-bezier(0.16,1,0.3,1) both;
    border:1px solid rgba(255,255,255,0.07);
    transition:all 0.4s ease; flex-shrink:0;
  }
  .prj-panel:hover { border-color:rgba(225,6,0,0.35); box-shadow:0 0 0 1px rgba(225,6,0,0.12),0 30px 80px rgba(0,0,0,0.7),0 0 60px rgba(225,6,0,0.08); transform:translateY(-5px); }
  @media (max-width:640px) { .prj-panel { flex:0 0 calc(100vw - 40px); height:440px; } }

  .prj-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; transition:transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94); z-index:0; }
  .prj-panel:hover .prj-img { transform:scale(1.07); }

  .prj-overlay { position:absolute; inset:0; z-index:2; pointer-events:none; background:linear-gradient(to bottom,rgba(0,0,0,0.1) 0%,rgba(0,0,0,0.05) 28%,rgba(5,5,12,0.62) 62%,rgba(5,5,12,0.97) 100%); }

  .prj-content { position:absolute; inset:0; z-index:4; display:flex; flex-direction:column; justify-content:flex-end; padding:24px; }

  .prj-tech-pill { display:inline-flex; align-items:center; padding:4px 10px; border-radius:6px; font-family:'Bebas Neue',sans-serif; font-size:11px; letterSpacing:'0.14em'; text-transform:uppercase; margin-bottom:10px; width:fit-content; transition:transform 0.3s; }
  .prj-panel:hover .prj-tech-pill { transform:translateY(-2px); }

  .prj-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(1.8rem,3vw,2.6rem); letter-spacing:0.03em; text-transform:uppercase; color:#F2F2F2; margin:0 0 8px; line-height:1; transition:transform 0.3s; }
  .prj-panel:hover .prj-title { transform:translateY(-3px); }

  .prj-desc { font-family:'Barlow',sans-serif; font-size:13px; line-height:1.65; color:rgba(255,255,255,0.55); margin:0 0 12px; max-width:480px; }

  .prj-tags { display:flex; flex-wrap:wrap; gap:5px; }
  .prj-tag { font-family:'Barlow Semi Condensed',sans-serif; font-size:9.5px; font-weight:600; letterSpacing:'0.08em'; padding:3px 9px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.1); border-radius:4px; color:rgba(255,255,255,0.55); text-transform:uppercase; }

  .prj-scan-wrap { position:absolute; inset:0; overflow:hidden; z-index:3; pointer-events:none; }
  .prj-scan-line { position:absolute; left:0; right:0; height:44px; background:linear-gradient(180deg,transparent,rgba(225,6,0,0.06),transparent); animation:prj-scan 5s ease-in-out infinite; opacity:0; transition:opacity 0.3s; }
  .prj-panel:hover .prj-scan-line { opacity:1; }

  .prj-nav-btn { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; cursor:none; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.04); backdrop-filter:blur(12px); transition:all 0.2s; flex-shrink:0; }
  .prj-nav-btn:hover { border-color:rgba(225,6,0,0.5); background:rgba(225,6,0,0.1); transform:scale(1.06); }
  .prj-nav-btn:disabled { opacity:0.18; cursor:none; transform:none; }

  .prj-dot { height:2px; border-radius:1px; cursor:none; transition:all 0.35s cubic-bezier(0.34,1.56,0.64,1); }
`;

const PROJECTS = [
  { title:"F1Dash", tech:"Next.js", description:"Full-stack F1 analytics app with live driver stats, race calendars, and lap telemetry from real F1 APIs.", image:"https://i.postimg.cc/RFx66GfX/image.png", tags:["React","Next.js","TypeScript","OpenF1 API"], accent:"#E10600" },
  { title:"Apex F1", tech:"Next.js · Python", description:"F1 prediction platform with ML-powered race forecasts and interactive dashboards for historical telemetry.", image:"https://i.postimg.cc/Y0tqJ2sF/image.png", tags:["Next.js","TypeScript","Supabase","Machine Learning"], accent:"#FF3A2D" },
  { title:"BMR Pharmacy", tech:"React · Express", description:"Full-stack pharmacy sales tracker with live revenue dashboards backed by Supabase PostgreSQL.", image:"https://i.postimg.cc/7LbzW9TW/image.png", tags:["React","Node.js","Express","Supabase"], accent:"#3ECF8E" },
  { title:"WMBA?", tech:"Next.js · PostgreSQL", description:"Real-time Calgary bus tracker using live GTFS feeds — map, heatmaps, speed trails, route analytics.", image:"https://i.postimg.cc/TPgZcMn1/WMBA.png", tags:["Next.js","Prisma","Leaflet","GTFS"], accent:"#4479A1" },
  { title:"Basketbol", tech:"Next.js", description:"NBA games, teams, and player info in a clean interface pulling from multiple sports APIs.", image:"https://i.postimg.cc/cL8LRwdT/image.png", tags:["React","Next.js","ESPN API","BallDontLie API"], accent:"#F7931A" },
  { title:"YYC Track", tech:"MERN Stack", description:"Transit app for Calgary riders to view stations and track ratings via a Commuter Experience Index.", image:"https://i.postimg.cc/1zpCSYZ0/image.png", tags:["React","Node.js","MongoDB","Express"], accent:"#68A063" },
  { title:"Gym System", tech:".NET MAUI Blazor", description:"Cross-platform gym management with secure auth, membership tracking, and scheduling.", image:"https://i.postimg.cc/t4trHsnd/FitZone.png", tags:["C#",".NET MAUI Blazor","MariaDB"], accent:"#9B59B6" },
  { title:"NV Closet", tech:"UI/UX Design", description:"Digital wardrobe app with AI outfit recommendations — intuitive interface, delightful UX.", image:"https://i.postimg.cc/Kj2kF8ML/NV.png", tags:["Figma","UI/UX","Prototyping"], accent:"#F472B6" },
  { title:"Punch Music", tech:"React Native", description:"Music discovery app with Spotify integration — swipe through songs with gesture controls.", image:"https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&q=80", tags:["React Native","Supabase","Spotify API"], accent:"#1DB954" },
];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '225,6,0';
}

function matches(p, filter) {
  if (!filter) return true;
  const kw = filter.toLowerCase().replace(/ \/ .+/, '').trim();
  return p.tags.some(t => t.toLowerCase().includes(kw)) || p.tech.toLowerCase().includes(kw) ||
    (kw==='react' && (p.tags.some(t=>t.toLowerCase().includes('react')) || p.tech.toLowerCase().includes('react')));
}

function Panel({ project:p, index:i, filterSkill }) {
  const rgb = hexToRgb(p.accent);
  const matched = matches(p, filterSkill);
  return (
    <div className="prj-panel" style={{ animationDelay:`${i*55}ms`, opacity:!matched&&filterSkill?0.18:1, pointerEvents:!matched&&filterSkill?'none':'all' }}>
      <img src={p.image} alt={p.title} className="prj-img" draggable={false} />
      <div className="prj-overlay" />
      <div className="prj-scan-wrap"><div className="prj-scan-line" /></div>
      {/* Corner accent */}
      <div style={{ position:'absolute', top:0, right:0, width:64, height:2.5, background:`linear-gradient(90deg,transparent,${p.accent})`, zIndex:5, animation:'prj-corner 2.5s ease-in-out infinite' }} />
      <div style={{ position:'absolute', top:0, right:0, width:2.5, height:64, background:`linear-gradient(180deg,${p.accent},transparent)`, zIndex:5, animation:'prj-corner 2.5s ease-in-out infinite 0.5s' }} />
      <div className="prj-content">
        <div className="prj-tech-pill" style={{ background:`rgba(${rgb},0.18)`, border:`1px solid rgba(${rgb},0.4)`, color:p.accent }}>
          {p.tech}
        </div>
        <h3 className="prj-title">{p.title}</h3>
        <p className="prj-desc">{p.description}</p>
        <div className="prj-tags">{p.tags.map(t => <span key={t} className="prj-tag">{t}</span>)}</div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef  = useRef(null);
  const trackRef    = useRef(null);
  const [vis, setVis]           = useState(false);
  const [idx, setIdx]           = useState(0);
  const [filter, setFilter]     = useState(null);
  const isDrag = useRef(false);
  const dragX  = useRef(0);
  const scrollX= useRef(0);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:0.06 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    const h = (e) => setFilter(e.detail.skill);
    window.addEventListener('skill-filter', h);
    return () => { obs.disconnect(); window.removeEventListener('skill-filter', h); };
  }, []);

  const pw = useCallback(() => {
    const el = trackRef.current?.querySelector('.prj-panel');
    return el ? el.offsetWidth + 18 : 0;
  }, []);

  const scrollTo = useCallback((n) => {
    const clamped = Math.max(0, Math.min(n, PROJECTS.length - 1));
    setIdx(clamped);
    trackRef.current?.scrollTo({ left: clamped * pw(), behavior:'smooth' });
  }, [pw]);

  const onMD = (e) => { isDrag.current=true; dragX.current=e.pageX; scrollX.current=trackRef.current.scrollLeft; trackRef.current.classList.add('grabbing'); };
  const onMM = (e) => { if (!isDrag.current) return; e.preventDefault(); trackRef.current.scrollLeft = scrollX.current-(e.pageX-dragX.current); };
  const onMU = () => { if (!isDrag.current) return; isDrag.current=false; trackRef.current.classList.remove('grabbing'); const p=pw(); if(p) setIdx(Math.round(trackRef.current.scrollLeft/p)); };

  return (
    <>
      <style>{CSS}</style>
      <section id="projects" className="prj-section" ref={sectionRef}>
        <div style={{ position:'absolute', top:'-8%', right:'-5%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle,rgba(225,6,0,0.07) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }} />

        <div className="prj-inner">
          <div className="prj-header">
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:18, animation:vis?'prj-up 0.6s ease both':'none' }}>
                <div style={{ width:32, height:2, background:'linear-gradient(90deg,#E10600,#FF6B35)', borderRadius:1, boxShadow:'0 0 10px rgba(225,6,0,0.55)' }} />
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, letterSpacing:'0.22em', textTransform:'uppercase', color:'#E10600' }}>{filter?`Filtered — ${filter}`:'Projects'}</span>
              </div>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(3.8rem,9vw,9rem)', letterSpacing:'0.02em', lineHeight:0.88, color:'#F2F2F2', margin:'0 0 8px', animation:vis?'prj-up 0.7s ease 0.08s both':'none' }}>
                Selected<br/>
                <span style={{ background:'linear-gradient(135deg,#E10600,#FF6B35)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', filter:'drop-shadow(0 0 22px rgba(225,6,0,0.4))' }}>Work</span>
              </h2>
              <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:13.5, color:'#3C3C3C', animation:vis?'prj-up 0.7s ease 0.14s both':'none' }}>
                {filter ? `${PROJECTS.filter(p=>matches(p,filter)).length} project${PROJECTS.filter(p=>matches(p,filter)).length!==1?'s':''} using ${filter}` : `${PROJECTS.length} projects — full-stack, mobile & design`}
              </p>
            </div>

            <div className="prj-nav" style={{ display:'flex', flexDirection:'column', gap:12, alignItems:'flex-end' }}>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:20, color:'#F2F2F2', letterSpacing:'0.06em', minWidth:60, textAlign:'right' }}>
                  {String(idx+1).padStart(2,'0')}<span style={{ color:'#1C1C1C' }}>/{String(PROJECTS.length).padStart(2,'0')}</span>
                </span>
                <button className="prj-nav-btn" onClick={() => scrollTo(idx-1)} disabled={idx===0}>
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none"><path d="M4.5 1L1 5l3.5 4M1 5h11" stroke="#F2F2F2" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
                <button className="prj-nav-btn" onClick={() => scrollTo(idx+1)} disabled={idx===PROJECTS.length-1}>
                  <svg width="13" height="10" viewBox="0 0 13 10" fill="none"><path d="M8.5 1L12 5l-3.5 4M12 5H1" stroke="#F2F2F2" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div style={{ display:'flex', gap:5, alignItems:'center' }}>
                {PROJECTS.map((_,i) => (
                  <div key={i} className="prj-dot" onClick={() => scrollTo(i)} style={{ width:i===idx?22:6, background:i===idx?'#E10600':'rgba(255,255,255,0.14)' }} />
                ))}
              </div>
            </div>
          </div>

          <div ref={trackRef} className="prj-track" onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}>
            {PROJECTS.map((p,i) => <Panel key={p.title} project={p} index={i} filterSkill={filter} />)}
          </div>

          {filter && (
            <div style={{ marginTop:18, display:'flex', alignItems:'center', gap:12, padding:'12px 18px', background:'rgba(225,6,0,0.06)', border:'1px solid rgba(225,6,0,0.18)', borderRadius:12 }}>
              <div style={{ width:5, height:5, borderRadius:'50%', background:'#E10600', boxShadow:'0 0 8px #E10600' }} />
              <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:13, color:'#5A5A5A', flex:1 }}>
                Filtered by <strong style={{ color:'#F2F2F2' }}>{filter}</strong>
              </span>
              <button onClick={() => { setFilter(null); window.dispatchEvent(new CustomEvent('skill-filter',{detail:{skill:null}})); }} style={{ background:'none', border:'1px solid rgba(255,255,255,0.1)', borderRadius:8, cursor:'none', color:'#555', padding:'4px 12px', fontFamily:"'Bebas Neue',sans-serif", fontSize:11, letterSpacing:'0.12em', textTransform:'uppercase', transition:'all 0.2s' }} onMouseEnter={e=>{e.currentTarget.style.color='#F2F2F2';e.currentTarget.style.borderColor='rgba(255,255,255,0.28)';}} onMouseLeave={e=>{e.currentTarget.style.color='#555';e.currentTarget.style.borderColor='rgba(255,255,255,0.1)';}}>
                Clear
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
