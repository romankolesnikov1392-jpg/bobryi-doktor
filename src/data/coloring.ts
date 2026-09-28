/**
 * Раскраски. По умолчанию страница A4 собирается из линейной версии Грыши
 * и скачивается как SVG. Чтобы отдавать готовые файлы от иллюстратора, положите их в
 * public/coloring/ и укажите путь в поле `file` (PDF/PNG/SVG) — тогда скачается он.
 */
import type { GryshaPose } from "@/components/mascot/Grysha"

export interface ColoringPage {
  id: string
  title: string
  pose: GryshaPose
  /** Фоновые предметы на листе */
  scene: "bubbles" | "stars" | "balloons" | "question"
  file?: string
}

export const coloringPages: ColoringPage[] = [
  { id: "privet", title: "Грыша говорит «Привет!»", pose: "greet", scene: "stars" },
  { id: "shchetka", title: "Грыша и зубная щётка", pose: "explain", scene: "bubbles" },
  { id: "prazdnik", title: "Грыша на празднике", pose: "happy", scene: "balloons" },
  { id: "vopros", title: "У Грыши вопрос", pose: "think", scene: "question" },
]
