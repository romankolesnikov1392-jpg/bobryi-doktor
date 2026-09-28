import { create } from "zustand"
import type { BookingValues } from "@/components/booking/bookingSchema"

/** Общая модалка записи — открывается с любой страницы: useBooking.getState().openBooking(…) */
interface BookingState {
  open: boolean
  serviceId?: string
  comment?: string
  /** Черновик: если закрыть модалку, не отправив, введённое не пропадёт (только в памяти вкладки) */
  draft?: Partial<BookingValues>
  openBooking: (opts?: { serviceId?: string; comment?: string }) => void
  setOpen: (open: boolean) => void
  saveDraft: (draft: Partial<BookingValues>) => void
  clearDraft: () => void
}

export const useBooking = create<BookingState>((set) => ({
  open: false,
  openBooking: (opts) => set({ open: true, serviceId: opts?.serviceId, comment: opts?.comment }),
  setOpen: (open) => set({ open }),
  saveDraft: (draft) => set({ draft }),
  clearDraft: () => set({ draft: undefined }),
}))
