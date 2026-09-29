"use client";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { ResumeButton } from "./ResumeViewer";

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
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-serif text-2xl leading-none tracking-tight">
          Xander<span className="text-accent">.</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center">
            {LINKS.map(({ id, label }) => (
              <li key={id} className={id === "contact" ? "" : "hidden md:block"}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active === id ? "text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ResumeButton className="press ml-1 rounded-full border border-line px-3.5 py-1.5 text-sm hover:border-fg" />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
