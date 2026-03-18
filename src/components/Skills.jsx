'use client';
import { useState, useEffect, useRef } from 'react';

const CSS = `
  @keyframes sk-up { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
  @keyframes sk-chip-in { from { opacity:0; transform:scale(0.84) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
  @keyframes sk-scan { 0%{top:-2%;opacity:0;} 5%{opacity:1;} 95%{opacity:0.5;} 100%{top:100%;opacity:0;} }
  @keyframes sk-pulse { 0%,100%{box-shadow:0 0 0 1px rgba(225,6,0,0.1),0 24px 80px rgba(0,0,0,0.5);} 50%{box-shadow:0 0 0 1px rgba(225,6,0,0.3),0 24px 80px rgba(0,0,0,0.7),0 0 50px rgba(225,6,0,0.07);} }
  @keyframes sk-bar { from { width:0; } }

  .sk-section { position:relative; z-index:1; padding:clamp(80px,12vw,140px) clamp(20px,4vw,56px); }
  .sk-layout { display:grid; grid-template-columns:1fr 1fr; gap:clamp(40px,5vw,72px); align-items:start; max-width:1240px; margin:0 auto; }
  @media (max-width:768px) { .sk-layout { grid-template-columns:1fr; } }

  .sk-left { position:sticky; top:clamp(80px,10vw,120px); }
  @media (max-width:768px) { .sk-left { position:static; } }

  .sk-glass {
    background:rgba(255,255,255,0.022); backdrop-filter:blur(28px) saturate(180%); -webkit-backdrop-filter:blur(28px) saturate(180%);
    border:1px solid rgba(255,255,255,0.07); border-radius:26px; padding:clamp(24px,3.5vw,42px);
    position:relative; overflow:hidden; animation:sk-pulse 4.5s ease-in-out infinite;
  }
  .sk-glass::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(225,6,0,0.6),rgba(255,107,53,0.4),transparent); }

  .sk-cat-label { fontFamily:"'Bebas Neue',sans-serif"; font-size:9px; font-weight:700; letter-spacing:0.22em; text-transform:uppercase; color:#222; margin:22px 0 10px; }
  .sk-cat-label:first-child { margin-top:0; }

  .sk-chips { display:flex; flex-wrap:wrap; gap:8px; }
  .sk-chip {
    display:inline-flex; align-items:center; gap:8px;
    padding:9px 14px; border-radius:10px;
    font-family:'Barlow Semi Condensed',sans-serif; font-size:12.5px; font-weight:600; letter-spacing:0.03em;
    border:1px solid transparent; cursor:none; position:relative; overflow:hidden;
    transition:all 0.25s cubic-bezier(0.16,1,0.3,1);
    animation:sk-chip-in 0.4s cubic-bezier(0.16,1,0.3,1) both;
  }
  .sk-chip::before { content:''; position:absolute; top:0; left:0; width:3px; height:0; transition:height 0.25s ease; }
  .sk-chip:hover::before, .sk-chip.active::before { height:100%; }
  .sk-chip:hover { transform:translateY(-2px); }
  .sk-chip.active { transform:translateY(-1px); }
  .sk-chip-icon { font-size:15px; line-height:1; flex-shrink:0; }
  .sk-divider { height:1px; background:rgba(255,255,255,0.05); border:none; margin:18px 0; }

  .sk-stats-row { display:flex; gap:0; border-top:1px solid rgba(255,255,255,0.05); border-bottom:1px solid rgba(255,255,255,0.05); margin:28px 0; }
  .sk-stat { flex:1; padding:18px 0; border-right:1px solid rgba(255,255,255,0.05); }
  .sk-stat:last-child { border-right:none; }
`;

