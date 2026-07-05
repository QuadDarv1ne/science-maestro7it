"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { OrcidIcon } from "@/components/site/orcid-icon";
import { Github, GraduationCap, Mail, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { author } from "@/data/publications";

const LINKS = [
  {
    icon: OrcidIcon,
    label: "ORCID",
    value: author.orcid,
    href: author.orcidUrl,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@QuadDarv1ne / scientific-publications",
    href: author.github,
  },
  {
    icon: GraduationCap,
    label: "Stepik",
    value: "Преподавательские курсы",
    href: author.stepik,
  },
  {
    icon: Mail,
    label: "Школа Maestro7IT",
    value: "school-maestro7it.ru",
    href: author.school,
  },
];

export function Contact() {
  const [copied, setCopied] = React.useState(false);

  const copyCitation = () => {
    const cite = `Дуплей Максим Игоревич. Научные публикации [Электронный ресурс] // Zenodo. — 2026. — URL: https://zenodo.org/search?q=metadata.creators.person_or_org.name%3A%22Dupley%2C+Maxim%22 — ORCID: 0009-0007-7605-539X.`;
    navigator.clipboard.writeText(cite).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-xs uppercase tracking-widest text-accent font-medium mb-3">
            Контакты и цитирование
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-balance">
            Ссылки и использование материалов
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Все научные работы доступны в открытом доступе. При любом
            использовании материалов — обязательна прямая ссылка на оригинальную
            публикацию и указание автора.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Links card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border/60 bg-card p-8"
          >
            <h3 className="font-serif text-2xl font-bold mb-6">
              Профили и платформы
            </h3>
            <div className="space-y-3">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-3 rounded-xl hover:bg-muted/60 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <l.icon className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">
                      {l.label}
                    </div>
                    <div className="font-medium text-sm truncate">
                      {l.value}
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors shrink-0" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Citation card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-border/60 bg-gradient-to-br from-card to-muted/30 p-8"
          >
            <h3 className="font-serif text-2xl font-bold mb-4">
              Цитирование и авторство
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              При любом использовании (в том числе некоммерческом) требуется
              прямая ссылка на оригинальную публикацию и указание автора.
            </p>

            <div className="relative rounded-lg bg-background/60 border border-border/60 p-4 mb-5">
              <pre className="text-xs leading-relaxed whitespace-pre-wrap font-mono text-foreground/90">
                {`Дуплей Максим Игоревич. Научные публикации
[Электронный ресурс] // Zenodo. — 2026.
URL: https://zenodo.org
ORCID: 0009-0007-7605-539X
© Дуплей Максим Игоревич, 2025`}
              </pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2 rounded-full h-7 px-2 text-xs"
                onClick={copyCitation}
              >
                <Copy className="h-3 w-3" />
                {copied ? "Скопировано!" : "Копировать"}
              </Button>
            </div>

            <div className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">© Дуплей Максим Игоревич, 2025.</strong>{" "}
              Все права на тексты, графику и сопутствующие материалы принадлежат
              автору.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
