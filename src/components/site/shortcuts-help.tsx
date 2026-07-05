"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, X } from "lucide-react";

interface Shortcut {
  keys: string[];
  description: string;
  category: string;
}

const SHORTCUTS: Shortcut[] = [
  {
    keys: ["Ctrl", "K"],
    description: "Открыть командную палитру",
    category: "Глобальные",
  },
  {
    keys: ["/"],
    description: "Фокус на поле поиска публикаций",
    category: "Глобальные",
  },
  {
    keys: ["?"],
    description: "Показать это окно с горячими клавишами",
    category: "Глобальные",
  },
  {
    keys: ["Esc"],
    description: "Закрыть модальное окно / палитру / справку",
    category: "Глобальные",
  },
  {
    keys: ["↑", "↓"],
    description: "Навигация по результатам в командной палитре",
    category: "Командная палитра",
  },
  {
    keys: ["Enter"],
    description: "Выбрать активный элемент в командной палитре",
    category: "Командная палитра",
  },
  {
    keys: ["Home"],
    description: "Прокрутить к началу страницы",
    category: "Навигация",
  },
  {
    keys: ["End"],
    description: "Прокрутить к концу страницы",
    category: "Навигация",
  },
  {
    keys: ["Tab"],
    description: "Переход между интерактивными элементами",
    category: "Доступность",
  },
  {
    keys: ["Shift", "Tab"],
    description: "Обратный переход между элементами",
    category: "Доступность",
  },
];

const OPEN_EVENT = "shortcuts-help:open";

export function ShortcutsHelpTrigger() {
  return null; // Trigger is via keyboard "?" only
}

export function ShortcutsHelp() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;
      if (isTyping) return;
      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape" && open) {
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
  }, [open]);

  if (typeof document === "undefined") return null;

  const grouped = SHORTCUTS.reduce<Record<string, Shortcut[]>>((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {});

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg rounded-2xl border border-border/60 bg-popover shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Keyboard className="h-4 w-4 text-accent" />
                <h2 className="font-serif text-lg font-bold">
                  Горячие клавиши
                </h2>
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
            <div className="max-h-[60vh] overflow-y-auto scrollbar-warm p-5">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-5 last:mb-0">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    {category}
                  </div>
                  <div className="space-y-2">
                    {items.map((s, i) => (
                      <div
                        key={`${s.description}-${i}`}
                        className="flex items-center justify-between gap-3 py-1.5"
                      >
                        <span className="text-sm text-muted-foreground">
                          {s.description}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          {s.keys.map((k, j) => (
                            <kbd
                              key={`${k}-${j}`}
                              className="inline-flex items-center justify-center min-w-7 h-6 px-1.5 rounded border border-border bg-muted text-xs font-mono"
                            >
                              {k}
                            </kbd>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-border/60 bg-muted/30 text-[10px] text-muted-foreground flex items-center justify-between">
              <span>Нажмите ? в любом месте для вызова справки</span>
              <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-border bg-background text-[10px] font-mono">
                ESC
              </kbd>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
