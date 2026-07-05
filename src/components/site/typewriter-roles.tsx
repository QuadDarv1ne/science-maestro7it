"use client";

import * as React from "react";

interface TypewriterRolesProps {
  roles: string[];
  intervalMs?: number;
  typeSpeedMs?: number;
  deleteSpeedMs?: number;
}

/**
 * Cycles through a list of roles with a typewriter effect:
 * types out each role, pauses, deletes it, then types the next.
 * Respects prefers-reduced-motion (renders static first role).
 */
export function TypewriterRoles({
  roles,
  intervalMs = 2200,
  typeSpeedMs = 80,
  deleteSpeedMs = 40,
}: TypewriterRolesProps) {
  const [displayed, setDisplayed] = React.useState("");
  const [roleIndex, setRoleIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<"typing" | "pausing" | "deleting">(
    "typing"
  );
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  React.useEffect(() => {
    if (reducedMotion) {
      setDisplayed(roles[0] || "");
      return;
    }

    const currentRole = roles[roleIndex];

    if (phase === "typing") {
      if (displayed.length < currentRole.length) {
        const t = setTimeout(() => {
          setDisplayed(currentRole.substring(0, displayed.length + 1));
        }, typeSpeedMs);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("deleting"), intervalMs);
        return () => clearTimeout(t);
      }
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        const t = setTimeout(() => {
          setDisplayed(currentRole.substring(0, displayed.length - 1));
        }, deleteSpeedMs);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setPhase("typing");
      }
    }
  }, [displayed, phase, roleIndex, roles, intervalMs, typeSpeedMs, deleteSpeedMs, reducedMotion]);

  return (
    <span className="inline-flex items-center">
      <span className="text-accent font-medium">{displayed}</span>
      {!reducedMotion && (
        <span
          className="inline-block w-[2px] h-[1em] bg-accent ml-1 animate-pulse"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
