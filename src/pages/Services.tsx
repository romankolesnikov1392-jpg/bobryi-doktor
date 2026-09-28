import { Link, useSearchParams } from "react-router"
import { PageMeta } from "@/components/PageMeta"
import { PageHero } from "@/components/PageHero"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { buttonVariants } from "@/components/ui/button"
import { CategoryArt } from "@/components/illustrations/CategoryArt"
import { ServiceCard } from "@/components/services/ServiceCard"
import { ServiceDialog } from "@/components/services/ServiceDialog"
import { Reveal } from "@/components/Reveal"
import { IconArrowRight } from "@/components/icons"
import { categories, servicesByCategory, type ServiceCategory } from "@/data/services"
import { toneInk, toneSoft } from "@/lib/tone"
import { cn } from "@/lib/utils"

type TabValue = ServiceCategory | "all"

export default function Services() {
  const [params, setParams] = useSearchParams()
  const raw = params.get("cat")
  const tab: TabValue = categories.some((c) => c.id === raw) ? (raw as ServiceCategory) : "all"
  // открытая услуга живёт в URL (?usluga=…): ссылкой можно поделиться, «назад» закрывает окно
  const openId = params.get("usluga")
  const setOpenId = (id: string | null) => {
    const next = new URLSearchParams(params)
    if (id) next.set("usluga", id)
    else next.delete("usluga")
    setParams(next, { replace: !id, preventScrollReset: true })
  }

  const panels: TabValue[] = ["all", ...categories.map((c) => c.id)]

  return (
    <>
      <PageMeta
        title="Услуги"
        description="Профилактика, лечение кариеса (в том числе в седации), детская ортодонтия, хирургия и экстренная помощь при травме зуба."
      />
      <PageHero
        crumb="Услуги"
        eyebrow="Что мы делаем"
        title="Всё для детских зубов — от первого осмотра до пластинки"
        lead="Нажмите на услугу, чтобы узнать, как она проходит, сколько длится и что обычно спрашивают родители."
        pose="explain"
        kid="Нажми на любую карточку — расскажу, что там будет. Без страшных слов!"
        tone="sky"
        blob={1}
      >
        <Link to="/ceny" className={cn(buttonVariants({ variant: "paper" }), "group")}>
          Полный прайс-лист
          <IconArrowRight size={20} className="transition-transform duration-200 ease-out group-hov:translate-x-1" />
        </Link>
      </PageHero>

      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6" aria-label="Каталог услуг">
        <Tabs
          value={tab}
          onValueChange={(v) => {
            const next = new URLSearchParams(params)
            if (v === "all") next.delete("cat")
            else next.set("cat", String(v))
            setParams(next, { replace: true, preventScrollReset: true })
          }}
        >
          <div className="-mx-4 [scrollbar-width:none] overflow-x-auto px-4 pt-1 pb-3 sm:mx-0 sm:px-0">
            <TabsList aria-label="Категории услуг">
              <TabsTrigger value="all">Все услуги</TabsTrigger>
              {categories.map((c) => (
                <TabsTrigger key={c.id} value={c.id}>
                  {c.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {panels.map((panel) => (
            <TabsContent key={panel} value={panel} className="mt-4 space-y-16 sm:space-y-20">
              {(panel === "all" ? categories : categories.filter((c) => c.id === panel)).map((c, ci) => (
                <div key={c.id} aria-labelledby={`cat-${c.id}`}>
                  <Reveal variant={ci % 2 ? "slide-r" : "slide-l"} className="flex items-center gap-4">
                    <span
                      className={cn(
                        "grid size-20 shrink-0 -rotate-3 place-items-center rounded-[24px] shadow-plush-sm sm:size-24",
                        toneSoft[c.tone],
                      )}
                    >
                      <CategoryArt category={c.id} className="w-[78%]" />
                    </span>
                    <div>
                      <p className={cn("font-hand text-xl leading-none", toneInk[c.tone])}>{c.kidTitle}</p>
                      <h2 id={`cat-${c.id}`} className="mt-1 text-[clamp(1.7rem,3.4vw,2.4rem)] font-black">
                        {c.title}
                      </h2>
                      <p className="mt-1 max-w-2xl text-[16px] text-ink-soft">{c.blurb}</p>
                    </div>
                  </Reveal>
                  <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {servicesByCategory(c.id).map((s, i) => (
                      <Reveal as="li" key={s.id} variant="pop" delay={(i % 3) * 60}>
                        <ServiceCard service={s} index={i + ci} onOpen={setOpenId} />
                      </Reveal>
                    ))}
                  </ul>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <ServiceDialog serviceId={openId} onClose={() => setOpenId(null)} />
    </>
  )
}
