"use client";

import { useEffect, useState } from "react";

export function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="mt-2 block font-sans text-[10px] font-bold tracking-[0.2em] text-marsala uppercase underline-offset-4 hover:underline"
    >
      <span aria-live="polite">{copied ? "Copiado" : label}</span>
    </button>
  );
}