const SKILLS = [
  { name:'JavaScript',            icon:'bx bxl-javascript',   color:'#F7DF1E', cat:'Languages' },
  { name:'TypeScript',            icon:'bx bxl-typescript',   color:'#3178C6', cat:'Languages' },
  { name:'Python',                icon:'bx bxl-python',       color:'#3776AB', cat:'Languages' },
  { name:'Java',                  icon:'bx bxl-java',         color:'#F89820', cat:'Languages' },
  { name:'C#',                    icon:'devicon-csharp-plain', color:'#9B59B6', cat:'Languages' },
  { name:'React / React Native',  icon:'bx bxl-react',        color:'#61DAFB', cat:'Frontend'  },
  { name:'Vue.js',                icon:'bx bxl-vuejs',        color:'#42B883', cat:'Frontend'  },
  { name:'HTML / CSS / Tailwind', icon:'bx bxl-html5',        color:'#E34F26', cat:'Frontend'  },
  { name:'Node.js / Express',     icon:'bx bxl-nodejs',       color:'#68A063', cat:'Backend'   },
  { name:'MongoDB',               icon:'bx bxl-mongodb',      color:'#47A248', cat:'Data'      },
  { name:'MySQL / PL/SQL',        icon:'bx bxs-data',         color:'#4479A1', cat:'Data'      },
  { name:'Supabase',              icon:'bx bx-cloud',         color:'#3ECF8E', cat:'Data'      },
  { name:'Git',                   icon:'bx bxl-git',          color:'#F05032', cat:'Tooling'   },
];
const CATS = ['Languages','Frontend','Backend','Data','Tooling'];

function hexToRgb(hex) {
  const r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return r ? `${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}` : '225,6,0';
}

