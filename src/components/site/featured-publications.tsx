"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { publications, type Publication } from "@/data/publications";
import { formatDate } from "@/lib/utils";

/**
 * Featured publications carousel — highlights the most recent works
 * in a horizontally-scrolling card layout with navigation arrows.
 */
export function FeaturedPublications({
  onSelect,
}: {
  onSelect: (p: Publication) => void;
}) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Pick the 6 most recent publications
  const featured = React.useMemo(
    () =>
      [...publications]
        .sort((a, b) => b.publicationDate.localeCompare(a.publicationDate))
        .slice(0, 6),
    []
  );

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = 340; // min-w + gap
    el.scrollBy({ left: dir * cardWidth, behavior: "smooth" });
  };

  return (
    <div className="relative mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-accent fill-accent/40" />
          <h3 className="font-serif text-lg font-semibold">
            Свежие публикации
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => scrollBy(-1)}
            aria-label="Предыдущие"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => scrollBy(1)}
            aria-label="Следующие"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 -mx-4 px-4"
      >
        {featured.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="snap-start shrink-0 w-[300px] sm:w-[340px]"
          >
            <button
              onClick={() => onSelect(p)}
              className="group w-full text-left rounded-2xl border border-border/60 bg-card p-5 hover:border-accent/40 hover:shadow-xl transition-all duration-300 h-full flex flex-col"
            >
              {/* Featured badge + date */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                  <Star className="h-2.5 w-2.5 fill-accent" />
                  #{i + 1}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Calendar className="h-2.5 w-2.5" />
                  {formatDate(p.publicationDate)}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-serif text-sm font-semibold leading-snug mb-3 line-clamp-3 group-hover:text-accent transition-colors flex-1">
                {p.title}
              </h4>

              {/* Abstract excerpt */}
              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                {p.abstractShort}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-border/60">
                <span className="text-[10px] font-mono text-muted-foreground">
                  {p.doi}
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-medium text-accent group-hover:gap-1.5 transition-all">
                  Открыть
                  <ExternalLink className="h-2.5 w-2.5" />
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
