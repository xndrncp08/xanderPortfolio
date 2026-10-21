"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One observer for every `.reveal` on the page, re-scanned per route.
export default function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) return els.forEach((el) => el.classList.add("in"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    console.log(
      "%cOh, hello. You opened the console.%c\nRespect. The source is at github.com/xndrncp08/xanderPortfolio, and my inbox is open.",
      "font: 700 16px system-ui; color: #d4ff3a; background: #0d0d0c; padding: 6px 10px; border-radius: 4px",
      "font: 13px system-ui"
    );
  }, []);

  return null;
}
