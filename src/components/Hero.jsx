import Image from "next/image";
import { profile } from "@/data/content";

const facts = [
  ["Based in", profile.location],
  ["From", profile.origin],
  ["Studied", "Software Development, SAIT ’26"],
  ["Now", profile.status],
];

export default function Hero() {
  return (
    <section aria-labelledby="hero-title" className="wrap pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-8">
          <p className="label">
            {profile.name} — {profile.role}
          </p>
          <h1 id="hero-title" className="display mt-6 text-[2.75rem] sm:text-7xl lg:text-[5.25rem]">
            I build full-stack applications, <em className="text-accent">and test them like someone depends on them.</em>
          </h1>
          <p className="prose-measure mt-8 text-lg text-muted sm:text-xl">{profile.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-solid">
              Selected work <span aria-hidden className="arrow">↓</span>
            </a>
            <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost">
              Résumé <span className="sr-only">(PDF, opens in a new tab)</span>
              <span aria-hidden className="arrow arrow-ne">↗</span>
            </a>
          </div>
        </div>

        <figure className="max-w-sm lg:col-span-4 lg:max-w-none lg:pt-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[3px] bg-surface">
            <Image
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 30vw, 384px"
              className="object-cover object-[50%_30%]"
            />
          </div>
          <figcaption className="label mt-3">Calgary, by way of Manila</figcaption>
        </figure>
      </div>

      <dl className="mt-16 grid gap-6 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-4">
        {facts.map(([term, value]) => (
          <div key={term}>
            <dt className="label">{term}</dt>
            <dd className="mt-1.5">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
