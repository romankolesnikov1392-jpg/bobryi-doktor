import { create } from "zustand"
import { toast } from "sonner"
import { badges, STAMPS_PER_PAGE, type BadgeId } from "@/data/passport"

/**
 * «Паспорт улыбки» — чисто фронтенд-демо: состояние живёт в памяти вкладки,
 * переживает переходы между страницами, но не перезагрузку.
 */
interface PassportState {
  visits: number
  stars: number
  earned: BadgeId[]
  lastStampAt: number
  addVisit: () => void
  addStars: (n: number) => void
  earn: (id: BadgeId) => void
  reset: () => void
  restore: (snapshot: Pick<PassportState, "visits" | "stars" | "earned">) => void
}

function announce(id: BadgeId) {
  const badge = badges.find((b) => b.id === id)
  if (badge)
    toast(`Новый значок: «${badge.title}»`, { description: `Грыша вклеил его в «Паспорт улыбки» — ${badge.how}.` })
}

export const usePassport = create<PassportState>((set, get) => ({
  visits: 0,
  stars: 0,
  earned: [],
  lastStampAt: 0,
  addVisit: () => {
    const visits = Math.min(get().visits + 1, STAMPS_PER_PAGE)
    if (visits === get().visits) return
    set({ visits, lastStampAt: Date.now() })
    if (visits >= 1) get().earn("first")
    if (visits >= 3) get().earn("brave")
    if (visits >= STAMPS_PER_PAGE) get().earn("keeper")
  },
  addStars: (n) => set((s) => ({ stars: s.stars + n })),
  earn: (id) => {
    if (get().earned.includes(id)) return
    set((s) => ({ earned: [...s.earned, id] }))
    announce(id)
  },
  reset: () => {
    const { visits, stars, earned } = get()
    if (!visits && !stars && !earned.length) return
    set({ visits: 0, stars: 0, earned: [], lastStampAt: 0 })
    // стирание прогресса — с окном «вернуть», без подтверждающих модалок
    toast("Паспорт очищен", {
      description: "Штампы, звёзды и значки сброшены.",
      action: { label: "Вернуть", onClick: () => get().restore({ visits, stars, earned }) },
      duration: 8000,
    })
  },
  restore: (snapshot) => set({ ...snapshot }),
}))
