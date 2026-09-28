// Скриншот страницы: node scripts/shot.mjs <path> <out.png> [width] [fullPage]
import { chromium } from "playwright"
const [, , path = "/", out = "scripts/shots/shot.png", width = "1440", full = "1"] = process.argv
const base = process.env.BASE ?? "http://127.0.0.1:5173"
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 }, deviceScaleFactor: 1 })
const errors = []
page.on("console", (m) => m.type() === "error" && errors.push(m.text()))
page.on("pageerror", (e) => errors.push(String(e)))
await page.goto(base + path, { waitUntil: "networkidle" })
// прокрутить, чтобы сработали reveal-анимации
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 400) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 60))
  }
  window.scrollTo(0, 0)
})
await page.waitForTimeout(900)
await page.screenshot({ path: out, fullPage: full === "1" })
const sw = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth])
console.log(JSON.stringify({ out, scrollWidth: sw[0], innerWidth: sw[1], errors }))
await browser.close()
