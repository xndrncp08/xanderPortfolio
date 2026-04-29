"use client";
import { useState, useEffect, useRef } from "react";

export default function ComicContact() {
  const sectionRef = useRef(null);
  const [vis, setVis] = useState(false);
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVis(true);
      },
      { threshold: 0.05 },
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .contact-section {
          position: relative;
          min-height: 100vh;
          padding: clamp(72px, 10vw, 110px) clamp(20px, 5vw, 64px) 0;
          background: var(--ink);
          overflow: hidden;
          display: flex; flex-direction: column; justify-content: center;
        }
        .contact-section::before {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background-image: radial-gradient(circle, rgba(248,244,232,0.05) 1px, transparent 1px);
          background-size: 12px 12px;
        }

        /* Red slash — Spider-Man accent */
        .contact-slash {
          position: absolute; bottom: -20%; left: -8%;
          width: 50%; height: 180%; background: var(--red);
          opacity: 0.04; transform: rotate(-16deg);
          pointer-events: none; z-index: 0;
        }

        /* Iron Man arc — top right */
        .contact-arc {
          position: absolute; top: -120px; right: -120px;
          width: 400px; height: 400px;
          opacity: 0.07; z-index: 0; pointer-events: none;
          animation: reactor-pulse 6s ease-in-out infinite;
        }

        .contact-inner {
          max-width: 1240px; margin: 0 auto;
          position: relative; z-index: 1; width: 100%;
        }

        .contact-chapter {
          font-family: var(--font-comic);
          font-size: clamp(3.5rem, 9vw, 8rem);
          letter-spacing: 0.03em; line-height: 0.88;
          color: var(--paper);
          margin: 0 0 clamp(28px, 4vw, 48px);
        }
        .contact-chapter span { color: var(--red); }

        /* Two-panel grid */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          border: 2px solid rgba(248,244,232,0.1);
          box-shadow: 6px 6px 0 rgba(248,244,232,0.04);
        }
        @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr; } }

        /* Left info panel */
        .contact-left {
          padding: clamp(24px, 3.5vw, 40px);
          border-right: 2px solid rgba(248,244,232,0.08);
          position: relative; overflow: hidden;
        }
        @media (max-width: 860px) {
          .contact-left { border-right: none; border-bottom: 2px solid rgba(248,244,232,0.08); }
        }

        /* Right form panel */
        .contact-right {
          padding: clamp(24px, 3.5vw, 40px);
          background: rgba(248,244,232,0.018);
        }

        /* Info row */
        .info-row {
          display: flex; align-items: center; gap: 14px;
          padding: 13px 15px;
          border: 2px solid rgba(248,244,232,0.08);
          text-decoration: none;
          margin-bottom: 10px;
          position: relative; overflow: hidden;
          transition: all 0.15s ease; cursor: none;
        }
        .info-row::before {
          content: ''; position: absolute;
          left: 0; top: 0; bottom: 0; width: 3px;
          background: var(--red);
          transform: scaleY(0); transform-origin: bottom;
          transition: transform 0.2s ease;
        }
        .info-row:hover {
          border-color: rgba(248,244,232,0.16);
          background: rgba(248,244,232,0.04);
          transform: translateX(4px);
        }
        .info-row:hover::before { transform: scaleY(1); }

        /* Social chips */
        .contact-social {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 13px;
          border: 2px solid rgba(248,244,232,0.1);
          font-family: var(--font-comic); font-size: 13px; letter-spacing: 0.06em;
          color: rgba(248,244,232,0.4);
          text-decoration: none; cursor: none;
          transition: all 0.15s ease;
        }
        .contact-social:hover {
          background: var(--yellow); border-color: var(--yellow);
          color: var(--ink);
          transform: translate(-2px, -2px);
          box-shadow: 3px 3px 0 rgba(248,244,232,0.12);
        }

        /* Availability badge */
        .avail-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,200,100,0.06);
          border: 2px solid rgba(0,200,100,0.15);
          padding: 6px 14px; margin-bottom: 16px;
        }

        /* Form field */
        .comic-field { margin-bottom: 14px; }

        .field-label {
          display: inline-block;
          background: rgba(248,244,232,0.07);
          border: 2px solid rgba(248,244,232,0.12);
          padding: 3px 10px;
          font-family: var(--font-label); font-size: 9px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(248,244,232,0.45); margin-bottom: 7px;
          transition: border-color 0.15s, color 0.15s;
        }
        .field-label.active { border-color: var(--yellow); color: var(--yellow); }

        .comic-input {
          width: 100%; padding: 11px 14px;
          background: rgba(248,244,232,0.04);
          border: 2px solid rgba(248,244,232,0.1);
          color: var(--paper);
          font-family: var(--font-body); font-size: 14px;
          outline: none; display: block; box-sizing: border-box;
          transition: all 0.15s ease;
          border-radius: 0; -webkit-appearance: none;
        }
        .comic-input::placeholder { color: rgba(248,244,232,0.16); font-style: italic; }
        .comic-input:focus {
          border-color: var(--yellow);
          background: rgba(248,244,232,0.07);
          box-shadow: 3px 3px 0 rgba(245,200,0,0.18);
        }

        .field-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        @media (max-width: 480px) { .field-row-2 { grid-template-columns: 1fr; } }

        /* Sent state */
        .sent-panel {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; min-height: 300px;
          animation: pop-in 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }
        .sent-bubble {
          background: var(--paper); border: 2px solid rgba(248,244,232,0.25);
          box-shadow: 3px 3px 0 rgba(248,244,232,0.12);
          padding: 18px 26px; position: relative; max-width: 300px; margin-top: 22px;
        }
        .sent-bubble::after {
          content: ''; position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
          border-left: 10px solid transparent; border-right: 10px solid transparent;
          border-bottom: 14px solid var(--paper);
        }

        /* Footer strip */
        .contact-footer {
          border-top: 2px solid rgba(248,244,232,0.07);
          padding: clamp(16px, 2.5vw, 26px) 0 clamp(24px, 3vw, 36px);
          display: flex; align-items: center;
          justify-content: space-between; flex-wrap: wrap; gap: 12px;
          margin-top: clamp(20px, 3vw, 32px);
        }
      `}</style>

      <section id="contact" className="contact-section" ref={sectionRef}>
        <div className="contact-slash" />

        {/* Iron Man arc reactor — top right decoration */}
        <svg
          viewBox="0 0 300 300"
          fill="none"
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 400,
            height: 400,
            opacity: 0.08,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          <circle
            cx="150"
            cy="150"
            r="140"
            stroke="rgba(30,200,255,1)"
            strokeWidth="1.5"
          />
          <circle
            cx="150"
            cy="150"
            r="105"
            stroke="rgba(30,200,255,1)"
            strokeWidth="1"
          />
          <circle
            cx="150"
            cy="150"
            r="70"
            stroke="rgba(30,200,255,1)"
            strokeWidth="1"
          />
          <circle
            cx="150"
            cy="150"
            r="35"
            stroke="rgba(30,200,255,1)"
            strokeWidth="1.5"
          />
          <circle
            cx="150"
            cy="150"
            r="12"
            fill="rgba(30,200,255,0.12)"
            stroke="rgba(30,200,255,0.45)"
            strokeWidth="1.5"
          />
        </svg>

        <div className="contact-inner">
          <div
            className="chapter-bar"
            style={{ animation: vis ? "slide-up 0.6s ease both" : "none" }}
          >
            <div
              className="chapter-label"
              style={{ background: "var(--red)", color: "white" }}
            >
              Chapter 04
            </div>
          </div>

          <h2
            className="contact-chapter"
            style={{
              animation: vis ? "slide-up 0.7s ease 0.08s both" : "none",
            }}
          >
            Open
            <br />
            <span>Signal</span>
          </h2>

          <div
            className="contact-grid"
            style={{
              animation: vis ? "slide-up 0.7s ease 0.16s both" : "none",
            }}
          >
            {/* Left info */}
            <div className="contact-left">
              <div
                style={{
                  background: "rgba(248,244,232,0.055)",
                  border: "2px solid rgba(248,244,232,0.1)",
                  padding: "5px 12px",
                  marginBottom: 18,
                  display: "inline-block",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 11,
                    color: "rgba(248,244,232,0.38)",
                    fontStyle: "italic",
                    letterSpacing: "0.02em",
                  }}
                >
                  Meanwhile, somewhere in YYC...
                </span>
              </div>

              <div className="avail-badge">
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#00C864",
                    display: "inline-block",
                    animation: "blink-dot 1.8s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "var(--font-label)",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    color: "#00C864",
                    textTransform: "uppercase",
                  }}
                >
                  Open to opportunities
                </span>
              </div>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  lineHeight: 1.78,
                  color: "rgba(248,244,232,0.38)",
                  margin: "0 0 22px",
                }}
              >
                I'm open to new roles, freelance work, and anything interesting.
                Based in Calgary — say the word.
              </p>

              {/* Email */}
              <a href="mailto:xander.rancap8@gmail.com" className="info-row">
                <div
                  style={{
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    background: "rgba(225,6,0,0.1)",
                    border: "2px solid rgba(225,6,0,0.22)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="bx bx-envelope"
                    style={{ fontSize: 18, color: "var(--red)" }}
                  />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "rgba(248,244,232,0.25)",
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    Email
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(248,244,232,0.6)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    xander.rancap8@gmail.com
                  </div>
                </div>
                <svg
                  width="11"
                  height="9"
                  viewBox="0 0 12 9"
                  fill="none"
                  style={{ marginLeft: "auto", flexShrink: 0 }}
                >
                  <path
                    d="M7.5 1l4 3.5-4 3.5M11.5 4.5H.5"
                    stroke="rgba(248,244,232,0.2)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </a>

              {/* Location */}
              <div
                className="info-row"
                style={{ marginBottom: 24, cursor: "default" }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    flexShrink: 0,
                    background: "rgba(0,200,100,0.07)",
                    border: "2px solid rgba(0,200,100,0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <i
                    className="bx bx-map"
                    style={{ fontSize: 18, color: "#00C864" }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-label)",
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      color: "rgba(248,244,232,0.25)",
                      textTransform: "uppercase",
                      marginBottom: 3,
                    }}
                  >
                    Location
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 13,
                      color: "rgba(248,244,232,0.6)",
                    }}
                  >
                    Calgary, AB — Canada
                  </div>
                </div>
              </div>

              <div
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "rgba(248,244,232,0.2)",
                  textTransform: "uppercase",
                  marginBottom: 10,
                }}
              >
                Find me online
              </div>
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
                    className="contact-social"
                  >
                    <i className={s.icon} style={{ fontSize: 14 }} />
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right form */}
            <div className="contact-right">
              {sent ? (
                <div className="sent-panel">
                  <div
                    style={{
                      fontFamily: "var(--font-comic)",
                      fontSize: "clamp(3rem, 10vw, 5.5rem)",
                      letterSpacing: "0.04em",
                      color: "var(--yellow)",
                      WebkitTextStroke: "3px rgba(248,244,232,0.12)",
                      paintOrder: "stroke fill",
                      textShadow: "5px 5px 0 rgba(0,0,0,0.4)",
                      transform: "rotate(-4deg)",
                      lineHeight: 1,
                    }}
                  >
                    SENT!
                  </div>
                  <div className="sent-bubble">
                    <div
                      style={{
                        fontFamily: "var(--font-comic)",
                        fontSize: 18,
                        color: "var(--ink)",
                        letterSpacing: "0.04em",
                        marginBottom: 6,
                      }}
                    >
                      Message received!
                    </div>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 13,
                        color: "#555",
                        margin: 0,
                        lineHeight: 1.6,
                      }}
                    >
                      Thanks for reaching out — I'll get back to you as soon as
                      I can.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    style={{
                      background: "rgba(248,244,232,0.055)",
                      border: "2px solid rgba(248,244,232,0.1)",
                      padding: "5px 12px",
                      marginBottom: 20,
                      display: "inline-block",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 11,
                        color: "rgba(248,244,232,0.38)",
                        fontStyle: "italic",
                        letterSpacing: "0.02em",
                      }}
                    >
                      Transmit your message...
                    </span>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSent(true);
                    }}
                  >
                    <div className="field-row-2">
                      <div className="comic-field">
                        <label
                          className={`field-label${focused === "name" ? " active" : ""}`}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          placeholder="Your name"
                          required
                          className="comic-input"
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <div className="comic-field">
                        <label
                          className={`field-label${focused === "email" ? " active" : ""}`}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          required
                          className="comic-input"
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                    </div>

                    <div className="comic-field">
                      <label
                        className={`field-label${focused === "subject" ? " active" : ""}`}
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="What's this about?"
                        className="comic-input"
                        onFocus={() => setFocused("subject")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>

                    <div className="comic-field" style={{ marginBottom: 20 }}>
                      <label
                        className={`field-label${focused === "message" ? " active" : ""}`}
                      >
                        Message
                      </label>
                      <textarea
                        placeholder="What's on your mind?"
                        rows={5}
                        required
                        className="comic-input"
                        style={{ resize: "vertical", minHeight: 110 }}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-comic btn-comic-red"
                      style={{
                        fontSize: 16,
                        padding: "13px 28px",
                        cursor: "none",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 10,
                      }}
                    >
                      Transmit Message
                      <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                        <path
                          d="M7.5 1l4 3.5-4 3.5M11.5 4.5H.5"
                          stroke="white"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="contact-footer">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                fontFamily: "var(--font-comic)",
                fontSize: 22,
                letterSpacing: "0.08em",
                color: "var(--paper)",
                textDecoration: "none",
                display: "flex",
                alignItems: "baseline",
                gap: 2,
              }}
            >
              X<span style={{ color: "var(--red)" }}>.</span>R
              <span
                style={{
                  fontFamily: "var(--font-comic)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  color: "rgba(248,244,232,0.18)",
                  padding: "2px 7px",
                  border: "2px solid rgba(248,244,232,0.08)",
                  marginLeft: 10,
                }}
              >
                ISSUE #001
              </span>
            </a>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              {["CH 01 ✓", "CH 02 ✓", "CH 03 ✓", "CH 04 ✓"].map((s, i) => (
                <span
                  key={s}
                  style={{
                    fontFamily: "var(--font-comic)",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: i === 3 ? "var(--yellow)" : "rgba(248,244,232,0.13)",
                  }}
                >
                  {s}
                </span>
              ))}
              <span
                style={{
                  fontFamily: "var(--font-label)",
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "rgba(248,244,232,0.08)",
                  textTransform: "uppercase",
                }}
              >
                · Built with Next.js
              </span>
            </div>

            <span
              style={{
                fontFamily: "var(--font-label)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.14em",
                color: "rgba(248,244,232,0.15)",
                textTransform: "uppercase",
              }}
            >
              © 2026 Xander Rancap
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
