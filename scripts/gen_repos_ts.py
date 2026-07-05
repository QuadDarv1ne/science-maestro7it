#!/usr/bin/env python3
"""Generate repos.ts from github_repos.json with categories and curated descriptions."""
import json
import re
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)

with open(os.path.join(SCRIPT_DIR, 'github_repos.json'), 'r', encoding='utf-8') as f:
    repos = json.load(f)

# Curated descriptions + categories for each repo (based on README content + repo name)
# Categories: "ai", "science", "education", "fintech", "tools", "web", "infrastructure"
CURATED = {
    "via-antiqua-history": {
        "category": "education",
        "tags": ["История", "Античность", "Энциклопедия", "Образование"],
        "icon": "BookOpen",
        "summary": "Интерактивная энциклопедия античного мира — проект «История Древнего Пути». Погружение в историю через современные веб-технологии: хронология, карты, биографии, культура и быт античных цивилизаций.",
    },
    "FastFingers": {
        "category": "education",
        "tags": ["TypeScript", "AI", "Геймификация", "Тренажёр"],
        "icon": "Keyboard",
        "summary": "Современный тренажёр слепой десятипальцевой печати с AI-персонализацией и геймификацией. Веб-платформа для обучения скоростному набору с адаптивными упражнениями под уровень пользователя.",
    },
    "ai-aggregator": {
        "category": "ai",
        "tags": ["Next.js", "TypeScript", "OpenAI", "Anthropic", "Z.ai", "DeepSeek"],
        "icon": "Brain",
        "summary": "Мультимодальный агрегатор AI-моделей — единый интерфейс для работы с Z.ai, OpenAI, Anthropic и DeepSeek. Сравнение ответов моделей, переключение провайдеров, унифицированный API.",
    },
    "ba-workspace-pro": {
        "category": "tools",
        "tags": ["Next.js", "Бизнес-анализ", "BPMN", "Проектирование"],
        "icon": "ClipboardList",
        "summary": "Рабочее пространство для бизнес- и системных аналитиков. Структурированная работа над задачами с использованием спецификаций, диаграмм BPMN/UML и шаблонов документации.",
    },
    "grafinya-panel": {
        "category": "infrastructure",
        "tags": ["Next.js", "Мониторинг", "Дашборд", "Визуализация"],
        "icon": "LayoutDashboard",
        "summary": "Панель управления для платформы мониторинга и визуализации данных «Графиня» от Лаборатории Числитель. Интуитивный интерфейс для управления метриками, дашбордами и алертами.",
    },
    "speedtest-tracker": {
        "category": "infrastructure",
        "tags": ["Self-hosted", "Мониторинг", "Сеть", "Uptime"],
        "icon": "Gauge",
        "summary": "Self-hosted приложение для непрерывного мониторинга производительности и доступности интернет-соединения. Автоматические тесты скорости, история, графики и уведомления о сбоях.",
    },
    "cri_infographic": {
        "category": "science",
        "tags": ["TypeScript", "Оптика", "Интерактивная инфографика", "CRI"],
        "icon": "Lightbulb",
        "summary": "Интерактивная инфографика об индексе цветопередачи (CRI) и цветовой температуре источников света. Образовательный проект для фотографов, дизайнеров и инженеров освещения.",
    },
    "fastpay_connect": {
        "category": "fintech",
        "tags": ["Python", "FastAPI", "ЮKassa", "Robokassa", "CloudPayments", "PayPal"],
        "icon": "CreditCard",
        "summary": "Демонстрационная интеграция популярных платёжных систем через FastAPI: ЮKassa, Robokassa, CloudPayments, UnitPay, PayPal. Шаблон для быстрого подключения онлайн-платежей.",
    },
    "favorit-pro": {
        "category": "web",
        "tags": ["Next.js", "TypeScript", "Спорт", "Прогнозы", "Ставки"],
        "icon": "Trophy",
        "summary": "Комплексная веб-платформа для профессиональных прогнозов на спортивные события. Система экспертных прогнозов, интерактивные матчи с коэффициентами, калькулятор ставок и аналитика.",
    },
    "nanoprobe-sim-lab": {
        "category": "science",
        "tags": ["Python", "C++", "СЗМ", "Нанотехнологии", "Моделирование"],
        "icon": "Microscope",
        "summary": "Комплексный научно-образовательный проект из трёх модулей: симулятор аппаратного обеспечения сканирующей зондовой микроскопии (C++/Python), анализатор изображений поверхностей и образовательный интерфейс.",
    },
    "quantum-horizon": {
        "category": "science",
        "tags": ["Next.js", "TypeScript", "Квантовая механика", "Космология", "Визуализация"],
        "icon": "Atom",
        "summary": "Интерактивная платформа для визуализации и изучения современной физики — от квантовой механики до космологии. Образовательный инструмент для студентов и энтузиастов с 3D-моделями и симуляциями.",
    },
    # Existing projects from the original 3 (kept as scientific-publications, ISS Telemetry Analyzer, HelioPy)
    "scientific-publications": {
        "category": "education",
        "tags": ["Открытый код", "Zenodo", "DOI", "Markdown"],
        "icon": "Github",
        "summary": "Открытый репозиторий научных публикаций с полными аннотациями, DOI и графиками. Содержит исходные материалы и изображения к статьям, регулярно обновляется по мере выхода новых работ.",
    },
    "iss-telemetry": {
        "category": "science",
        "tags": ["Python", "Телеметрия", "Визуализация", "ISS"],
        "icon": "Satellite",
        "summary": "Анализатор телеметрических данных Международной космической станции. Сопровождается веб-интерфейсом для визуализации результатов анализа в браузере — удобный инструмент для образовательных и исследовательских задач.",
    },
    "heliopy": {
        "category": "science",
        "tags": ["Python", "Open-source", "Астрофизика", "SDR"],
        "icon": "Sun",
        "summary": "Open-source библиотека на Python для анализа солнечной активности и прогнозирования космической погоды. Используется в образовательных курсах по обработке сигналов и анализу временных рядов.",
    },
}

