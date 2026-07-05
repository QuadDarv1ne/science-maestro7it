"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, X, ExternalLink, Trash2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/components/site/favorites-context";
import { publications } from "@/data/publications";
import { pluralRu } from "@/lib/utils";
import { toast } from "sonner";

const OPEN_EVENT = "favorites-panel:open";

export function FavoritesPanelTrigger() {
  const { count } = useFavorites();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const open = () => {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  };

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={open}
      className="h-9 px-2.5 rounded-full gap-1.5 text-muted-foreground hover:text-foreground relative"
      aria-label="Открыть избранное"
    >
      <Bookmark className={`h-3.5 w-3.5 ${count > 0 ? "fill-accent/30 text-accent" : ""}`} />
      {count > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-[10px] font-bold bg-accent text-accent-foreground rounded-full min-w-4 h-4 px-1 inline-flex items-center justify-center"
        >
          {count}
        </motion.span>
      )}
    </Button>
  );
}

export function FavoritesPanel() {
  const { favorites, removeFavorite, clearFavorites } = useFavorites();
  const [open, setOpen] = React.useState(false);
  const openRef = React.useRef(false);

  React.useEffect(() => {
    openRef.current = open;
  }, [open]);

  React.useEffect(() => {
    const handler = () => setOpen(true);
    const escHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openRef.current) setOpen(false);
    };
    window.addEventListener(OPEN_EVENT, handler);
    window.addEventListener("keydown", escHandler);
    return () => {
      window.removeEventListener(OPEN_EVENT, handler);
      window.removeEventListener("keydown", escHandler);
    };
  }, []);

  const favoritePubs = React.useMemo(
    () =>
      favorites
        .map((id) => publications.find((p) => p.id === id))
        .filter((p): p is NonNullable<typeof p> => p !== undefined)
        .sort((a, b) => b.publicationDate.localeCompare(a.publicationDate)),
    [favorites]
  );

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex justify-end bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md h-full bg-popover border-l border-border/60 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Bookmark className="h-4 w-4 text-accent fill-accent/30" />
                <h2 className="font-serif text-lg font-bold">Избранное</h2>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {favoritePubs.length}
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Закрыть"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto scrollbar-warm p-4">
              {favoritePubs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center px-6">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <BookOpen className="h-7 w-7 text-muted-foreground/50" />
                  </div>
                  <h3 className="font-serif text-lg font-semibold mb-2">
                    Избранное пусто
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Нажмите на иконку закладки рядом с публикацией, чтобы
                    сохранить её здесь для быстрого доступа.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {favoritePubs.map((p) => (
                    <motion.div
                      key={p.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="group relative rounded-lg border border-border/60 bg-card p-3 hover:border-accent/40 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium leading-snug line-clamp-2 mb-1">
                            {p.title}
                          </h4>
                          <div className="text-[10px] text-muted-foreground font-mono">
                            {p.doi}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            removeFavorite(p.id);
                            toast.info("Удалено из избранного");
                          }}
                          className="shrink-0 text-muted-foreground hover:text-destructive transition-colors p-1"
                          aria-label="Удалить"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/40">
                        <a
                          href={p.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] font-medium text-accent hover:underline inline-flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Zenodo
                        </a>
                        <span className="text-[10px] text-muted-foreground">
                          {p.publicationDate}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {favoritePubs.length > 0 && (
              <div className="px-5 py-3 border-t border-border/60 bg-muted/30 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {favoritePubs.length}{" "}
                  {pluralRu(favoritePubs.length, [
                    "публикация",
                    "публикации",
                    "публикаций",
                  ])}{" "}
                  в избранном
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-muted-foreground hover:text-destructive h-7"
                  onClick={() => {
                    clearFavorites();
                    toast.info("Избранное очищено");
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                  Очистить всё
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
