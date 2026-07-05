# Worklog — Дуплей Максим Игоревич Scientific Publications Website

---
Task ID: 1
Agent: main (Super Z)
Task: Build a portfolio website showcasing 30 scientific publications of Дуплей Максим Игоревич from Zenodo

Work Log:
- Initialized Next.js 16 fullstack project (Turbopack, TypeScript, Tailwind 4, shadcn/ui)
- Fetched metadata for all 30 Zenodo records via Zenodo REST API (curl shell=True due to WAF blocking Python urllib)
- Categorized each publication into 9 thematic areas (education, sociology, ai_ml, economics, international, linguistics, infosec, radio_embedded, tech_policy) using keyword-based rules
- Generated `src/data/publications.ts` from JSON data via Python script
- Copied author profile photos to `public/author/`
- Updated `layout.tsx`: added Playfair Display serif font (with cyrillic subset), proper ru_RU metadata, ThemeProvider
- Rewrote `globals.css`: warm academic palette (cream/amber in light, charcoal/amber in dark) — no blue/indigo per skill rules
- Built site sections:
  * `Header` — sticky nav with theme toggle, mobile Sheet menu, GitHub link
  * `Hero` — name, role, ORCID badge, profile photo with decorative frame, 3 CTA buttons, quick stats
  * `About` — 6 role cards (Преподаватель/Аналитик/Философ/Музыкант/DevOps/Основатель) + quote block with copyright
  * `Stats` — 4 big stat blocks + 9 category cards with progress bars; clicking a card scrolls to Publications and filters
  * `Publications` — search input, 3 sort buttons, 9 category filter chips, card grid (3 cols) with title/date/DOI/badges/abstract excerpt, "Подробнее" modal with full abstract + citation template, load-more button
  * `Projects` — 3 project cards (scientific-publications repo, ISS Telemetry Analyzer, HelioPy) + GitHub CTA
  * `Contact` — links card (ORCID/GitHub/Stepik/Maestro7IT) + citation card with copy-to-clipboard
  * `Footer` — brand, navigation, profiles, copyright
- All interactivity verified with Agent Browser: page loads, modal opens, search filters ("БРИКС" → 1 result), theme toggle works, mobile (390px) responsive, no console errors

Stage Summary:
- 30 Zenodo publications fully indexed with titles, abstracts, DOIs, dates
- 9 research categories with counts and percentage bars
- Bilingual support (Russian primary, English titles preserved where applicable)
- Dark/light theme with warm amber academic palette
- All deliverables under `/home/z/my-project/`
- Site running at http://localhost:3000 — preview link to be sent via send_message

---
Task ID: 2
Agent: main (Super Z)
Task: Add 11 additional GitHub repositories to the Projects section

Work Log:
- Fetched metadata for 11 GitHub repos via GitHub REST API with rate-limit handling (20s backoff on 403):
  * via-antiqua-history, FastFingers, ai-aggregator, ba-workspace-pro, grafinya-panel,
  * speedtest-tracker, cri_infographic, fastpay_connect, favorit-pro, nanoprobe-sim-lab, quantum-horizon
- Curated each repo with custom Russian description, category and icon based on README content
- Generated `src/data/repos.ts` with 14 entries (3 existing + 11 new) categorized into 7 areas:
  * Наука и моделирование: 5 (quantum-horizon, nanoprobe-sim-lab, cri_infographic, ISS Telemetry, HelioPy)
  * Образование: 3 (via-antiqua-history, FastFingers, scientific-publications)
  * Инфраструктура: 2 (grafinya-panel, speedtest-tracker)
  * ИИ: 1 (ai-aggregator), Финтех: 1 (fastpay_connect), Инструменты: 1 (ba-workspace-pro), Веб: 1 (favorit-pro)
- Rewrote `src/components/site/projects.tsx` with:
  * Category filter chips with counts (Все / Наука / ИИ / Образование / Финтех / Инструменты / Веб / Инфраструктура)
  * Animated grid via Framer Motion AnimatePresence (layout animations on filter change)
  * Card displays: icon, name, star count, category label, language, description (line-clamp-4), tag chips, GitHub CTA
  * Preserved GitHub profile CTA banner at the bottom
- Verified with Agent Browser:
  * 14 cards render in "Все проекты"
  * Filter "Наука и моделирование" correctly shows 5 cards
  * Mobile (390px) layout works
  * No console errors, lint passes

