// Shared section frame: a numbered label in the margin, a serif title beside it.
export default function Section({ id, index, label, title, intro, children, className = "" }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`border-t border-line ${className}`}>
      <div className="wrap py-20 sm:py-28">
        <header className="mb-12 grid gap-4 sm:mb-16 lg:grid-cols-12">
          <p className="label lg:col-span-3 lg:pt-3">
            {index} — {label}
          </p>
          <div className="lg:col-span-9">
            <h2 id={`${id}-title`} className="display text-[2.5rem] sm:text-6xl">
              {title}
            </h2>
            {intro && <p className="prose-measure mt-5 text-lg text-muted">{intro}</p>}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
