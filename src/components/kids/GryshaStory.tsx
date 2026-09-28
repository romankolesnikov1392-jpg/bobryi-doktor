import { Reveal } from "@/components/Reveal"
import { Grysha } from "@/components/mascot/Grysha"
import { story } from "@/data/story"
import { toneSoft } from "@/lib/tone"
import { cn } from "@/lib/utils"

/* История талисмана — книжка из четырёх разворотов, главы идут «тропинкой» */
export function GryshaStory() {
  return (
    <ol className="relative space-y-8 sm:space-y-10">
      {/* пунктирная тропинка между главами */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-10 left-1/2 hidden w-40 -translate-x-1/2 md:block"
        viewBox="0 0 160 800"
        preserveAspectRatio="none"
      >
        <path
          d="M80 0 C 150 120 10 260 80 400 S 150 680 80 800"
          fill="none"
          stroke="var(--color-coral-deep)"
          strokeWidth="4"
          strokeDasharray="2 14"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {story.map((ch, i) => {
        const right = i % 2 === 1
        return (
          <Reveal
            as="li"
            key={ch.title}
            variant={right ? "tilt-r" : "tilt-l"}
            className={cn("relative md:w-[54%]", right && "md:ml-auto")}
          >
            <article
              className={cn(
                "flex items-center gap-4 rounded-[30px_26px_34px_24px] p-5 shadow-plush sm:gap-6 sm:p-6",
                toneSoft[ch.tone],
                right ? "rotate-1 flex-row-reverse text-right md:flex-row md:text-left" : "-rotate-1",
              )}
            >
              <div className="w-24 shrink-0 sm:w-32">
                <Grysha pose={ch.pose} animated={false} decorative />
              </div>
              <div>
                <p className="font-hand text-lg text-coral-ink">Глава {i + 1}</p>
                <h3 className="text-[22px] leading-tight font-black sm:text-2xl">{ch.title}</h3>
                <p className="mt-2 text-[16px] leading-relaxed">{ch.text}</p>
              </div>
            </article>
          </Reveal>
        )
      })}
    </ol>
  )
}
