/** Настройки мини-игры «Почисти зубки». Меняйте цифры здесь — логика подстроится. */
export const brushGame = {
  /** Секунд на раунд */
  duration: 30,
  /** Сколько «потираний» нужно каждому зубу */
  scrubsPerTooth: 4,
  /** Зубы: верхний и нижний ряд по 4. germ — есть ли на зубе микроб с самого начала */
  teeth: [
    { id: "u1", row: "top", germ: true },
    { id: "u2", row: "top", germ: true },
    { id: "u3", row: "top", germ: true },
    { id: "u4", row: "top", germ: true },
    { id: "l1", row: "bottom", germ: true },
    { id: "l2", row: "bottom", germ: true },
    { id: "l3", row: "bottom", germ: true },
    { id: "l4", row: "bottom", germ: true },
  ] as const,
  germNames: ["Кисляк", "Липучка", "Хрумзик", "Сахарок", "Налётик", "Дырочкин", "Жвачкин", "Бяка"],
  phrases: {
    idle: "Микробы захватили зубы! Три щёткой каждый зуб, пока он не заблестит. У тебя 30 секунд!",
    playing: ["Шкряб-шкряб!", "Ещё чуть-чуть!", "Микробы убегают!", "Не забудь нижние!", "Ты молния!"],
    won: "Все зубы блестят! Ты настоящий Чистюля.",
    lost: "Время вышло — но микробы уже напуганы. Ещё раунд?",
  },
  /** Звёзды за оставшееся время */
  stars: [
    { minSecondsLeft: 12, stars: 3 },
    { minSecondsLeft: 5, stars: 2 },
    { minSecondsLeft: 0, stars: 1 },
  ],
}
