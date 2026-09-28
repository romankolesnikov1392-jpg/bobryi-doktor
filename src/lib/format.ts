const rub = new Intl.NumberFormat("ru-RU")

/** 3900 → «3 900 ₽» (неразрывные пробелы) */
export function formatPrice(n: number) {
  return `${rub.format(n)} ₽`
}

/** plural(5, ["звезда", "звезды", "звёзд"]) → «звёзд» */
export function plural(n: number, forms: [string, string, string]) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}

export function yearsLabel(n: number) {
  return `${n} ${plural(n, ["год", "года", "лет"])}`
}
