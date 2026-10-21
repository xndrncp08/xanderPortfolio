import { profile, socials } from "@/data/content";
import CopyEmail from "./CopyEmail";
import Section from "./Section";

export default function Contact() {
  return (
    <Section id="contact" index="08" label="Contact" title="Let's build something that holds up.">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 lg:col-start-4">
          <p className="prose-measure text-lg text-muted">
            {profile.status} Based in Calgary and happy to work remotely. Email is the quickest way to reach me.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="display link mt-8 block text-[1.75rem] break-all sm:text-5xl"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn btn-solid">
              Write an email <span aria-hidden className="arrow">→</span>
            </a>
            <CopyEmail email={profile.email} />
          </div>
        </div>
        <ul className="lg:col-span-2">
          {socials.map((s) => (
            <li key={s.label} className="border-b border-line">
              <a href={s.url} target="_blank" rel="noopener" className="flex justify-between gap-4 py-3 hover:text-accent">
                {s.label} <span aria-hidden className="arrow arrow-ne">↗</span>
              </a>
            </li>
          ))}
          <li className="border-b border-line">
            <a href={profile.resume} download="Xander_Rancap_Resume.pdf" className="flex justify-between gap-4 py-3 hover:text-accent">
              Résumé (PDF) <span aria-hidden className="arrow">↓</span>
            </a>
          </li>
        </ul>
      </div>
    </Section>
  );
}
