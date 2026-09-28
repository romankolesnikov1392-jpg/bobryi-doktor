# Планы по анимациям (improve-animations)

Аудит всего моушна в `src/` по чек-листу Emil Kowalski (AUDIT.md скилла improve-animations).
Коммит: репозиторий ещё без коммитов (первичная сборка), планы сверены с рабочей копией.

| # | План | Severity | Status |
| --- | --- | --- | --- |
| 001 | [Индикатор навигации — CSS вместо shared layout](001-nav-pill-css.md) | HIGH | DONE |
| 002 | [Фокус с клавиатуры — без анимации](002-instant-focus.md) | MEDIUM | DONE |
| 003 | [Reduced motion для модалки, шторки, табов и «попов»](003-reduced-motion.md) | MEDIUM | DONE |
| 004 | [Петли Грыши стартуют при появлении в экране](004-mascot-loops-in-view.md) | MEDIUM | DONE |
| 005 | [Тюнинг: hover, press, stagger, прыжок, аккордеон, тень шапки](005-tuneup.md) | MEDIUM/LOW | DONE |

**Порядок:** 001 → 002 → 003 → 004 → 005. Зависимостей нет, кроме того, что 003 и 005 правят одни и те же
компоненты (`dialog.tsx`, `tabs.tsx`) — делать последовательно.