Stage Summary:
- Projects section expanded from 3 to 14 entries
- 7-category filter system with live counts
- Each repo has curated Russian description + appropriate Lucide icon
- Star counts shown for repos with >0 stars (fastpay_connect: 10, quantum-horizon: 2, FastFingers: 3, ai-aggregator: 1, nanoprobe-sim-lab: 1)
- All 11 new GitHub links verified to point to correct repo URLs

---
Task ID: 5
Agent: main (Super Z)
Task: Rename project to "science-maestro7it" — продолжение бренда Maestro7IT

Work Log:
- Обновлён package.json: name="science-maestro7it", version="1.0.0", добавлено description
- Обновлён layout.tsx: метаданные (title, description, applicationName, openGraph.siteName, twitter.title) используют "Science Maestro7IT"; metadataBase установлен на https://science-maestro7it.ru
- Обновлён header.tsx: логотип изменён с "Дуплей.М.И." на "Science·Maestro7IT"
- Обновлён footer.tsx: брендинг в левой колонке изменён на "Science·Maestro7IT"
- Обновлён README.md: заголовок, описание, бейджи; добавлена ссылка на экосистему Maestro7IT
- Lint проходит, dev-сервер работает, заголовок вкладки браузера: "Science Maestro7IT — Дуплей Максим Игоревич · Научные публикации"
- Логотип шапки и футер: "Science·Maestro7IT"

Stage Summary:
- Проект официально переименован в "Science Maestro7IT"
- Обновлены все точки брендинга: package.json, метаданные, шапка, футер, README
- metadataBase установлен на https://science-maestro7it.ru (готов к деплою на этот домен)
- Версия bump 0.2.0 → 1.0.0 (готов к релизу)

---
Task ID: 6
Agent: main (Super Z)
Task: SEO + UX improvements — sitemap, robots, RSS, JSON-LD, related publications, photo parallax

Work Log:
- Создан src/app/sitemap.ts — динамическая sitemap.xml с 6 статичными маршрутами + 30 publication entries (всего 36 URL)
- Создан src/app/robots.ts — robots.txt с правилами для * / GPTBot / Googlebot / YandexBot, host и sitemap ссылки
- Удалён статичный public/robots.txt (конфликтовал с app/robots.ts)
- Создан src/app/rss.xml/route.ts — RSS 2.0 фид с всеми 30 публикациями, image, atom:link, dc namespace
- Создан src/components/site/structured-data.tsx — JSON-LD: Person schema (ORCID, sameAs, knowsAbout, worksFor) + WebSite schema + ItemList из 30 ScholarlyArticle entries с DOI, author, publisher, about
- StructuredData встроен в layout.tsx (3 блока application/ld+json)
- Добавлена секция "Похожие публикации" в модальном окне публикации — показывает до 4 связанных работ по общим категориям с бейджем совпадений; клик переключает на новую публикацию
- Добавлен PhotoCard компонент в Hero с mouse-parallax tilt эффектом (±6deg, spring animation), hover zoom фото (1.08), 3D translateZ для плавающих бейджей (ORCID, Maestro7IT)

Stage Summary:
- SEO полностью настроен: sitemap.xml (HTTP 200), robots.txt (HTTP 200 после удаления конфликта), rss.xml (HTTP 200, 38KB), JSON-LD (3 schema)
- Поисковые роботы видят структурированные данные о авторе (Person), сайте (WebSite) и всех 30 публикациях (ScholarlyArticle с DOI)
- RSS фид доступен по /rss.xml для подписки на новые публикации
- Модальное окно публикации показывает до 4 похожих работ с навигацией между ними
- Hero фото имеет 3D параллакс-эффект при движении мыши + hover zoom
- Lint проходит, ошибок в консоли нет

---
Task ID: 7
Agent: main (Super Z)
Task: Citation export (6 formats) + reading time + shortcuts help dialog + Sonner toasts

Work Log:
- Создан src/components/site/citation-export.tsx — экспорт цитат в 6 форматах:
  * BibTeX (с escape-последовательностями LaTeX, правильный @article key)
  * RIS (для EndNote/Mendeley/Zotero)
  * APA 7 (с полным месяцем)
  * ГОСТ Р 7.0.5-2008 (российский стандарт)
  * MLA 9
  * Chicago
