# 005 — Тюнинг: hover, press, stagger, прыжок в hero, аккордеон/табы, тень шапки

- **Status**: DONE
- **Commit**: нет коммитов (рабочая копия)
- **Severity**: MEDIUM (hover) / LOW (остальное)
- **Category**: Easing & duration, Physicality, Performance, Cohesion
- **Estimated scope**: ~12 файлов, точечные правки классов

## Problem → Target

| Где | Сейчас | Цель | Почему |
| --- | --- | --- | --- |
| `home/TrustSection.tsx:42`, `home/DoctorsPreview.tsx:28,49` | hover `duration-500` | `duration-[240ms]`, та же `--ease-spring` | hover — десятки раз за визит, 500 мс вязнет |
| `home/VisitTeaser.tsx:52` | веер `duration-500` | `duration-300` | маркетинговый жест, но всё ещё hover |
| `kids/BrushGame.tsx:344`, `layout/Header.tsx:76`, `layout/MobileMenu.tsx:22`, `ui/dialog.tsx:66`, `ui/sheet.tsx:67` | `active:scale-[0.94]` | `active:scale-[0.96]` | press — 0.95–0.98 |
| `ui/checkbox.tsx:11` | `active:scale-[0.92]` | `active:scale-[0.95]` | то же |
| `home/HomeHero.tsx:34-35` | `animate(el, { y, rotate })` | `animate(el, { transform: "translateY(-22px) rotate(-4deg)" }, { duration: 0.14, ease: [0.23, 1, 0.32, 1] })`, обратно `{ transform: "translateY(0px) rotate(0deg)" }` пружиной `{ type: "spring", duration: 0.55, bounce: 0.5 }` | шорткаты motion идут по главному потоку |
| `home/TrustSection.tsx:37`, `home/DoctorsPreview.tsx:26,45` | stagger 90 / 300 мс | 70 мс / 210 мс | stagger 30–80 мс |
| `ui/accordion.tsx:35`, `ui/tabs.tsx:19` | `duration-300` | `duration-[250ms]` | UI ≤ 300 мс, с запасом |
| `layout/Header.tsx:30` | `transition-shadow duration-300` | тень на `::after`, переход только `opacity 300ms ease` | box-shadow перерисовывается при скролле |
| `index.css` `@keyframes wiggle` | 520 мс, scale 1.06 | 420 мс, scale 1.04 | hover-частота → скромнее |

Упущенные возможности — сделать заодно:

- успех записи: контент поднимается ступенькой (`enter-rise` с `--d` 0/60/120 мс) вместо мгновенной подмены формы;
- квиз: новая карточка еды въезжает `bubble-in 220ms` вместо появления из ниоткуда.

## Boundaries

- Не менять разметку, только классы/стили моушна (кроме тени шапки — новый псевдоэлемент).

## Verification

- **Mechanical**: `npx tsc -b`, `node scripts/verify.mjs` — все проверки зелёные.
- **Feel check**: наведение на карточки доверия и врачей — выпрямляются быстро, без вязкости; на 10% playback виден лёгкий перелёт в конце. Скролл вниз на 12px — тень шапки проявляется без просадки FPS в Performance.
