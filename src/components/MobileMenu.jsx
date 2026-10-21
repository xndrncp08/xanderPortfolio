"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function MobileMenu({ links, resume }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((o) => !o)}
        className="label -mr-2 px-2 py-3 text-fg"
      >
        {open ? "Close" : "Menu"}
      </button>
      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="absolute inset-x-0 top-16 border-b border-line bg-bg"
      >
        <ul className="wrap divide-y divide-line">
          {links.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={() => setOpen(false)} className="display block py-4 text-3xl">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={resume} target="_blank" rel="noopener" className="display block py-4 text-3xl">
              Résumé <span aria-hidden className="text-accent">↗</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