- Каждый формат доступен в 2 действиях: копирование в буфер (с toast) или скачивание файла (.bib/.ris/.txt)
- Добавлены функции readingTime() и wordCount() — оценка времени чтения (~180 wpm для русского) + подсчёт слов
- В модальном окне публикации добавлен индикатор "X мин чтения · Y слов" рядом с кнопками "Поделиться" и "Экспорт цитаты"
- Блок цитирования переименован в "Цитирование (ГОСТ)" для ясности
- Создан src/components/site/shortcuts-help.tsx — диалог справки по горячим клавишам:
  * Открывается по "?" (или Shift+/) в любом месте
  * 4 категории: Глобальные, Командная палитра, Навигация, Доступность
  * 10 сочетаний клавиш с визуальными <kbd> бейджами
  * Закрытие по Escape или клику вне окна
- Добавлен SonnerToaster в layout.tsx (для toast-уведомлений от share-menu и citation-export)
  * Настроены стили под тему (var(--popover), var(--border))
  * Position: bottom-right, richColors, closeButton

Stage Summary:
- 6 форматов цитирования (BibTeX/RIS/APA/ГОСТ/MLA/Chicago) с копированием и скачиванием
- Индикатор времени чтения и количества слов в модальном окне
- Диалог справки по горячим клавишам (? — открыть, 10 сочетаний в 4 категориях)
- Toast-уведомления работают для всех действий (копирование, скачивание, share)
- Lint проходит, ошибок в консоли нет

---
Task ID: 8
Agent: main (Super Z)
Task: Confetti animation + reading progress bar + last updated timestamp + scroll position memory

Work Log:
- Создан src/components/site/confetti.ts — лёгкая Canvas-анимация конфетти без внешних зависимостей:
  * 40-50 частиц с гравитацией, сопротивлением воздуха, вращением
  * Цвета читаются из CSS-переменных активной темы (--accent, --primary, --theme-gradient-*)
  * 2 формы: rect и circle, random rotation
  * Уважает prefers-reduced-motion (отключается)
  * Авто-очистка canvas после 2 сек простоя
  * Экспорт confetti() и confettiFromElement() функций
- Интегрированы конфетти в share-menu (25 частиц при копировании ссылки) и citation-export (20 при копировании, 30 при скачивании)
  * Используется event.currentTarget для позиционирования (а не document.activeElement, который сбрасывается при закрытии dropdown)
  * Увеличена длительность жизни частиц: 90-140 кадров (1.5-2.3 сек)
  * Увеличен размер частиц: 7-14px
- Добавлен ModalReadingProgress — тонкая полоска прогресса в верхней части модального окна публикации
  * Sticky позиционирование, градиент от accent до primary
  * Обновляется при скролле модального контента
  * Прозрачный фон-трек с цветным заполнением
- Добавлен BuildTimestamp в footer — показывает "обновлено: [дата] [время]" в реальном времени
  * Формат: "21 июн 2026 07:06"
  * Только client-side (mounted check) для избежания hydration mismatch
- Добавлено запоминание позиции прокрутки для секции публикаций:
  * При клике на "#publications" в навигации — сохраняет относительную позицию в sessionStorage
  * При возврате на страницу — восстанавливает позицию (если > 100px от начала секции)
  * Ключ: "science-maestro7it:pubs-scroll"

Stage Summary:
- Конфетти работают при копировании/скачивании цитат и ссылок (проверено визуально)
- Reading progress bar в модальном окне заполняется при скролле
- Footer показывает "обновлено: 21 июн 2026 07:06"
- Scroll position memory для публикаций
- Lint проходит, ошибок в консоли нет

---
Task ID: 9
Agent: main (Super Z)
Task: 3 new themes + fluid typography + mobile responsiveness improvements

Work Log:
- Добавлены 3 новые темы оформления в globals.css:
  * **Forest** — тёмно-зелёный фон (oklch 0.17 0.025 150) + лаймовый акцент (oklch 0.78 0.19 135)
  * **Sunset** — тёмно-бордовый фон (oklch 0.18 0.035 15) + розовый/коралловый акцент (oklch 0.74 0.21 5)
  * **Contrast** — accessibility тема: чёрный фон + белый текст + жёлтый акцент (oklch 0.92 0.19 95), уменьшенный radius (0.375rem)
- Обновлён theme-provider.tsx: AVAILABLE_THEMES теперь содержит 8 тем с правильными swatch-цветами
- Добавлена fluid-типографика через clamp() в globals.css:
  * .fluid-hero: clamp(2.5rem, 6vw + 1rem, 4.5rem) — заголовок Hero
  * .fluid-section-title: clamp(1.875rem, 3vw + 1rem, 3rem) — заголовки секций
  * .fluid-card-title: clamp(1rem, 1vw + 0.875rem, 1.25rem) — заголовки карточек
  * .fluid-body: clamp(0.9rem, 0.5vw + 0.85rem, 1.125rem) — основной текст
