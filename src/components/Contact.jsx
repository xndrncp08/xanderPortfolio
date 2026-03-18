"use client";
import { useState, useEffect, useRef } from "react";

const CSS = `
  @keyframes ctr-up { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
  @keyframes ctr-pulse { 0%,100%{box-shadow:0 0 0 1px rgba(225,6,0,0.1),0 30px 80px rgba(0,0,0,0.5);} 50%{box-shadow:0 0 0 1px rgba(225,6,0,0.3),0 40px 100px rgba(0,0,0,0.7),0 0 60px rgba(225,6,0,0.08);} }
  @keyframes ctr-avail { 0%,100%{transform:scale(1);opacity:1;} 50%{transform:scale(2);opacity:0;} }
  @keyframes ctr-success { from{opacity:0;transform:scale(0.88);} to{opacity:1;transform:scale(1);} }

  .ctr-section { position:relative; z-index:1; padding:clamp(80px,12vw,140px) clamp(20px,4vw,56px) clamp(60px,8vw,100px); }
  .ctr-glass-main {
    background:rgba(255,255,255,0.02); backdrop-filter:blur(28px) saturate(180%); -webkit-backdrop-filter:blur(28px) saturate(180%);
    border:1px solid rgba(255,255,255,0.07); border-radius:28px; overflow:hidden; position:relative;
    animation:ctr-pulse 4.5s ease-in-out infinite;
  }
  .ctr-glass-main::before { content:''; position:absolute; top:0; left:0; right:0; height:1px; background:linear-gradient(90deg,transparent,rgba(225,6,0,0.65),rgba(255,107,53,0.45),transparent); }
  .ctr-grid { display:grid; grid-template-columns:1fr 1fr; }
  @media (max-width:768px) { .ctr-grid { grid-template-columns:1fr; } }
  .ctr-left { padding:clamp(32px,4vw,52px); border-right:1px solid rgba(255,255,255,0.05); }
  @media (max-width:768px) { .ctr-left { border-right:none; border-bottom:1px solid rgba(255,255,255,0.05); } }
  .ctr-right { padding:clamp(32px,4vw,52px); }

  .ctr-link {
    display:flex; align-items:center; gap:16px; padding:18px 20px; border-radius:16px;
    background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06);
    text-decoration:none; transition:all 0.3s ease; position:relative; overflow:hidden; cursor:none;
  }
  .ctr-link::before { content:''; position:absolute; left:0; top:0; bottom:0; width:3px; background:#E10600; transform:scaleY(0); transform-origin:bottom; transition:transform 0.3s ease; }
  .ctr-link:hover { border-color:rgba(225,6,0,0.28); background:rgba(225,6,0,0.04); transform:translateX(5px); box-shadow:0 16px 50px rgba(0,0,0,0.5),0 0 28px rgba(225,6,0,0.06); }
  .ctr-link:hover::before { transform:scaleY(1); }

  .ctr-social {
    display:inline-flex; align-items:center; gap:8px;
    padding:10px 20px; border-radius:100px; text-decoration:none; cursor:none;
    font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:0.16em; text-transform:uppercase;
    border:1px solid rgba(255,255,255,0.1); background:transparent; color:#5A5A5A; transition:all 0.22s;
  }
  .ctr-social:hover { background:rgba(225,6,0,0.1); border-color:rgba(225,6,0,0.4); color:#E10600; transform:translateY(-3px); box-shadow:0 8px 28px rgba(225,6,0,0.18); }

  .ctr-input {
    width:100%; padding:13px 16px;
    background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:12px;
    font-family:'Barlow',sans-serif; font-size:14px; color:#F2F2F2; outline:none; display:block;
    transition:all 0.22s; box-sizing:border-box;
  }
  .ctr-input::placeholder { color:#2C2C2C; }
  .ctr-input:focus { border-color:rgba(225,6,0,0.45); background:rgba(255,255,255,0.05); box-shadow:0 0 0 3px rgba(225,6,0,0.08); }

  .ctr-label { font-family:'Bebas Neue',sans-serif; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#3A3A3A; display:block; margin-bottom:8px; }
`;

