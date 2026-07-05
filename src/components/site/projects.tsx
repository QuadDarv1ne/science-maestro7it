"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  Satellite,
  Sun,
  ExternalLink,
  ArrowUpRight,
  BookOpen,
  Keyboard,
  Brain,
  ClipboardList,
  LayoutDashboard,
  Gauge,
  Lightbulb,
  CreditCard,
  Trophy,
  Microscope,
  Atom,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  repos,
  REPO_CATEGORY_LABELS,
  REPO_CATEGORY_ORDER,
  type RepoCategory,
} from "@/data/repos";

const ICON_MAP: Record<string, LucideIcon> = {
  Github,
  Satellite,
  Sun,
  BookOpen,
  Keyboard,
  Brain,
  ClipboardList,
  LayoutDashboard,
  Gauge,
  Lightbulb,
  CreditCard,
  Trophy,
  Microscope,
  Atom,
};

export function Projects() {
  const [activeCat, setActiveCat] = React.useState<RepoCategory | "all">("all");

  const filtered = React.useMemo(() => {
    if (activeCat === "all") return repos;
    return repos.filter((r) => r.category === activeCat);
  }, [activeCat]);

  return (
    <section
      id="projects"
      className="py-24 bg-gradient-to-b from-transparent via-muted/30 to-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
            Проекты и инструменты
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Открытые инструменты и репозитории
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Помимо научных публикаций, ведётся активная разработка открытых
            проектов: от интерактивных платформ для изучения физики и
            тренажёров печати до интеграций платёжных систем и инструментов
            бизнес-анализа. Всего в портфолио{" "}
            <span className="text-foreground font-semibold">{repos.length}</span>{" "}
            проектов.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <CategoryChip
            active={activeCat === "all"}
            onClick={() => setActiveCat("all")}
            label="Все проекты"
            count={repos.length}
          />
          {REPO_CATEGORY_ORDER.filter((c) =>
            repos.some((r) => r.category === c)
          ).map((c) => {
            const count = repos.filter((r) => r.category === c).length;
            return (
              <CategoryChip
                key={c}
                active={activeCat === c}
                onClick={() => setActiveCat(c)}
                label={REPO_CATEGORY_LABELS[c]}
                count={count}
              />
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((repo, i) => {
              const Icon = ICON_MAP[repo.icon] || Github;
              return (
                <motion.a
                  layout
                  key={repo.slug}
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
                  className="group relative flex flex-col rounded-2xl border border-border/60 bg-card p-6 hover:border-accent/40 hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-accent/5 blur-2xl group-hover:bg-accent/10 transition-colors" />

                  <div className="relative flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-accent" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-serif text-lg font-semibold leading-tight">
                      {repo.name}
                    </h3>
                    {repo.stars > 0 && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-accent/40 text-accent/60" />
                        {repo.stars}
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] uppercase tracking-wider text-accent mb-3">
                    {repo.categoryLabel}
                    {repo.language && (
                      <span className="text-muted-foreground ml-2">
                        · {repo.language}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed flex-1 line-clamp-4">
                    {repo.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {repo.tags.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border/40"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 pt-4 border-t border-border/60 text-sm font-medium text-accent inline-flex items-center gap-1.5">
                    Открыть на GitHub
                    <ExternalLink className="h-3 w-3" />
                  </div>
                </motion.a>
              );
            })}
          </AnimatePresence>
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-muted/30 p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-serif text-2xl font-bold mb-2">
              Больше проектов на GitHub
            </h3>
            <p className="text-muted-foreground max-w-xl">
              Подпишитесь на профиль{" "}
              <code className="text-accent">@QuadDarv1ne</code> для отслеживания
              новых репозиториев, обновлений инструментов и научных публикаций.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-full shrink-0">
            <a
              href="https://github.com/QuadDarv1ne"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              @QuadDarv1ne
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryChip({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full border transition-all inline-flex items-center gap-1.5 ${
        active
          ? "bg-accent text-accent-foreground border-accent shadow-sm"
          : "bg-card border-border hover:border-accent/40 hover:bg-accent/5 text-muted-foreground hover:text-foreground"
      }`}
    >
      {label}
      <span
        className={`text-[10px] px-1.5 py-0.5 rounded-full ${
          active ? "bg-accent-foreground/15" : "bg-muted"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
