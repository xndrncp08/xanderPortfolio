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
      className="press inline-flex items-center gap-2 rounded-full bg-tile px-6 py-3 text-[17px] font-medium hover:bg-tile-2"
    >
      {copied ? <FiCheck className="text-[#30d158]" /> : <FiCopy className="text-muted" />}
      <span aria-live="polite">{copied ? "Copied" : email}</span>
    </button>
  );
}
