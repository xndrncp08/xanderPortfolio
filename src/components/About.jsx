'use client';
import { useState, useEffect, useRef } from 'react';

const CSS = `
  @keyframes ab-up { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
  @keyframes ab-bar { from { width:0; } }
  @keyframes ab-card-pulse {
    0%,100% { box-shadow: 0 0 0 1px rgba(225,6,0,0.08), 0 20px 60px rgba(0,0,0,0.45); }
    50%      { box-shadow: 0 0 0 1px rgba(225,6,0,0.28), 0 24px 70px rgba(0,0,0,0.6), 0 0 40px rgba(225,6,0,0.07); }
  }

  .ab-section { position:relative; z-index:1; padding:clamp(80px,12vw,140px) clamp(20px,4vw,56px); }

  .ab-glass {
    background: rgba(255,255,255,0.022);
    backdrop-filter: blur(28px) saturate(180%); -webkit-backdrop-filter: blur(28px) saturate(180%);
    border: 1px solid rgba(255,255,255,0.07); border-radius: 26px; overflow:hidden; position:relative;
    animation: ab-card-pulse 4.5s ease-in-out infinite;
  }
  .ab-glass::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(225,6,0,0.55),rgba(255,107,53,0.35),transparent); }

  .ab-hcard {
    background: rgba(255,255,255,0.018); backdrop-filter:blur(16px); -webkit-backdrop-filter:blur(16px);
    border:1px solid rgba(255,255,255,0.06); border-radius:18px; padding:22px 20px;
    position:relative; overflow:hidden; cursor:default; transition:all 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .ab-hcard::after { content:''; position:absolute; bottom:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#E10600,#FF6B35); transform:scaleX(0); transform-origin:left; transition:transform 0.35s cubic-bezier(0.16,1,0.3,1); }
  .ab-hcard:hover { border-color:rgba(225,6,0,0.2); transform:translateY(-5px); background:rgba(225,6,0,0.04); box-shadow:0 22px 60px rgba(0,0,0,0.5), 0 0 28px rgba(225,6,0,0.06); }
  .ab-hcard:hover::after { transform:scaleX(1); }

  .ab-stat {
    flex:1; min-width:100px; padding:20px 16px; text-align:center; cursor:default;
    background:rgba(255,255,255,0.018); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.06); border-radius:14px;
    position:relative; overflow:hidden; transition:all 0.3s ease;
  }
  .ab-stat::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,#E10600,#FF6B35); transform:scaleY(0); transform-origin:top; transition:transform 0.3s; }
  .ab-stat:hover { border-color:rgba(225,6,0,0.35); transform:translateY(-5px); box-shadow:0 18px 50px rgba(0,0,0,0.5), 0 0 28px rgba(225,6,0,0.1); }
  .ab-stat:hover::before { transform:scaleY(1); }

  .ab-grid { display:grid; grid-template-columns:1fr 1fr; gap:clamp(36px,5vw,72px); align-items:start; }
  .ab-hgrid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
  @media (max-width:768px) { .ab-grid { grid-template-columns:1fr; } }
  @media (max-width:440px) { .ab-hgrid { grid-template-columns:1fr; } }
`;

