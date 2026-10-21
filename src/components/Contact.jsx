import { profile, socials } from "@/data/content";
import CopyEmail from "./CopyEmail";
import Section from "./Section";

export default function Contact() {
  return (
    <Section
      id="contact"
      index="08"
      label="Contact"
      title="Let's build something that holds up."
      intro="I reply faster than my test suite runs. Usually."
      className="border-t border-line"
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="reveal lg:col-span-8">
          <p className="prose-measure text-lg text-muted">
            {profile.status} Based in Calgary and happy to work remotely. Email is the fastest way to reach me; carrier pigeon, the slowest.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="display mt-8 block text-[clamp(1.6rem,6.2vw,4.75rem)] break-all transition-opacity hover:opacity-70"
          >
            <span className="mark">{profile.email}</span>
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-volt">
              Write an email <span aria-hidden className="arrow">→</span>
            </a>
            <CopyEmail email={profile.email} />
          </div>
        </div>
        <ul className="reveal lg:col-span-3 lg:col-start-10" style={{ "--d": "80ms" }}>
          {socials.map((s) => (
            <li key={s.label} className="border-b border-line">
              <a href={s.url} target="_blank" rel="noopener" className="flex justify-between gap-4 py-3.5 transition-opacity hover:opacity-60">
                <span>
                  {s.label} <span className="label ml-1">@{s.handle}</span>
                </span>
                <span aria-hidden className="arrow arrow-ne">↗</span>
              </a>
            </li>
          ))}
          <li className="border-b border-line">
            <a
              href={profile.resume}
              download="Xander_Rancap_Resume.pdf"
              className="flex justify-between gap-4 py-3.5 transition-opacity hover:opacity-60"
            >
              <span>
                Résumé <span className="label ml-1">PDF</span>
              </span>
              <span aria-hidden className="arrow">↓</span>
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}
