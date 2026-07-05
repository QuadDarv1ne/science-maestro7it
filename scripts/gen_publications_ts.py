#!/usr/bin/env python3
"""Generate publications.ts from zenodo_data.json with categories."""
import json
import re
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

with open(os.path.join(SCRIPT_DIR, 'zenodo_data.json'), 'r', encoding='utf-8') as f:
    records = json.load(f)

# Categorization rules — keyword-based. Order matters (first match wins).
CATEGORY_RULES = [
    ("linguistics", [r'\bлингв', r'\bморфолог', r'\bязык\b', r'\bмедиатекст', r'\bмедиапространств', r'\bтиполог', r'\bсемиотик', r'\bсоциолингв']),
    ("ai_ml", [r'\bнейросет', r'\bмашинн\w* обучен', r'\bискусственн\w* интелл', r'\bИИ\b', r'\bLLM', r'\bтрансформер', r'\battention', r'\bMixture of Experts', r'\bMoE', r'\bRL\b', r'\bметакогнит', r'\bAI-ассистент', r'\bкомпьютерн\w* зрен']),
    ("education", [r'\bобучени\w*\b', r'\bпреподават', r'\bобразован', r'\bпедагог', r'\bстудент', r'\bвуз\w*\b', r'\bучебн', r'\bшкольн', r'\bGitHub\b.*образован', r'\bгиберн', r'\bгибридн\w* образоват', r'\bLow-Level', r'\bвстраива']),
    ("radio_embedded", [r'\bRTL-SDR', r'\bSSTV', r'\bрадиосвяз', r'\bрадиосигнал', r'\bSDR\b', r'\bтелеметр', r'\bHelioPy', r'\bкосмическ\w* погод']),
    ("infosec", [r'\bаномалий', r'\bинформационн\w* безопас', r'\bкибербез', r'\bРоскомнадзор', r'\bперсональн\w* данны', r'\bGDPR', r'\bФЗ-152']),
    ("sociology", [r'\bсоциал', r'\bсемь\w*\b', r'\bсемейн', r'\bодиночеств', r'\bвыгорани', r'\bинклюзив', r'\bцифров\w* неравен', r'\bкоучинг', r'\bнаставнич', r'\bпсихолог']),
    ("international", [r'\bБРИКС', r'\bШОС', r'\bдипломат', r'\bгеопол', r'\bкитайск\w* партн', r'\bГуаньси', r'\bТурци\w*\b', r'\bмеждународ', r'\bпереговор', r'\bCentral Asian', r'\bцивилизац', r'\bглобальн\w* Юг', r'\bЕвраз']),
    ("economics", [r'\bэкономик', r'\bменеджмент', r'\bпредприяти', r'\bбанкинг', r'\bфинанс', r'\bстартап', r'\bтруд\w*\b', r'\bрынок', r'\bинноваци', r'\bкризис', r'\bсанаци']),
    ("tech_policy", [r'\bтехнологическ\w* суверен', r'\bзелён\w* водород', r'\bредкоземель', r'\bзелён\w* перезагруз', r'\blow-carbon', r'\bпромышл\w* конкурент', r'\bэнергоэффектив']),
]

CATEGORY_LABELS_RU = {
    "linguistics": "Лингвистика и медиа",
    "ai_ml": "ИИ и машинное обучение",
    "education": "Образование",
    "radio_embedded": "Радио и встраиваемые системы",
    "infosec": "Информационная безопасность",
    "sociology": "Социология и психология",
    "international": "Международные отношения",
    "economics": "Экономика и менеджмент",
    "tech_policy": "Технологическая политика",
}

def categorize(title: str, abstract: str) -> list:
    text = (title + " " + abstract).lower()
    cats = set()
    for cat, patterns in CATEGORY_RULES:
        for p in patterns:
            if re.search(p, text, re.IGNORECASE):
                cats.add(cat)
                break
    if not cats:
        cats.add("other")
    return sorted(cats)

# Process records
processed = []
for r in records:
    if 'error' in r:
        continue
    title = r.get('title', '').strip()
    abstract = r.get('abstract', '').strip()
    # Truncate abstract for card display, keep full for modal
    abstract_short = (abstract[:280] + '…') if len(abstract) > 280 else abstract
    cats = categorize(title, abstract)
    cat_labels = [CATEGORY_LABELS_RU[c] for c in cats if c in CATEGORY_LABELS_RU]
    if not cat_labels:
        cat_labels = ["Прочее"]
    # Extract year
    year = r.get('publication_date', '2025')[:4]
    processed.append({
        "id": r['id'],
        "title": title,
        "abstract": abstract,
        "abstractShort": abstract_short,
        "publicationDate": r.get('publication_date', ''),
        "year": year,
        "doi": r.get('doi', ''),
        "url": r.get('url', ''),
        "doiUrl": r.get('doi_url', ''),
        "authors": r.get('authors', 'Dupley, Maxim'),
        "categories": cats,
        "categoryLabels": cat_labels,
    })

