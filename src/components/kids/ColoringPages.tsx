import { forwardRef, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { Grysha } from "@/components/mascot/Grysha"
import { Button, buttonVariants } from "@/components/ui/button"
import { IconDownload, IconPrinter } from "@/components/icons"
import { coloringPages, type ColoringPage } from "@/data/coloring"
import { usePassport } from "@/store/passport"
import { cn } from "@/lib/utils"

const LINE = "#1f1b18"

/* Лист A4 (595×842 pt): рамка, заголовок, линейный Грыша и предметы для раскрашивания */
export const ColoringSheet = forwardRef<SVGSVGElement, { page: ColoringPage; className?: string }>(
  function ColoringSheet({ page, className }, ref) {
    return (
      <svg
        ref={ref}
        viewBox="0 0 595 842"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label={`Раскраска: ${page.title}`}
      >
        <rect width="595" height="842" fill="#fff" />
        <rect x="22" y="22" width="551" height="798" rx="36" fill="none" stroke={LINE} strokeWidth="4" />
        <rect
          x="34"
          y="34"
          width="527"
          height="774"
          rx="28"
          fill="none"
          stroke={LINE}
          strokeWidth="1.5"
          strokeDasharray="2 8"
          strokeLinecap="round"
        />
        <text
          x="297.5"
          y="106"
          textAnchor="middle"
          fontFamily="Pangolin, 'Comic Sans MS', cursive"
          fontSize="46"
          fill="none"
          stroke={LINE}
          strokeWidth="2"
        >
          Раскрась Грышу!
        </text>
        <Scene kind={page.scene} />
        <Grysha
          pose={page.pose}
          variant="line"
          animated={false}
          decorative
          bare={{ x: 92, y: 178, width: 410, height: 495 }}
        />
        <text
          x="297.5"
          y="730"
          textAnchor="middle"
          fontFamily="Mulish, Arial, sans-serif"
          fontSize="18"
          fontWeight="700"
          fill={LINE}
        >
          {page.title}
        </text>
        <text x="60" y="778" fontFamily="Pangolin, 'Comic Sans MS', cursive" fontSize="18" fill={LINE}>
          Художник:
        </text>
        <path d="M150 780 H 330" stroke={LINE} strokeWidth="1.5" />
        <text x="535" y="778" textAnchor="end" fontFamily="Mulish, Arial, sans-serif" fontSize="12" fill={LINE}>
          «Бобрый доктор» · детская стоматология
        </text>
      </svg>
    )
  },
)

function Scene({ kind }: { kind: ColoringPage["scene"] }) {
  const common = {
    fill: "none",
    stroke: LINE,
    strokeWidth: 3,
    strokeLinejoin: "round" as const,
    strokeLinecap: "round" as const,
  }
  const star = (x: number, y: number, r: number, rot = 0) => (
    <path
      key={`${x}-${y}`}
      transform={`translate(${x} ${y}) rotate(${rot}) scale(${r / 20})`}
      d="M0 -20 L5.9 -8.1 L19 -6.2 L9.5 3.1 L11.8 16.2 L0 10 L-11.8 16.2 L-9.5 3.1 L-19 -6.2 L-5.9 -8.1 Z"
      {...common}
    />
  )
  switch (kind) {
    case "stars":
      return (
        <g>
          {[
            star(90, 190, 26, -10),
            star(500, 170, 32, 12),
            star(80, 560, 22, 8),
            star(520, 520, 26, -6),
            star(470, 660, 18),
            star(130, 660, 16, 20),
          ]}
        </g>
      )
    case "bubbles":
      return (
        <g>
          {[
            [90, 200, 26],
            [140, 260, 14],
            [505, 190, 34],
            [470, 260, 16],
            [520, 560, 22],
            [80, 600, 30],
            [120, 540, 12],
          ].map(([x, y, r]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r={r} {...common} />
              <path
                d={`M${x - r * 0.5} ${y - r * 0.2} q${r * 0.1} ${-r * 0.35} ${r * 0.45} ${-r * 0.35}`}
                {...common}
                strokeWidth={2}
              />
            </g>
          ))}
        </g>
      )
    case "balloons":
      return (
        <g>
          {[
            [100, 230, -8],
            [495, 200, 10],
            [520, 470, -4],
          ].map(([x, y, rot]) => (
            <g key={`${x}-${y}`} transform={`rotate(${rot} ${x} ${y})`}>
              <ellipse cx={x} cy={y} rx="38" ry="46" {...common} />
              <path d={`M${x - 6} ${y + 46} l6 8 l6 -8`} {...common} />
              <path
                d={`M${x} ${y + 54} C ${x - 20} ${y + 90} ${x + 20} ${y + 120} ${x} ${y + 160}`}
                {...common}
                strokeWidth={2}
              />
            </g>
          ))}
          {star(80, 600, 20, 10)}
        </g>
      )
    case "question":
      return (
        <g>
          {[
            [95, 220, 60],
            [500, 560, 44],
          ].map(([x, y, s]) => (
            <text
              key={x}
              x={x}
              y={y}
              textAnchor="middle"
              fontFamily="Nunito, Arial, sans-serif"
              fontWeight="900"
              fontSize={s * 2}
              {...common}
              strokeWidth={3}
            >
              ?
            </text>
          ))}
          {star(490, 200, 24, 8)}
          {star(90, 600, 18, -8)}
        </g>
      )
  }
}

function downloadSvg(svg: SVGSVGElement, filename: string) {
  const clone = svg.cloneNode(true) as SVGSVGElement
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg")
  clone.setAttribute("width", "595")
  clone.setAttribute("height", "842")
  clone.removeAttribute("class")
  const data = new XMLSerializer().serializeToString(clone)
  const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${data}`], { type: "image/svg+xml;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 2000)
}

export function ColoringPages() {
  const earn = usePassport((s) => s.earn)
  const [printing, setPrinting] = useState<ColoringPage | null>(null)

  // печать: рендерим лист в отдельный корень, печатаем, убираем
  useEffect(() => {
    if (!printing) return
    const done = () => setPrinting(null)
    window.addEventListener("afterprint", done, { once: true })
    const t = window.setTimeout(() => window.print(), 50)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener("afterprint", done)
    }
  }, [printing])

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {coloringPages.map((p, i) => (
          <ColoringCard
            key={p.id}
            page={p}
            index={i}
            onDownloaded={() => earn("artist")}
            onPrint={() => setPrinting(p)}
          />
        ))}
      </ul>
      {printing &&
        createPortal(
          <div className="print-root">
            <ColoringSheet page={printing} className="h-auto w-full" />
          </div>,
          document.body,
        )}
    </>
  )
}

function ColoringCard({
  page,
  index,
  onDownloaded,
  onPrint,
}: {
  page: ColoringPage
  index: number
  onDownloaded: () => void
  onPrint: () => void
}) {
  const svgRef = useRef<SVGSVGElement>(null)
  const tilt = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2"][index % 4]
  return (
    <li className="flex flex-col">
      <figure
        className={cn(
          "overflow-hidden rounded-[18px] bg-white p-2 shadow-plush transition-[rotate,translate] duration-[240ms] ease-[var(--ease-spring)] hov:-translate-y-1 hov:rotate-0",
          tilt,
        )}
      >
        <ColoringSheet ref={svgRef} page={page} className="block h-auto w-full" />
        <figcaption className="sr-only">{page.title}</figcaption>
      </figure>
      <p className="mt-4 font-display text-lg leading-tight font-black">{page.title}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {page.file ? (
          <a
            href={page.file}
            download
            className={buttonVariants({ variant: "mint", size: "sm" })}
            onClick={onDownloaded}
          >
            <IconDownload size={18} /> Скачать
          </a>
        ) : (
          <Button
            variant="mint"
            size="sm"
            onClick={() => {
              if (svgRef.current) downloadSvg(svgRef.current, `raskraska-grysha-${page.id}.svg`)
              onDownloaded()
            }}
          >
            <IconDownload size={18} /> Скачать<span className="sr-only"> раскраску «{page.title}»</span>
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onPrint}>
          <IconPrinter size={18} /> Распечатать<span className="sr-only"> раскраску «{page.title}»</span>
        </Button>
      </div>
    </li>
  )
}
