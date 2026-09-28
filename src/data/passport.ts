/** «Паспорт улыбки» — значки за визиты и активности в Детской зоне (демо, без сохранения). */
export type BadgeId = "first" | "brave" | "keeper" | "clean" | "smart" | "artist"

export interface Badge {
  id: BadgeId
  title: string
  how: string
  tone: "mint" | "sun" | "lav" | "sky" | "coral"
}

export const badges: Badge[] = [
  { id: "first", title: "Первый шаг", how: "за первый визит", tone: "mint" },
  { id: "brave", title: "Смельчак", how: "за 3 визита", tone: "coral" },
  { id: "keeper", title: "Хранитель эмали", how: "за 6 визитов — целую страницу", tone: "lav" },
  { id: "clean", title: "Чистюля", how: "за победу в «Почисти зубки»", tone: "sky" },
  { id: "smart", title: "Знаток", how: "за 8+ верных ответов в квизе", tone: "sun" },
  { id: "artist", title: "Художник", how: "за скачанную раскраску", tone: "coral" },
]

/** Сколько штампов-визитов на одной странице паспорта */
export const STAMPS_PER_PAGE = 6

export const stampLabels = ["Знакомство", "Чистка", "Фторлак", "Осмотр", "Пломба-радуга", "Контроль"]
