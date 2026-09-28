import { useEffect } from "react"
import { useBlocker } from "react-router"

/**
 * Предупреждает перед уходом, если в форме есть несохранённый текст:
 * закрытие вкладки (beforeunload) и переходы внутри сайта (useBlocker).
 */
export function useLeaveGuard(when: boolean, message = "В форме остался неотправленный текст. Уйти со страницы?") {
  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) => when && currentLocation.pathname !== nextLocation.pathname,
  )

  useEffect(() => {
    if (blocker.state !== "blocked") return
    if (window.confirm(message)) blocker.proceed()
    else blocker.reset()
  }, [blocker, message])

  useEffect(() => {
    if (!when) return
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }
    window.addEventListener("beforeunload", onBeforeUnload)
    return () => window.removeEventListener("beforeunload", onBeforeUnload)
  }, [when])
}
