import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import "./picker.css"
import Collage from "./hero/Collage"
import Storybook from "./hero/Storybook"
import Poster from "./hero/Poster"

/* Прототипы hero + маскота (скилл prototype). Только в dev: /prototypes/hero?v=1..3 */
const variants = [
  { name: "Стикерборд", Component: Collage },
  { name: "Книжка", Component: Storybook },
  { name: "Плакат", Component: Poster },
]

export default function HeroPrototypes() {
  const initial = Math.min(
    Math.max((parseInt(new URLSearchParams(location.search).get("v") ?? "1", 10) || 1) - 1, 0),
    variants.length - 1,
  )
  const [current, setCurrent] = useState(initial)
  const [mountKey, setMountKey] = useState(0)
  const [ready, setReady] = useState(false)
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([])
  const highlightRef = useRef<HTMLSpanElement>(null)

  const moveHighlight = useCallback(() => {
    const el = itemsRef.current[current]
    const hl = highlightRef.current
    if (!el || !hl) return
    hl.style.width = el.offsetWidth + "px"
    hl.style.transform = `translateX(${el.offsetLeft}px)`
  }, [current])

  useLayoutEffect(moveHighlight, [moveHighlight])

  useEffect(() => {
    const url = new URL(location.href)
    url.searchParams.set("v", String(current + 1))
    history.replaceState(null, "", url)
  }, [current])

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    window.addEventListener("resize", moveHighlight)
    return () => window.removeEventListener("resize", moveHighlight)
  }, [moveHighlight])

  const setActive = useCallback((i: number) => {
    if (i < 0 || i >= variants.length) return
    setCurrent(i)
    setMountKey((k) => k + 1)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable) return
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const num = parseInt(e.key, 10)
      if (num >= 1 && num <= variants.length) setActive(num - 1)
      else if (e.key === "ArrowRight") setActive((current + 1) % variants.length)
      else if (e.key === "ArrowLeft") setActive((current - 1 + variants.length) % variants.length)
      else if (e.key === "r" || e.key === "R") setMountKey((k) => k + 1)
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [current, setActive])

  const { Component } = variants[current]

  return (
    <>
      <div key={mountKey}>
        <Component />
      </div>
      <nav className="proto-picker" aria-label="Prototype variants" data-ready={ready ? "" : undefined}>
        <span className="proto-picker-highlight" aria-hidden="true" ref={highlightRef} />
        {variants.map((v, i) => (
          <button
            key={v.name}
            ref={(el) => {
              itemsRef.current[i] = el
            }}
            className="proto-picker-item"
            data-active={i === current ? "" : undefined}
            aria-current={i === current ? "true" : undefined}
            onClick={() => setActive(i)}
          >
            {v.name}
          </button>
        ))}
        <span className="proto-picker-divider" aria-hidden="true" />
        <button
          className="proto-picker-item proto-picker-replay"
          aria-label="Replay animation (R)"
          onClick={() => setMountKey((k) => k + 1)}
        >
          ↻
        </button>
      </nav>
    </>
  )
}
