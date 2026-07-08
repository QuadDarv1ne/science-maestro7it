"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileText,
  Github,
  GraduationCap,
  Calendar,
  Hash,
  ArrowRight,
  CornerDownLeft,
  Sun,
  Moon,
  Palette,
  ExternalLink,
  BookOpen,
  User,
  Briefcase,
  Mail,
  Copy,
  Command,
} from "lucide-react";
import { publications, author } from "@/data/publications";
import { repos } from "@/data/repos";
import { useTheme } from "next-themes";
import { AVAILABLE_THEMES, type ThemeId } from "@/components/site/theme-provider";
import { Button } from "@/components/ui/button";

interface CommandItem {
  id: string;
  label: string;
  hint?: string;
  icon: React.ComponentType<{ className?: string }>;
  group: "Навигация" | "Публикации" | "Проекты" | "Темы" | "Действия";
  keywords?: string;
  action: () => void;
  badge?: string;
}

// Shared open state via custom event so the trigger button can live in Header
const OPEN_EVENT = "command-palette:open";

export function CommandPaletteTrigger() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const open = () => {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={open}
      className="h-9 px-2.5 rounded-full gap-2 text-muted-foreground hover:text-foreground hidden md:inline-flex"
      aria-label="Открыть командную палитру"
    >
      <Search className="h-3.5 w-3.5" />
      <span className="text-xs">Поиск</span>
      <kbd className="inline-flex items-center gap-0.5 h-5 px-1.5 rounded border border-border bg-muted text-[10px] font-mono">
        {mounted && typeof navigator !== "undefined" &&
        ((navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform?.toLowerCase().includes("mac") ||
         navigator.userAgent.toLowerCase().includes("mac")) ? (
          <>
            <Command className="h-2.5 w-2.5" />K
          </>
        ) : (
          "Ctrl K"
        )}
      </kbd>
    </Button>
  );
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);
  const openRef = React.useRef(false);
  const { setTheme } = useTheme();

  // Sync ref with state
  React.useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Open via Ctrl+K / Cmd+K or via custom event from trigger button
  React.useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        if (isTyping) return;
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape" && openRef.current) {
        setOpen(false);
      }
    };
    const eventHandler = () => setOpen(true);
    window.addEventListener("keydown", keyHandler);
    window.addEventListener(OPEN_EVENT, eventHandler);
    return () => {
      window.removeEventListener("keydown", keyHandler);
      window.removeEventListener(OPEN_EVENT, eventHandler);
    };
  }, []);

  // Focus input when opening
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const scrollToSection = (href: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const openExternal = (url: string) => {
    setOpen(false);
    setTimeout(() => window.open(url, "_blank", "noopener,noreferrer"), 100);
  };

  const items = React.useMemo<CommandItem[]>(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-about",
        label: "Об авторе",
        icon: User,
        group: "Навигация",
        action: () => scrollToSection("#about"),
      },
      {
        id: "nav-stats",
        label: "Направления исследований",
        icon: Hash,
        group: "Навигация",
        action: () => scrollToSection("#stats"),
      },
      {
        id: "nav-timeline",
        label: "Хронология публикаций",
        icon: Calendar,
        group: "Навигация",
        action: () => scrollToSection("#timeline"),
      },
      {
        id: "nav-publications",
        label: "Все публикации",
        icon: BookOpen,
        group: "Навигация",
        action: () => scrollToSection("#publications"),
      },
      {
        id: "nav-projects",
        label: "Проекты и репозитории",
        icon: Briefcase,
        group: "Навигация",
        action: () => scrollToSection("#projects"),
      },
      {
        id: "nav-contact",
        label: "Контакты",
        icon: Mail,
        group: "Навигация",
        action: () => scrollToSection("#contact"),
      },
    ];

    const actionItems: CommandItem[] = [
      {
        id: "act-github",
        label: "Открыть GitHub автора",
        icon: Github,
        group: "Действия",
        action: () => openExternal(author.github),
      },
      {
        id: "act-stepik",
        label: "Открыть курсы на Stepik",
        icon: GraduationCap,
        group: "Действия",
        action: () => openExternal(author.stepik),
      },
      {
        id: "act-school",
        label: "Открыть школу Maestro7IT",
        icon: GraduationCap,
        group: "Действия",
        action: () => openExternal(author.school),
      },
      {
        id: "act-orcid",
        label: "Открыть ORCID профиль",
        icon: ExternalLink,
        group: "Действия",
        hint: author.orcid,
        action: () => openExternal(author.orcidUrl),
      },
    ];

    const themeItems: CommandItem[] = AVAILABLE_THEMES.map((t) => ({
      id: `theme-${t.id}`,
      label: `Тема: ${t.label}`,
      icon: Palette,
      group: "Темы",
      badge: t.label,
      action: () => {
        setTheme(t.id as ThemeId);
        setOpen(false);
      },
    }));

    const pubItems: CommandItem[] = publications.slice(0, 12).map((p) => ({
      id: `pub-${p.id}`,
      label: p.title,
      icon: FileText,
      group: "Публикации",
      hint: p.doi,
      keywords: p.title + " " + p.abstract + " " + p.categoryLabels.join(" "),
      action: () => {
        setOpen(false);
        setTimeout(() => {
          const el = document.getElementById("publications");
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
          window.dispatchEvent(
            new CustomEvent("open-publication", { detail: p.id })
          );
        }, 50);
      },
    }));

    const repoItems: CommandItem[] = repos.slice(0, 8).map((r) => ({
      id: `repo-${r.slug}`,
      label: r.name,
      icon: Github,
      group: "Проекты",
      hint: r.categoryLabel,
      keywords: r.description + " " + r.tags.join(" "),
      action: () => openExternal(r.url),
    }));

    return [...navItems, ...actionItems, ...themeItems, ...pubItems, ...repoItems];
  }, [setTheme]);

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((it) => {
      const hay = (
        it.label +
        " " +
        (it.hint || "") +
        " " +
        (it.keywords || "") +
        " " +
        it.group
      ).toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  // Reset active index when query changes
  React.useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Scroll active item into view
  React.useEffect(() => {
    const container = listRef.current;
    if (!container) return;
    const active = container.children[activeIndex] as HTMLElement;
    if (active) {
      active.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) item.action();
    }
  };

  // Group items for display
  const grouped = React.useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const it of filtered) {
      if (!map.has(it.group)) map.set(it.group, []);
      map.get(it.group)!.push(it);
    }
    return Array.from(map.entries());
  }, [filtered]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl rounded-2xl border border-border/60 bg-popover shadow-2xl overflow-hidden"
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 border-b border-border/60">
              <Search className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Найти раздел, публикацию, проект, тему…"
                className="flex-1 bg-transparent py-4 text-sm outline-none placeholder:text-muted-foreground"
                role="combobox"
                aria-expanded={open}
                aria-controls="command-palette-list"
                aria-activedescendant={filtered[activeIndex] ? `cmd-${filtered[activeIndex].id}` : undefined}
                aria-label="Поиск по сайту"
                aria-autocomplete="list"
              />
              <kbd className="hidden sm:inline-flex items-center justify-center h-5 px-1.5 rounded border border-border bg-muted text-[10px] font-mono text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div
              ref={listRef}
              id="command-palette-list"
              role="listbox"
              aria-label="Результаты поиска"
              className="max-h-[55vh] overflow-y-auto scrollbar-warm p-2"
            >
              {filtered.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  Ничего не найдено по запросу «{query}»
                </div>
              ) : (
                grouped.map(([group, groupItems]) => (
                  <div key={group} className="mb-2">
                    <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {group}
                    </div>
                    {groupItems.map((it) => {
                      const idx = filtered.indexOf(it);
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={it.id}
                          id={`cmd-${it.id}`}
                          role="option"
                          aria-selected={isActive}
                          onMouseEnter={() => setActiveIndex(idx)}
                          onClick={it.action}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                            isActive
                              ? "bg-accent/15 text-accent-foreground"
                              : "hover:bg-muted/60"
                          }`}
                        >
                          <it.icon
                            className={`h-4 w-4 shrink-0 ${
                              isActive ? "text-accent" : "text-muted-foreground"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {it.label}
                            </div>
                            {it.hint && (
                              <div className="text-xs text-muted-foreground truncate font-mono">
                                {it.hint}
                              </div>
                            )}
                          </div>
                          {it.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 shrink-0">
                              {it.badge}
                            </span>
                          )}
                          {isActive && (
                            <CornerDownLeft className="h-3.5 w-3.5 text-accent shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border/60 bg-muted/30 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex items-center justify-center h-4 px-1 rounded border border-border bg-background font-mono">
                    ↑↓
                  </kbd>
                  навигация
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="inline-flex items-center justify-center h-4 px-1 rounded border border-border bg-background font-mono">
                    ↵
                  </kbd>
                  выбор
                </span>
                <span className="hidden sm:flex items-center gap-1">
                  <kbd className="inline-flex items-center justify-center h-4 px-1 rounded border border-border bg-background font-mono">
                    ESC
                  </kbd>
                  закрыть
                </span>
              </div>
              <div className="text-[10px]">
                {filtered.length} результатов
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