export default function Skills() {
  const sectionRef = useRef(null);
  const [vis, setVis] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [active, setActive]   = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleClick = (skill) => {
    const next = active === skill.name ? null : skill.name;
    setActive(next);
    window.dispatchEvent(new CustomEvent('skill-filter', { detail:{ skill:next } }));
    if (next) setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior:'smooth', block:'start' }), 100);
  };

  return (
    <>
      <style>{CSS}</style>
      <section id="skills" className="sk-section" ref={sectionRef}>
        <div style={{ position:'absolute', bottom:'-8%', right:'-5%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(225,6,0,0.07) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }} />

        <div className="sk-layout">
          {/* ── Left editorial ── */}
          <div className="sk-left">
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24, animation:vis?'sk-up 0.6s ease both':'none' }}>
              <div style={{ width:32, height:2, background:'linear-gradient(90deg,#E10600,#FF6B35)', borderRadius:1, boxShadow:'0 0 10px rgba(225,6,0,0.55)' }} />
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, letterSpacing:'0.22em', textTransform:'uppercase', color:'#E10600' }}>Tech Stack</span>
            </div>

            <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(3.8rem,9vw,9rem)', letterSpacing:'0.02em', lineHeight:0.88, color:'#F2F2F2', margin:'0 0 20px', animation:vis?'sk-up 0.7s ease 0.08s both':'none' }}>
              Skills &amp;<br/>
              <span style={{ background:'linear-gradient(135deg,#E10600,#FF6B35)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', filter:'drop-shadow(0 0 22px rgba(225,6,0,0.4))' }}>Tech</span>
            </h2>

            <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:15, lineHeight:1.78, color:'#5C5C5C', animation:vis?'sk-up 0.7s ease 0.15s both':'none' }}>
              Languages, frameworks, and tools I reach for when building things that matter. Click any skill to filter matching projects.
            </p>

            <div className="sk-stats-row" style={{ animation:vis?'sk-up 0.7s ease 0.22s both':'none' }}>
              {[{ n:SKILLS.length, l:'Technologies' },{ n:CATS.length, l:'Categories' },{ n:'3+', l:'Years exp.' }].map(s => (
                <div key={s.l} className="sk-stat">
                  <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:36, color:'#F2F2F2', lineHeight:1 }}>{s.n}</div>
                  <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:9.5, color:'#3C3C3C', letterSpacing:'0.1em', textTransform:'uppercase', marginTop:3 }}>{s.l}</div>
                </div>
              ))}
            </div>

            <div style={{ display:'flex', alignItems:'center', gap:8, fontFamily:"'Barlow',sans-serif", fontSize:11.5, color:'#2A2A2A', animation:vis?'sk-up 0.7s ease 0.3s both':'none' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:active?'#E10600':'#222', boxShadow:active?'0 0 8px #E10600':'none', flexShrink:0, transition:'all 0.3s' }} />
              {active ? `Showing projects using ${active} — click to clear` : 'Click a skill to filter projects below'}
            </div>

            {active && (
              <div style={{ marginTop:14, padding:'10px 16px', background:'rgba(225,6,0,0.07)', border:'1px solid rgba(225,6,0,0.22)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'space-between', animation:'sk-up 0.3s ease both' }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, letterSpacing:'0.1em', color:'#E10600' }}>Filter: {active}</span>
                <button onClick={() => { setActive(null); window.dispatchEvent(new CustomEvent('skill-filter',{detail:{skill:null}})); }} style={{ background:'none', border:'none', cursor:'none', color:'#E10600', fontSize:18, lineHeight:1, padding:0 }}>×</button>
              </div>
            )}
          </div>

          {/* ── Right chip card ── */}
          <div>
            <div className="sk-glass">
              {/* Scan line */}
              <div style={{ position:'absolute', left:0, right:0, height:48, pointerEvents:'none', zIndex:1, animation:'sk-scan 9s ease-in-out infinite', background:'linear-gradient(180deg,transparent,rgba(225,6,0,0.04),transparent)' }} />

              <div style={{ position:'relative', zIndex:2 }}>
                {CATS.map(cat => {
                  const group = SKILLS.filter(s => s.cat === cat);
                  return (
                    <div key={cat}>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:9, letterSpacing:'0.22em', textTransform:'uppercase', color:'#222', margin:'22px 0 10px' }}
                           className="sk-cat-label">{cat}</div>
                      <div className="sk-chips">
                        {group.map((skill, gi) => {
                          const isH = hovered === skill.name;
                          const isA = active  === skill.name;
                          const rgb = hexToRgb(skill.color);
                          return (
                            <div key={skill.name}
                              className={`sk-chip${isA?' active':''}`}
                              style={{ '--chip-color':skill.color, animationDelay:`${gi*36}ms`, background:(isH||isA)?`rgba(${rgb},0.1)`:'rgba(255,255,255,0.03)', borderColor:isA?`rgba(${rgb},0.7)`:isH?`rgba(${rgb},0.4)`:'rgba(255,255,255,0.07)', color:(isH||isA)?skill.color:'#666', boxShadow:isA?`0 0 0 2px rgba(${rgb},0.22),0 8px 24px rgba(${rgb},0.2)`:isH?`0 5px 18px rgba(${rgb},0.15)`:'none' }}
                              onMouseEnter={() => setHovered(skill.name)}
                              onMouseLeave={() => setHovered(null)}
                              onClick={() => handleClick(skill)}
                            >
                              <i className={`sk-chip-icon ${skill.icon}`} style={{ color:(isH||isA)?skill.color:'#3A3A3A', filter:(isH||isA)?`drop-shadow(0 0 5px rgba(${rgb},0.6))`:'none', transition:'all 0.2s' }} />
                              {skill.name}
                              <style>{`.sk-chip::before { background: ${skill.color}; }`}</style>
                            </div>
                          );
                        })}
                      </div>
                      {cat !== CATS[CATS.length-1] && <hr className="sk-divider" />}
                    </div>
                  );
                })}
              </div>

              <div style={{ display:'flex', alignItems:'center', gap:12, marginTop:20, borderTop:'1px solid rgba(255,255,255,0.05)', paddingTop:18 }}>
                <div style={{ flex:1, height:1, background:'rgba(225,6,0,0.14)' }} />
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:10, letterSpacing:'0.18em', color:'#222' }}>{active?'1 filter active':`${SKILLS.length} technologies`}</span>
                <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.04)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
