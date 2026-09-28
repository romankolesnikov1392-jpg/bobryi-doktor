// Нарезка страницы по экранам: node scripts/slices.mjs <path> <prefix> [width] [height] [maxSlices]
import { chromium } from "playwright"
const [, , path = "/", prefix = "slice", width = "1440", height = "900", max = "12"] = process.argv
const base = process.env.BASE ?? "http://127.0.0.1:5173"
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) } })
const errors = []
page.on("console", (m) => m.type() === "error" && errors.push(m.text()))
page.on("pageerror", (e) => errors.push(String(e)))
await page.goto(base + path, { waitUntil: "networkidle" })
await page.waitForTimeout(1200)
const total = await page.evaluate(() => document.documentElement.scrollHeight)
const h = Number(height)
let i = 0
for (let y = 0; y < total && i < Number(max); y += h - 60, i++) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await page.waitForTimeout(1100)
  await page.screenshot({ path: `scripts/shots/${prefix}-${String(i).padStart(2, "0")}.png` })
  const over = await page.evaluate(() => {
    const W = document.documentElement.clientWidth
    if (document.documentElement.scrollWidth <= W) return null
    return [...document.querySelectorAll("body *")]
      .filter((el) => el.getBoundingClientRect().right > W + 1)
      .slice(0, 6)
      .map((el) => el.tagName + "." + (el.getAttribute("class") || "").slice(0, 70))
  })
  if (over) console.log("overflow at slice", i, JSON.stringify(over))
}
const sw = await page.evaluate(() => [document.documentElement.scrollWidth, window.innerWidth])
console.log(JSON.stringify({ slices: i, total, scrollWidth: sw[0], innerWidth: sw[1], errors }))
await browser.close()