export default function About() {
  const sectionRef = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold:0.08 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const paras = [
    { pre:"I'm ", bold:'Xander Rancap', rest:", a software developer at SAIT (3.4 GPA). I build clean, practical things where great design meets solid engineering." },
    { pre:'My internship at ', bold:'Eduspec Holdings Berhad', rest:' in Metro Manila put me hands-on with Arduino, SAM Labs, and VEX Robotics — bridging hardware and software.' },
    { pre:"I've led group projects applying OOP and scalable design. Highlight: a cross-platform gym app in ", bold:'.NET MAUI Blazor Hybrid', rest:' — clean arch, great UX, aligned team.' },
    { pre:"I work across C#, Python, JavaScript, and SQL — comfortable with React, Node.js, Tailwind. Always pushing: Java, MongoDB, and mobile are next.", bold:null, rest:'' },
  ];
  const highlights = [
    { num:'01', title:'Full-Stack Focus', desc:'React, Node.js, .NET — web & mobile.', icon:'bx bx-code-alt' },
    { num:'02', title:'Team Leadership', desc:'Led projects with clean OOP architecture.', icon:'bx bx-flag' },
    { num:'03', title:'HW + SW', desc:'Robotics deep-dive at Eduspec, Manila.', icon:'bx bx-chip' },
    { num:'04', title:'Always Learning', desc:'Java, CI/CD, mobile — always moving.', icon:'bx bx-trending-up' },
  ];
  const stats = [
    { value:'3.4', label:'GPA at SAIT', fill:85 },
    { value:'9+',  label:'Projects Built', fill:78 },
    { value:'2',   label:'Internships', fill:100 },
  ];

  return (
    <>
      <style>{CSS}</style>
      <section id="about" className="ab-section" ref={sectionRef}>
        <div style={{ position:'absolute', left:'-8%', top:'15%', width:500, height:500, borderRadius:'50%', background:'radial-gradient(circle,rgba(225,6,0,0.07) 0%,transparent 70%)', pointerEvents:'none', zIndex:0 }} />

        <div style={{ maxWidth:1240, margin:'0 auto', position:'relative', zIndex:1 }}>
          {/* Eyebrow */}
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:40, animation:vis?'ab-up 0.7s ease both':'none' }}>
            <div style={{ width:32, height:2, background:'linear-gradient(90deg,#E10600,#FF6B35)', borderRadius:1, boxShadow:'0 0 10px rgba(225,6,0,0.55)' }} />
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:12, letterSpacing:'0.22em', textTransform:'uppercase', color:'#E10600' }}>Driver Profile</span>
            <div style={{ flex:1, height:1, background:'rgba(255,255,255,0.04)' }} />
            <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:10, letterSpacing:'0.15em', color:'#1C1C1C' }}>#01 · SAIT · YYC</span>
          </div>

          <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'clamp(3.8rem,9vw,9rem)', letterSpacing:'0.02em', lineHeight:0.88, color:'#F2F2F2', margin:'0 0 clamp(40px,5vw,64px)', animation:vis?'ab-up 0.8s ease 0.1s both':'none' }}>
            About<br/>
            <span style={{ background:'linear-gradient(135deg,#E10600,#FF6B35)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', filter:'drop-shadow(0 0 22px rgba(225,6,0,0.4))' }}>Me</span>
          </h2>

          <div className="ab-grid">
            {/* Left */}
            <div>
              {paras.map((p, i) => (
                <p key={i} style={{ fontFamily:"'Barlow',sans-serif", fontSize:15.5, lineHeight:1.85, color:'#5C5C5C', margin:'0 0 18px', animation:vis?`ab-up 0.7s ease ${0.2+i*0.08}s both`:'none' }}>
                  {p.pre}{p.bold && <strong style={{ color:'#C8C8C8', fontWeight:600 }}>{p.bold}</strong>}{p.rest}
                </p>
              ))}
              <div style={{ display:'flex', gap:10, marginTop:28, flexWrap:'wrap', animation:vis?'ab-up 0.7s ease 0.56s both':'none' }}>
                {stats.map((s,i) => <StatCard key={s.label} {...s} delay={i*70} />)}
              </div>
            </div>

            {/* Right: glass panel */}
            <div className="ab-glass" style={{ padding:'clamp(24px,3vw,38px)', animation:vis?'ab-up 0.8s ease 0.28s both':'none' }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:'6.5rem', color:'rgba(225,6,0,0.04)', position:'absolute', right:12, top:-18, lineHeight:1, userSelect:'none', pointerEvents:'none', letterSpacing:'0.06em' }}>XTR</div>
              <div className="ab-hgrid">
                {highlights.map((h,i) => (
                  <div key={h.title} className="ab-hcard">
                    <i className={h.icon} style={{ fontSize:20, color:'#E10600', marginBottom:10, display:'block' }} />
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:9, letterSpacing:'0.2em', color:'#E10600', marginBottom:8 }}>{h.num}</div>
                    <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:13, fontWeight:700, letterSpacing:'0.04em', color:'#F2F2F2', marginBottom:5, textTransform:'uppercase' }}>{h.title}</div>
                    <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:12.5, color:'#4A4A4A', lineHeight:1.6 }}>{h.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function StatCard({ value, label, fill, delay }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="ab-stat" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:30, color:hov?'#E10600':'#F2F2F2', lineHeight:1, transition:'color 0.3s', textShadow:hov?'0 0 20px rgba(225,6,0,0.55)':'none' }}>{value}</div>
      <div style={{ fontFamily:"'Barlow',sans-serif", fontSize:10.5, color:'#3C3C3C', marginTop:4 }}>{label}</div>
      <div style={{ height:2, background:'rgba(255,255,255,0.05)', borderRadius:1, marginTop:10, overflow:'hidden' }}>
        <div style={{ height:'100%', width:`${fill}%`, background:'linear-gradient(90deg,#E10600,#FF6B35)', borderRadius:1, animation:`ab-bar 1.5s cubic-bezier(0.16,1,0.3,1) ${delay}ms both`, boxShadow:hov?'0 0 10px rgba(225,6,0,0.55)':'none' }} />
      </div>
    </div>
  );
}