- Hero обновлён: использует .fluid-hero и .fluid-body классы для плавного масштабирования
- Hero mobile layout: photo теперь order-1 (сверху), text order-2 (снизу) на мобильных; max-width фото адаптивен (260px на mobile → md на desktop)
- Модальное окно публикации: full-screen на мобильных (max-sm:h-[100dvh], rounded-none, border-0)
- Фильтры-чипы категорий: horizontal scroll на мобильных (overflow-x-auto no-scrollbar)
- Кнопки сортировки: horizontal scroll на мобильных
- Сетки publications/projects/about: sm:grid-cols-2 (вместо md:) для 2 колонок на планшетах
- Touch-friendly tap targets: min 44px для button/a[role=button]/menuitem на max-width:768px
- Smooth theme transition: 0.2s ease-out для background-color/border-color/color/fill/stroke
- Landscape phone adjustments: уменьшенный .fluid-hero для orientation:landscape + max-height:500px

Stage Summary:
- 8 тем оформления: Светлая, Тёмная, Фиолетовая, Оранжевая, Океан, Лес, Закат, Контраст
- Fluid typography через clamp() — плавное масштабирование шрифтов на всех breakpoints
- Mobile-first: фото сверху, full-screen modal, horizontal scroll chips, 1-колоночная сетка
- Tablet: 2 колонки для publications/projects/about
- Desktop: 3 колонки (без изменений)
- Touch targets min 44px на мобильных (accessibility)
- Все 3 новые темы проверены через Agent Browser (Forest/Sunset/Contrast)
- Lint проходит, ошибок в консоли нет

---
Task ID: 10
Agent: main (Super Z)
Task: Auto theme + typewriter roles + 404 page + global scrollbar + featured carousel

Work Log:
- Добавлена тема "Авто" (auto) — определяет системные предпочтения (prefers-color-scheme)
  * Использует value mapping в next-themes: auto → light/dark в зависимости от системы
  * Swatch — градиент (светлая/тёмная половинки) для визуального отличия
  * ThemeSwitcher обновлён для поддержки gradient swatches
  * Теперь 9 тем: Авто, Светлая, Тёмная, Фиолетовая, Оранжевая, Океан, Лес, Закат, Контраст
- Создан src/components/site/typewriter-roles.tsx — анимация печатающегося текста
  * Циклически перебирает 6 ролей автора
  * Эффект: набор → пауза → удаление → следующий
  * Мигающий курсор (вертикальная черта)
  * Уважает prefers-reduced-motion (статичный текст)
- Интегрирован TypewriterRoles в Hero — анимированная строка под именем циклически показывает роли
- Создан src/app/not-found.tsx — кастомная 404 страница
  * Большое "404" с градиентом и лёгкой анимацией покачивания
  * Описание "Кажется, эта страница отправилась в архив"
  * 3 кнопки: На главную, Публикации, GitHub
  * Подсказка про Ctrl+K для поиска
- Добавлен глобальный кастомный scrollbar в globals.css
  * Theme-aware: использует --accent через color-mix
  * WebKit: 10px ширина, rounded, прозрачный track, hover эффект
  * Firefox: scrollbar-width: thin + scrollbar-color
- Создан src/components/site/featured-publications.tsx — карусель свежих публикаций
  * 6 самых свежих публикаций в горизонтальной прокрутке
  * Snap-x scroll, navigation arrows (←/→)
  * Карточки: #номер, дата, заголовок (line-clamp-3), аннотация, DOI, "Открыть"
  * Клик по карточке открывает модальное окно публикации
- Интегрирована карусель в Publications section — между заголовком и тулбаром поиска

Stage Summary:
- 9 тем оформления (добавлена "Авто" для системного определения)
- Анимированный typewriter в Hero циклически показывает 6 ролей
- Кастомная 404 страница с тематическим дизайном
- Глобальный theme-aware scrollbar (WebKit + Firefox)
- Карусель "Свежие публикации" с 6 карточками и навигацией
- Lint проходит, ошибок в консоли нет

---
Task ID: 11
Agent: main (Super Z)
Task: Modernized Header + count-up animations + magnetic interactions

