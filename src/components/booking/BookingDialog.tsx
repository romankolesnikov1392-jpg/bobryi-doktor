import { useEffect, useId, useRef, useState, type ReactNode } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Grysha, GryshaFace } from "@/components/mascot/Grysha"
import { IconAlert, IconArrowRight } from "@/components/icons"
import { Spinner } from "@/components/Spinner"
import { useBooking } from "@/store/booking"
import { categories, serviceById, servicesByCategory } from "@/data/services"
import {
  ageOptions,
  bookingDefaults,
  bookingSchema,
  formatPhone,
  maxISO,
  timeOptions,
  todayISO,
  type BookingValues,
} from "./bookingSchema"
import { cn } from "@/lib/utils"

const UNKNOWN_SERVICE = "consult"

const serviceItems: Record<string, string> = {
  [UNKNOWN_SERVICE]: "Пока не знаю — нужна консультация",
  ...Object.fromEntries(categories.flatMap((c) => servicesByCategory(c.id).map((s) => [s.id, s.name]))),
}
const ageItems = Object.fromEntries(ageOptions.map((a) => [a.value, a.label]))

export function BookingDialog() {
  const { open, setOpen, serviceId, comment } = useBooking()
  const [sent, setSent] = useState<BookingValues | null>(null)
  const [formKey, setFormKey] = useState(0)

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={(isOpen) => {
        // сбрасываем форму, только когда окно полностью закрылось
        if (!isOpen) {
          setSent(null)
          setFormKey((k) => k + 1)
        }
      }}
    >
      <DialogContent className="max-w-2xl" data-testid="booking-dialog">
        {sent ? (
          <BookingSuccess values={sent} onClose={() => setOpen(false)} />
        ) : (
          <BookingForm key={formKey} initialService={serviceId} initialComment={comment} onSent={setSent} />
        )}
      </DialogContent>
    </Dialog>
  )
}

