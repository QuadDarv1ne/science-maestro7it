"use client";

import * as React from "react";
import { Github, GraduationCap } from "lucide-react";
import { OrcidIcon } from "@/components/site/orcid-icon";
import { author } from "@/data/publications";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-card/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="font-serif text-xl font-bold mb-2">
              Science
              <span className="text-accent">·</span>
              <span className="text-muted-foreground text-sm font-normal ml-1">
                Maestro7IT
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Старший преподаватель ИТ, аналитик, философ, музыкант и
              DevOps-инженер. Научные публикации на Zenodo.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Навигация
            </div>
            <ul className="space-y-2 text-sm">
              {[
                ["#about", "Об авторе"],
                ["#stats", "Направления"],
                ["#publications", "Публикации"],
                ["#projects", "Проекты"],
                ["#contact", "Контакты"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* External */}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
              Профили
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={author.orcidUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  <OrcidIcon className="h-3.5 w-3.5" />
                  ORCID {author.orcid}
                </a>
              </li>
              <li>
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub · QuadDarv1ne
                </a>
              </li>
              <li>
                <a
                  href={author.stepik}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  Stepik · Курсы
                </a>
              </li>
              <li>
                <a
                  href={author.school}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-2"
                >
                  <GraduationCap className="h-3.5 w-3.5" />
                  Школа {author.schoolName}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © Дуплей Максим Игоревич, 2025. Все права на тексты, графику и сопутствующие
            материалы принадлежат автору.
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <span>
              <span className="font-mono">{publicationsCount()}</span>{" "}
              публикаций · ORCID {author.orcid}
            </span>
            <span className="opacity-40">·</span>
            <BuildTimestamp />
          </div>
        </div>
      </div>
    </footer>
  );
}

function publicationsCount() {
  return 30;
}

function BuildTimestamp() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <span className="font-mono">обновлено: …</span>;
  }

  const now = new Date();
  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];
  const dateStr = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
  const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return (
    <span className="font-mono">
      обновлено: {dateStr} {timeStr}
    </span>
  );
}
