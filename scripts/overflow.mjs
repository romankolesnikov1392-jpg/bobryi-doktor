// Ищем элементы, вылезающие за ширину экрана: node scripts/overflow.mjs <path> [width]
import { chromium } from "playwright"
const [, , path = "/", width = "390"] = process.argv
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: Number(width), height: 844 } })
await page.goto("http://127.0.0.1:5173" + path, { waitUntil: "networkidle" })
await page.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 500) {
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 50))
  }
})
await page.waitForTimeout(1200)
const res = await page.evaluate(() => {
  const W = document.documentElement.clientWidth
  const out = []
  for (const el of document.querySelectorAll("body *")) {
    const r = el.getBoundingClientRect()
    if (r.right > W + 1 && r.width > 0) {
      // пропускаем, если предок уже в списке
      out.push({
        tag: el.tagName,
        cls: (el.getAttribute("class") || "").slice(0, 90),
        right: Math.round(r.right),
        w: Math.round(r.width),
      })
    }
  }
  return { W, sw: document.documentElement.scrollWidth, items: out.slice(0, 25) }
})
console.log(JSON.stringify(res, null, 1))
await browser.close()
