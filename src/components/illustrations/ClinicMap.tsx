import { GryshaFace } from "@/components/mascot/Grysha"
import { cn } from "@/lib/utils"

/*
 * Нарисованная схема проезда. Реальную карту открываем по ссылке (Яндекс Карты),
 * чтобы не тянуть на страницу тяжёлый iframe и сторонние cookie.
 */
const INK = "var(--color-ink)"

export function ClinicMap({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-[30px_24px_34px_26px] bg-[#f6efe2] shadow-plush", className)}>
      <svg
        viewBox="0 0 600 380"
        className="block w-full"
        role="img"
        aria-label="Схема: клиника на улице Бобровой, 7; от остановки «Речной парк» 10 минут пешком через парк"
      >
        {/* парк */}
        <path
          d="M20 190 C 20 120 90 90 170 100 C 240 108 270 150 262 210 C 254 270 180 300 110 290 C 50 282 20 250 20 190 Z"
          fill="var(--color-mint-soft)"
        />
        {/* река */}
        <path
          d="M-10 330 C 90 300 170 350 280 320 C 390 290 470 340 610 300 L 610 390 L -10 390 Z"
          fill="var(--color-sky)"
        />
        <path
          d="M40 346 q20 -8 40 0 M320 330 q20 -8 40 0 M480 340 q18 -8 36 0"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* дороги */}
        <path d="M-10 70 H 610" stroke="#fff" strokeWidth="34" />
        <path d="M-10 70 H 610" stroke="#e8dcc8" strokeWidth="3" strokeDasharray="14 14" />
        <path d="M330 -10 V 300" stroke="#fff" strokeWidth="30" />
        <path d="M330 -10 V 300" stroke="#e8dcc8" strokeWidth="3" strokeDasharray="14 14" />
        {/* кварталы */}
        {[
          [380, 100, 90, 70],
          [490, 100, 90, 60],
          [380, 190, 70, 80],
          [20, 8, 110, 40],
          [150, 8, 150, 40],
          [360, 8, 100, 40],
          [490, 8, 100, 40],
        ].map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} rx="10" fill="#efe3cf" />
        ))}
        {/* деревья */}
        {[
          [70, 160],
          [110, 210],
          [180, 140],
          [210, 240],
          [60, 250],
          [150, 260],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <rect x={x - 3} y={y} width="6" height="14" rx="3" fill="var(--color-fur-dark)" />
            <circle cx={x} cy={y - 6} r="16" fill="var(--color-mint)" stroke={INK} strokeWidth="3" />
          </g>
        ))}
        {/* остановка */}
        <g transform="translate(160 94)">
          <rect x="-20" y="-24" width="40" height="30" rx="6" fill="var(--color-sun)" stroke={INK} strokeWidth="3" />
          <text
            x="0"
            y="-3"
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontWeight="900"
            fontSize="16"
            fill={INK}
          >
            А
          </text>
          <rect x="-2" y="6" width="4" height="20" fill={INK} />
        </g>
        {/* пеший маршрут */}
        <path
          d="M160 120 C 180 150 150 190 220 200 C 280 208 300 180 346 176 C 380 172 400 150 430 150"
          fill="none"
          stroke="var(--color-coral-deep)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="2 12"
        />
        {/* клиника */}
        <g transform="translate(410 100)">
          <rect x="0" y="34" width="84" height="56" rx="10" fill="var(--color-paper)" stroke={INK} strokeWidth="3.4" />
          <path
            d="M-8 40 L 42 6 L 92 40 Z"
            fill="var(--color-coral)"
            stroke={INK}
            strokeWidth="3.4"
            strokeLinejoin="round"
          />
          <rect x="32" y="58" width="20" height="32" rx="9" fill="var(--color-mint)" stroke={INK} strokeWidth="3" />
          <circle cx="16" cy="54" r="7" fill="var(--color-sky)" stroke={INK} strokeWidth="2.6" />
          <circle cx="68" cy="54" r="7" fill="var(--color-sky)" stroke={INK} strokeWidth="2.6" />
        </g>
        {/* подписи */}
        <g fontFamily="var(--font-sans)" fontWeight="800" fontSize="15" fill={INK}>
          <text x="236" y="75" textAnchor="middle">
            ул. Бобровая
          </text>
          <text x="342" y="290" transform="rotate(-90 342 290)">
            Речной проезд
          </text>
          <text x="34" y="124" fill="var(--color-mint-ink)">
            Речной парк
          </text>
        </g>
        <g fontFamily="var(--font-hand)" fontSize="20" fill="var(--color-coral-ink)">
          <text x="356" y="244" transform="rotate(-4 356 244)">
            10 минут пешком
          </text>
        </g>
      </svg>
      {/* метка с Грышей — HTML поверх, чтобы подпрыгивала через CSS */}
      <div className="motion-loop absolute top-[4%] left-[73%] w-[15%] min-w-14 animate-bob" aria-hidden="true">
        <div className="relative aspect-[1/1.25]">
          <svg viewBox="0 0 60 75" className="absolute inset-0 h-full w-full">
            <path
              d="M30 73 C 22 60 4 46 4 28 A 26 26 0 0 1 56 28 C 56 46 38 60 30 73 Z"
              fill="var(--color-coral)"
              stroke={INK}
              strokeWidth="3.4"
              strokeLinejoin="round"
            />
            <circle cx="30" cy="28" r="20" fill="var(--color-mint-soft)" stroke={INK} strokeWidth="3" />
          </svg>
          <div className="absolute top-[12%] left-[17%] w-[66%]">
            <GryshaFace />
          </div>
        </div>
      </div>
    </div>
  )
}
