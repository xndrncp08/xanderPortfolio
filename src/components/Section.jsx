// Shared section frame: a numbered label, a big title, an optional aside.
export default function Section({ id, index, label, title, intro, children, className = "" }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={className}>
      <div className="wrap py-20 sm:py-32">
        <header className="mb-12 grid gap-6 sm:mb-16 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="label reveal flex items-center gap-3">
              <span className="text-fg">{index}</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              {label}
            </p>
            <h2 id={`${id}-title`} className="display reveal mt-5 text-[3rem] sm:text-7xl lg:text-[5.5rem]" style={{ "--d": "60ms" }}>
              {title}
            </h2>
          </div>
          {intro && (
            <p className="aside reveal text-xl text-muted sm:text-2xl lg:col-span-4 lg:self-end" style={{ "--d": "120ms" }}>
              {intro}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  );
}