CATEGORY_LABELS = {
    "ai": "Искусственный интеллект",
    "science": "Наука и моделирование",
    "education": "Образование",
    "fintech": "Финтех и платежи",
    "tools": "Инструменты",
    "web": "Веб-платформы",
    "infrastructure": "Инфраструктура",
}

CATEGORY_ORDER = ["science", "ai", "education", "fintech", "tools", "web", "infrastructure"]

# Build entries
entries = []

# Add the 3 existing projects first (with stable slugs)
for slug in ["scientific-publications", "iss-telemetry", "heliopy"]:
    c = CURATED[slug]
    if slug == "scientific-publications":
        url = "https://github.com/QuadDarv1ne/scientific-publications"
        name = "scientific-publications"
    elif slug == "iss-telemetry":
        url = "https://github.com/QuadDarv1ne"
        name = "ISS Telemetry Analyzer"
    else:
        url = "https://github.com/QuadDarv1ne"
        name = "HelioPy"
    entries.append({
        "slug": slug,
        "name": name,
        "category": c["category"],
        "categoryLabel": CATEGORY_LABELS[c["category"]],
        "description": c["summary"],
        "tags": c["tags"],
        "icon": c["icon"],
        "url": url,
        "language": "",
        "stars": 0,
        "isExternal": slug != "scientific-publications",
    })

# Add 11 GitHub repos
for r in repos:
    name = r.get('name', '')
    if not name:
        continue
    c = CURATED.get(name, {
        "category": "tools",
        "tags": [],
        "icon": "Github",
        "summary": r.get('description', '') or "Проект на GitHub",
    })
    entries.append({
        "slug": name,
        "name": name,
        "category": c["category"],
        "categoryLabel": CATEGORY_LABELS[c["category"]],
        "description": c["summary"],
        "tags": c["tags"] or (r.get('topics', [])[:5] if r.get('topics') else []),
        "icon": c["icon"],
        "url": r.get('html_url', f"https://github.com/QuadDarv1ne/{name}"),
        "language": r.get('language', ''),
        "stars": r.get('stargazers_count', 0),
        "isExternal": True,
    })

# Sort: by category order, then by stars desc, then by name
def sort_key(e):
    cat_idx = CATEGORY_ORDER.index(e["category"]) if e["category"] in CATEGORY_ORDER else 99
    return (cat_idx, -e["stars"], e["name"].lower())
entries.sort(key=sort_key)

# Generate TypeScript
lines = []
lines.append("// Auto-generated from GitHub API + curation. Do not edit by hand.")
lines.append("")
lines.append("export type RepoCategory =")
for c in CATEGORY_ORDER:
    lines.append(f'  | "{c}"')
lines.append(";")
lines.append("")
lines.append("export interface RepoEntry {")
lines.append("  slug: string;")
lines.append("  name: string;")
lines.append("  category: RepoCategory;")
lines.append("  categoryLabel: string;")
lines.append("  description: string;")
lines.append("  tags: string[];")
lines.append("  icon: string;")
lines.append("  url: string;")
lines.append("  language: string;")
lines.append("  stars: number;")
lines.append("  isExternal: boolean;")
lines.append("}")
lines.append("")
lines.append("export const REPO_CATEGORY_LABELS: Record<RepoCategory, string> = {")
for c, label in CATEGORY_LABELS.items():
    lines.append(f'  "{c}": "{label}",')
lines.append("}")
lines.append("")
lines.append("export const REPO_CATEGORY_ORDER: RepoCategory[] = [")
for c in CATEGORY_ORDER:
    lines.append(f'  "{c}",')
lines.append("];")
lines.append("")
lines.append("export const repos: RepoEntry[] = [")

for e in entries:
    def esc(s):
        return s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').replace('\r', '')
    lines.append("  {")
    lines.append(f'    slug: "{esc(e["slug"])}",')
    lines.append(f'    name: "{esc(e["name"])}",')
    lines.append(f'    category: "{e["category"]}",')
    lines.append(f'    categoryLabel: "{esc(e["categoryLabel"])}",')
    lines.append(f'    description: "{esc(e["description"])}",')
    lines.append(f'    tags: {json.dumps(e["tags"], ensure_ascii=False)},')
    lines.append(f'    icon: "{e["icon"]}",')
    lines.append(f'    url: "{esc(e["url"])}",')
    lines.append(f'    language: "{esc(e["language"])}",')
    lines.append(f'    stars: {e["stars"]},')
    lines.append(f'    isExternal: {"true" if e["isExternal"] else "false"},')
    lines.append("  },")
lines.append("];")

out_path = os.path.join(PROJECT_ROOT, 'src', 'data', 'repos.ts')
with open(out_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))

print(f"Wrote {len(entries)} repos to {out_path}")
print()
print("Categories breakdown:")
from collections import Counter
cat_counts = Counter(e['category'] for e in entries)
for c in CATEGORY_ORDER:
    if cat_counts[c]:
        print(f"  {CATEGORY_LABELS[c]}: {cat_counts[c]}")
