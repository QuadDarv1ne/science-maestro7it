"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Search, BookOpen, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { author } from "@/data/publications";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 paper-grain" />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center max-w-2xl"
      >
        {/* Large 404 */}
        <div className="relative inline-block mb-8">
          <motion.div
            animate={{
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="font-serif text-[8rem] sm:text-[12rem] font-bold leading-none text-gradient-warm"
          >
            404
          </motion.div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-muted-foreground whitespace-nowrap">
            Страница не найдена
          </div>
        </div>

        <h1 className="font-serif text-2xl sm:text-3xl font-bold mb-4 text-balance">
          Кажется, эта страница отправилась в архив
        </h1>

        <p className="fluid-body text-muted-foreground leading-relaxed mb-8 text-pretty">
          Возможно, страница была перемещена, удалена, или вы перешли по
          устаревшей ссылке. Загляните в каталог научных публикаций — там точно
          найдётся что-то интересное.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/">
              <Home className="h-4 w-4" />
              На главную
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <Link href="/#publications">
              <BookOpen className="h-4 w-4" />
              Публикации
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="rounded-full">
            <a
              href={author.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>

        {/* Search hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-12 inline-flex items-center gap-2 text-xs text-muted-foreground"
        >
          <Search className="h-3 w-3" />
          Совет: нажмите{" "}
          <kbd className="inline-flex items-center justify-center h-5 px-1.5 rounded border border-border bg-muted text-[10px] font-mono">
            Ctrl K
          </kbd>{" "}
          для быстрого поиска
        </motion.div>
      </motion.div>
    </div>
  );
}
