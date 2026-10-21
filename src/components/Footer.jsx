import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="carbon">
      <div className="checker" aria-hidden />
      <div className="wrap label flex flex-col gap-3 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name} · Hand-built in Calgary · No templates were harmed
        </p>
        <a href="#main" className="transition-colors hover:text-volt">
          Back to the grid ↑
        </a>
      </div>
    </footer>
  );
}
