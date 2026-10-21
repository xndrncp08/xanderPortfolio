"use client";
import { useState } from "react";

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
      <span aria-live="polite">
        {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Couldn't copy — select it above" : "Copy address"}
      </span>
    </button>
  );
}
