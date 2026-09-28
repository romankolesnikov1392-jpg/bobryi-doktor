# 001 — Индикатор навигации: CSS-переход вместо shared layout animation

- **Status**: DONE
- **Commit**: нет коммитов (рабочая копия)
- **Severity**: HIGH
- **Category**: Performance
- **Estimated scope**: 1 файл + 1 правило в CSS, ~40 строк

## Problem

`src/components/layout/Header.tsx:48-54` — «пилюля» активного пункта меню анимируется через `motion` `layoutId`:

```tsx
<motion.span layoutId="nav-pill" … transition={reduce ? { duration: 0 } : { type: "spring", duration: 0.45, bounce: 0.28 }} />
```

Shared layout animation считается на главном потоке (rAF) и срабатывает ровно при смене маршрута — когда
грузится ленивый чанк страницы и React рендерит новую страницу. Под нагрузкой это роняет кадры
(тот самый случай, который Эмиль описывает для табов дашборда Vercel).

## Target

Один `<span>`-индикатор в `<ul>`, позиция и ширина задаются из layout-эффекта по активной ссылке:

```css
.nav-indicator {
  transform: translateX(<offsetLeft>px);
  width: <offsetWidth>px;
}
.nav-indicator[data-ready] {
  transition: transform 280ms var(--ease-spring), width 280ms var(--ease-spring), background-color 200ms ease, opacity 200ms ease;
}
@media (prefers-reduced-motion: reduce) { .nav-indicator[data-ready] { transition: opacity 200ms ease; } }
```

- Первичная позиция — без анимации (`data-ready` ставится после первого кадра).
- Нет активного пункта (главная) — индикатор `opacity: 0`.
- Ширина анимируется сознательно: элемент абсолютный, без зависимых узлов — та же оговорка, что у пикера прототипов.

## Repo conventions to follow

- Кривые — токены из `src/index.css` (`--ease-spring`, `--ease-out`).
- Образец измерения + переезда: `src/prototypes/HeroPrototypes.tsx` (`moveHighlight`).

## Steps

1. Удалить импорт `motion` и `usePrefersReducedMotion` из `Header.tsx`.
2. `useLocation()` + `useLayoutEffect`: найти `a[aria-current=page]` внутри `ul`, записать `transform`/`width`/цвет в индикатор.
3. Слушать `resize` и `document.fonts.ready` — пересчитать позицию.
4. В `index.css` добавить `.nav-indicator` с переходами и reduced-motion.

## Boundaries

- Не трогать мобильное меню, кнопки справа, логотип. Без новых зависимостей.

## Verification

- **Mechanical**: `npx tsc -b` — без ошибок.
- **Feel check**: переходы по пунктам — пилюля переезжает с лёгким перелётом; в Animations panel на 10% видно, что двигается только `transform`/`width`; при первом открытии страницы пилюля не «прилетает» из угла.
- Rendering → prefers-reduced-motion: пилюля переставляется без переезда.
