// После сборки для GitHub Pages: у каждой страницы SPA — свой index.html (ответ 200, а не 404),
// а 404.html ловит всё остальное и показывает страницу «Такой страницы нет».
// Запуск: node scripts/pages-routes.mjs (после vite build)
import { copyFileSync, mkdirSync } from "node:fs"
import { join } from "node:path"
import { articles } from "../src/data/articles.ts"
import { nav } from "../src/data/nav.ts"

const dist = "dist"
const routes = [...nav.map((n) => n.to), ...articles.map((a) => `/roditelyam/${a.slug}`)]

copyFileSync(join(dist, "index.html"), join(dist, "404.html"))
for (const route of routes) {
  const dir = join(dist, route)
  mkdirSync(dir, { recursive: true })
  copyFileSync(join(dist, "index.html"), join(dir, "index.html"))
}
console.log(`404.html + ${routes.length} страниц: ${routes.join(", ")}`)
