"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpenText,
  BrainCircuit,
  GraduationCap,
  Orbit,
  ShieldCheck,
  Trophy,
} from "lucide-react";

const ACHIEVEMENTS = [
  {
    icon: Trophy,
    title: "38 публикаций",
    description: "Научные работы и статьи в открытом доступе на Zenodo.",
  },
  {
    icon: BrainCircuit,
    title: "14 проектов",
    description: "Открытые инструменты и прототипы в ИИ, образовании и инженерии.",
  },
  {
    icon: GraduationCap,
    title: "Мастерская практика",
    description: "Авторская школа Maestro7IT и преподавательская деятельность.",
  },
  {
    icon: Orbit,
    title: "Междисциплинарность",
    description: "На стыке ИИ, философии, образования и цифровой социологии.",
  },
  {
    icon: ShieldCheck,
    title: "Data Architect",
    description: "Повышение квалификации по архитектуре данных: проектирование структур данных, интеграция, безопасность, масштабируемость и соответствие бизнес-целям организации.",
  },
  {
    icon: BookOpenText,
    title: "Open science",
    description: "Публичный доступ к исследованиям, методам и исходным материалам.",
  },
  {
    icon: Award,
    title: "ORCID / GitHub / Zenodo",
    description: "Публичный научный профиль и цифровой след исследовательской деятельности.",
  },
] as const;

export function Achievements() {
  return (
    <section id="achievements" className="performance-section py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
            Ключевые достижения
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Научная и практическая деятельность в одном профиле
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Профиль объединяет исследования, преподавание, инженерную практику и
            создание открытых инструментов. Эти показатели отражают масштаб и
            направленность научной деятельности автора.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {ACHIEVEMENTS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="performance-card group rounded-2xl border border-border/60 bg-card p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="font-serif text-2xl font-semibold mb-2">{item.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
