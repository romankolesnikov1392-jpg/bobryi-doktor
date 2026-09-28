// Приёмочная проверка: node scripts/verify.mjs  (нужен запущенный dev/preview сервер; BASE=http://127.0.0.1:5173)
import { chromium } from "playwright"

const base = process.env.BASE ?? "http://127.0.0.1:5173"
const routes = [
  "/",
  "/uslugi",
  "/uslugi?cat=caries",
  "/pervyj-vizit",
  "/vrachi",
  "/detskaya-zona",
  "/roditelyam",
  "/roditelyam/pervyj-vizit-k-stomatologu",
  "/roditelyam/kak-priuchit-chistit-zuby",
  "/roditelyam/trevozhnost-ras-sensornye-osobennosti",
  "/roditelyam/zachem-lechit-molochnye-zuby",
  "/ceny",
  "/kontakty",
  "/takoy-stranicy-net",
]

const results = []
const ok = (name, pass, info = "") => {
  results.push({ name, pass, info })
  console.log(`${pass ? "✔" : "✘"} ${name}${info ? " — " + info : ""}`)
}

const browser = await chromium.launch()

async function newPage(width = 1440, height = 900) {
  const page = await browser.newPage({ viewport: { width, height }, locale: "ru-RU" })
  page.errors = []
  page.on("console", (m) => m.type() === "error" && page.errors.push(m.text()))
  page.on("pageerror", (e) => page.errors.push(String(e)))
  page.on("requestfailed", (r) => page.errors.push("request failed: " + r.url()))
  page.on("response", (r) => r.status() >= 400 && page.errors.push(`HTTP ${r.status()}: ${r.url()}`))
  return page
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 40))
    }
    window.scrollTo(0, 0)
  })
}

/* 1. Все страницы открываются без ошибок, нет битых ресурсов, иллюстрации отрисованы */
for (const width of [1440, 390]) {
  const page = await newPage(width, 900)
  for (const r of routes) {
    page.errors = []
    await page.goto(base + r, { waitUntil: "networkidle" })
    await scrollThrough(page)
    const info = await page.evaluate(() => ({
      h1: document.querySelector("h1")?.textContent?.trim() ?? "",
      title: document.title,
      sw: document.documentElement.scrollWidth,
      iw: window.innerWidth,
      mascots: document.querySelectorAll("svg[data-pose]").length,
      brokenImgs: [...document.images].filter((i) => !i.complete || i.naturalWidth === 0).length,
      emptySvgs: [...document.querySelectorAll("main svg")].filter(
        (s) => s.getBBox && s.getBoundingClientRect().width > 0 && s.childElementCount === 0,
      ).length,
    }))
    ok(
      `[${width}] ${r}`,
      page.errors.length === 0 &&
        info.h1 &&
        info.sw <= info.iw &&
        info.brokenImgs === 0 &&
        info.emptySvgs === 0 &&
        info.mascots > 0,
      `h1="${info.h1.slice(0, 40)}" mascots=${info.mascots} scroll=${info.sw}/${info.iw}${page.errors.length ? " errors=" + page.errors.join(" | ") : ""}`,
    )
  }
  await page.close()
}

/* 2. Форма записи: пустая → ошибки, валидная → success-экран ВИДЕН */
{
  const page = await newPage()
  await page.goto(base + "/", { waitUntil: "networkidle" })
  await page.getByRole("button", { name: "Записаться", exact: true }).click()
  const dialog = page.getByTestId("booking-dialog")
  await dialog.waitFor({ state: "visible" })
  await dialog.getByRole("button", { name: "Отправить заявку" }).click()
  await dialog.getByRole("alert").first().waitFor({ state: "visible" })
  const alerts = await dialog.locator("[aria-invalid=true]").count()
  const summary = await dialog.getByRole("alert").first().isVisible()
  ok("Форма: пустая отправка показывает ошибки", alerts >= 6 && summary, `невалидных полей: ${alerts}`)

  await dialog.getByLabel("Имя ребёнка").fill("Соня")
  await dialog.getByRole("combobox", { name: "Возраст ребёнка" }).click()
  await page.getByRole("option", { name: "4 года" }).click()
  await dialog.getByLabel("Ваше имя").fill("Анна Петрова")
  await dialog.getByLabel("Телефон").pressSequentially("9001234567")
  await dialog.getByRole("combobox", { name: "Услуга" }).click()
  await page.getByRole("option", { name: "Профессиональная чистка зубов" }).click()
  const d = new Date(Date.now() + 3 * 864e5)
  const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
  await dialog.getByLabel("Удобная дата").fill(iso)
  await dialog.getByText("Утро", { exact: true }).click()
  await dialog.getByRole("checkbox").click()
  const phone = await dialog.getByLabel("Телефон").inputValue()
  ok("Форма: маска телефона", phone === "+7 (900) 123-45-67", phone)
  await dialog.getByRole("button", { name: "Отправить заявку" }).click()
  const success = page.getByTestId("booking-success")
  await success.waitFor({ state: "visible", timeout: 5000 })
  const box = await success.boundingBox()
  const text = await success.innerText()
  ok(
    "Форма: success-экран виден в DOM",
    (await success.isVisible()) && box && box.height > 100 && text.includes("Заявка у нас, Анна"),
    text.split("\n")[0],
  )
  ok("Форма: без ошибок в консоли", page.errors.length === 0, page.errors.join(" | "))
  await page.close()
}

