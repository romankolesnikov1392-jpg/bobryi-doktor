import { Link, useParams } from "react-router"
import { PageMeta } from "@/components/PageMeta"
import { Grysha } from "@/components/mascot/Grysha"
import { Button } from "@/components/ui/button"
import { IconArrowRight, IconClock, IconSparkle } from "@/components/icons"
import { articleBySlug, articles, type ArticleBlock } from "@/data/articles"
import { useBooking } from "@/store/booking"
import { toneSoft } from "@/lib/tone"
import { cn } from "@/lib/utils"
import NotFound from "./NotFound"

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return <p className="mt-5 text-[18px] leading-[1.7]">{block.text}</p>
    case "h":
      return <h2 className="mt-10 text-[clamp(1.5rem,3vw,2rem)] font-black">{block.text}</h2>
    case "list":
      return (
        <ul className="mt-5 space-y-2.5">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3 text-[18px] leading-[1.6]">
              <span aria-hidden="true" className="mt-2.5 size-2.5 shrink-0 rotate-45 rounded-[3px] bg-coral" />
              {it}
            </li>
          ))}
        </ul>
      )
    case "tip":
      return (
        <aside className="my-8 -rotate-[0.6deg] rounded-[6px_22px_10px_24px] bg-sun-soft px-6 py-5 shadow-plush-sm">
          <p className="flex items-center gap-2 font-display font-black">
            <IconSparkle size={20} className="text-sun-deep" /> Совет
          </p>
          <p className="mt-1 text-[17px] leading-relaxed">{block.text}</p>
        </aside>
      )
  }
}

export default function ArticlePage() {
  const { slug = "" } = useParams()
  const article = articleBySlug(slug)
  const openBooking = useBooking((s) => s.openBooking)
  if (!article) return <NotFound />
  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 2)

  return (
    <>
      <PageMeta title={article.title} description={article.lead} />
      <article className="mx-auto max-w-3xl px-4 pt-8 pb-10 sm:px-6 sm:pt-12" aria-labelledby="article-title">
        <nav aria-label="Хлебные крошки" className="text-[14px] font-semibold text-ink-soft">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link to="/" className="underline decoration-ink/25 decoration-2 underline-offset-4">
                Главная
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to="/roditelyam" className="underline decoration-ink/25 decoration-2 underline-offset-4">
                Родителям
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="line-clamp-1">
              {article.title}
            </li>
          </ol>
        </nav>
        <header className={cn("mt-6 rounded-[34px_28px_38px_26px] p-6 shadow-plush sm:p-9", toneSoft[article.tone])}>
          <p className="flex items-center gap-1.5 text-[14px] font-bold text-ink-soft">
            <IconClock size={16} /> {article.readMinutes} мин чтения
          </p>
          <h1 id="article-title" className="mt-3 text-[clamp(2rem,5vw,3.2rem)] leading-[1.06] font-black">
            {article.title}
          </h1>
          <p className="mt-4 text-lg text-ink-soft sm:text-xl">{article.lead}</p>
        </header>
        <div className="mt-4 px-1">
          {article.body.map((b, i) => (
            <Block key={i} block={b} />
          ))}
        </div>
        <p className="mt-10 rounded-2xl bg-paper px-5 py-4 text-[14.5px] text-ink-soft shadow-plush-sm">
          Статья носит справочный характер и не заменяет очную консультацию врача.
        </p>

        <div className="mt-10 flex flex-col items-center gap-5 rounded-[30px] bg-mint p-6 text-center shadow-plush sm:flex-row sm:text-left">
          <div className="w-28 shrink-0">
            <Grysha pose="explain" decorative />
          </div>
          <div className="flex-1">
            <p className="font-display text-2xl leading-tight font-black">Остались вопросы?</p>
            <p className="mt-1">Задайте их врачу на первом визите — это 30–40 минут без бормашины.</p>
          </div>
          <Button variant="paper" onClick={() => openBooking({ serviceId: "first-visit" })}>
            Записаться
          </Button>
        </div>
      </article>

      <section className="mx-auto max-w-3xl px-4 sm:px-6" aria-labelledby="related-title">
        <h2 id="related-title" className="text-2xl font-black">
          Почитать ещё
        </h2>
        <ul className="mt-5 grid gap-4 sm:grid-cols-2">
          {related.map((a) => (
            <li key={a.slug}>
              <Link
                to={`/roditelyam/${a.slug}`}
                className={cn(
                  "group flex h-full flex-col justify-between gap-4 rounded-[26px] p-5 shadow-plush-sm",
                  toneSoft[a.tone],
                )}
              >
                <span className="font-display text-lg leading-tight font-black">{a.title}</span>
                <span className="inline-flex items-center gap-1.5 text-[15px] font-bold">
                  Читать{" "}
                  <IconArrowRight
                    size={18}
                    className="transition-transform duration-200 ease-out group-hov:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
