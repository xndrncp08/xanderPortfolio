import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-28 sm:py-40">
      <p className="label">404 · Track limits exceeded</p>
      <h1 className="display mt-5 text-7xl uppercase sm:text-[9rem]">Off track.</h1>
      <p className="aside mt-6 max-w-xl text-2xl text-muted">
        This page doesn&apos;t exist, so the stewards have deleted your lap. No penalty, though.
      </p>
      <Link href="/" className="btn btn-volt mt-10">
        Back to the pits <span aria-hidden className="arrow">→</span>
      </Link>
    </section>
  );
}