/* 3. Форма полностью проходима с клавиатуры */
{
  const page = await newPage()
  await page.goto(base + "/kontakty", { waitUntil: "networkidle" })
  const trigger = page.getByRole("button", { name: "Записаться на приём" }).first()
  await trigger.focus()
  await page.keyboard.press("Enter")
  const dialog = page.getByTestId("booking-dialog")
  await dialog.waitFor({ state: "visible" })
  // фокус должен оказаться внутри модалки
  const inDialog = await page.evaluate(() => !!document.activeElement?.closest("[data-testid=booking-dialog]"))
  ok("Клавиатура: фокус переходит в модалку", inDialog)

  const focusByTab = async (predicate, max = 40) => {
    for (let i = 0; i < max; i++) {
      if (await page.evaluate(predicate)) return true
      await page.keyboard.press("Tab")
    }
    return page.evaluate(predicate)
  }
  // Как настоящий пользователь клавиатуры: Tab до нужного поля (фокус виден), затем действие
  const focused = (sel) => focusByTab(new Function(`return !!document.activeElement?.matches(${JSON.stringify(sel)})`))
  const pick = async (downs) => {
    await page.keyboard.press("Enter")
    await page.locator("[role=listbox]:visible").first().waitFor()
    for (let i = 0; i < downs; i++) await page.keyboard.press("ArrowDown")
    await page.keyboard.press("Enter")
    // Base UI возвращает фокус на поле за 1–2 кадра (~15 мс) — быстрее, чем человек нажмёт Tab
    await page.waitForFunction(() => document.activeElement?.getAttribute("role") === "combobox")
  }
  await focused("input[id$='-childName']")
  await page.keyboard.type("Миша")
  await focused("[role=combobox][aria-labelledby$='childAge-label']")
  await pick(2)
  await focused("input[id$='-parentName']")
  await page.keyboard.type("Олег")
  await focused("input[id$='-phone']")
  await page.keyboard.type("89001112233")
  await focused("[role=combobox][aria-labelledby$='service-label']")
  await pick(1)
  await focused("input[type=date]")
  const d = new Date(Date.now() + 5 * 864e5)
  const pad = (n) => String(n).padStart(2, "0")
  // нативное поле даты: порядок сегментов зависит от локали браузера (здесь ru-RU: дд.мм.гггг)
  await page.keyboard.type(`${pad(d.getDate())}${pad(d.getMonth() + 1)}${d.getFullYear()}`)
  const dateVal = await page.evaluate(() => document.activeElement?.value)
  if (dateVal !== `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`) console.log("   дата:", dateVal)
  await focusByTab(() => document.activeElement?.getAttribute("type") === "radio")
  await page.keyboard.press("Space")
  await focusByTab(() => document.activeElement?.getAttribute("role") === "checkbox")
  await page.keyboard.press("Space")
  await focusByTab(() => document.activeElement?.textContent?.includes("Отправить заявку"))
  await page.keyboard.press("Enter")
  const success = page.getByTestId("booking-success")
  let visible = false
  try {
    await success.waitFor({ state: "visible", timeout: 5000 })
    visible = true
  } catch {
const diag = await page.evaluate(() => ({
      active: document.activeElement?.tagName + " " + (document.activeElement?.textContent || "").slice(0, 30),
      values: [...document.querySelectorAll("[data-testid=booking-dialog] input, [data-testid=booking-dialog] [role=combobox], [data-testid=booking-dialog] [role=checkbox]")].map(
        (i) => (i.name || i.getAttribute("role")) + "=" + (i.value ?? "") + (i.type === "radio" ? (i.checked ? "*" : "") : "") + (i.getAttribute("aria-checked") ? "[" + i.getAttribute("aria-checked") + "]" : "") + (i.getAttribute("role") === "combobox" ? "«" + i.textContent + "»" : ""),
      ),
      invalid: [...document.querySelectorAll("[data-testid=booking-dialog] [aria-invalid=true]")].length,
    }))
    console.log("   диагностика:", JSON.stringify(diag))
    await page.screenshot({ path: "scripts/shots/kbd-fail.png" })
  }
  ok("Клавиатура: форма отправлена только клавишами", visible)
  await page.keyboard.press("Escape")
  await page.waitForTimeout(400)
  const back = await page.evaluate(() => document.activeElement?.textContent?.trim())
  ok("Клавиатура: Esc закрывает, фокус возвращается", !(await dialog.isVisible()), `фокус на: «${back}»`)
  await page.close()
}

