"use client";
import Image from "next/image";
import { FiPlus } from "react-icons/fi";
import { projects } from "@/data/content";
import SectionIntro from "./SectionIntro";
import { useSheets } from "./SheetProvider";

// Logo tiles are always dark (the logos are on near-black); screenshot tiles follow the theme.
function Media({ project, sizes, aspect }) {
  const src = project.logo ?? project.image;
  return (
    <div className={`relative w-full overflow-hidden ${aspect}`}>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className={`transition-transform duration-700 ease-[var(--ease-out)] motion-safe:group-hover:scale-[1.04] ${
          project.logo ? "object-cover" : "object-cover object-top"
        }`}
      />
    </div>
  );
}

function Tile({ project, variant, index }) {
  const { openProject } = useSheets();
  const isLogo = Boolean(project.logo);
  const big = variant !== "compact";

  const media = {
    hero: { aspect: "aspect-[16/10] sm:aspect-[21/9]", sizes: "(min-width: 980px) 932px, 100vw" },
    large: { aspect: "aspect-[16/10]", sizes: "(min-width: 768px) 460px, 100vw" },
    compact: { aspect: "aspect-[4/3]", sizes: "(min-width: 1024px) 230px, (min-width: 768px) 460px, 100vw" },
  }[variant];

  return (
    <div data-reveal style={{ "--delay": `${(index % 2) * 80}ms` }} className={variant === "hero" ? "md:col-span-2" : ""}>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={(e) => openProject(project, e.currentTarget)}
        className={`press-tile group relative flex h-full w-full flex-col overflow-hidden rounded-[28px] text-left ${
          isLogo ? "bg-logo text-white ring-1 ring-white/10 ring-inset" : "bg-tile text-fg"
        }`}
      >
        <div className={big ? "px-7 pt-7 sm:px-9 sm:pt-9" : "px-6 pt-6"}>
          <p
            className="t-caption font-semibold"
            style={{ color: isLogo ? project.accent : "var(--muted)" }}
          >
            {project.tech}
          </p>
          <h3 className={`${big ? "t-title" : "text-xl font-semibold tracking-[-0.02em]"} mt-1`}>
            {project.title}
          </h3>
          {big && (
            <p className={`mt-1.5 max-w-md ${isLogo ? "text-white/60" : "text-muted"}`}>
              {project.tagline}
            </p>
          )}
        </div>

        <div className={`mt-auto ${isLogo ? "" : big ? "px-7 pt-7 sm:px-9" : "px-6 pt-5"}`}>
          {isLogo ? (
            <div className="relative">
              <Media project={project} {...media} />
              {/* Accent glow rises from the bottom edge on hover. */}
              <div
                className="pointer-events-none absolute inset-0 opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(55% 70% at 50% 115%, ${project.accent}40, transparent 70%)`,
                }}
              />
            </div>
          ) : (
            <div className="overflow-hidden rounded-t-2xl shadow-[0_-8px_40px_-12px_rgb(0_0_0/0.25)] ring-1 ring-line">
              <Media project={project} {...media} />
            </div>
          )}
        </div>

        <span
          aria-hidden
          className={`absolute right-5 bottom-5 grid size-9 place-items-center rounded-full backdrop-blur-md transition-[scale,background-color] duration-300 group-hover:scale-110 ${
            isLogo ? "bg-white/15 text-white" : "bg-fg/10 text-fg"
          }`}
        >
          <FiPlus className="size-[18px]" />
        </span>
      </button>
    </div>
  );
}

export default function Work() {
  const [hero, ...rest] = projects;
  const large = rest.slice(0, 4);
  const compact = rest.slice(4);

  return (
    <section id="work" className="mx-auto max-w-[980px] px-4 py-24 sm:px-6 sm:py-32">
      <SectionIntro
        eyebrow="Work"
        title="Things I've built."
        lead="From a pharmacy's daily sales system to live transit maps. Tap any project for the full story."
      />

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        <Tile project={hero} variant="hero" index={0} />
        {large.map((p, i) => (
          <Tile key={p.title} project={p} variant="large" index={i} />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 md:mt-5 md:gap-5 lg:grid-cols-4">
        {compact.map((p, i) => (
          <Tile key={p.title} project={p} variant="compact" index={i} />
        ))}
      </div>
    </section>
  );
}
