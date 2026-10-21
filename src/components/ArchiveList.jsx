"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// A list first; on a mouse, a small preview of the project art follows the
// cursor. Previews mount on first hover so touch devices never download them.
export default function ArchiveList({ projects }) {
  const box = useRef(null);
  const [armed, setArmed] = useState(false);
  const [active, setActive] = useState(null);

  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    if (!armed) setArmed(true);
    box.current?.style.setProperty("transform", `translate(${e.clientX + 24}px, ${e.clientY - 90}px)`);
  };

  return (
    <div
      onPointerEnter={(e) => e.pointerType === "mouse" && setArmed(true)}
      onPointerMove={move}
      onPointerLeave={() => setActive(null)}
    >
      <ul className="border-t border-line">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              onPointerEnter={() => setActive(p.slug)}
              onFocus={() => setActive(null)}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-line py-6 transition-[padding] duration-300 ease-[var(--ease)] sm:grid-cols-[4.5rem_minmax(0,16rem)_1fr_auto] [@media(hover:hover)]:hover:pl-3"
            >
              <span className="label order-3 sm:order-none">{p.year}</span>
              <span className="display text-4xl">
                {p.title}
                {p.status && <span className="label ml-2 align-middle">· WIP</span>}
              </span>
              <span className="order-4 col-span-2 text-muted sm:order-none sm:col-span-1">{p.tagline}</span>
              <span className="label hidden sm:inline">
                {p.kind} <span aria-hidden className="arrow">→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {armed && (
        <div
          ref={box}
          aria-hidden
          style={{ transform: "translate(-999px, -999px)" }}
          className={`pointer-events-none fixed top-0 left-0 z-30 hidden aspect-[16/10] w-72 overflow-hidden rounded-md bg-carbon shadow-2xl transition-opacity duration-200 lg:block ${active ? "opacity-100" : "opacity-0"}`}
        >
          {projects.map((p) => (
            <Image
              key={p.slug}
              src={p.logo ?? p.image}
              alt=""
              fill
              sizes="288px"
              loading="eager"
              className={`object-cover ${p.logo ? "" : "object-top"} transition-opacity duration-200 ${active === p.slug ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
