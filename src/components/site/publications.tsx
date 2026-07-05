"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ExternalLink,
  FileText,
  Calendar,
  X,
  Filter,
  ArrowUpDown,
  Quote,
  Clock,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  publications,
  type Publication,
  CATEGORY_LABELS,
} from "@/data/publications";
import { ShareMenu } from "@/components/site/share-menu";
import { CitationExport } from "@/components/site/citation-export";
import { FeaturedPublications } from "@/components/site/featured-publications";
import { FavoriteButton } from "@/components/site/favorite-button";
import { useFavorites } from "@/components/site/favorites-context";

type SortKey = "newest" | "oldest" | "title";

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
  "other",
];

export function Publications() {
  const { favorites, isFavorite } = useFavorites();
  const [query, setQuery] = React.useState("");
  const [activeCats, setActiveCats] = React.useState<Set<string>>(new Set());
  const [sort, setSort] = React.useState<SortKey>("newest");
  const [favoritesOnly, setFavoritesOnly] = React.useState(false);
  const [selected, setSelected] = React.useState<Publication | null>(null);
  const [limit, setLimit] = React.useState(9);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [kbdHintVisible, setKbdHintVisible] = React.useState(false);

  // Listen for category filter events from Stats section
  React.useEffect(() => {
    const handler = (e: Event) => {
      const cat = (e as CustomEvent).detail as string;
      setActiveCats(new Set([cat]));
      setLimit(9);
      // small delay to let render settle
      setTimeout(() => {
        const el = document.getElementById("publications");
        if (el) {
          const y =
            el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 50);
    };
    window.addEventListener("filter-category", handler);
    return () => window.removeEventListener("filter-category", handler);
  }, []);

  // Keyboard shortcut: press "/" to focus search (when not in an input)
  React.useEffect(() => {
    setKbdHintVisible(true);
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (isTyping) return;
      // Don't intercept Ctrl/Cmd+K — that's reserved for the command palette
      if (e.ctrlKey || e.metaKey) return;
      if (e.key === "/") {
        e.preventDefault();
        const el = document.getElementById("publications");
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
        setTimeout(() => searchInputRef.current?.focus(), 350);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Listen for "open-publication" events from command palette
  React.useEffect(() => {
    const handler = (e: Event) => {
      const pubId = (e as CustomEvent).detail as number;
      const pub = publications.find((p) => p.id === pubId);
      if (pub) {
        setSelected(pub);
      }
    };
    window.addEventListener("open-publication", handler);
    return () => window.removeEventListener("open-publication", handler);
  }, []);

  // Persist scroll position when leaving the Publications section,
  // restore it when returning via the "Публикации" nav link.
  React.useEffect(() => {
    const STORAGE_KEY = "science-maestro7it:pubs-scroll";
    const section = document.getElementById("publications");

    // Restore on mount (with small delay to let content render)
    const restoreTimer = setTimeout(() => {
      try {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        if (saved && section) {
          const y = parseInt(saved, 10);
          if (!Number.isNaN(y) && y > 0) {
            const top = section.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: top + y, behavior: "instant" });
            sessionStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch {
        // ignore
      }
    }, 300);

    // Save on click of nav link "#publications"
    const navHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href="#publications"]') as HTMLAnchorElement | null;
      if (link && section) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY - 70;
        const relative = window.scrollY - sectionTop;
        if (relative > 100) {
          try {
            sessionStorage.setItem(STORAGE_KEY, String(relative));
          } catch {
            // ignore
          }
        }
      }
    };
    document.addEventListener("click", navHandler);

    return () => {
      clearTimeout(restoreTimer);
      document.removeEventListener("click", navHandler);
    };
  }, []);

  const filtered = React.useMemo(() => {
    let list = publications.filter((p) => {
      // Favorites filter
      if (favoritesOnly && !isFavorite(p.id)) return false;
      // Category filter
      if (activeCats.size > 0) {
        const hasCat = p.categories.some((c) => activeCats.has(c));
        if (!hasCat) return false;
      }
      // Text search
      if (query.trim()) {
        const q = query.toLowerCase();
        const hay = (
          p.title +
          " " +
          p.abstract +
          " " +
          p.authors +
          " " +
          p.categoryLabels.join(" ")
        ).toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    list = [...list].sort((a, b) => {
      if (sort === "title") return a.title.localeCompare(b.title, "ru");
      if (sort === "oldest")
        return a.publicationDate.localeCompare(b.publicationDate);
      // newest
      return b.publicationDate.localeCompare(a.publicationDate);
    });

    return list;
  }, [query, activeCats, sort, favoritesOnly, favorites, isFavorite]);

  const visible = filtered.slice(0, limit);
  const hasMore = filtered.length > limit;

  const toggleCat = (cat: string) => {
    setActiveCats((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
    setLimit(9);
  };

  const resetFilters = () => {
    setQuery("");
    setActiveCats(new Set());
    setSort("newest");
    setFavoritesOnly(false);
    setLimit(9);
  };

  return (
    <section id="publications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-10"
        >
          <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
            Библиография
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Научные публикации
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Все работы размещены в открытом доступе на Zenodo с постоянными DOI.
            Поиск, фильтрация по темам и сортировка — для удобной навигации по
            библиографии.
          </p>
        </motion.div>

        {/* Featured publications carousel */}
        <FeaturedPublications onSelect={(p) => setSelected(p)} />

        {/* Toolbar */}
        <div className="space-y-4 mb-8">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setLimit(9);
                }}
                placeholder="Поиск по названию, аннотации, теме…"
                className="pl-9 pr-16 h-11 rounded-full bg-card"
              />
              {query ? (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Очистить"
                >
                  <X className="h-4 w-4" />
                </button>
              ) : (
                kbdHintVisible && (
                  <kbd
                    className="hidden sm:inline-flex absolute right-3 top-1/2 -translate-y-1/2 items-center justify-center h-5 min-w-5 px-1.5 rounded border border-border bg-muted text-[10px] font-mono text-muted-foreground"
                    title="Нажмите / для поиска"
                  >
                    /
                  </kbd>
                )
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-sm:pb-1">
              <ArrowUpDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
              {(
                [
                  { k: "newest", label: "Сначала новые" },
                  { k: "oldest", label: "Сначала старые" },
                  { k: "title", label: "По названию" },
                ] as { k: SortKey; label: string }[]
              ).map((opt) => (
                <Button
                  key={opt.k}
                  variant={sort === opt.k ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => setSort(opt.k)}
                >
                  {opt.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Category chips */}
          <div className="flex items-start gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider pt-2 shrink-0">
              <Filter className="h-3 w-3" /> <span className="hidden sm:inline">Темы:</span>
            </div>
            <div className="flex flex-wrap gap-2 overflow-x-auto no-scrollbar max-sm:pb-1">
              {/* Favorites filter chip */}
              <button
                onClick={() => {
                  setFavoritesOnly((v) => !v);
                  setLimit(9);
                }}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all inline-flex items-center gap-1.5 ${
                  favoritesOnly
                    ? "bg-accent text-accent-foreground border-accent shadow-sm"
                    : "bg-card border-border hover:border-accent/40 hover:bg-accent/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Bookmark
                  className={`h-3 w-3 ${favoritesOnly ? "fill-accent-foreground/40" : ""}`}
                />
                Избранное
                {favorites.length > 0 && (
                  <span
                    className={`text-[10px] px-1 rounded-full ${
                      favoritesOnly ? "bg-accent-foreground/15" : "bg-muted"
                    }`}
                  >
                    {favorites.length}
                  </span>
                )}
              </button>
              {CATEGORY_ORDER.filter((c) =>
                publications.some((p) => p.categories.includes(c))
              ).map((cat) => {
                const active = activeCats.has(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => toggleCat(cat)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      active
                        ? "bg-accent text-accent-foreground border-accent shadow-sm"
                        : "bg-card border-border hover:border-accent/40 hover:bg-accent/5 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {CATEGORY_LABELS[cat] || cat}
                  </button>
                );
              })}
              {(activeCats.size > 0 || query || favoritesOnly) && (
                <button
                  onClick={resetFilters}
                  className="text-xs px-3 py-1.5 rounded-full text-muted-foreground hover:text-destructive transition-colors inline-flex items-center gap-1"
                >
                  <X className="h-3 w-3" /> Сбросить
                </button>
              )}
            </div>
          </div>

          {/* Result count */}
          <div className="text-sm text-muted-foreground">
            Найдено:{" "}
            <span className="text-foreground font-semibold">
              {filtered.length}
            </span>{" "}
            {pluralRu(filtered.length, [
              "публикация",
              "публикации",
              "публикаций",
            ])}
          </div>
        </div>

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center">
            <FileText className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">
              По вашему запросу ничего не найдено. Попробуйте изменить условия
              поиска.
            </p>
            <Button
              variant="outline"
              className="mt-4 rounded-full"
              onClick={resetFilters}
            >
              Сбросить фильтры
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <motion.div
                  layout
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
                  className="group relative flex flex-col rounded-2xl border border-border/60 bg-card p-6 hover:border-accent/40 hover:shadow-xl transition-all duration-300"
                >
                  {/* Date + index */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" />
                      {formatDate(p.publicationDate)}
                    </span>
                    <span className="font-mono text-[10px] opacity-60">
                      #{p.id}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-semibold text-lg leading-snug mb-3 line-clamp-3 group-hover:text-accent transition-colors">
                    <button
                      onClick={() => setSelected(p)}
                      className="text-left"
                      aria-label={`Открыть: ${p.title}`}
                    >
                      {p.title}
                    </button>
                  </h3>

                  {/* Category badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.categoryLabels.slice(0, 2).map((c) => (
                      <Badge
                        key={c}
                        variant="secondary"
                        className="text-[10px] font-normal py-0 px-2 bg-accent/10 text-accent border-0"
                      >
                        {c}
                      </Badge>
                    ))}
                  </div>

                  {/* Abstract excerpt */}
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {p.abstractShort}
                  </p>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelected(p)}
                        className="text-xs font-medium text-foreground hover:text-accent transition-colors inline-flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted/60"
                      >
                        <FileText className="h-3 w-3" />
                        Подробнее
                      </button>
                      <FavoriteButton
                        publicationId={p.id}
                        publicationTitle={p.title}
                        variant="icon"
                      />
                    </div>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-accent hover:underline inline-flex items-center gap-1"
                    >
                      Zenodo
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full"
              onClick={() => setLimit((l) => l + 9)}
            >
              Показать ещё {Math.min(9, filtered.length - limit)} из{" "}
              {filtered.length - limit}
            </Button>
          </div>
        )}
      </div>

      {/* Publication detail modal */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto scrollbar-warm p-4 sm:p-6 max-sm:h-[100dvh] max-sm:max-h-[100dvh] max-sm:rounded-none max-sm:border-0">
          <ModalReadingProgress />
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3 w-3" />
                  {formatDate(selected.publicationDate)}
                  <span className="opacity-40">·</span>
                  <span className="font-mono">{selected.doi}</span>
                </div>
                <DialogTitle className="font-serif text-2xl sm:text-3xl leading-tight">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="text-sm">
                  Автор: {selected.authors}
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-wrap gap-2 my-4">
                {selected.categoryLabels.map((c) => (
                  <Badge
                    key={c}
                    variant="secondary"
                    className="bg-accent/10 text-accent border-0"
                  >
                    {c}
                  </Badge>
                ))}
              </div>

              <div className="relative rounded-lg bg-muted/40 p-5 my-4">
                <Quote className="absolute -top-2 -left-1 h-5 w-5 text-accent/40" />
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line pl-4">
                  {selected.abstract}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-6">
                <Button asChild className="rounded-full">
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Открыть на Zenodo
                  </a>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <a
                    href={selected.doiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="h-4 w-4" />
                    DOI: {selected.doi}
                  </a>
                </Button>
              </div>

              {/* Share + Citation export row */}
              <div className="mt-3 flex flex-wrap items-center gap-3 justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <ShareMenu url={selected.url} title={selected.title} />
                  <CitationExport publication={selected} />
                  <FavoriteButton
                    publicationId={selected.id}
                    publicationTitle={selected.title}
                    variant="full"
                  />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {readingTime(selected.abstract)} мин чтения
                  <span className="opacity-40">·</span>
                  <span>{wordCount(selected.abstract)} слов</span>
                </div>
              </div>

              <div className="mt-4 p-3 rounded-lg bg-muted/30 text-xs text-muted-foreground">
                <strong className="text-foreground">Цитирование (ГОСТ):</strong> Дуплей
                М.И. {selected.title} [Электронный ресурс] // Zenodo. —{" "}
                {selected.publicationDate}. — URL: {selected.url} (дата
                обращения: [указать]). — DOI: {selected.doi}. — ORCID:
                0009-0007-7605-539X.
              </div>

              {/* Related publications */}
              {(() => {
                const related = publications
                  .filter(
                    (p) =>
                      p.id !== selected.id &&
                      p.categories.some((c) => selected.categories.includes(c))
                  )
                  .map((p) => ({
                    pub: p,
                    score: p.categories.filter((c) =>
                      selected.categories.includes(c)
                    ).length,
                  }))
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 4);

                if (related.length === 0) return null;

                return (
                  <div className="mt-6 pt-5 border-t border-border/60">
                    <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
                      Похожие публикации
                    </div>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {related.map(({ pub, score }) => (
                        <button
                          key={pub.id}
                          onClick={() => setSelected(pub)}
                          className="group text-left p-3 rounded-lg border border-border/60 hover:border-accent/40 hover:bg-muted/40 transition-all"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] text-muted-foreground font-mono">
                              {formatDate(pub.publicationDate)}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent/10 text-accent">
                              {score}{" "}
                              {pluralRu(score, ["совпадение", "совпадения", "совпадений"])}
                            </span>
                          </div>
                          <div className="text-xs font-medium leading-snug line-clamp-2 group-hover:text-accent transition-colors">
                            {pub.title}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })()}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function pluralRu(n: number, forms: [string, string, string]): string {
  const n10 = n % 10;
  const n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return forms[0];
  if (n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)) return forms[1];
  return forms[2];
}

/** Estimate reading time in minutes for Russian text (~180 wpm). */
function readingTime(text: string): number {
  const words = wordCount(text);
  return Math.max(1, Math.round(words / 180));
}

/** Count words in text, handling Cyrillic + Latin + punctuation. */
function wordCount(text: string): number {
  if (!text) return 0;
  // Strip "Аннотация." prefix and similar
  const cleaned = text.replace(/^Аннотация\.?\s*/i, "");
  const words = cleaned
    .split(/[\s,.;:!?()«»""'—–-]+/)
    .filter((w) => w.length > 0);
  return words.length;
}

/**
 * Thin progress bar at the top of the publication modal that fills
 * as the user scrolls through the abstract content.
 */
function ModalReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const dialog = document.querySelector(
      "[role=\"dialog\"]"
    ) as HTMLElement | null;
    if (!dialog) return;

    const handler = () => {
      const scrollTop = dialog.scrollTop;
      const scrollHeight = dialog.scrollHeight - dialog.clientHeight;
      const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, pct)));
    };

    // Initial
    handler();
    dialog.addEventListener("scroll", handler, { passive: true });
    // Re-check after content fully renders
    const t = setTimeout(handler, 200);

    return () => {
      dialog.removeEventListener("scroll", handler);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="sticky top-0 left-0 right-0 h-[3px] bg-muted/40 z-10 -mx-6 -mt-6 mb-4 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-accent via-accent to-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
