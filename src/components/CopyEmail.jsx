"use client";
import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export default function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="press inline-flex items-center gap-2 rounded-full border border-bg/20 px-5 py-3 text-sm hover:border-bg/50"
    >
      {copied ? <FiCheck /> : <FiCopy />}
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
