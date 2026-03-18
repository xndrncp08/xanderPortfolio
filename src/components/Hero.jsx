'use client';
import { useState, useEffect } from 'react';
import TypingEffect from './TypingEffect';
import ProfileEffect from './ProfileEffect';

const CSS = `
  @keyframes h-up   { from { opacity:0; transform:translateY(40px); } to { opacity:1; transform:translateY(0); } }
  @keyframes h-left { from { opacity:0; transform:translateX(-30px); } to { opacity:1; transform:translateX(0); } }
  @keyframes h-rpm  { from { width:0; } }
  @keyframes h-pulse-dot { 0%,100% { transform:scale(1); opacity:1; } 50% { transform:scale(2); opacity:0; } }
  @keyframes h-shimmer { 0% { background-position:-300% center; } 100% { background-position:300% center; } }
  @keyframes h-line { from { transform:scaleX(0); } to { transform:scaleX(1); } }
  @keyframes h-breathe { 0%,100% { opacity:0.5; transform:scale(1); } 50% { opacity:1; transform:scale(1.04); } }
  @keyframes h-float { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
  @keyframes h-badge { from { opacity:0; transform:translateY(8px) scale(0.92); } to { opacity:1; transform:translateY(0) scale(1); } }
  @keyframes h-scan  { 0%{top:-10%;opacity:0;} 5%{opacity:0.8;} 95%{opacity:0.3;} 100%{top:110%;opacity:0;} }

  .h-section {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    padding: clamp(110px,14vw,160px) clamp(20px,4vw,56px) clamp(48px,7vw,88px);
    position: relative; z-index: 1; overflow: hidden;
  }
  .h-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: clamp(48px,7vw,110px);
    align-items: center;
    max-width: 1240px;
    margin: 0 auto; width: 100%;
  }
  @media (max-width: 860px) {
    .h-grid { grid-template-columns:1fr; gap:56px; text-align:center; }
    .h-avatar-col { order:-1; display:flex; justify-content:center; }
    .h-btns { justify-content:center !important; }
    .h-socials { justify-content:center !important; }
    .h-role-row { justify-content:center !important; }
  }

  .h-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(5.5rem,14vw,13rem);
    line-height: 0.84;
    letter-spacing: 0.02em;
    margin: 0;
    animation: h-up 0.9s cubic-bezier(0.16,1,0.3,1) 0.1s both;
  }
  .h-name-white {
    background: linear-gradient(90deg, #F2F2F2 20%, #fff 40%, #aaa 50%, #fff 60%, #F2F2F2 80%);
    background-size: 300% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: h-shimmer 5s linear 1.2s infinite;
  }
  .h-name-red {
    background: linear-gradient(135deg, #E10600 0%, #FF6B35 45%, #E10600 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    animation: h-shimmer 3s linear 1.5s infinite;
    filter: drop-shadow(0 0 28px rgba(225,6,0,0.55));
  }

  .h-stat-bar {
    display: flex; gap: 0;
    background: rgba(255,255,255,0.018);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 18px; overflow: hidden; position: relative;
    max-width: 1240px; margin: clamp(36px,5vw,60px) auto 0; width: 100%;
  }
  .h-stat-bar::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background: linear-gradient(90deg, transparent, rgba(225,6,0,0.7), rgba(255,107,53,0.5), transparent);
  }
  .h-stat { flex:1; padding:clamp(14px,2vw,22px) clamp(14px,2.5vw,26px); border-right:1px solid rgba(255,255,255,0.04); }
  .h-stat:last-child { border-right:none; }

  .h-rpm { height:2px; background:rgba(255,255,255,0.05); border-radius:1px; margin-top:8px; overflow:hidden; }
  .h-rpm-fill { height:100%; border-radius:1px; background:linear-gradient(90deg,#E10600,#FF6B35); animation:h-rpm 1.6s cubic-bezier(0.16,1,0.3,1) both; box-shadow:0 0 10px rgba(225,6,0,0.7); }

  .h-float-badge {
    position:absolute;
    background: rgba(6,6,12,0.88);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px; padding: 10px 14px;
    white-space: nowrap; z-index: 5;
  }
  .h-fb-1 { animation: h-badge 0.6s cubic-bezier(0.16,1,0.3,1) 1.1s both; }
  .h-fb-2 { animation: h-badge 0.6s cubic-bezier(0.16,1,0.3,1) 1.3s both; }
  .h-fb-3 { animation: h-badge 0.6s cubic-bezier(0.16,1,0.3,1) 1.5s both; }
  @media (max-width:860px) { .h-float-badge { display:none; } }
`;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [xanderDone, setXanderDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  const stats = [
    { label: 'GPA', value: '3.4', sub: '/ 4.0 SAIT', fill: 85, delay: '0.95s' },
    { label: 'Projects', value: '9+', sub: 'full-stack', fill: 78, delay: '1.05s' },
    { label: 'Internships', value: '2', sub: 'completed', fill: 100, delay: '1.15s' },
    { label: 'Location', value: 'YYC', sub: 'Calgary, CA', fill: null, delay: '1.25s' },
  ];

  const roles = ['Software Developer', 'Full-Stack Engineer', 'React Developer', 'Problem Solver'];

  return (
    <>
      <style>{CSS}</style>
      <section className="h-section">
        {/* Breathing glow */}
        {mounted && (
          <div style={{ position:'absolute', top:'5%', right:'-8%', width:750, height:750, borderRadius:'50%', background:'radial-gradient(circle, rgba(225,6,0,0.13) 0%, rgba(225,6,0,0.03) 55%, transparent 75%)', pointerEvents:'none', animation:'h-breathe 5s ease-in-out infinite', zIndex:0 }} />
        )}

        {/* Sector HUD */}
        {mounted && (
          <div style={{ position:'absolute', top:88, left:'clamp(20px,4vw,56px)', display:'flex', alignItems:'center', gap:12, zIndex:2, animation:'h-left 0.7s ease 0.2s both' }}>
            {['S1','S2','S3'].map((s,i) => (
              <div key={s} style={{ display:'flex', alignItems:'center', gap:5 }}>
                <div style={{ width:5, height:5, borderRadius:'50%', background:i===0?'#E10600':'#1A1A1A', boxShadow:i===0?'0 0 10px #E10600':'none' }} />
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, letterSpacing:'0.14em', color:i===0?'#E10600':'#222' }}>{s}</span>
              </div>
            ))}
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:10, color:'#1C1C1C', letterSpacing:'0.12em' }}>· LAP 01</span>
          </div>
        )}

        <div className="h-grid">
          {/* ── Left ── */}
          <div>
            {/* Role typing */}
            {mounted && (
              <div className="h-role-row" style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18, animation:'h-left 0.7s ease 0.3s both' }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:'#E10600', boxShadow:'0 0 14px #E10600', animation:'h-pulse-dot 2.4s ease-in-out infinite' }} />
                <TypingEffect
                  text={roles}
                  as="span"
                  typingSpeed={55}
                  deletingSpeed={28}
                  pauseDuration={2200}
                  loop
                  showCursor
                  cursorCharacter="_"
                  cursorClassName=""
                  style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:'0.22em', textTransform:'uppercase', color:'#E10600' }}
                />
              </div>
            )}

            {/* Name */}
            <h1 className="h-name" style={{ minHeight: 'clamp(9.5rem,28vw,24rem)' }}>
              <span className="h-name-white">
                <TypingEffect
                  text="Xander"
                  as="span"
                  typingSpeed={80}
                  initialDelay={400}
                  loop={false}
                  showCursor={false}
                  onSentenceComplete={() => setXanderDone(true)}
                />
              </span>
              <br />
              <span className="h-name-red">
                {xanderDone && (
                  <TypingEffect
                    text="Rancap"
                    as="span"
                    typingSpeed={80}
                    initialDelay={0}
                    loop={false}
                    showCursor
                    cursorCharacter="_"
                    cursorClassName=""
                    pauseDuration={99999999}
                  />
                )}
              </span>
            </h1>

            {/* Red divider */}
            {mounted && (
              <div style={{ height:2.5, width:'min(300px,75%)', background:'linear-gradient(90deg,#E10600,#FF6B35,transparent)', borderRadius:2, margin:'22px 0', transformOrigin:'left', animation:'h-line 0.9s cubic-bezier(0.16,1,0.3,1) 0.65s both', boxShadow:'0 0 14px rgba(225,6,0,0.55)' }} />
            )}

            {/* Bio */}
            {mounted && (
              <p style={{ fontFamily:"'Barlow',sans-serif", fontSize:16, lineHeight:1.82, color:'#5A5A5A', maxWidth:480, animation:'h-up 0.7s ease 0.75s both' }}>
                Building elegant, full-stack solutions where great design meets solid engineering.
                Currently studying at SAIT — always pushing the limits.
              </p>
            )}

            {/* CTA Buttons */}
            {mounted && (
              <div className="h-btns" style={{ display:'flex', gap:12, marginTop:34, flexWrap:'wrap', animation:'h-up 0.7s ease 0.88s both' }}>
                <button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior:'smooth' })}
                  style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', padding:'14px 30px', background:'linear-gradient(135deg,#E10600,#FF3A2D)', color:'#fff', border:'none', borderRadius:100, cursor:'none', display:'flex', alignItems:'center', gap:8, boxShadow:'0 0 32px rgba(225,6,0,0.4), 0 4px 20px rgba(0,0,0,0.4)', transition:'all 0.22s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px) scale(1.04)'; e.currentTarget.style.boxShadow='0 0 56px rgba(225,6,0,0.7), 0 8px 32px rgba(0,0,0,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 0 32px rgba(225,6,0,0.4), 0 4px 20px rgba(0,0,0,0.4)'; }}
                >
                  Get in Touch
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none"><path d="M7.5 1l4 3.5-4 3.5M11.5 4.5H.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </button>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' })}
                  style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:800, fontSize:12, letterSpacing:'0.2em', textTransform:'uppercase', padding:'13px 28px', background:'rgba(255,255,255,0.04)', color:'rgba(255,255,255,0.65)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:100, cursor:'none', backdropFilter:'blur(14px)', transition:'all 0.22s' }}
                  onMouseEnter={e => { e.currentTarget.style.background='rgba(255,255,255,0.09)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.22)'; e.currentTarget.style.color='#fff'; e.currentTarget.style.transform='translateY(-2px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.1)'; e.currentTarget.style.color='rgba(255,255,255,0.65)'; e.currentTarget.style.transform='none'; }}
                >
                  View Work
                </button>
              </div>
            )}

            {/* Socials */}
            {mounted && (
              <div className="h-socials" style={{ display:'flex', gap:14, marginTop:28, alignItems:'center', animation:'h-up 0.7s ease 1s both' }}>
                <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:11, letterSpacing:'0.2em', color:'#1C1C1C' }}>Links</span>
                <div style={{ width:22, height:1, background:'rgba(255,255,255,0.07)' }} />
                {[
                  { icon:'bx bxl-linkedin', url:'https://www.linkedin.com/in/xander-rancap-79b2a0326/', label:'LinkedIn' },
                  { icon:'bx bxl-github',   url:'https://github.com/xndrncp08', label:'GitHub' },
                  { icon:'bx bxl-instagram',url:'https://www.instagram.com/derbadoobeelat/', label:'Instagram' },
                ].map(s => (
                  <a key={s.icon} href={s.url} target="_blank" rel="noreferrer" title={s.label}
                    style={{ width:38, height:38, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)', color:'#444', fontSize:18, backdropFilter:'blur(10px)', transition:'all 0.25s', textDecoration:'none', cursor:'none' }}
                    onMouseEnter={e => { e.currentTarget.style.color='#E10600'; e.currentTarget.style.borderColor='rgba(225,6,0,0.45)'; e.currentTarget.style.background='rgba(225,6,0,0.1)'; e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 0 22px rgba(225,6,0,0.3)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color='#444'; e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.background='rgba(255,255,255,0.04)'; e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}
                  ><i className={s.icon} /></a>
                ))}
              </div>
            )}
          </div>

          {/* ── Right — Avatar ── */}
          <div className="h-avatar-col">
            {mounted && (
              <div style={{ position:'relative', display:'inline-block', animation:'h-float 6s ease-in-out infinite 1.2s' }}>
                {/* Spinning rings */}
                {[{ s:420, dur:'14s', dir:1 }, { s:360, dur:'9s', dir:-1 }].map((r,i) => (
                  <div key={i} style={{ position:'absolute', width:r.s, height:r.s, borderRadius:'50%', border:i===0?'1px dashed rgba(225,6,0,0.18)':'1px solid rgba(255,255,255,0.04)', top:'50%', left:'50%', marginLeft:-r.s/2, marginTop:-r.s/2, animation:`h-line ${r.dur} linear infinite`, animationDirection:r.dir===1?'normal':'reverse', animationName:'spin-ring', pointerEvents:'none' }} />
                ))}
                <style>{`@keyframes spin-ring { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`}</style>

                {/* Floating badges */}
                <div className="h-float-badge h-fb-1" style={{ top:'8%', left:'-135px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:28, height:28, borderRadius:8, background:'rgba(97,218,251,0.1)', border:'1px solid rgba(97,218,251,0.22)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <i className="bx bxl-react" style={{ color:'#61DAFB', fontSize:16 }} />
                    </div>
                    <div>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, color:'#F2F2F2', letterSpacing:'0.06em' }}>React</div>
                      <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:9, color:'#444' }}>Frontend</div>
                    </div>
                  </div>
                </div>

                <div className="h-float-badge h-fb-2" style={{ bottom:'18%', right:'-125px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:28, height:28, borderRadius:8, background:'rgba(104,160,99,0.1)', border:'1px solid rgba(104,160,99,0.22)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <i className="bx bxl-nodejs" style={{ color:'#68A063', fontSize:16 }} />
                    </div>
                    <div>
                      <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:11, fontWeight:700, color:'#F2F2F2', letterSpacing:'0.06em' }}>Node.js</div>
                      <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:9, color:'#444' }}>Backend</div>
                    </div>
                  </div>
                </div>

                <div className="h-float-badge h-fb-3" style={{ top:'-8%', right:'-90px' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                    <div style={{ width:5, height:5, borderRadius:'50%', background:'#E10600', boxShadow:'0 0 8px #E10600' }} />
                    <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, color:'#E10600', letterSpacing:'0.1em' }}>SAIT · 3.4 GPA</span>
                  </div>
                </div>

                {/* ProfileEffect wrapping the image */}
                <ProfileEffect color="#E10600" speed={0.9} chaos={0.1} borderRadius={20}>
                  <div style={{ position:'relative', display:'inline-block' }}>
                    <img
                      src="https://i.postimg.cc/W3VBJZ1Q/derpogs-(1).jpg"
                      alt="Xander Rancap"
                      style={{ display:'block', width:'clamp(210px,22vw,280px)', height:'clamp(210px,22vw,280px)', objectFit:'cover', borderRadius:20, filter:'contrast(1.08) brightness(0.9)' }}
                    />
                    {/* Scan line */}
                    <div style={{ position:'absolute', inset:0, overflow:'hidden', borderRadius:20, pointerEvents:'none' }}>
                      <div style={{ position:'absolute', left:0, right:0, height:50, background:'linear-gradient(180deg,transparent,rgba(225,6,0,0.08),transparent)', animation:'h-scan 3.8s ease-in-out infinite' }} />
                    </div>
                    {/* GitHub badge inside frame */}
                    <div style={{ position:'absolute', bottom:-18, left:'50%', transform:'translateX(-50%)', background:'linear-gradient(135deg,rgba(6,6,14,0.96),rgba(12,8,8,0.96))', backdropFilter:'blur(24px)', border:'1px solid rgba(225,6,0,0.3)', borderRadius:100, padding:'6px 18px', display:'flex', alignItems:'center', gap:8, whiteSpace:'nowrap', boxShadow:'0 8px 32px rgba(0,0,0,0.6), 0 0 22px rgba(225,6,0,0.15)', zIndex:10 }}>
                      <i className="bx bxl-github" style={{ fontSize:14, color:'#E10600' }} />
                      <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, letterSpacing:'0.12em', color:'#F2F2F2' }}>xndrncp08</span>
                    </div>
                  </div>
                </ProfileEffect>
              </div>
            )}
          </div>
        </div>

        {/* Stats bar */}
        {mounted && (
          <div className="h-stat-bar">
            {stats.map((s, i) => (
              <div key={s.label} className="h-stat" style={{ animation:`h-up 0.6s ease ${s.delay} both` }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:10, letterSpacing:'0.22em', textTransform:'uppercase', color:'#2A2A2A', marginBottom:5 }}>{s.label}</div>
                <div style={{ display:'flex', alignItems:'baseline', gap:5 }}>
                  <span style={{ fontFamily:"'Barlow Condensed',sans-serif", fontWeight:900, fontSize:'clamp(1.4rem,3vw,2rem)', color:'#F2F2F2', lineHeight:1 }}>{s.value}</span>
                  <span style={{ fontFamily:"'Barlow',sans-serif", fontSize:10, color:'#3A3A3A' }}>{s.sub}</span>
                </div>
                {s.fill !== null && (
                  <div className="h-rpm">
                    <div className="h-rpm-fill" style={{ width:`${s.fill}%`, animationDelay:`${1.3 + i * 0.13}s`, animationDuration:'1.5s' }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}