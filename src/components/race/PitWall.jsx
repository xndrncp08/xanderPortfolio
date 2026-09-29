"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiCheck, FiCopy, FiFileText, FiGithub, FiInstagram, FiLinkedin, FiRadio } from "react-icons/fi";
import { profile, socials } from "@/data/content";
import { play } from "@/lib/sfx";
import { useSheets } from "../SheetProvider";
import Magnetic from "./Magnetic";
import SectorHeader from "./SectorHeader";

const ICONS = { GitHub: FiGithub, LinkedIn: FiLinkedin, Instagram: FiInstagram };
const RIMS = { GitHub: "var(--cyan)", LinkedIn: "var(--yellow)", Instagram: "var(--purple)" };

function WheelButton({ label, rim, children, ...props }) {
  const Tag = props.href ? "a" : "button";
  return (
    <Magnetic strength={0.25}>
      <Tag
        {...props}
        data-cursor={label.toUpperCase()}
        className="press group flex w-20 flex-col items-center gap-2"
        onPointerDown={() => play("press")}
      >
        <span
          className="grid size-16 place-items-center rounded-full bg-panel-2 text-fg shadow-[inset_0_-6px_12px_rgb(0_0_0/0.5)] ring-[3px] transition-[box-shadow,background-color] duration-300 group-hover:bg-panel sm:size-[4.5rem]"
          style={{ "--tw-ring-color": rim }}
        >
          <span className="text-xl transition-transform duration-300 group-hover:scale-110">{children}</span>
        </span>
        <span className="t-label text-muted group-hover:text-fg">{label}</span>
      </Tag>
    </Magnetic>
  );
}

function Field({ id, label, children }) {
  return (
    <label htmlFor={id} className="block">
      <span className="t-label text-dim">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "mt-1.5 w-full border-b border-line-strong bg-transparent py-2.5 text-fg placeholder:text-dim focus:border-yellow focus:outline-none";

export default function PitWall() {
  const { openResume } = useSheets();
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const transmit = (e) => {
    e.preventDefault();
    const subject = `Team radio from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    play("radio");
    setSent(true);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      play("confirm");
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section id="pit" className="relative">
      <div className="mx-auto max-w-[1320px] px-4 pt-28 sm:px-6 sm:pt-36">
        <SectorHeader
          code="Pit wall"
          kicker="Contact"
          title="Box, box. Let's talk."
          lead="Open to full-time roles, contracts and freelance work. Based in Calgary, happy to work remote."
        />

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* Team radio */}
          <div data-reveal className="chamfer relative overflow-hidden bg-panel ring-1 ring-line">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <p className="t-label flex items-center gap-2 text-cyan">
                <FiRadio /> Team radio · Send message
              </p>
              <p className="t-label flex items-center gap-2 text-green">
                <span className="led size-1.5 text-green" /> Channel open
              </p>
            </div>

            <form onSubmit={transmit} className="space-y-6 p-5 sm:p-7">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="callsign" label="Callsign">
                  <input id="callsign" required value={form.name} onChange={set("name")} placeholder="Your name" className={inputCls} autoComplete="name" />
                </Field>
                <Field id="frequency" label="Return frequency">
                  <input id="frequency" type="email" required value={form.email} onChange={set("email")} placeholder="you@team.com" className={inputCls} autoComplete="email" />
                </Field>
              </div>
              <Field id="message" label="Message">
                <textarea id="message" required rows={4} value={form.message} onChange={set("message")} placeholder="What are we building?" className={`${inputCls} resize-none`} />
              </Field>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-xs text-xs text-dim">Opens your mail app with the message ready to send.</p>
                <Magnetic>
                  <button
                    type="submit"
                    data-cursor="TRANSMIT"
                    className="press chamfer bg-red px-7 py-3.5 font-display text-lg font-extrabold uppercase tracking-wide text-white hover:shadow-[0_0_40px_-4px_var(--red)]"
                  >
                    Transmit
                  </button>
                </Magnetic>
              </div>
            </form>

            {/* Liquid confirmation: a fill rises with a travelling wave on its crest. */}
            <AnimatePresence>
              {sent && (
                <motion.div
                  className="absolute inset-0 z-10 flex flex-col justify-end"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", bounce: 0.15, duration: 0.8 }}
                >
                  <svg aria-hidden viewBox="0 0 1200 40" preserveAspectRatio="none" className="h-8 w-[200%] shrink-0 animate-[wave_2.4s_linear_infinite] fill-green motion-reduce:animate-none">
                    <path d="M0 20 Q 75 0 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 T 1050 20 T 1200 20 V40 H0 Z" />
                  </svg>
                  <div className="flex flex-1 flex-col items-start justify-center bg-green p-7 text-ink">
                    <p className="t-label">Radio check</p>
                    <p className="mt-2 font-display text-5xl leading-none font-black uppercase italic">Copy that.</p>
                    <p className="mt-3 max-w-sm">
                      Your mail app should have the message loaded. Hit send and I&apos;ll radio back.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSent(false);
                        setForm({ name: "", email: "", message: "" });
                      }}
                      className="press t-label mt-6 border-b border-ink pb-0.5"
                    >
                      New transmission
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Steering wheel quick actions */}
          <div data-reveal style={{ "--delay": "80ms" }}>
            <div className="brackets relative bg-carbon/70 px-4 py-8 sm:px-8">
              <p className="t-label text-center text-dim">Steering wheel · quick actions</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
                {socials.map((s) => {
                  const Icon = ICONS[s.label];
                  return (
                    <WheelButton key={s.label} label={s.label} rim={RIMS[s.label]} href={s.url} target="_blank" rel="noopener noreferrer">
                      <Icon />
                    </WheelButton>
                  );
                })}
                <WheelButton label="Resume" rim="var(--green)" type="button" onClick={(e) => openResume(e.currentTarget)}>
                  <FiFileText />
                </WheelButton>
              </div>

              <div className="mt-10 border-t border-line pt-6 text-center">
                <p className="t-label text-dim">Direct frequency</p>
                <a href={`mailto:${profile.email}`} className="mt-2 block font-display text-2xl font-extrabold break-all uppercase italic hover:text-yellow sm:text-3xl">
                  {profile.email}
                </a>
                <button type="button" onClick={copy} className="press t-label mt-3 inline-flex items-center gap-2 text-muted hover:text-fg">
                  {copied ? <FiCheck className="text-green" /> : <FiCopy />}
                  <span aria-live="polite">{copied ? "Copied" : "Copy frequency"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-28 pb-12">
        <div className="chequer h-4 opacity-90" aria-hidden />
        <div className="t-label mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-6 text-dim sm:flex-row sm:justify-between sm:px-6">
          <span>
            © {new Date().getFullYear()} {profile.name} · #{profile.raceNumber} · Engineered in Calgary
          </span>
          <a href="#grid" className="hover:text-fg">
            Back to the grid ↑
          </a>
        </div>
      </footer>
    </section>
  );
}
