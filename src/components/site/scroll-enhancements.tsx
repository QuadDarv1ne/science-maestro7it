"use client";

import * as React from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Two enhancements bundled together:
 * 1. A thin progress bar at the very top of the viewport that fills as the
 *    user scrolls down the page.
 * 2. A floating "back to top" button that fades in after the user scrolls
 *    past the first viewport.
 */
export function ScrollEnhancements() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  const [showTop, setShowTop] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-accent via-accent to-primary shadow-[0_0_8px_var(--accent)]"
        aria-hidden="true"
      />

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={scrollTop}
              size="icon"
              aria-label="Наверх"
              className="h-11 w-11 rounded-full shadow-xl border border-border/40 bg-card/95 backdrop-blur-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <ArrowUp className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
