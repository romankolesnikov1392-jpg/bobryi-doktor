# 002 — Фокус с клавиатуры появляется мгновенно

- **Status**: DONE
- **Commit**: нет коммитов (рабочая копия)
- **Severity**: MEDIUM
- **Category**: Purpose & frequency
- **Estimated scope**: 3 файла, по одной строке

## Problem

Фокус-рамка полей плавно проявляется 150 мс, а фокус чаще всего приходит с Tab — клавиатурное действие не анимируют:

- `src/components/ui/input.tsx:7` — `transition-[border-color,box-shadow] duration-150`
- `src/components/ui/select.tsx:28` — то же на триггере
- `src/components/booking/BookingDialog.tsx:350` — чипсы времени: `transition-[background-color,border-color,scale] duration-150 ease-out`

## Target

- `input.tsx`, `select.tsx`: убрать `transition-*`/`duration-*` у рамки и кольца — состояние меняется в тот же кадр.
- Чипсы времени: `transition-[background-color,scale] duration-150 ease-out` (фон — от клика мышью, scale — press), без `border-color`.

## Boundaries

- Не менять цвета, толщины и сами focus-стили — только тайминг.

## Verification

- **Mechanical**: `npx tsc -b`.
- **Feel check**: Tab по форме записи — кольцо и рамка появляются сразу, без «проявки»; клик по чипсу времени — фон перетекает, нажатие продавливается.
