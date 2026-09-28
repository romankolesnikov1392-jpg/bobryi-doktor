import { useEffect, useRef, useState } from "react"
import NumberFlow from "@number-flow/react"
import { FoodArt } from "@/components/illustrations/FoodArt"
import { Grysha } from "@/components/mascot/Grysha"
import { Button } from "@/components/ui/button"
import { IconArrowRight, IconRefresh } from "@/components/icons"
import { quiz, quizVerdicts } from "@/data/quiz"
import { usePassport } from "@/store/passport"
import { cn } from "@/lib/utils"

type Answer = { good: boolean; correct: boolean }

export function FoodQuiz() {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [feedback, setFeedback] = useState<Answer | null>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const { addStars, earn } = usePassport()

  const done = answers.length === quiz.length && !feedback
  const score = answers.filter((a) => a.correct).length
  const item = quiz[Math.min(index, quiz.length - 1)]

  const answer = (good: boolean) => {
    if (feedback) return
    const a = { good, correct: good === item.good }
    setFeedback(a)
    setAnswers((prev) => [...prev, a])
  }

  useEffect(() => {
    if (feedback) nextRef.current?.focus()
  }, [feedback])

  const next = () => {
    setFeedback(null)
    setIndex((i) => i + 1)
  }

  useEffect(() => {
    if (!done) return
    addStars(1)
    if (score >= 8) earn("smart")
  }, [done, score, addStars, earn])

  const restart = () => {
    setIndex(0)
    setAnswers([])
    setFeedback(null)
  }

  if (done) {
    const verdict = quizVerdicts.find((v) => score >= v.min)!
    return (
      <div
        className="grid items-center gap-6 rounded-[36px] bg-paper p-6 text-center shadow-plush sm:grid-cols-[auto_1fr] sm:p-10 sm:text-left"
        role="status"
      >
        <div className="mx-auto w-40">
          <Grysha pose={score >= 8 ? "happy" : "cheer"} />
        </div>
        <div>
          <p className="font-hand text-2xl text-coral-ink">Результат</p>
          <p className="font-display text-5xl font-black">
            <NumberFlow value={score} /> из {quiz.length}
          </p>
          <p className="mt-2 font-display text-2xl font-black">{verdict.title}</p>
          <p className="mt-1 text-lg text-ink-soft">{verdict.text}</p>
          <p className="mt-2 text-[15px] text-ink-soft">
            +1 звезда в «Паспорт улыбки»{score >= 8 ? " и значок «Знаток»" : ""}.
          </p>
          <Button className="mt-5" variant="sun" onClick={restart}>
            <IconRefresh size={18} /> Сыграть ещё
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="grid items-start gap-6 md:grid-cols-12">
      <div className="md:col-span-7">
        {/* прогресс-точки */}
        <ol className="mb-4 flex flex-wrap gap-1.5" aria-label={`Вопрос ${index + 1} из ${quiz.length}`}>
          {quiz.map((q, i) => {
            const a = answers[i]
            return (
              <li
                key={q.id}
                className={cn(
                  "size-3.5 rounded-full border-2 border-ink/20 transition-colors duration-200",
                  a?.correct && "border-mint-deep bg-mint-deep",
                  a && !a.correct && "border-coral-deep bg-coral-deep",
                  !a && i === index && "border-ink bg-sun",
                )}
                aria-label={a ? (a.correct ? "верно" : "ошибка") : i === index ? "текущий" : "впереди"}
              />
            )
          })}
        </ol>

        <div
          key={item.id + (feedback ? (feedback.correct ? "-ok" : "-no") : "")}
          className={cn(
            "relative overflow-hidden rounded-[34px] bg-paper p-6 shadow-plush sm:p-8",
            !feedback && index > 0 && "animate-[bubble-in_220ms_var(--ease-out)]",
            feedback?.correct && "animate-[success-pop_420ms_var(--ease-spring)] motion-reduce:animate-none",
            feedback && !feedback.correct && "animate-[shake_420ms_var(--ease-out)] motion-reduce:animate-none",
          )}
        >
          <div className="flex items-center gap-5">
            <div className="w-28 shrink-0 sm:w-36">
              <FoodArt id={item.id} className="w-full" />
            </div>
            <div>
              <p className="text-[14px] font-bold text-ink-soft">
                Вопрос {index + 1} из {quiz.length}
              </p>
              <h3 className="mt-1 text-[clamp(1.6rem,4vw,2.3rem)] leading-tight font-black">{item.name}</h3>
              <p className="mt-1 text-[16px] text-ink-soft">Это полезно или вредно для зубов?</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <Button
              size="lg"
              variant="mint"
              onClick={() => answer(true)}
              disabled={!!feedback}
              aria-pressed={feedback?.good === true}
              className="text-lg"
            >
              Полезно
            </Button>
            <Button
              size="lg"
              variant="default"
              onClick={() => answer(false)}
              disabled={!!feedback}
              aria-pressed={feedback?.good === false}
              className="text-lg"
            >
              Вредно
            </Button>
          </div>

          {feedback && (
            <div className="mt-5 animate-[bubble-in_240ms_var(--ease-out)] rounded-[22px] bg-cream-2 p-4" role="status">
              <p
                className={cn("font-display text-xl font-black", feedback.correct ? "text-mint-ink" : "text-coral-ink")}
              >
                {feedback.correct ? "Верно!" : `Не совсем: это ${item.good ? "полезно" : "вредно"}.`}
              </p>
              <p className="mt-1 font-hand text-[19px] leading-snug">{item.why}</p>
              <Button ref={nextRef} className="mt-4" variant="sun" onClick={next}>
                {index + 1 < quiz.length ? "Дальше" : "Узнать результат"} <IconArrowRight size={18} />
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-end gap-3 md:col-span-5 md:flex-col md:items-center">
        <div className="w-32 shrink-0 sm:w-40 md:w-52">
          <Grysha pose={feedback ? (feedback.correct ? "happy" : "think") : "think"} />
        </div>
        <div className="mb-8 flex-1 rounded-[24px] bg-paper px-5 py-4 shadow-plush md:mb-0 md:w-full">
          <p className="text-[13px] font-extrabold tracking-[0.06em] text-ink-soft uppercase">Счёт</p>
          <p className="font-display text-4xl font-black">
            <NumberFlow value={score} />
            <span className="text-xl text-ink-soft"> / {quiz.length}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
