import { Link } from "react-router"
import { PageMeta } from "@/components/PageMeta"
import { Grysha } from "@/components/mascot/Grysha"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <>
      <PageMeta title="Страница не найдена" />
      <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:py-24">
        <div className="w-48">
          <Grysha pose="think" />
        </div>
        <p className="mt-4 font-hand text-2xl text-coral-ink">Ошибка 404</p>
        <h1 className="mt-2 text-[clamp(2.2rem,6vw,3.6rem)] font-black">Такой страницы нет</h1>
        <p className="mt-3 max-w-md text-lg text-ink-soft">
          Наверное, её утащил в хатку какой-то бобр. Не я! Давайте вернёмся туда, где всё на месте.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/" className={buttonVariants({ size: "lg" })}>
            На главную
          </Link>
          <Link to="/detskaya-zona" className={cn(buttonVariants({ variant: "paper", size: "lg" }))}>
            В Детскую зону
          </Link>
        </div>
      </section>
    </>
  )
}
