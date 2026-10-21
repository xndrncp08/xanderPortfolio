import Link from "next/link";
import { profile } from "@/data/content";
import MobileMenu from "./MobileMenu";

export const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg">
      <div className="wrap flex h-16 items-center justify-between gap-6">
        <Link href="/" className="display text-2xl leading-none">
          {profile.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 text-[0.95rem] md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-muted transition-colors hover:text-fg">
              {item.label}
            </Link>
          ))}
          <a href={profile.resume} target="_blank" rel="noopener" className="btn btn-ghost py-2">
            Résumé
          </a>
        </nav>
        <MobileMenu links={nav} resume={profile.resume} />
      </div>
    </header>
  );
}
