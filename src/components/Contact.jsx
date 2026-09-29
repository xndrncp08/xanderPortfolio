import { FiArrowUpRight } from "react-icons/fi";
import { profile, socials } from "@/data/content";
import CopyEmail from "./CopyEmail";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="bg-fg text-bg">
      <div className="mx-auto max-w-6xl px-4 pt-24 pb-10 sm:px-6 sm:pt-32">
        <p data-reveal className="font-mono text-xs text-accent">
          05 — Contact
        </p>
        <h2
          data-reveal
          className="mt-6 font-serif text-[clamp(3.5rem,11vw,9rem)] leading-[0.9] tracking-[-0.03em]"
        >
          Let&apos;s build
          <br />
          <em className="text-accent">something.</em>
        </h2>

        <div data-reveal className="mt-12 grid gap-12 md:grid-cols-2 md:items-end">
          <div>
            <p className="max-w-md text-lg leading-relaxed opacity-70">
              I&apos;m open to new roles, freelance work and anything interesting. Based in
              Calgary — say the word.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="press group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-accent-fg hover:-translate-y-0.5"
              >
                {profile.email}
                <FiArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <CopyEmail email={profile.email} />
            </div>
          </div>

          <ul className="md:justify-self-end">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-10 border-b border-bg/15 py-3 md:min-w-72"
                >
                  <span className="text-lg">{s.label}</span>
                  <span className="flex items-center gap-2 font-mono text-xs opacity-60 transition-opacity group-hover:opacity-100">
                    {s.handle}
                    <FiArrowUpRight />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <footer className="mt-28 flex flex-col gap-2 border-t border-bg/15 pt-6 font-mono text-xs opacity-60 sm:flex-row sm:justify-between">
          <span>
            © {year} {profile.name}
          </span>
          <a href="#top" className="link-underline self-start">
            Back to top ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
