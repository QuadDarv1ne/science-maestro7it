"use client";

import * as React from "react";
import { useInView } from "framer-motion";

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number; // ms
  className?: string;
  prefix?: string;
  suffix?: string;
}

/**
 * Animated count-up number that triggers when scrolled into view.
 * Uses requestAnimationFrame with easeOutExpo easing for a satisfying effect.
 */
export function CountUp({
  end,
  start = 0,
  duration = 1500,
  className,
  prefix = "",
  suffix = "",
}: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [value, setValue] = React.useState(start);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
  }, []);

  React.useEffect(() => {
    if (!inView) return;
    if (reducedMotion) {
      setValue(end);
      return;
    }

    let raf = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(start + (end - start) * eased);
      setValue(current);

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, start, duration, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
