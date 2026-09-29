"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { ResumeButton } from "./SheetProvider";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const { id } of LINKS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className="glass fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-12 max-w-[980px] items-center justify-between px-4 sm:px-6">
        <a href="#top" className="text-[17px] font-semibold tracking-[-0.022em]">
          Xander Rancap
        </a>

        <div className="flex items-center gap-1">
          <ul className="mr-2 hidden items-center md:flex">
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`t-caption px-3 py-2 transition-colors duration-200 ${
                    active === id ? "text-fg" : "text-fg/65 hover:text-fg"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ResumeButton className="press rounded-full bg-accent px-3.5 py-1 text-[13px] font-medium text-accent-fg hover:bg-accent-hover" />
          <ThemeToggle />
        </div>
      </nav>
      {/* Scroll edge: a hairline appears only once content passes underneath. */}
      <div
        className={`h-px bg-line transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-0"}`}
      />
    </header>
  );
}
