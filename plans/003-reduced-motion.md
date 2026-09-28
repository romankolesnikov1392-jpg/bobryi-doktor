# 003 — Reduced motion: убираем перемещение у модалки, шторки, табов и «попов»

- **Status**: DONE
- **Commit**: нет коммитов (рабочая копия)
- **Severity**: MEDIUM
- **Category**: Accessibility
- **Estimated scope**: `src/index.css`, один блок

## Problem

При `prefers-reduced-motion: reduce` всё ещё двигаются:

- модалка (`src/components/ui/dialog.tsx`) — `scale(0.94)` + сдвиг на 12px при входе;
- шторка меню (`src/components/ui/sheet.tsx`) — выезд на 100% ширины;
- ползунок табов (`src/components/ui/tabs.tsx:19`) — переезд между вкладками;
- keyframe-«попы» `bubble-in`, `success-pop`, `stamp-in`, `shake` (HomeHero, BrushGame, FoodQuiz, SmilePassport, BookingDialog).

## Target

В блок `@media (prefers-reduced-motion: reduce)` в `src/index.css`:

```css
[data-slot="dialog-content"][data-starting-style],
[data-slot="dialog-content"][data-ending-style] { scale: 1; translate: -50% -50%; }
[data-slot="sheet-content"] { transition-property: opacity !important; }
[data-slot="sheet-content"][data-starting-style],
[data-slot="sheet-content"][data-ending-style] { translate: 0 0 !important; opacity: 0; }
[data-slot="tabs-indicator"] { transition: none !important; }
[class*="animate-[bubble-in"],
[class*="animate-[success-pop"],
[class*="animate-[stamp-in"] { animation-name: page-fade !important; }
[class*="animate-[shake"] { animation: none !important; }
```

Прозрачность остаётся — появление понятно, но ничего не летает. Обратная связь квиза сохраняется текстом («Верно!» / «Не совсем…»).

## Boundaries

- Reduced motion = меньше и мягче, не ноль: затухания оставить.

## Verification

- DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`: открыть запись, мобильное меню, переключить табы услуг, ответить в квизе, поставить штамп — только затухания.
