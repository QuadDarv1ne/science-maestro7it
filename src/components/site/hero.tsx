"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Github,
  GraduationCap,
  ArrowRight,
  BookOpen,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { publications, author, CATEGORY_LABELS } from "@/data/publications";
import { repos } from "@/data/repos";
import { ParticleField } from "@/components/site/particle-field";
import { TypewriterRoles } from "@/components/site/typewriter-roles";
import { CountUp } from "@/components/site/count-up";

const KEYWORDS = [
  "ИИ и ML",
  "Образование",
  "DevOps",
  "Лингвистика",
  "Философия",
  "Радио/SDR",
];

const ROLES = [
  "Старший преподаватель ИТ",
  "Аналитик данных",
  "Философ-исследователь",
  "Музыкант и композитор",
  "DevOps-инженер",
  "Основатель Maestro7IT",
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 -z-10 paper-grain" />
      <ParticleField />
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Text column */}
          <motion.div
            className="lg:col-span-7 order-2 lg:order-1"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground mb-6 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              ORCID: {author.orcid}
            </div>

            <h1 className="font-serif fluid-hero font-bold tracking-tight text-balance">
              Дуплей Максим
              <br />
              <span className="text-gradient-warm">Игоревич</span>
            </h1>

            {/* Animated role cycling */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-4 text-base sm:text-lg font-medium min-h-[1.8em]"
            >
              <TypewriterRoles roles={ROLES} />
            </motion.div>

            <p className="mt-3 fluid-body text-muted-foreground leading-relaxed max-w-2xl text-pretty">
              Старший преподаватель информационных технологий, аналитик, философ,
              музыкант и DevOps-инженер. Автор{" "}
              <span className="text-foreground font-semibold">
                {publications.length} научных публикаций
              </span>{" "}
              на Zenodo в области ИИ, образования, лингвистики и
              междисциплинарных исследований.
            </p>

            {/* Keyword chips */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 flex flex-wrap gap-2"
            >
              {KEYWORDS.map((k) => (
                <span
                  key={k}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-muted/60 border border-border/60 text-muted-foreground"
                >
                  <Sparkles className="h-3 w-3 text-accent" />
                  {k}
                </span>
              ))}
            </motion.div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg" className="rounded-full">
                <a href="#publications">
                  <BookOpen className="h-4 w-4" />
                  Смотреть публикации
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full"
              >
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="rounded-full"
              >
                <a
                  href={author.school}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GraduationCap className="h-4 w-4" />
                  Maestro7IT
                  <ExternalLink className="h-3 w-3 ml-1 opacity-60" />
                </a>
              </Button>
            </div>

            {/* Quick stats strip */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
              <div>
                <div className="font-serif text-3xl font-bold text-accent">
                  <CountUp end={publications.length} duration={1800} />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  Публикаций
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-accent">
                  <CountUp end={Object.keys(CATEGORY_LABELS).length} duration={1500} />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  Тем
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-accent">
                  <CountUp end={repos.length} duration={1600} />
                </div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">
                  Проектов
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image column */}
          <motion.div
            className="lg:col-span-5 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            <PhotoCard />
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-[10px] uppercase tracking-widest">
            Прокрутите
          </span>
          <ArrowRight className="h-3 w-3 rotate-90 animate-bounce" />
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Photo card with subtle mouse-parallax tilt effect.
 * The photo and floating badges shift slightly as the user moves the
 * cursor over the card, creating depth without being distracting.
 */
function PhotoCard() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = React.useState({ rx: 0, ry: 0 });
  const [hovered, setHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Cap tilt at ±6deg
    setTilt({ rx: -y * 6, ry: x * 6 });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative max-w-[260px] sm:max-w-sm md:max-w-md mx-auto [perspective:1200px]"
      style={{ touchAction: "pan-y" }}
    >
      <motion.div
        animate={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="relative [transform-style:preserve-3d]"
      >
        {/* Decorative frame */}
        <div
          className="absolute -inset-3 rounded-3xl border border-accent/30 -rotate-2"
          style={{ transform: "translateZ(-40px)" }}
        />
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent/20 via-transparent to-primary/20" />

        <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl bg-card">
          <motion.img
            src={author.photo1}
            alt="Дуплей Максим Игоревич"
            className="w-full aspect-[3/4] object-cover"
            loading="eager"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="text-xs uppercase tracking-widest opacity-80">
              Автор
            </div>
            <div className="font-serif text-lg font-semibold">Дуплей Максим Игоревич</div>
          </div>
        </div>

        {/* Floating accent — bottom left */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transform: "translateZ(50px)" }}
          className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl px-4 py-3 shadow-xl hidden sm:block"
        >
          <div className="text-xs text-muted-foreground">Школа</div>
          <div className="font-serif font-bold text-sm">Maestro7IT</div>
        </motion.div>

        {/* Floating accent — top right */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          style={{ transform: "translateZ(60px)" }}
          className="absolute -top-4 -right-4 bg-accent text-accent-foreground border border-accent/40 rounded-xl px-3 py-2 shadow-xl hidden sm:block"
        >
          <div className="text-[10px] uppercase tracking-widest opacity-80">
            ORCID
          </div>
          <div className="font-mono text-xs font-bold">
            {author.orcid}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
