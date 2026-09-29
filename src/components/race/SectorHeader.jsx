export default function SectorHeader({ code, kicker, title, lead }) {
  return (
    <div data-reveal className="mb-12 grid gap-6 border-b border-line pb-8 sm:mb-16 lg:grid-cols-[auto_1fr] lg:items-end">
      <div className="flex items-stretch gap-3">
        <span className="w-1.5 bg-yellow" />
        <div>
          <p className="t-label text-yellow">{code}</p>
          <p className="t-label mt-1 text-dim">{kicker}</p>
        </div>
      </div>
      <div className="lg:pl-10">
        <h2 className="t-display italic">{title}</h2>
        {lead && <p className="mt-4 max-w-2xl text-lg text-muted">{lead}</p>}
      </div>
    </div>
  );
}
