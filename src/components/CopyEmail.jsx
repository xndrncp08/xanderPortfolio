"use client";
import { useState } from "react";

const text = {
  idle: "Copy address",
  copied: "Copied. Go on, paste it.",
  failed: "Clipboard said no. It's right above.",
};

export default function CopyEmail({ email }) {
  const [state, setState] = useState("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2500);
  };

  return (
    <button type="button" onClick={copy} className="btn btn-ghost">
      <span aria-live="polite">{text[state]}</span>
    </button>
  );
}
