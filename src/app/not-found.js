import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-32">
      <p className="label">404</p>
      <h1 className="display mt-4 text-6xl">This page doesn&apos;t exist.</h1>
      <Link href="/" className="btn btn-solid mt-10">
        Back home <span aria-hidden className="arrow">→</span>
      </Link>
    </section>
  );
}