Work Log:
- Полностью переработан Header (src/components/site/header.tsx):
  * Иконка-логотип: атом (Atom icon) в градиентной рамке с пульсирующей точкой
  * Hover на логотип: rotate 180° + scale 1.1 (spring animation)
  * Навигация в виде "пилюли" (pill container): rounded-full с muted фоном при скролле
  * Glassmorphism: bg-background/70 backdrop-blur-xl при скролле
  * Compact на скролле: h-14 вместо h-16
  * Smart hide/show: скрывается при скролле вниз (>200px), показывается при скролле вверх
  * Box-shadow: 0 4px 20px -8px rgba(0,0,0,0.15) для глубины
  * Иконка-атом в мобильном меню для консистентности
- Создан src/components/site/count-up.tsx — анимированный count-up компонент
  * requestAnimationFrame с easeOutExpo easing
  * Триггер при попадании в viewport (useInView from framer-motion)
  * Уважает prefers-reduced-motion (мгновенное значение)
  * Поддержка prefix/suffix
- Интегрирован CountUp в Stats section:
  * StatBlock: 4 крупных счётчика (30 публикаций, 9 направлений, 2026 год, 1 автор)
  * Category cards: счётчик для каждой категории (15, 11, 10, 8, 7, 5, 4, 3)
  * Длительность: 1800ms для больших чисел, 1200ms для категорий
- Интегрирован CountUp в Hero:
  * 3 счётчика: 30 публикаций, 9 тем, 14 проектов
  * Длительность: 1500-1800ms для эффекта

Stage Summary:
- Современный Header: иконка-атом, pill-навигация, glassmorphism, smart hide/show
- Count-up анимации во всех статистических блоках (Hero + Stats)
- Уважение prefers-reduced-motion во всех анимациях
- Lint проходит, ошибок в консоли нет

---
Task ID: 12
Agent: main (Super Z)
Task: Favorites/bookmarks system with localStorage persistence

Work Log:
- Создан src/components/site/favorites-context.tsx — React Context для управления избранным:
  * FavoritesProvider с localStorage persistence (ключ: "science-maestro7it:favorites")
  * API: favorites[], isFavorite(id), toggleFavorite(id), addFavorite, removeFavorite, clearFavorites, count
  * Загрузка из localStorage на mount, сохранение при изменении
  * Защита от невалидных данных (фильтрация не-numbers)
- Создан src/components/site/favorite-button.tsx — кнопка избранного:
  * 2 варианта: "icon" (compact, для карточек) и "full" (с текстом, для модального окна)
  * Анимация切换 между Bookmark (empty) и BookmarkCheck (filled) через AnimatePresence
  * Конфетти (15 частиц) при добавлении в избранное
  * Toast-уведомление: "Добавлено в избранное" / "Удалено из избранного"
  * Stop propagation для предотвращения открытия модального окна
  * ClearFavoritesButton — отдельный компонент для очистки
- Создан src/components/site/favorites-panel.tsx — slide-out панель избранного:
  * FavoritesPanelTrigger — кнопка в шапке с счётчиком (badge с анимацией scale)
  * FavoritesPanel — right-side slide-out panel (portal)
  * Список избранных публикаций с сортировкой по дате (новые сверху)
  * Каждая карточка: заголовок, DOI, дата, ссылка на Zenodo, кнопка удаления
  * Empty state: иконка BookOpen + инструкция "Нажмите на иконку закладки..."
  * Footer: счётчик + "Очистить всё"
  * Анимация: slide-in справа, layout animations для карточек
  * Закрытие: Escape, клик вне панели, X кнопка
- Интегрирована система в приложение:
  * FavoritesProvider оборачивает весь app в page.tsx
  * FavoritesPanelTrigger в Header (рядом с ThemeSwitcher)
  * FavoriteButton (icon variant) в каждой карточке публикации
  * FavoriteButton (full variant) в модальном окне публикации
  * Chip-фильтр "Избранное" с счётчиком в Publications section
  * Фильтрация по избранному: favoritesOnly state интегрирован в useMemo filtered list
  * resetFilters сбрасывает favoritesOnly

Stage Summary:
- Полноценная система избранного с localStorage persistence
- Кнопки в карточках, модальном окне, Header с счётчиком
- Slide-out панель со списком избранных
- Фильтр "Только избранное" в каталоге публикаций
- Конфетти + toast при добавлении/удалении
- Lint проходит, ошибок в консоли нет
