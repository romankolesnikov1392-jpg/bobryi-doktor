import { useEffect, useId, useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Grysha } from "@/components/mascot/Grysha"
import { IconAlert } from "@/components/icons"
import { Spinner } from "@/components/Spinner"
import { useLeaveGuard } from "@/hooks/useLeaveGuard"

const schema = z.object({
  name: z.string().trim().min(2, "Как к вам обращаться? Нужно хотя бы 2 буквы").max(60, "Слишком длинное имя"),
  contact: z
    .string()
    .trim()
    .min(1, "Оставьте телефон или e-mail — иначе не сможем ответить")
    .refine(
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.replace(/\D/g, "").length >= 10,
      "Похоже на опечатку: нужен телефон из 10–11 цифр или e-mail вида name@mail.ru",
    ),
  message: z
    .string()
    .trim()
    .min(10, "Напишите чуть подробнее — хотя бы 10 символов")
    .max(1000, "Не больше 1000 символов"),
  consent: z.boolean().refine((v) => v, "Нужно согласие на обработку персональных данных"),
})
type Values = z.infer<typeof schema>

export function FeedbackForm() {
  const uid = useId()
  const id = (n: string) => `${uid}-${n}`
  const [sentTo, setSentTo] = useState<string | null>(null)
  const doneRef = useRef<HTMLHeadingElement>(null)
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    // ошибки — после первой отправки, дальше обновляются на лету; без «прыжков» кнопки при blur
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: { name: "", contact: "", message: "", consent: false },
  })

  useEffect(() => {
    if (sentTo) doneRef.current?.focus()
  }, [sentTo])

  useLeaveGuard(isDirty && !sentTo && !isSubmitting)

  if (sentTo) {
    return (
      <div
        role="status"
        data-testid="feedback-success"
        className="flex flex-col items-center gap-3 rounded-[30px] bg-paper p-8 text-center shadow-plush"
      >
        <div className="w-32">
          <Grysha pose="happy" decorative />
        </div>
        <h3 ref={doneRef} tabIndex={-1} className="text-2xl font-black outline-none">
          Сообщение у нас!
        </h3>
        <p className="max-w-sm text-ink-soft">
          Ответим на {sentTo} в течение рабочего дня. Если вопрос срочный — лучше позвоните.
        </p>
        <Button
          variant="paper"
          onClick={() => {
            reset()
            setSentTo(null)
          }}
        >
          Написать ещё
        </Button>
      </div>
    )
  }

  const err = (name: keyof Values) =>
    errors[name] ? (
      <p
        id={id(`${name}-error`)}
        className="mt-1.5 flex items-start gap-1.5 text-[14px] font-semibold text-destructive"
      >
        <IconAlert size={16} className="mt-0.5" /> {errors[name]?.message}
      </p>
    ) : null

  return (
    <form
      noValidate
      onSubmit={handleSubmit(async (v) => {
        await new Promise((r) => setTimeout(r, 700))
        setSentTo(v.contact)
      })}
      className="rounded-[30px_26px_34px_24px] bg-paper p-6 shadow-plush sm:p-8"
      aria-describedby={id("note")}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={id("name")} className="mb-2 block text-[15px] font-bold">
            Имя
          </label>
          <Input
            id={id("name")}
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? id("name-error") : undefined}
            aria-required="true"
            {...register("name")}
          />
          {err("name")}
        </div>
        <div>
          <label htmlFor={id("contact")} className="mb-2 block text-[15px] font-bold">
            Телефон или e-mail
          </label>
          <Input
            id={id("contact")}
            autoComplete="email"
            spellCheck={false}
            placeholder="+7 900 123-45-67 или name@mail.ru…"
            aria-invalid={!!errors.contact}
            aria-describedby={errors.contact ? id("contact-error") : undefined}
            aria-required="true"
            {...register("contact")}
          />
          {err("contact")}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id("message")} className="mb-2 block text-[15px] font-bold">
            Сообщение
          </label>
          <Textarea
            id={id("message")}
            placeholder="Вопрос, отзыв или пожелание…"
            autoComplete="off"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? id("message-error") : undefined}
            aria-required="true"
            {...register("message")}
          />
          {err("message")}
        </div>
        <div className="sm:col-span-2">
          <Controller
            control={control}
            name="consent"
            render={({ field }) => (
              <div>
                <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug font-bold">
                  <Checkbox
                    ref={field.ref}
                    checked={field.value}
                    onCheckedChange={(v) => {
                      field.onChange(v)
                      field.onBlur()
                    }}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? id("consent-error") : undefined}
                    aria-required="true"
                  />
                  <span className="pt-0.5">Согласен(на) на обработку персональных данных</span>
                </label>
                <div className="pl-10">{err("consent")}</div>
              </div>
            )}
          />
        </div>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id={id("note")} className="order-2 text-[13.5px] text-ink-soft sm:order-1">
          Демо: сообщение никуда не отправляется.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="order-1 sm:order-2">
          {isSubmitting ? (
            <>
              <Spinner /> Отправляем…
            </>
          ) : (
            "Отправить"
          )}
        </Button>
      </div>
    </form>
  )
}