/* 4. Мини-игра реально работает */
{
  const page = await newPage()
  await page.goto(base + "/detskaya-zona#game", { waitUntil: "networkidle" })
  await page.getByTestId("game-start").click()
  const teeth = page.locator("[data-tooth]")
  const n = await teeth.count()
  for (let i = 0; i < n; i++) for (let k = 0; k < 4; k++) await teeth.nth(i).click()
  const won = page.getByText("Все зубы блестят!")
  await won.first().waitFor({ state: "visible", timeout: 5000 })
  const cleanLabels = await teeth.evaluateAll(
    (els) => els.filter((e) => e.getAttribute("aria-label")?.includes("чистый")).length,
  )
  ok(
    "Игра: 8 зубов почищены, экран победы виден",
    cleanLabels === n && (await won.first().isVisible()),
    `чистых: ${cleanLabels}/${n}`,
  )

  /* 5. Паспорт улыбки реально меняется */
  const starsBefore = await page.locator("[aria-label^='Звёзд:']").getAttribute("aria-label")
  const stampBtn = page.getByTestId("passport-stamp")
  await stampBtn.scrollIntoViewIfNeeded()
  for (let i = 0; i < 3; i++) await stampBtn.click()
  const stamps = await page.locator("[aria-label^='Штамп ']").count()
  const got = await page.getByText("получен!").count()
  const toast = await page.locator("[data-sonner-toast]").count()
  ok("Паспорт: звёзды за игру начислены", starsBefore !== "Звёзд: 0", starsBefore)
  ok(
    "Паспорт: 3 штампа, значки получены, тост показан",
    stamps === 3 && got >= 3 && toast > 0,
    `штампов=${stamps}, значков=${got}, тостов=${toast}`,
  )

  /* Квиз */
  const quizAnswers = [true, false, true, false, true, false, true, false, true, true]
  for (const good of quizAnswers) {
    await page.getByRole("button", { name: good ? "Полезно" : "Вредно", exact: true }).click()
    await page.getByRole("button", { name: /Дальше|Узнать результат/ }).click()
  }
  const verdict = page.getByText("Зубной профессор!")
  await verdict.waitFor({ state: "visible", timeout: 5000 }).catch(() => {})
  const res = await verdict.isVisible()
  ok("Квиз: 10 верных ответов → итог «Зубной профессор!» виден", res)
  ok("Детская зона: без ошибок в консоли", page.errors.length === 0, page.errors.join(" | "))
  await page.close()
}

/* 6. Модалка услуги → запись с предвыбранной услугой */
{
  const page = await newPage()
  await page.goto(base + "/uslugi", { waitUntil: "networkidle" })
  await page.getByRole("button", { name: /Подробнее об услуге «Герметизация фиссур»/ }).click()
  const dlg = page.getByRole("dialog")
  await dlg.waitFor({ state: "visible" })
  const hasFaq = await dlg.getByText("Частые вопросы").isVisible()
  await dlg.getByRole("button", { name: "Записаться на эту услугу" }).click()
  const booking = page.getByTestId("booking-dialog")
  await booking.waitFor({ state: "visible" })
  const service = await booking.getByRole("combobox", { name: "Услуга" }).innerText()
  ok(
    "Услуги: модалка с мини-FAQ → запись с выбранной услугой",
    hasFaq && service.includes("Герметизация фиссур"),
    service,
  )
  await page.close()
}

