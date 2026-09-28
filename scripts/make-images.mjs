// Генерирует apple-touch-icon.png и og.png из живой вёрстки: node scripts/make-images.mjs (нужен dev-сервер)
import { chromium } from "playwright"
import { readFileSync } from "node:fs"

const base = process.env.BASE ?? "http://127.0.0.1:5173"
const browser = await chromium.launch()

// иконка 180×180 из favicon.svg
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } })
await icon.setContent(
  `<html><body style="margin:0;background:#FFFBF5">${readFileSync("public/favicon.svg", "utf8").replace("<svg ", '<svg width="180" height="180" ')}</body></html>`,
)
await icon.screenshot({ path: "public/apple-touch-icon.png", omitBackground: false })

// OG-картинка 1200×630 — первый экран главной
const og = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
})
await og.goto(base + "/", { waitUntil: "networkidle" })
await og.waitForTimeout(800)
await og.screenshot({ path: "public/og.png" })

await browser.close()
console.log("ok: public/apple-touch-icon.png, public/og.png")