export default function Contact() {
  const sectionRef = useRef(null);
  const [vis, setVis] = useState(false);
  const [sent, setSent] = useState(false);
  const [focus, setFocus] = useState({});

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.08 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{CSS}</style>
      <section id="contact" className="ctr-section" ref={sectionRef}>
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-6%",
            width: 650,
            height: 650,
            borderRadius: "50%",
            background:
              "radial-gradient(circle,rgba(225,6,0,0.07) 0%,transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <div
          style={{
            maxWidth: 1240,
            margin: "0 auto",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 40,
              animation: vis ? "ctr-up 0.7s ease both" : "none",
            }}
          >
            <div
              style={{
                width: 32,
                height: 2,
                background: "linear-gradient(90deg,#E10600,#FF6B35)",
                borderRadius: 1,
                boxShadow: "0 0 10px rgba(225,6,0,0.55)",
              }}
            />
            <span
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 12,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#E10600",
              }}
            >
              Contact
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.04)",
              }}
            />
          </div>

          <h2
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: "clamp(3.8rem,9vw,9rem)",
              letterSpacing: "0.02em",
              lineHeight: 0.88,
              color: "#F2F2F2",
              margin: "0 0 clamp(36px,5vw,56px)",
              animation: vis ? "ctr-up 0.8s ease 0.1s both" : "none",
            }}
          >
            Let's
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#E10600,#FF6B35)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 22px rgba(225,6,0,0.4))",
              }}
            >
              Connect
            </span>
          </h2>

          <div
            className="ctr-glass-main"
            style={{ animation: vis ? "ctr-up 0.8s ease 0.2s both" : "none" }}
          >
            <div className="ctr-grid">
              {/* ── Left ── */}
              <div className="ctr-left">
                {/* Availability */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 14px",
                    background: "rgba(0,200,100,0.05)",
                    border: "1px solid rgba(0,200,100,0.18)",
                    borderRadius: 100,
                    marginBottom: 22,
                  }}
                >
                  <div style={{ position: "relative", width: 7, height: 7 }}>
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "#00C864",
                        animation: "ctr-avail 2.2s ease-in-out infinite",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "#00C864",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: 11,
                      letterSpacing: "0.15em",
                      color: "#00C864",
                      textTransform: "uppercase",
                    }}
                  >
                    Available for opportunities
                  </span>
                </div>

                <p
                  style={{
                    fontFamily: "'Barlow',sans-serif",
                    fontSize: 15,
                    lineHeight: 1.8,
                    color: "#5A5A5A",
                    marginBottom: 28,
                  }}
                >
                  I'm open to new opportunities, freelance work, and interesting
                  collaborations. Based in Calgary — feel free to reach out.
                </p>

                {/* Email */}
                <a
                  href="mailto:xander.rancap8@gmail.com"
                  className="ctr-link"
                  style={{ marginBottom: 10 }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(225,6,0,0.08)",
                      border: "1px solid rgba(225,6,0,0.2)",
                    }}
                  >
                    <i
                      className="bx bx-envelope"
                      style={{ fontSize: 20, color: "#E10600" }}
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 9,
                        letterSpacing: "0.2em",
                        color: "#3A3A3A",
                        textTransform: "uppercase",
                        marginBottom: 3,
                      }}
                    >
                      Email
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 13.5,
                        fontWeight: 500,
                        color: "#F2F2F2",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      xander.rancap8@gmail.com
                    </div>
                  </div>
                  <svg
                    width="13"
                    height="10"
                    viewBox="0 0 13 10"
                    fill="none"
                    style={{ marginLeft: "auto", flexShrink: 0 }}
                  >
                    <path
                      d="M8.5 1L12 5l-3.5 4M12 5H1"
                      stroke="#3A3A3A"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </a>

                {/* Location */}
                <div
                  className="ctr-link"
                  style={{ marginBottom: 28, cursor: "default" }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,200,100,0.06)",
                      border: "1px solid rgba(0,200,100,0.15)",
                    }}
                  >
                    <i
                      className="bx bx-map"
                      style={{ fontSize: 20, color: "#00C864" }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 9,
                        letterSpacing: "0.2em",
                        color: "#3A3A3A",
                        textTransform: "uppercase",
                        marginBottom: 3,
                      }}
                    >
                      Location
                    </div>
                    <div
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 13.5,
                        fontWeight: 500,
                        color: "#F2F2F2",
                      }}
                    >
                      Calgary, AB — Canada
                    </div>
                  </div>
                </div>

                {/* Socials */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {[
                    {
                      icon: "bx bxl-linkedin",
                      url: "https://www.linkedin.com/in/xander-rancap-79b2a0326/",
                      label: "LinkedIn",
                    },
                    {
                      icon: "bx bxl-github",
                      url: "https://github.com/xndrncp08",
                      label: "GitHub",
                    },
                    {
                      icon: "bx bxl-instagram",
                      url: "https://www.instagram.com/derbadoobeelat/",
                      label: "Instagram",
                    },
                  ].map((s) => (
                    <a
                      key={s.icon}
                      href={s.url}
                      target="_blank"
                      rel="noreferrer"
                      className="ctr-social"
                    >
                      <i className={s.icon} style={{ fontSize: 15 }} />
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Right: form ── */}
              <div className="ctr-right">
                {sent ? (
                  <div
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      padding: "32px 0",
                      animation:
                        "ctr-success 0.5s cubic-bezier(0.16,1,0.3,1) both",
                    }}
                  >
                    <i
                      className="bx bx-flag-checkered"
                      style={{
                        fontSize: 52,
                        color: "#E10600",
                        marginBottom: 20,
                        display: "block",
                        filter: "drop-shadow(0 0 16px rgba(225,6,0,0.5))",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 28,
                        letterSpacing: "0.04em",
                        color: "#F2F2F2",
                        marginBottom: 10,
                      }}
                    >
                      Message Sent!
                    </div>
                    <p
                      style={{
                        fontFamily: "'Barlow',sans-serif",
                        fontSize: 14,
                        color: "#5A5A5A",
                      }}
                    >
                      Thanks for reaching out — I'll get back to you soon.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <div style={{ marginBottom: 18 }}>
                      <label className="ctr-label">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        required
                        className="ctr-input"
                      />
                    </div>
                    <div style={{ marginBottom: 18 }}>
                      <label className="ctr-label">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        required
                        className="ctr-input"
                      />
                    </div>
                    <div style={{ marginBottom: 24 }}>
                      <label className="ctr-label">Message</label>
                      <textarea
                        placeholder="What's on your mind?"
                        rows={5}
                        required
                        className="ctr-input"
                        style={{ resize: "vertical", minHeight: 100 }}
                      />
                    </div>
                    <button
                      type="submit"
                      style={{
                        width: "100%",
                        padding: "14px 28px",
                        background: "linear-gradient(135deg,#E10600,#FF3A2D)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 12,
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 14,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        cursor: "none",
                        transition: "all 0.22s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        boxShadow: "0 0 28px rgba(225,6,0,0.35)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow =
                          "0 0 48px rgba(225,6,0,0.6)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "none";
                        e.currentTarget.style.boxShadow =
                          "0 0 28px rgba(225,6,0,0.35)";
                      }}
                    >
                      Send Message
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path
                          d="M7.5 1l4 3.5-4 3.5M11.5 4.5H.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.04)",
              marginTop: 56,
              paddingTop: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <span
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 11,
                letterSpacing: "0.14em",
                color: "#1C1C1C",
                textTransform: "uppercase",
              }}
            >
              © 2026 Xander Rancap
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {["S1 ✓", "S2 ✓", "S3 ✓"].map((s, i) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 9,
                    color: i === 2 ? "#E10600" : "#1A1A1A",
                    letterSpacing: "0.12em",
                  }}
                >
                  {s}
                </span>
              ))}
              <span
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 9,
                  color: "#1A1A1A",
                  letterSpacing: "0.08em",
                }}
              >
                · Built with Next.js
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
