import Image from "next/image";

// Project art with the hover "shader": two tinted, screen-blended copies split
// apart (chromatic aberration) while speed streaks sweep across. Transform-only.
export default function ProjectArt({ project, sizes, className = "", priority = false }) {
  const src = project.logo ?? project.image;
  const fit = project.logo ? "object-cover" : "object-cover object-top";
  return (
    <div
      className={`rgb-split streaks relative overflow-hidden ${project.logo ? "bg-logo" : "bg-panel"} ${className}`}
    >
      <Image
        src={src}
        alt={`${project.title} ${project.logo ? "logo" : "screenshot"}`}
        fill
        sizes={sizes}
        priority={priority}
        className={`${fit} transition-transform duration-700 ease-[var(--ease)] motion-safe:group-hover:scale-[1.04]`}
      />
      <Image src={src} alt="" aria-hidden fill sizes={sizes} className={`ch ch-r ${fit}`} />
      <Image src={src} alt="" aria-hidden fill sizes={sizes} className={`ch ch-c ${fit}`} />
      {/* Scanlines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, rgb(0 0 0 / 0.25) 0 1px, transparent 1px 3px)",
        }}
      />
    </div>
  );
}
