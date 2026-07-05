"use client";

import * as React from "react";
import {
  FileDown,
  ClipboardCopy,
  Check,
  BookOpen,
  FileText,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { confettiFromElement } from "@/components/site/confetti";
import type { Publication } from "@/data/publications";

interface CitationFormat {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  generate: (p: Publication) => string;
}

const AUTHORS_RU = "Дуплей Максим Игоревич";
const AUTHORS_EN = "Dupley, M. I.";
const YEAR = "2026";

function getYear(p: Publication): string {
  return p.publicationDate?.substring(0, 4) || YEAR;
}

const FORMATS: CitationFormat[] = [
  {
    id: "bibtex",
    label: "BibTeX",
    icon: BookOpen,
    generate: (p) => {
      const key = `dupley${getYear(p)}${p.id}`;
      const title = escapeLatex(p.title);
      return `@article{${key},
  author    = {${AUTHORS_EN}},
  title     = {${title}},
  year      = {${getYear(p)}},
  month     = ${monthToBibtex(p.publicationDate)},
  publisher = {Zenodo},
  doi       = {${p.doi}},
  url       = {${p.url}},
  language  = {russian},
}`;
    },
  },
  {
    id: "ris",
    label: "RIS (EndNote/Mendeley)",
    icon: FileText,
    generate: (p) => {
      const date = new Date(p.publicationDate);
      return `TY  - JOUR
AU  - Dupley, M. I.
TI  - ${p.title}
PY  - ${getYear(p)}
DA  - ${p.publicationDate}
PB  - Zenodo
UR  - ${p.url}
DO  - ${p.doi}
LA  - Russian
ER  - `;
    },
  },
  {
    id: "apa",
    label: "APA 7",
    icon: Quote,
    generate: (p) => {
      const date = new Date(p.publicationDate);
      const month = monthNamesEn[date.getMonth()];
      return `Dupley, M. I. (${getYear(p)}, ${month} ${date.getDate()}). ${p.title}. Zenodo. https://doi.org/${p.doi}`;
    },
  },
  {
    id: "gost",
    label: "ГОСТ Р 7.0.5-2008",
    icon: FileText,
    generate: (p) => {
      const date = new Date(p.publicationDate);
      const months = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
      return `Дуплей Максим Игоревич ${p.title} [Электронный ресурс] / Максим Игоревич Дуплей. — Электронные данные. — Zenodo, ${date.getDate()} ${months[date.getMonth()]} ${getYear(p)}. — URL: ${p.url} (дата обращения: [указать]). — DOI: ${p.doi}.`;
    },
  },
  {
    id: "mla",
    label: "MLA 9",
    icon: Quote,
    generate: (p) => {
      const date = new Date(p.publicationDate);
      return `Dupley, M. I. "${p.title}." Zenodo, ${date.getDate()} ${monthNamesEn[date.getMonth()]} ${getYear(p)}, doi.org/${p.doi}.`;
    },
  },
  {
    id: "chicago",
    label: "Chicago",
    icon: Quote,
    generate: (p) => {
      const date = new Date(p.publicationDate);
      return `Dupley, Maxim I. "${p.title}." Zenodo, ${monthNamesEn[date.getMonth()]} ${date.getDate()}, ${getYear(p)}. https://doi.org/${p.doi}.`;
    },
  },
];

const monthNamesEn = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function monthToBibtex(iso: string): string {
  if (!iso) return "jan";
  const m = parseInt(iso.substring(5, 7), 10);
  const map = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  return map[m - 1] || "jan";
}

function escapeLatex(s: string): string {
  return s
    .replace(/&/g, "\\&")
    .replace(/%/g, "\\%")
    .replace(/#/g, "\\#")
    .replace(/_/g, "\\_")
    .replace(/\{/g, "\\{")
    .replace(/\}/g, "\\}");
}

function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

interface CitationExportProps {
  publication: Publication;
}

export function CitationExport({ publication }: CitationExportProps) {
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const handleCopy = async (format: CitationFormat, e?: React.MouseEvent) => {
    try {
      const text = format.generate(publication);
      await navigator.clipboard.writeText(text);
      setCopiedId(format.id);
      toast.success(`Формат ${format.label} скопирован`);
      const target = (e?.currentTarget as HTMLElement) || document.activeElement;
      confettiFromElement(target, 20);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Не удалось скопировать");
    }
  };

  const handleDownload = (format: CitationFormat, e?: React.MouseEvent) => {
    const text = format.generate(publication);
    const ext = format.id === "bibtex" ? "bib" : format.id === "ris" ? "ris" : "txt";
    const filename = `dupley_${publication.id}.${ext}`;
    const mime =
      format.id === "bibtex"
        ? "application/x-bibtex"
        : format.id === "ris"
          ? "application/x-research-info-systems"
          : "text/plain";
    downloadFile(filename, text, mime);
    toast.success(`Файл ${filename} скачан`);
    const target = (e?.currentTarget as HTMLElement) || document.activeElement;
    confettiFromElement(target, 30);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="lg" className="rounded-full">
          <FileDown className="h-4 w-4" />
          Экспорт цитаты
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <DropdownMenuLabel>Форматы цитирования</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {FORMATS.map((f) => (
          <div key={f.id} className="flex items-center group">
            <DropdownMenuItem
              onClick={(e) => handleCopy(f, e)}
              className="flex items-center gap-2 cursor-pointer flex-1"
            >
              <f.icon className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="flex-1">{f.label}</span>
              {copiedId === f.id ? (
                <Check className="h-3.5 w-3.5 text-accent" />
              ) : (
                <ClipboardCopy className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </DropdownMenuItem>
            <button
              onClick={(e) => handleDownload(f, e)}
              className="px-2 py-2 text-muted-foreground hover:text-accent transition-colors"
              title={`Скачать ${f.label}`}
              aria-label={`Скачать ${f.label}`}
            >
              <FileDown className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <DropdownMenuSeparator />
        <div className="px-2 py-1.5 text-[10px] text-muted-foreground">
          Клик — копировать · иконка — скачать файл
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
