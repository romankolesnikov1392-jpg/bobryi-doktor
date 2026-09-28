import { useEffect, useRef, useState } from "react"

/** Однократное появление во вьюпорте (для скролл-анимаций). */
export function useInView<T extends Element>(options?: { rootMargin?: string; threshold?: number }) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const rootMargin = options?.rootMargin ?? "0px 0px -12% 0px"
  const threshold = options?.threshold ?? 0.12

  useEffect(() => {
    const el = ref.current
    if (!el || inView) return
    if (typeof IntersectionObserver === "undefined") {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin, threshold },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [inView, rootMargin, threshold])

  return { ref, inView }
}
