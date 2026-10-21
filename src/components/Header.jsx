import Link from "next/link";
import { profile } from "@/data/content";
import LocalTime from "./LocalTime";
import MobileMenu from "./MobileMenu";

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#off-track", label: "Off track" },
  { href: "/#receipts", label: "Receipts" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-baseline gap-2.5" aria-label={`${profile.name}, home`}>
          <span className="display text-[1.35rem] tracking-[-0.03em]">Xander Rancap</span>
          <span aria-hidden className="label rounded-sm bg-volt px-1 text-[0.65rem] text-[#0f0f0e]">
            08
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 text-[0.92rem] md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted transition-colors hover:text-fg">
              {item.label}
            </Link>
          ))}
          <LocalTime className="label hidden border-l border-line pl-6 lg:block" />
        </nav>
        <MobileMenu links={nav} resume={profile.resume} />
      </div>
    </header>
  );
}
