/** Навигация сайта */
export const nav = [
  { to: "/uslugi", label: "Услуги" },
  { to: "/pervyj-vizit", label: "Первый визит" },
  { to: "/vrachi", label: "Врачи" },
  { to: "/detskaya-zona", label: "Детская зона", kids: true },
  { to: "/roditelyam", label: "Родителям" },
  { to: "/ceny", label: "Цены" },
  { to: "/kontakty", label: "Контакты" },
] as const
