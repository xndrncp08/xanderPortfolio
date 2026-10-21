import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap label flex flex-col gap-2 py-8 sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · No. 08 · Made in Calgary
        </p>
        <a href="#main" className="hover:text-fg">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
