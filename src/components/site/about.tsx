"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Music,
  Server,
  PenTool,
  GraduationCap,
  Quote,
} from "lucide-react";

const ROLES = [
  {
    icon: GraduationCap,
    title: "Преподаватель ИТ",
    desc: "Старший преподаватель информационных технологий. Ведёт курсы по программированию, Low-Level разработке и встраиваемым системам.",
  },
  {
    icon: Brain,
    title: "Аналитик",
    desc: "Анализ данных, ML-моделирование, исследование эффективности образовательных и бизнес-процессов на основе эмпирических данных.",
  },
  {
    icon: PenTool,
    title: "Философ",
    desc: "Междисциплинарные исследования на стыке философии, этики ИИ и эстетики. Работы по феноменологии, социологии телесности и культурным ценностям.",
  },
  {
    icon: Music,
    title: "Музыкант",
    desc: "Исследователь эстетической новизны в музыке, сгенерированной ИИ. Изучение парадокса непреднамеренного творчества и философских импликаций.",
  },
  {
    icon: Server,
    title: "DevOps-инженер",
    desc: "Контейнеризация и оркестрация научных вычислений (Docker, Kubernetes, CI/CD). Воспроизводимость экспериментов и обработка сигналов (SDR).",
  },
  {
    icon: Code2,
    title: "Основатель Maestro7IT",
    desc: "Школа программирования Maestro7IT — обучение разработке, ИИ и инженерным практикам. Курсы на Stepik для широкой аудитории.",
  },
];

export function About() {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
            О авторе
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            На стыке технологий, образования и гуманитарного знания
          </h2>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Дуплей Максим Игоревич — исследователь и практик, объединяющий
            инженерную точность с гуманитарной рефлексией. Его научные интересы
            охватывают искусственный интеллект и машинное обучение, педагогику
            и образовательные технологии, социологию цифрового общества,
            лингвистику медиатекстов, международные отношения и философию
            техники. В каждой работе сочетаются эмпирическая строгость и
            междисциплинарная широта.
          </p>
        </motion.div>

        {/* Quote block */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative max-w-4xl mx-auto my-12"
        >
          <Quote className="absolute -top-4 -left-2 h-10 w-10 text-accent/30" />
          <p className="font-serif text-2xl sm:text-3xl italic leading-relaxed pl-8 border-l-2 border-accent/40">
            «При любом использовании материалов и цитировании обязательно
            указание авторства. Все права на тексты, графику и сопутствующие
            материалы принадлежат автору.»
          </p>
          <footer className="mt-4 pl-8 text-sm text-muted-foreground">
            © Дуплей Максим Игоревич, {new Date().getFullYear()} · ORCID: 0009-0007-7605-539X
          </footer>
        </motion.blockquote>

        {/* Roles grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mt-16">
          {ROLES.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group relative rounded-2xl border border-border/60 bg-card p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <role.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2">
                {role.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {role.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
