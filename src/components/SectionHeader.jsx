export default function SectionHeader({ index, title, aside }) {
  return (
    <div
      data-reveal
      className="mb-12 flex items-end justify-between gap-6 border-b border-line pb-5 sm:mb-16"
    >
      <h2 className="flex items-baseline gap-4 font-serif text-5xl leading-none tracking-tight sm:text-6xl">
        <span className="font-mono text-xs tracking-normal text-accent">{index}</span>
        {title}
      </h2>
      {aside && <p className="hidden font-mono text-xs text-muted sm:block">{aside}</p>}
    </div>
  );
}
