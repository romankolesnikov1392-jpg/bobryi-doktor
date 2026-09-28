# «Бобрый доктор» — сайт детской стоматологии (демо)

**🌐 Сайт: https://romankolesnikov1392-jpg.github.io/bobryi-doktor/**

Демо-сайт детской стоматологической клиники с талисманом — бобром-стоматологом **Грышей**.
Две аудитории — два голоса: тёплый и конкретный для родителей, озорной (рукописным шрифтом, от лица Грыши) для детей.

> ⚠️ Демо-проект. Клиника, адрес, телефоны, врачи, цены, отзывы и номер лицензии вымышлены.
> Формы ничего никуда не отправляют. Перед запуском замените данные в `src/data/*` (список ниже).

## Стек

- **React 19 + Vite 8 + TypeScript 7**, маршрутизация — **React Router 8** (ленивые страницы).
- **Tailwind CSS v4** — токены бренда в `src/index.css` (`@theme`).
- **shadcn/ui на Base UI** (`npx shadcn@latest init -b base`) — Dialog, Sheet, Select, Tabs, Accordion, Checkbox, Input, Textarea, Button. Компоненты скопированы в `src/components/ui/` и полностью перерисованы под тему.
- **react-hook-form + zod** — формы и валидация; **zustand** — модалка записи и «Паспорт улыбки»;
  **Sonner** — тосты; **NumberFlow** — счётчики; **motion (mini)** — пружинный прыжок Грыши через WAAPI.
- Шрифты self-hosted через Fontsource: **Nunito** (заголовки), **Mulish** (текст), **Pangolin** (голос Грыши). Все с кириллицей.

## Быстрый старт

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # tsc -b + vite build → dist/
npm run preview      # локальный просмотр прод-сборки (порт 4173)
npm run verify       # приёмочные проверки Playwright (нужен запущенный dev или preview; BASE=http://127.0.0.1:4173)
npm run format       # Prettier + сортировка классов Tailwind
```

Для `npm run verify` один раз: `npx playwright install chromium`.

## Структура

```
src/
  main.tsx, router.tsx          точка входа и маршруты (страницы — lazy)
  index.css                     дизайн-токены, материалы (плюшевые тени, «губа» кнопок), моушн, reduced-motion
  data/                         ВЕСЬ контент — здесь, не в компонентах
    services.ts                 услуги и цены: { id, category, name, ageRange, description, priceFrom, duration, details?, faq? }
    doctors.ts                  врачи + параметры иллюстрированных портретов
    faq.ts                      FAQ и шаги по ДМС
    articles.ts                 статьи для родителей (блоки p/h/list/tip)
    visit.ts                    комикс «Первый визит» + советы родителям
    quiz.ts, game.ts            квиз «Полезно/вредно» и настройки игры «Почисти зубки»
    passport.ts                 значки и штампы «Паспорта улыбки»
    coloring.ts, story.ts       раскраски и история Грыши
    trust.ts, reviews.ts        блок доверия и (иллюстративные) отзывы
    clinic.ts, emergency.ts     контакты, часы, экстренная линия, первая помощь при травме
    nav.ts                      пункты меню
  components/
    mascot/Grysha.tsx           ТАЛИСМАН: <Grysha pose="greet|explain|happy|cheer|bye|think" /> и <GryshaFace />
    illustrations/              категории услуг, блок доверия, кадры комикса, еда, портреты врачей, карта
    ui/                         shadcn/ui (Base UI), перестилизованные
    layout/                     шапка, мобильное меню, футер с обязательной плашкой, общий Layout
    booking/                    модалка записи (общая для всех страниц) + zod-схема
    home/, services/, kids/, contacts/   блоки страниц
    decor.tsx, icons.tsx        волны-разделители, кляксы, подчёркивания; собственный набор иконок
  pages/                        Home, Services, FirstVisit, Doctors, KidsZone, Parents, Article, Prices, Contacts, NotFound
  prototypes/                   3 варианта hero/маскота (скилл prototype) — только в dev: /prototypes/hero, /prototypes/mascot
  store/                        booking (модалка + черновик), passport
