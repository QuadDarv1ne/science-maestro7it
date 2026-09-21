"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Database,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";

const CERTIFICATIONS = [
  {
    icon: Database,
    title: "Data Architect",
    detail: "Повышение квалификации на тему архитектуры данных",
    description:
      "Проектирование структур данных, интеграция систем, управление метаданными, масштабируемость и обеспечение соответствия бизнес-целям организации.",
  },
  {
    icon: Workflow,
    title: "Архитектура данных",
    detail: "Стратегия работы с данными",
    description:
      "Формирование стандартов данных, выбор стеков хранения и обработки, построение технических моделей для аналитики и цифровой трансформации.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Бизнес и ИТ",
    detail: "На стыке анализа и инфраструктуры",
    description:
      "Согласование данных с задачами бизнеса, оптимизация процессов, обеспечение прозрачности и управляемости решений на уровне компании.",
  },
  {
    icon: ShieldCheck,
    title: "Безопасность и соответствие",
    detail: "GDPR и регуляторные требования",
    description:
      "Обеспечение качества, конфиденциальности и правомерного использования данных в соответствии с требованиями законодательства и стандарта качества.",
  },
] as const;

export function Certifications() {
  return (
    <section id="certifications" className="performance-section py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
            Сертификаты и квалификации
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Компетенции в архитектуре данных и цифровой трансформации
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Работа в области данных требует единства бизнес-аналитики, ИТ-инфраструктуры
            и практики Data Science. Именно поэтому квалификация строится на стыке
            архитектуры данных, инженерии и управления знаниями.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
          {CERTIFICATIONS.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="performance-card rounded-2xl border border-border/60 bg-card p-6 hover:border-accent/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-accent mb-2">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      квалификация
                    </div>
                    <h3 className="font-serif text-2xl font-semibold mb-1">{item.title}</h3>
                    <div className="text-sm font-medium text-foreground/80 mb-2">{item.detail}</div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-5 sm:p-6"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-accent mb-2">
            <Sparkles className="h-4 w-4" />
            Компетенция автора
          </div>
          <p className="text-base text-muted-foreground leading-relaxed">
            Архитектор данных — это специалист, который проектирует, создаёт и управляет
            структурами данных организации, обеспечивая их эффективное хранение, обработку,
            интеграцию и безопасность. Он работает на стыке бизнес-аналитики, ИТ-инфраструктуры
            и Data Science, формируя решения, которые поддерживают масштабирование бизнеса и
            принятие управленческих решений.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
