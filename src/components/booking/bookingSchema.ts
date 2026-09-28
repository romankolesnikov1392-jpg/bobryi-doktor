import { z } from "zod"
import { yearsLabel } from "@/lib/format"

export const ageOptions = Array.from({ length: 18 }, (_, i) => ({
  value: String(i),
  label: i === 0 ? "до 1 года" : yearsLabel(i),
}))

export const timeOptions = [
  { value: "morning", label: "Утро", hint: "8–12" },
  { value: "day", label: "День", hint: "12–16" },
  { value: "evening", label: "Вечер", hint: "16–21" },
] as const

const pad = (n: number) => String(n).padStart(2, "0")
export function isoDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
export const todayISO = () => isoDate(new Date())
export const maxISO = () => {
  const d = new Date()
  d.setDate(d.getDate() + 60)
  return isoDate(d)
}

/** «+7 (900) 123-45-67» из любых цифр */
export function formatPhone(raw: string) {
  let d = raw.replace(/\D/g, "")
  if (!d) return ""
  if (d[0] === "8") d = "7" + d.slice(1)
  if (d[0] !== "7") d = "7" + d
  const p = d.slice(1, 11)
  let out = "+7"
  if (p.length) out += ` (${p.slice(0, 3)}`
  if (p.length >= 3) out += ")"
  if (p.length > 3) out += ` ${p.slice(3, 6)}`
  if (p.length > 6) out += `-${p.slice(6, 8)}`
  if (p.length > 8) out += `-${p.slice(8, 10)}`
  return out
}

const nameRe = /^[A-Za-zА-Яа-яЁё\s'-]+$/

export const bookingSchema = z.object({
  childName: z
    .string()
    .trim()
    .min(2, "Как зовут ребёнка? Нужно хотя бы 2 буквы")
    .max(40, "Слишком длинное имя — хватит и короткого")
    .regex(nameRe, "Только буквы, пробел или дефис"),
  childAge: z.string().min(1, "Выберите возраст ребёнка"),
  parentName: z
    .string()
    .trim()
    .min(2, "Как к вам обращаться? Нужно хотя бы 2 буквы")
    .max(60, "Слишком длинное имя")
    .regex(nameRe, "Только буквы, пробел или дефис"),
  phone: z
    .string()
    .refine(
      (v) => v.replace(/\D/g, "").length === 11,
      "Проверьте номер: 10 цифр после +7, например +7 (900) 123-45-67",
    ),
  service: z.string().min(1, "Выберите услугу — или «Пока не знаю, нужна консультация»"),
  date: z
    .string()
    .min(1, "Выберите удобную дату")
    .refine((v) => !v || v >= todayISO(), "Эта дата уже прошла — выберите сегодня или позже")
    .refine((v) => !v || v <= maxISO(), "Записываем не дальше чем на 2 месяца вперёд"),
  time: z.string().min(1, "Выберите удобное время дня"),
  comment: z.string().max(500, "Не больше 500 символов — остальное расскажете по телефону"),
  consent: z
    .boolean()
    .refine((v) => v, "Без согласия мы не можем принять заявку: этого требует закон о персональных данных"),
})

export type BookingValues = z.infer<typeof bookingSchema>

export const bookingDefaults: BookingValues = {
  childName: "",
  childAge: "",
  parentName: "",
  phone: "",
  service: "",
  date: "",
  time: "",
  comment: "",
  consent: false,
}
