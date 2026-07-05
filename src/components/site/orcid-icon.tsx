"use client";

import * as React from "react";

/** Simple ORCID icon (SVG) — Lucide doesn't have one */
export function OrcidIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-4.5 4.5h1.5v9H7.5v-9zm.75-2.5a.95.95 0 1 1 0 1.9.95.95 0 0 1 0-1.9zM13 7c1.65 0 3.5.92 3.5 3.5 0 2.55-1.85 3.5-3.5 3.5h-.5v1.5h-1.5v-9H13zm.25 1.5H13v4h.25c1.2 0 1.75-.7 1.75-2s-.55-2-1.75-2z" />
    </svg>
  );
}