scripts/                        verify.mjs (приёмка), slices/overflow/shot.mjs (скриншоты), make-images.mjs (иконка и OG)
plans/                          аудит анимаций (improve-animations) и выполненные планы
public/                         favicon.svg, apple-touch-icon.png, og.png
```

## Как заменить маскота и иллюстрации на финальную графику

Все иллюстрации — React-компоненты с SVG внутри; страницы используют только их API,
поэтому замена графики не трогает вёрстку.

**Грыша (`src/components/mascot/Grysha.tsx`)**

- API, который нужно сохранить: `<Grysha pose sticker animated decorative label className />` и `<GryshaFace pose />`.
  Позы: `greet` (встречает), `explain` (объясняет), `happy` (радуется), `cheer` (подбадривает), `bye` (прощается), `think` (думает).
- **Вариант А — перекрасить/поправить вектор.** Цвета персонажа — токены `--color-fur`, `--color-fur-dark`, `--color-fur-light`,
  `--color-line` в `src/index.css`; позы — таблица `POSES` (углы лап, глаза, рот, реквизит).
- **Вариант Б — отрисовки иллюстратора.** Положите `public/mascot/<pose>.svg` (6 поз, одинаковый холст и масштаб)
  и замените тело компонента на `<img src={`/mascot/${pose}.svg`} width={240} height={290} alt={decorative ? "" : label} />`,
  сохранив обёртку с классом `motion-loop` — покачивание можно оставить на обёртке (`animation: var(--animate-bob)`).
  Для раскрасок нужна и линейная версия (`variant="line"`) — отдельный файл `public/mascot/<pose>-line.svg`.
- Петли анимации ограничены ≤5 секунд (WCAG 2.2.2), стартуют при появлении персонажа в экране, при наведении «оживают» снова,
  при `prefers-reduced-motion` выключены.

**Остальные иллюстрации (`src/components/illustrations/`)**

| Файл | Что это | Как заменить |
| --- | --- | --- |
| `CategoryArt.tsx` | наклейки 5 категорий услуг | SVG 80×80 на категорию |
| `TrustArt.tsx` | 4 сценки блока доверия | SVG/PNG 240×180 |
| `ComicScene.tsx` | фоны 6 кадров «Первого визита» (Грыша накладывается поверх) | фон 260×200, Грыша остаётся компонентом |
| `FoodArt.tsx` | 10 продуктов для квиза | SVG 100×100 |
| `DoctorPortrait.tsx` | иллюстрированные портреты | на фото: `<img>` с `width`/`height`, `loading="lazy"`, в круглой маске |
| `ClinicMap.tsx` | нарисованная схема проезда | статичная картинка или виджет карты по ссылке |

**Раскраски** собираются из линейного Грыши и скачиваются как SVG. Чтобы отдавать файлы иллюстратора,
положите их в `public/coloring/` и укажите путь в поле `file` в `src/data/coloring.ts`.

**Иконка и превью для соцсетей:** `public/favicon.svg`; `npm run make-images` (при запущенном dev-сервере)
перегенерирует `apple-touch-icon.png` и `og.png` из живой вёрстки.

## Деплой

### GitHub Pages (настроен)

Workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) при каждом пуше в `main` собирает сайт
с `BASE_PATH=/<имя репозитория>/`, скриптом [`scripts/pages-routes.mjs`](scripts/pages-routes.mjs) раскладывает `index.html`
по папкам страниц (прямые ссылки вида `/kontakty` отвечают 200) и кладёт `404.html` для несуществующих адресов,
затем публикует `dist/` на GitHub Pages. Ход сборки — вкладка **Actions** репозитория.

Локально проверить сборку «как на Pages»: `BASE_PATH=/bobryi-doktor/ npm run build && node scripts/pages-routes.mjs && BASE_PATH=/bobryi-doktor/ npm run preview`
→ http://localhost:4173/bobryi-doktor/

### Vercel (альтернатива)

Конфигурация уже в `vercel.json`: сборка `npm run build`, выдача `dist/`, SPA-rewrite всех путей на `index.html`
(прямые ссылки вида `/kontakty` и `/roditelyam/...` работают), долгий кэш для `/assets/*`.

**Через Git (рекомендуется)**

1. Залейте репозиторий на GitHub/GitLab.
2. На [vercel.com/new](https://vercel.com/new) импортируйте репозиторий — пресет **Vite** определится сам.
3. Нажмите **Deploy**. Каждый пуш в основную ветку — продакшн, в другие ветки — preview-деплой.

**Через CLI**

```bash
npm i -g vercel
vercel login
vercel            # preview-деплой
vercel --prod     # продакшн
```

Переменные окружения не нужны. Свой домен: Project → Settings → Domains.

## Что заменить перед запуском

- `src/data/clinic.ts` — адрес, телефоны, e-mail, часы, ссылка на карту, номер лицензии.
- `src/data/doctors.ts` — реальные врачи (ФИО, образование, стаж) и фото вместо портретов.
- `src/data/services.ts` — актуальный прайс.
- `src/data/reviews.ts` — настоящие отзывы с согласия авторов (или убрать блок и плашку «иллюстративные»).
- Отправка форм: `BookingDialog.tsx` и `FeedbackForm.tsx` сейчас имитируют запрос — подключите API/CRM
  (обработчик `onSubmit`). Политику обработки персональных данных нужно опубликовать отдельной страницей.
- Плашка в футере «Демо-проект…» — убрать.

## Доступность и качество

- Skip-link, фокус переносится на `<main>` при переходах, заметный `:focus-visible` на всём интерактивном.
- Форма записи полностью проходится с клавиатуры (проверяется в `scripts/verify.mjs`), ошибки — рядом с полями
  и в сводке `role="alert"`, первый невалидный элемент получает фокус; чекбокс согласия обязателен.
- `prefers-reduced-motion`: без перемещений — только затухания; петли маскота выключены.
- 390 px без горизонтальной прокрутки; тексты на пастельных фонах — цветом «чернил» (контраст ≥ 4.5:1).
- Прототипы hero и маскота (3 варианта: «Стикерборд», «Книжка», «Плакат») доступны в dev по адресу `/prototypes/hero`.