function BookingForm({
  initialService,
  initialComment,
  onSent,
}: {
  initialService?: string
  initialComment?: string
  onSent: (v: BookingValues) => void
}) {
  const uid = useId()
  const id = (name: string) => `${uid}-${name}`
  const summaryRef = useRef<HTMLParagraphElement>(null)
  const { draft, saveDraft, clearDraft } = useBooking()
  const submitted = useRef(false)
  const [hasDraft, setHasDraft] = useState(
    () => !!draft && Object.entries(draft).some(([k, v]) => k !== "consent" && !!v),
  )

  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    // ошибки — после первой отправки, дальше обновляются на лету; без «прыжков» кнопки при blur
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      ...bookingDefaults,
      ...draft,
      service: initialService && serviceById(initialService) ? initialService : (draft?.service ?? ""),
      comment: initialComment ?? draft?.comment ?? "",
    },
  })

  // закрыли, не отправив, — сохраняем черновик (в памяти вкладки)
  useEffect(
    () => () => {
      if (!submitted.current) saveDraft(getValues())
    },
    [getValues, saveDraft],
  )

  const errorCount = Object.keys(errors).length

  const onSubmit = async (values: BookingValues) => {
    // Демо: имитируем отправку на сервер
    await new Promise((r) => setTimeout(r, 900))
    submitted.current = true
    clearDraft()
    onSent(values)
  }

  const describedBy = (name: keyof BookingValues, hint?: boolean) =>
    [hint ? id(`${name}-hint`) : null, errors[name] ? id(`${name}-error`) : null].filter(Boolean).join(" ") || undefined

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-describedby={id("demo-note")}>
      <div className="flex items-center gap-3 pr-12">
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-mint-soft shadow-plush-sm ring-4 ring-white">
          <GryshaFace pose="explain" className="w-[88%]" />
        </span>
        <div>
          <DialogTitle>Запись на приём</DialogTitle>
          <DialogDescription className="mt-1 text-[15px]">
            Оставьте заявку — администратор перезвонит и подберёт точное время.
          </DialogDescription>
        </div>
      </div>

      {hasDraft && (
        <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl bg-sky-soft px-4 py-2.5 text-[14.5px]">
          Мы сохранили то, что вы уже успели ввести.
          <button
            type="button"
            className="font-bold text-sky-ink underline decoration-2 underline-offset-4"
            onClick={() => {
              reset(bookingDefaults)
              clearDraft()
              setHasDraft(false)
            }}
          >
            Очистить форму
          </button>
        </p>
      )}

      {submitCount > 0 && errorCount > 0 && (
        <p
          ref={summaryRef}
          role="alert"
          className="mt-5 flex items-start gap-2 rounded-2xl bg-coral-soft px-4 py-3 text-[15px] font-semibold text-coral-ink"
        >
          <IconAlert size={20} className="mt-0.5" />
          Проверьте, пожалуйста, отмеченные поля — {errorCount === 1 ? "осталось одно" : `их ${errorCount}`}.
        </p>
      )}

      <div className="mt-6 grid gap-x-4 gap-y-5 sm:grid-cols-2">
        <FormField
          label="Имя ребёнка"
          htmlFor={id("childName")}
          error={errors.childName?.message}
          errorId={id("childName-error")}
        >
          <Input
            id={id("childName")}
            autoComplete="off"
            placeholder="Например, Соня…"
            aria-invalid={!!errors.childName}
            aria-describedby={describedBy("childName")}
            aria-required="true"
            {...register("childName")}
          />
        </FormField>

        <FormField
          label="Возраст ребёнка"
          labelId={id("childAge-label")}
          error={errors.childAge?.message}
          errorId={id("childAge-error")}
        >
          <Controller
            control={control}
            name="childAge"
            render={({ field }) => (
              <Select
                items={ageItems}
                value={field.value || null}
                onValueChange={(v) => field.onChange(v ?? "")}
                onOpenChange={(o) => !o && field.onBlur()}
              >
                <SelectTrigger
                  ref={field.ref}
                  aria-labelledby={id("childAge-label")}
                  aria-invalid={!!errors.childAge}
                  aria-describedby={describedBy("childAge")}
                  aria-required="true"
                >
                  <SelectValue placeholder="Выберите возраст" />
                </SelectTrigger>
                <SelectContent>
                  {ageOptions.map((a) => (
                    <SelectItem key={a.value} value={a.value}>
                      {a.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          label="Ваше имя"
          htmlFor={id("parentName")}
          error={errors.parentName?.message}
          errorId={id("parentName-error")}
        >
          <Input
            id={id("parentName")}
            autoComplete="name"
            placeholder="Как к вам обращаться…"
            aria-invalid={!!errors.parentName}
            aria-describedby={describedBy("parentName")}
            aria-required="true"
            {...register("parentName")}
          />
        </FormField>

        <FormField label="Телефон" htmlFor={id("phone")} error={errors.phone?.message} errorId={id("phone-error")}>
          <Controller
            control={control}
            name="phone"
            render={({ field }) => (
              <Input
                id={id("phone")}
                ref={field.ref}
                name={field.name}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+7 (900) 123-45-67"
                value={field.value}
                onBlur={field.onBlur}
                onChange={(e) => {
                  const next = e.target.value
                  const prevDigits = field.value.replace(/\D/g, "")
                  let digits = next.replace(/\D/g, "")
                  // стёрли скобку или дефис — стираем и цифру перед ним, иначе курсор «застревает»
                  if (next.length < field.value.length && digits === prevDigits) digits = digits.slice(0, -1)
                  field.onChange(digits.length <= 1 && next.length < field.value.length ? "" : formatPhone(digits))
                }}
                aria-invalid={!!errors.phone}
                aria-describedby={describedBy("phone")}
                aria-required="true"
              />
            )}
          />
        </FormField>

        <FormField
          className="sm:col-span-2"
          label="Услуга"
          labelId={id("service-label")}
          error={errors.service?.message}
          errorId={id("service-error")}
        >
          <Controller
            control={control}
            name="service"
            render={({ field }) => (
              <Select
                items={serviceItems}
                value={field.value || null}
                onValueChange={(v) => field.onChange(v ?? "")}
                onOpenChange={(o) => !o && field.onBlur()}
              >
                <SelectTrigger
                  ref={field.ref}
                  aria-labelledby={id("service-label")}
                  aria-invalid={!!errors.service}
                  aria-describedby={describedBy("service")}
                  aria-required="true"
                >
                  <SelectValue placeholder="Выберите услугу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UNKNOWN_SERVICE}>{serviceItems[UNKNOWN_SERVICE]}</SelectItem>
                  {categories.map((c) => (
                    <SelectGroup key={c.id}>
                      <SelectSeparator />
                      <SelectLabel>{c.title}</SelectLabel>
                      {servicesByCategory(c.id).map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          label="Удобная дата"
          htmlFor={id("date")}
          error={errors.date?.message}
          errorId={id("date-error")}
          hint="Точное время подтвердит администратор"
          hintId={id("date-hint")}
        >
          <Input
            id={id("date")}
            type="date"
            min={todayISO()}
            max={maxISO()}
            aria-invalid={!!errors.date}
            aria-describedby={describedBy("date", true)}
            aria-required="true"
            autoComplete="off"
            className="[&::-webkit-calendar-picker-indicator]:cursor-pointer"
            {...register("date")}
          />
        </FormField>

        <fieldset
          aria-describedby={errors.time ? id("time-error") : undefined}
          aria-invalid={!!errors.time}
          className="min-w-0"
        >
          <legend className="text-[15px] leading-snug font-bold">Удобное время</legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {timeOptions.map((t) => (
              <label key={t.value} className="group relative cursor-pointer">
                <input
                  type="radio"
                  value={t.value}
                  className="peer sr-only"
                  {...register("time", {
                    onChange: () => setValue("time", t.value, { shouldValidate: true }),
                  })}
                />
                <span
                  className={cn(
                    "flex h-12 flex-col items-center justify-center rounded-2xl border-2 border-ink/15 bg-paper text-center leading-none transition-[background-color,scale] duration-150 ease-out active:scale-[0.96]",
                    "peer-checked:border-ink peer-checked:bg-sun peer-focus-visible:border-ink peer-focus-visible:shadow-[0_0_0_4px_var(--color-sun)]",
                    errors.time && "border-destructive",
                  )}
                >
                  <span className="text-[15px] font-bold">{t.label}</span>
                  <span className="mt-0.5 text-xs text-ink-soft">{t.hint}</span>
                </span>
              </label>
            ))}
          </div>
          <FieldErrorText id={id("time-error")} message={errors.time?.message} />
        </fieldset>

        <FormField
          className="sm:col-span-2"
          label={
            <>
              Комментарий <span className="font-semibold text-ink-soft">— по желанию</span>
            </>
          }
          htmlFor={id("comment")}
          error={errors.comment?.message}
          errorId={id("comment-error")}
        >
          <Textarea
            id={id("comment")}
            placeholder="Что беспокоит, чего боится ребёнок, нужен ли тихий час или конкретный врач…"
            aria-invalid={!!errors.comment}
            aria-describedby={describedBy("comment")}
            autoComplete="off"
            {...register("comment")}
          />
        </FormField>

        <div className="sm:col-span-2">
          <Controller
            control={control}
            name="consent"
            render={({ field }) => (
              <div className="rounded-2xl bg-paper p-4 shadow-plush-sm">
                {/* чекбокс и подпись — одна зона нажатия */}
                <label className="flex cursor-pointer items-start gap-3 text-[15px] leading-snug font-bold">
                  <Checkbox
                    ref={field.ref}
                    checked={field.value}
                    onCheckedChange={(v) => {
                      field.onChange(v)
                      field.onBlur()
                    }}
                    aria-invalid={!!errors.consent}
                    aria-describedby={[id("consent-text"), errors.consent ? id("consent-error") : null]
                      .filter(Boolean)
                      .join(" ")}
                    aria-required="true"
                  />
                  <span className="pt-0.5">Согласен(на) на обработку персональных данных — моих и моего ребёнка</span>
                </label>
                <div className="pl-10 text-[15px] leading-snug">
                  <details className="mt-1 text-ink-soft" id={id("consent-text")}>
                    <summary className="w-fit cursor-pointer rounded font-semibold text-mint-ink underline decoration-2 underline-offset-4">
                      Что мы делаем с данными
                    </summary>
                    <p className="mt-2 text-[14.5px]">
                      Используем имя, возраст и контакты только чтобы связаться с вами и подготовить визит. Не передаём
                      третьим лицам, храним в защищённой медицинской системе и удаляем по вашему запросу. Сведения о
                      здоровье ребёнка — врачебная тайна (ст. 13 323-ФЗ).
                    </p>
                  </details>
                  <FieldErrorText id={id("consent-error")} message={errors.consent?.message} />
                </div>
              </div>
            )}
          />
        </div>
      </div>

      <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p id={id("demo-note")} className="order-2 text-[13.5px] text-ink-soft sm:order-1 sm:max-w-[48%]">
          Демо-версия: заявка никуда не отправляется.
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting} className="order-1 sm:order-2" aria-live="polite">
          {isSubmitting ? (
            <>
              <Spinner /> Отправляем…
            </>
          ) : (
            "Отправить заявку"
          )}
        </Button>
      </div>
    </form>
  )
}

function FormField({
  label,
  htmlFor,
  labelId,
  error,
  errorId,
  hint,
  hintId,
  className,
  children,
}: {
  label: ReactNode
  htmlFor?: string
  labelId?: string
  error?: string
  errorId: string
  hint?: string
  hintId?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label id={labelId} htmlFor={htmlFor} className="mb-2 block text-[15px] leading-snug font-bold">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-[13.5px] text-ink-soft">
          {hint}
        </p>
      )}
      <FieldErrorText id={errorId} message={error} />
    </div>
  )
}

function FieldErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-1.5 flex items-start gap-1.5 text-[14px] leading-snug font-semibold text-destructive">
      <IconAlert size={16} className="mt-0.5" />
      {message}
    </p>
  )
}

function BookingSuccess({ values, onClose }: { values: BookingValues; onClose: () => void }) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  const service = serviceItems[values.service] ?? "Консультация"
  const time = timeOptions.find((t) => t.value === values.time)
  const date = new Date(values.date + "T12:00:00").toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    weekday: "long",
  })

  return (
    <div role="status" data-testid="booking-success" className="text-center">
      <div className="mx-auto w-40 animate-[success-pop_600ms_var(--ease-spring)_both] motion-reduce:animate-none">
        <Grysha pose="happy" label="Грыша радуется: заявка отправлена" />
      </div>
      <DialogTitle
        ref={headingRef}
        tabIndex={-1}
        className="enter-rise mt-2 outline-none"
        style={{ "--d": "90ms" } as React.CSSProperties}
      >
        Заявка у нас, {values.parentName.split(" ")[0]}!
      </DialogTitle>
      <DialogDescription className="enter-rise mx-auto mt-3 max-w-md" style={{ "--d": "150ms" } as React.CSSProperties}>
        Администратор перезвонит на {values.phone} в течение 15 минут в рабочее время, чтобы подтвердить время. А{" "}
        {values.childName} пусть готовится знакомиться с Грышей — кресло-лифт уже ждёт.
      </DialogDescription>
      <dl
        className="enter-rise mx-auto mt-6 grid max-w-md gap-2 rounded-[22px] bg-paper p-4 text-left text-[15px] shadow-plush-sm"
        style={{ "--d": "210ms" } as React.CSSProperties}
      >
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">Услуга</dt>
          <dd className="text-right font-bold">{service}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-ink-soft">Когда удобно</dt>
          <dd className="text-right font-bold">
            {date}, {time?.label.toLowerCase()} ({time?.hint})
          </dd>
        </div>
      </dl>
      <div
        className="enter-rise mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row"
        style={{ "--d": "270ms" } as React.CSSProperties}
      >
        <Button size="lg" onClick={onClose}>
          Отлично, ждём звонка
        </Button>
        <Link
          to="/detskaya-zona"
          onClick={onClose}
          className="inline-flex items-center gap-1.5 font-bold text-mint-ink underline decoration-2 underline-offset-4"
        >
          А пока — в Детскую зону <IconArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