# Sort by publication_date desc (newest first)
processed.sort(key=lambda x: x['publicationDate'], reverse=True)

# Generate TypeScript
ts_lines = []
ts_lines.append("// Auto-generated from Zenodo API. Do not edit by hand.")
ts_lines.append("// Source: scripts/zenodo_data.json")
ts_lines.append("")
ts_lines.append("export interface Publication {")
ts_lines.append("  id: number;")
ts_lines.append("  title: string;")
ts_lines.append("  abstract: string;")
ts_lines.append("  abstractShort: string;")
ts_lines.append("  publicationDate: string;")
ts_lines.append("  year: string;")
ts_lines.append("  doi: string;")
ts_lines.append("  url: string;")
ts_lines.append("  doiUrl: string;")
ts_lines.append("  authors: string;")
ts_lines.append("  categories: string[];")
ts_lines.append("  categoryLabels: string[];")
ts_lines.append("}")
ts_lines.append("")
ts_lines.append("export const CATEGORY_LABELS: Record<string, string> = {")
for k, v in CATEGORY_LABELS_RU.items():
    ts_lines.append(f'  "{k}": "{v}",')
ts_lines.append('  "other": "Прочее",')
ts_lines.append("}")
ts_lines.append("")
ts_lines.append("export const publications: Publication[] = [")

for p in processed:
    # Escape for TS string
    def esc(s):
        return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').replace('\r', '')
    ts_lines.append("  {")
    ts_lines.append(f'    id: {p["id"]},')
    ts_lines.append(f'    title: "{esc(p["title"])}",')
    ts_lines.append(f'    abstract: "{esc(p["abstract"])}",')
    ts_lines.append(f'    abstractShort: "{esc(p["abstractShort"])}",')
    ts_lines.append(f'    publicationDate: "{p["publicationDate"]}",')
    ts_lines.append(f'    year: "{p["year"]}",')
    ts_lines.append(f'    doi: "{esc(p["doi"])}",')
    ts_lines.append(f'    url: "{esc(p["url"])}",')
    ts_lines.append(f'    doiUrl: "{esc(p["doiUrl"])}",')
    ts_lines.append(f'    authors: "{esc(p["authors"])}",')
    ts_lines.append(f'    categories: {json.dumps(p["categories"], ensure_ascii=False)},')
    ts_lines.append(f'    categoryLabels: {json.dumps(p["categoryLabels"], ensure_ascii=False)},')
    ts_lines.append("  },")

ts_lines.append("];")
ts_lines.append("")

# Add author info
ts_lines.append("export const author = {")
ts_lines.append('  name: "Дуплей Максим Игоревич",')
ts_lines.append('  nameEn: "Dupley Maxim Igorevich",')
ts_lines.append('  shortBio: "Старший преподаватель информационных технологий, аналитик, философ, музыкант и DevOps-инженер.",')
ts_lines.append('  orcid: "0009-0007-7605-539X",')
ts_lines.append('  orcidUrl: "https://orcid.org/0009-0007-7605-539X",')
ts_lines.append('  github: "https://github.com/QuadDarv1ne/scientific-publications",')
ts_lines.append('  githubUser: "QuadDarv1ne",')
ts_lines.append('  stepik: "https://stepik.org/users/150943726/teach",')
ts_lines.append('  school: "https://school-maestro7it.ru/",')
ts_lines.append('  schoolName: "Maestro7IT",')
ts_lines.append('  photo1: "/author/photo1.png",')
ts_lines.append('  photo2: "/author/photo2.png",')
ts_lines.append("};")
ts_lines.append("")

out_path = os.path.join(PROJECT_ROOT, 'src', 'data', 'publications.ts')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(ts_lines))

print(f"Wrote {len(processed)} publications to {out_path}")
# Print stats
from collections import Counter
cat_counts = Counter()
for p in processed:
    for c in p['categories']:
        cat_counts[c] += 1
print("\nCategory counts:")
for c, n in sorted(cat_counts.items(), key=lambda x: -x[1]):
    label = CATEGORY_LABELS_RU.get(c, "Прочее")
    print(f"  {label}: {n}")

year_counts = Counter(p['year'] for p in processed)
print("\nYear counts:", dict(sorted(year_counts.items(), reverse=True)))
