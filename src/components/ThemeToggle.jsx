"use client";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  // Both icons render; CSS picks one so server and client markup always match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      <FiMoon className="size-4 dark:hidden" />
      <FiSun className="hidden size-4 dark:block" />
    </button>
  );
}