/* 7. Форма обратной связи */
{
  const page = await newPage()
  await page.goto(base + "/kontakty", { waitUntil: "networkidle" })
  await page.getByLabel("Имя", { exact: true }).fill("Ольга")
  await page.getByLabel("Телефон или e-mail").fill("olga@example.com")
  await page.getByLabel("Сообщение").fill("Работаете ли вы по ДМС с нашей страховой?")
  await page.getByRole("checkbox").click()
  await page.getByRole("button", { name: "Отправить", exact: true }).click()
  const s = page.getByTestId("feedback-success")
  await s.waitFor({ state: "visible", timeout: 5000 })
  ok("Контакты: обратная связь → success виден", await s.isVisible())
  await page.close()
}

/* 8. 390px: мобильное меню открывается, все пункты доступны */
{
  const page = await newPage(390, 844)
  await page.goto(base + "/", { waitUntil: "networkidle" })
  await page.getByRole("button", { name: "Открыть меню" }).click()
  const nav = page.getByRole("navigation", { name: "Мобильная навигация" })
  await nav.waitFor({ state: "visible" })
  const links = await nav.getByRole("link").count()
  await nav.getByRole("link", { name: "Цены" }).click()
  await page.waitForURL("**/ceny")
  await nav.waitFor({ state: "hidden", timeout: 3000 }).catch(() => {})
  ok(
    "390px: меню — 7 ссылок, переход работает, меню закрылось",
    links === 7 && !(await nav.isVisible()),
    `ссылок: ${links}`,
  )
  await page.close()
}

/* 9. Черновик записи переживает закрытие окна; клик по подписи согласия ставит галочку */
{
  const page = await newPage()
  await page.goto(base + "/vrachi", { waitUntil: "networkidle" })
  await page.getByRole("button", { name: "Записаться", exact: true }).click()
  const dialog = page.getByTestId("booking-dialog")
  await dialog.waitFor({ state: "visible" })
  await dialog.getByLabel("Имя ребёнка").fill("Варя")
  await dialog.getByText("Согласен(на) на обработку персональных данных — моих и моего ребёнка").click()
  const checked = await dialog.getByRole("checkbox").getAttribute("aria-checked")
  await page.keyboard.press("Escape")
  await dialog.waitFor({ state: "hidden" })
  await page.getByRole("button", { name: "Записаться", exact: true }).click()
  await dialog.waitFor({ state: "visible" })
  const kept = await dialog.getByLabel("Имя ребёнка").inputValue()
  const notice = await dialog.getByText("Мы сохранили то, что вы уже успели ввести.").isVisible()
  ok("Форма: клик по подписи согласия ставит галочку", checked === "true", `aria-checked=${checked}`)
  ok("Форма: черновик сохраняется после закрытия", kept === "Варя" && notice, `имя=«${kept}»`)
  await page.close()
}

/* 10. Пилюля навигации стоит под активным пунктом */
{
  const page = await newPage()
  await page.goto(base + "/vrachi", { waitUntil: "networkidle" })
  await page.waitForTimeout(400)
  const geo = await page.evaluate(() => {
    const pill = document.querySelector(".nav-indicator")?.getBoundingClientRect()
    const link = document
      .querySelector("nav[aria-label='Основная навигация'] a[aria-current=page]")
      ?.getBoundingClientRect()
    return pill && link ? { dx: Math.abs(pill.left - link.left), dw: Math.abs(pill.width - link.width) } : null
  })
  ok("Навигация: пилюля под активным пунктом", !!geo && geo.dx < 2 && geo.dw < 2, JSON.stringify(geo))
  await page.close()
}

/* 11. prefers-reduced-motion: всё видно, ошибок нет */
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" })
  const page = await context.newPage()
  const errs = []
  page.on("pageerror", (e) => errs.push(String(e)))
  await page.goto(base + "/", { waitUntil: "networkidle" })
  await scrollThrough(page)
  await page.waitForTimeout(500)
  const hidden = await page.evaluate(
    () =>
      [...document.querySelectorAll(".reveal")].filter(
        (el) => el.getBoundingClientRect().top < innerHeight && getComputedStyle(el).opacity === "0",
      ).length,
  )
  const loops = await page.evaluate(() => getComputedStyle(document.querySelector(".motion-loop g")).animationName)
  ok(
    "Reduced motion: контент виден, петли маскота выключены",
    errs.length === 0 && hidden === 0 && loops === "none",
    `animation=${loops}`,
  )
  await context.close()
}

await browser.close()
const failed = results.filter((r) => !r.pass)
console.log(`\nИтого: ${results.length - failed.length}/${results.length} проверок пройдено`)
process.exit(failed.length ? 1 : 0)
