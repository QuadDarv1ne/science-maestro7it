"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Github, Menu, X, Atom } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { ThemeSwitcher } from "@/components/site/theme-switcher";
import { CommandPaletteTrigger } from "@/components/site/command-palette";
import { FavoritesPanelTrigger } from "@/components/site/favorites-panel";

const NAV_LINKS = [
  { href: "#about", label: "Об авторе" },
  { href: "#stats", label: "Темы" },
  { href: "#timeline", label: "Хронология" },
  { href: "#publications", label: "Публикации" },
  { href: "#projects", label: "Проекты" },
  { href: "#contact", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { scrollY } = useScroll();
  const lastScrollY = React.useRef(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    setScrolled(latest > 24);

    // Hide on scroll down (after 200px), show on scroll up
    if (latest > previous && latest > 200) {
      setHidden(true);
    } else if (latest < previous || latest < 100) {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-border/40 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-14" : "h-16"
          }`}
        >
          {/* Logo with icon */}
          <Link href="#top" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center ring-1 ring-accent/30"
            >
              <Atom className="h-4 w-4 text-accent" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent animate-pulse" />
            </motion.div>
            <span className="font-serif text-lg font-bold tracking-tight">
              Science
              <span className="text-accent">·</span>
              <span className="text-muted-foreground text-sm font-normal ml-1 hidden sm:inline">
                Maestro7IT
              </span>
            </span>
          </Link>

          {/* Desktop nav — pill container */}
          <nav
            className={`hidden md:flex items-center gap-1 rounded-full transition-all duration-300 ${
              scrolled
                ? "bg-muted/40 border border-border/40 px-1.5 py-1 backdrop-blur-sm"
                : "px-0 py-0"
            }`}
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="nav-underline text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-full px-3 py-1.5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <CommandPaletteTrigger />
            <FavoritesPanelTrigger />
            <ThemeSwitcher />
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full h-9 w-9 hidden sm:inline-flex"
              aria-label="GitHub"
            >
              <a
                href="https://github.com/QuadDarv1ne/scientific-publications"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden rounded-full h-9 w-9"
                  aria-label="Меню"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <div className="flex flex-col gap-2 mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-accent/30 to-primary/20 flex items-center justify-center ring-1 ring-accent/30">
                        <Atom className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <span className="font-serif text-lg font-bold">Меню</span>
                    </div>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <X className="h-4 w-4" />
                      </Button>
                    </SheetClose>
                  </div>
                  {NAV_LINKS.map((l) => (
                    <SheetClose asChild key={l.href}>
                      <a
                        href={l.href}
                        className="px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted transition-colors"
                      >
                        {l.label}
                      </a>
                    </SheetClose>
                  ))}
                  <a
                    href="https://github.com/QuadDarv1ne/scientific-publications"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted transition-colors flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
