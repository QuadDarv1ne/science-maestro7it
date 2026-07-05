"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { publications, CATEGORY_LABELS } from "@/data/publications";
import { CountUp } from "@/components/site/count-up";
import {
  Brain,
  GraduationCap,
  Radio,
  ShieldCheck,
  Users,
  Globe2,
  TrendingUp,
  Languages,
  Leaf,
  BookOpen,
} from "lucide-react";

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  ai_ml: Brain,
  education: GraduationCap,
  radio_embedded: Radio,
  infosec: ShieldCheck,
  sociology: Users,
  international: Globe2,
  economics: TrendingUp,
  linguistics: Languages,
  tech_policy: Leaf,
  other: BookOpen,
};

const CATEGORY_ORDER = [
  "education",
  "sociology",
  "ai_ml",
  "economics",
  "international",
  "linguistics",
  "infosec",
  "radio_embedded",
  "tech_policy",
];

export function Stats() {
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of publications) {
      for (const c of p.categories) {
        counts[c] = (counts[c] || 0) + 1;
      }
    }
    return counts;
  }, []);

  const total = publications.length;

  return (
    <section
      id="stats"
      className="py-24 bg-gradient-to-b from-transparent via-muted/30 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
            Направления исследований
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Девять предметных областей
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Тематический охват научных работ — от нейросетевых архитектур и
            квантовых алгоритмов до социологии семьи и геополитики БРИКС.
          </p>
        </motion.div>

        {/* Big stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <StatBlock value={total} label="Публикаций на Zenodo" />
          <StatBlock
            value={Object.keys(categoryCounts).length}
            label="Направлений"
          />
          <StatBlock value={new Date().getFullYear()} label="Год активной публикации" />
          <StatBlock value="1" label="Автор · ORCID" />
        </div>

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORY_ORDER.filter((c) => categoryCounts[c]).map((cat, i) => {
            const Icon = CATEGORY_ICONS[cat] || BookOpen;
            const count = categoryCounts[cat] || 0;
            const pct = Math.round((count / total) * 100);
            return (
              <motion.a
                key={cat}
                href={`#publications`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("publications");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                    window.dispatchEvent(
                      new CustomEvent("filter-category", {
                        detail: cat,
                      })
                    );
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="group rounded-xl border border-border/60 bg-card p-5 hover:border-accent/40 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Icon className="h-4 w-4 text-accent" />
                  </div>
                  <span className="font-serif text-2xl font-bold text-accent">
                    <CountUp end={count} duration={1200} />
                  </span>
                </div>
                <div className="font-medium mb-2 text-sm">
                  {CATEGORY_LABELS[cat] || cat}
                </div>
                <div className="w-full h-1 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.04 }}
                    className="h-full bg-gradient-to-r from-accent/60 to-accent"
                  />
                </div>
                <div className="mt-2 text-[10px] text-muted-foreground uppercase tracking-wider">
                  {pct}% от всех работ
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  const numericValue = typeof value === "number" ? value : parseInt(value, 10);
  const isNumeric = !Number.isNaN(numericValue);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="rounded-xl border border-border/60 bg-card p-6 text-center"
    >
      <div className="font-serif text-4xl sm:text-5xl font-bold text-gradient-warm">
        {isNumeric ? (
          <CountUp end={numericValue} duration={1800} />
        ) : (
          value
        )}
      </div>
      <div className="mt-2 text-xs text-muted-foreground uppercase tracking-wider leading-tight">
        {label}
      </div>
    </motion.div>
  );
}
