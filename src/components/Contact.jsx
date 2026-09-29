import { FiArrowUpRight } from "react-icons/fi";
import { profile, socials } from "@/data/content";
import CopyEmail from "./CopyEmail";

export default function Contact() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="px-4 pt-24 sm:px-6 sm:pt-32">
      <div data-reveal className="mx-auto max-w-[980px] text-center">
        <p className="t-eyebrow text-accent">Contact</p>
        <h2 className="t-display mt-3">
          Let&apos;s build <span className="text-gradient">something.</span>
        </h2>
        <p className="t-lead mx-auto mt-6 max-w-xl text-muted">
          Open to new roles, freelance work and anything interesting. Based in Calgary — say the
          word.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="press rounded-full bg-accent px-6 py-3 text-[17px] font-medium text-accent-fg hover:bg-accent-hover"
          >
            Email me
          </a>
          <CopyEmail email={profile.email} />
        </div>

        <ul className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 text-accent hover:underline"
              >
                {s.label}
                <FiArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="t-caption mx-auto mt-28 flex max-w-[980px] flex-col gap-2 border-t border-line py-5 text-muted sm:flex-row sm:justify-between">
        <span>
          Copyright © {year} {profile.name}. Designed and built in Calgary.
        </span>
        <a href="#top" className="hover:text-fg">
          Back to top
        </a>
      </footer>
    </section>
  );
}
