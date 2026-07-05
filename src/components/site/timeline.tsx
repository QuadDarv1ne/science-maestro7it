"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { publications, CATEGORY_LABELS } from "@/data/publications";
import { pluralRu } from "@/lib/utils";

interface MonthBucket {
  key: string; // YYYY-MM
  label: string; // "Янв 2026"
  count: number;
  categories: Record<string, number>;
}

const MONTH_NAMES_RU = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Май",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
];

export function Timeline() {
  const buckets = React.useMemo<MonthBucket[]>(() => {
    const map = new Map<string, MonthBucket>();
    for (const p of publications) {
      const d = p.publicationDate;
      if (!d) continue;
      const [y, m] = d.split("-");
      const key = `${y}-${m}`;
      const monthIdx = parseInt(m, 10) - 1;
      const label = `${MONTH_NAMES_RU[monthIdx] || m} ${y}`;
      if (!map.has(key)) {
        map.set(key, { key, label, count: 0, categories: {} });
      }
      const b = map.get(key)!;
      b.count += 1;
      for (const c of p.categories) {
        b.categories[c] = (b.categories[c] || 0) + 1;
      }
    }
    // Sort chronologically (oldest first for left-to-right)
    return Array.from(map.values()).sort((a, b) => a.key.localeCompare(b.key));
  }, []);

  const maxCount = Math.max(...buckets.map((b) => b.count), 1);

  return (
    <section id="timeline" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-10"
        >
          <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
            Хронология
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-balance">
            Публикации по месяцам
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Активность публикации на Zenodo по месяцам. Все 30 работ вышли в
            течение 2026 года — пик пришёлся на июнь.
          </p>
        </motion.div>

        {/* Bar chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8"
        >
          <div className="flex items-end justify-between gap-2 sm:gap-3 h-64">
            {buckets.map((b, i) => {
              const heightPct = (b.count / maxCount) * 100;
              return (
                <div
                  key={b.key}
                  className="group relative flex-1 flex flex-col items-center justify-end h-full"
                >
                  {/* Tooltip */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-popover border border-border rounded-md px-2 py-1 text-xs whitespace-nowrap pointer-events-none shadow-lg z-10">
                    <div className="font-semibold">{b.label}</div>
                    <div className="text-muted-foreground">
                      {b.count}{" "}
                      {pluralRu(b.count, [
                        "публикация",
                        "публикации",
                        "публикаций",
                      ])}
                    </div>
                  </div>

                  {/* Count label above bar */}
                  <div className="text-xs font-semibold text-accent mb-1.5">
                    {b.count}
                  </div>

                  {/* Bar with animated fill */}
                  <div
                    className="w-full relative rounded-t-md bg-muted/40 overflow-hidden"
                    style={{ height: `${heightPct}%`, minHeight: "30px" }}
                  >
                    <motion.div
                      initial={{ height: "0%" }}
                      whileInView={{ height: "100%" }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.7,
                        delay: 0.2 + i * 0.08,
                        ease: "easeOut",
                      }}
                      className="w-full bg-gradient-to-t from-accent/50 via-accent/75 to-accent group-hover:from-accent/70 group-hover:to-accent transition-colors"
                    />
                  </div>

                  {/* Month label */}
                  <div className="mt-2 text-[10px] sm:text-xs text-muted-foreground text-center whitespace-nowrap">
                    {b.label}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Category breakdown for the most active month */}
          {(() => {
            const top = buckets.reduce(
              (a, b) => (b.count > a.count ? b : a),
              buckets[0]
            );
            if (!top) return null;
            const cats = Object.entries(top.categories).sort(
              (a, b) => b[1] - a[1]
            );
            return (
              <div className="mt-8 pt-6 border-t border-border/60">
                <div className="flex items-center gap-2 text-sm font-medium mb-3">
                  <Calendar className="h-4 w-4 text-accent" />
                  Самый активный месяц:{" "}
                  <span className="text-accent">{top.label}</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-muted-foreground">
                    {top.count} работ
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cats.map(([cat, n]) => (
                    <span
                      key={cat}
                      className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20"
                    >
                      {CATEGORY_LABELS[cat] || cat}: {n}
                    </span>
                  ))}
                </div>
              </div>
            );
          })()}
        </motion.div>
      </div>
    </section>
  );
}
