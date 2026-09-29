export default function SectionIntro({ eyebrow, title, lead, center = false }) {
  return (
    <div data-reveal className={`mb-12 max-w-3xl sm:mb-16 ${center ? "mx-auto text-center" : ""}`}>
      <p className="t-eyebrow text-accent">{eyebrow}</p>
      <h2 className="t-headline mt-2">{title}</h2>
      {lead && <p className="t-lead mt-4 text-muted">{lead}</p>}
    </div>
  );
}
