// Auto-generated from GitHub API + curation. Do not edit by hand.

export type RepoCategory =
  | "science"
  | "ai"
  | "education"
  | "fintech"
  | "tools"
  | "web"
  | "infrastructure"
;

export interface RepoEntry {
  slug: string;
  name: string;
  category: RepoCategory;
  categoryLabel: string;
  description: string;
  tags: string[];
  icon: string;
  url: string;
  language: string;
  stars: number;
  isExternal: boolean;
}

export const REPO_CATEGORY_LABELS: Record<RepoCategory, string> = {
  "ai": "Искусственный интеллект",
  "science": "Наука и моделирование",
  "education": "Образование",
  "fintech": "Финтех и платежи",
  "tools": "Инструменты",
  "web": "Веб-платформы",
  "infrastructure": "Инфраструктура",
}

export const REPO_CATEGORY_ORDER: RepoCategory[] = [
  "science",
  "ai",
  "education",
  "fintech",
  "tools",
  "web",
  "infrastructure",
];

export const repos: RepoEntry[] = [
  {
    slug: "quantum-horizon",
    name: "quantum-horizon",
    category: "science",
    categoryLabel: "Наука и моделирование",
    description: "Интерактивная платформа для визуализации и изучения современной физики — от квантовой механики до космологии. Образовательный инструмент для студентов и энтузиастов с 3D-моделями и симуляциями.",
    tags: ["Next.js", "TypeScript", "Квантовая механика", "Космология", "Визуализация"],
    icon: "Atom",
    url: "https://github.com/QuadDarv1ne/quantum-horizon",
    language: "TypeScript",
    stars: 2,
    isExternal: true,
  },
  {
    slug: "nanoprobe-sim-lab",
    name: "nanoprobe-sim-lab",
    category: "science",
    categoryLabel: "Наука и моделирование",
    description: "Комплексный научно-образовательный проект из трёх модулей: симулятор аппаратного обеспечения сканирующей зондовой микроскопии (C++/Python), анализатор изображений поверхностей и образовательный интерфейс.",
    tags: ["Python", "C++", "СЗМ", "Нанотехнологии", "Моделирование"],
    icon: "Microscope",
    url: "https://github.com/QuadDarv1ne/nanoprobe-sim-lab",
    language: "Python",
    stars: 1,
    isExternal: true,
  },
  {
    slug: "cri_infographic",
    name: "cri_infographic",
    category: "science",
    categoryLabel: "Наука и моделирование",
    description: "Интерактивная инфографика об индексе цветопередачи (CRI) и цветовой температуре источников света. Образовательный проект для фотографов, дизайнеров и инженеров освещения.",
    tags: ["TypeScript", "Оптика", "Интерактивная инфографика", "CRI"],
    icon: "Lightbulb",
    url: "https://github.com/QuadDarv1ne/cri_infographic",
    language: "TypeScript",
    stars: 0,
    isExternal: true,
  },
  {
    slug: "heliopy",
    name: "HelioPy",
    category: "science",
    categoryLabel: "Наука и моделирование",
    description: "Open-source библиотека на Python для анализа солнечной активности и прогнозирования космической погоды. Используется в образовательных курсах по обработке сигналов и анализу временных рядов.",
    tags: ["Python", "Open-source", "Астрофизика", "SDR"],
    icon: "Sun",
    url: "https://github.com/QuadDarv1ne",
    language: "",
    stars: 0,
    isExternal: true,
  },
  {
    slug: "iss-telemetry",
    name: "ISS Telemetry Analyzer",
    category: "science",
    categoryLabel: "Наука и моделирование",
    description: "Анализатор телеметрических данных Международной космической станции. Сопровождается веб-интерфейсом для визуализации результатов анализа в браузере — удобный инструмент для образовательных и исследовательских задач.",
    tags: ["Python", "Телеметрия", "Визуализация", "ISS"],
    icon: "Satellite",
    url: "https://github.com/QuadDarv1ne",
    language: "",
    stars: 0,
    isExternal: true,
  },
  {
    slug: "ai-aggregator",
    name: "ai-aggregator",
    category: "ai",
    categoryLabel: "Искусственный интеллект",
    description: "Мультимодальный агрегатор AI-моделей — единый интерфейс для работы с Z.ai, OpenAI, Anthropic и DeepSeek. Сравнение ответов моделей, переключение провайдеров, унифицированный API.",
    tags: ["Next.js", "TypeScript", "OpenAI", "Anthropic", "Z.ai", "DeepSeek"],
    icon: "Brain",
    url: "https://github.com/QuadDarv1ne/ai-aggregator",
    language: "TypeScript",
    stars: 1,
    isExternal: true,
  },
  {
    slug: "FastFingers",
    name: "FastFingers",
    category: "education",
    categoryLabel: "Образование",
    description: "Современный тренажёр слепой десятипальцевой печати с AI-персонализацией и геймификацией. Веб-платформа для обучения скоростному набору с адаптивными упражнениями под уровень пользователя.",
    tags: ["TypeScript", "AI", "Геймификация", "Тренажёр"],
    icon: "Keyboard",
    url: "https://github.com/QuadDarv1ne/FastFingers",
    language: "TypeScript",
    stars: 3,
    isExternal: true,
  },
  {
    slug: "scientific-publications",
    name: "scientific-publications",
    category: "education",
    categoryLabel: "Образование",
    description: "Открытый репозиторий научных публикаций с полными аннотациями, DOI и графиками. Содержит исходные материалы и изображения к статьям, регулярно обновляется по мере выхода новых работ.",
    tags: ["Открытый код", "Zenodo", "DOI", "Markdown"],
    icon: "Github",
    url: "https://github.com/QuadDarv1ne/scientific-publications",
    language: "",
    stars: 0,
    isExternal: false,
  },
  {
    slug: "via-antiqua-history",
    name: "via-antiqua-history",
    category: "education",
    categoryLabel: "Образование",
    description: "Интерактивная энциклопедия античного мира — проект «История Древнего Пути». Погружение в историю через современные веб-технологии: хронология, карты, биографии, культура и быт античных цивилизаций.",
    tags: ["История", "Античность", "Энциклопедия", "Образование"],
    icon: "BookOpen",
    url: "https://github.com/QuadDarv1ne/via-antiqua-history",
    language: "",
    stars: 0,
    isExternal: true,
  },
  {
    slug: "fastpay_connect",
    name: "fastpay_connect",
    category: "fintech",
    categoryLabel: "Финтех и платежи",
    description: "Демонстрационная интеграция популярных платёжных систем через FastAPI: ЮKassa, Robokassa, CloudPayments, UnitPay, PayPal. Шаблон для быстрого подключения онлайн-платежей.",
    tags: ["Python", "FastAPI", "ЮKassa", "Robokassa", "CloudPayments", "PayPal"],
    icon: "CreditCard",
    url: "https://github.com/QuadDarv1ne/fastpay_connect",
    language: "Python",
    stars: 10,
    isExternal: true,
  },
  {
    slug: "ba-workspace-pro",
    name: "ba-workspace-pro",
    category: "tools",
    categoryLabel: "Инструменты",
    description: "Рабочее пространство для бизнес- и системных аналитиков. Структурированная работа над задачами с использованием спецификаций, диаграмм BPMN/UML и шаблонов документации.",
    tags: ["Next.js", "Бизнес-анализ", "BPMN", "Проектирование"],
    icon: "ClipboardList",
    url: "https://github.com/QuadDarv1ne/ba-workspace-pro",
    language: "TypeScript",
    stars: 0,
    isExternal: true,
  },
  {
    slug: "favorit-pro",
    name: "favorit-pro",
    category: "web",
    categoryLabel: "Веб-платформы",
    description: "Комплексная веб-платформа для профессиональных прогнозов на спортивные события. Система экспертных прогнозов, интерактивные матчи с коэффициентами, калькулятор ставок и аналитика.",
    tags: ["Next.js", "TypeScript", "Спорт", "Прогнозы", "Ставки"],
    icon: "Trophy",
    url: "https://github.com/QuadDarv1ne/favorit-pro",
    language: "TypeScript",
    stars: 0,
    isExternal: true,
  },
  {
    slug: "grafinya-panel",
    name: "grafinya-panel",
    category: "infrastructure",
    categoryLabel: "Инфраструктура",
    description: "Панель управления для платформы мониторинга и визуализации данных «Графиня» от Лаборатории Числитель. Интуитивный интерфейс для управления метриками, дашбордами и алертами.",
    tags: ["Next.js", "Мониторинг", "Дашборд", "Визуализация"],
    icon: "LayoutDashboard",
    url: "https://github.com/QuadDarv1ne/grafinya-panel",
    language: "",
    stars: 0,
    isExternal: true,
  },
  {
    slug: "speedtest-tracker",
    name: "speedtest-tracker",
    category: "infrastructure",
    categoryLabel: "Инфраструктура",
    description: "Self-hosted приложение для непрерывного мониторинга производительности и доступности интернет-соединения. Автоматические тесты скорости, история, графики и уведомления о сбоях.",
    tags: ["Self-hosted", "Мониторинг", "Сеть", "Uptime"],
    icon: "Gauge",
    url: "https://github.com/QuadDarv1ne/speedtest-tracker",
    language: "",
    stars: 0,
    isExternal: true,
  },
];