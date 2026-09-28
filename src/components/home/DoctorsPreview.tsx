import { Link } from "react-router"
import { Reveal } from "@/components/Reveal"
import { SectionHeading } from "@/components/SectionHeading"
import { DoctorPortrait } from "@/components/illustrations/DoctorPortrait"
import { IconArrowRight } from "@/components/icons"
import { doctors } from "@/data/doctors"
import { yearsLabel } from "@/lib/format"
import { cn } from "@/lib/utils"

const lift = ["lg:mt-0", "lg:mt-16", "lg:mt-6"]

export function DoctorsPreview() {
  const shown = doctors.slice(0, 3)
  const rest = doctors.length - shown.length
  return (
    <section className="relative overflow-hidden bg-lav-soft py-16 sm:py-24" aria-labelledby="doctors-title">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          id="doctors-title"
          eyebrow="Команда"
          title="Врачи, которых дети зовут по имени"
          lead="Каждый работает только с детьми. И у каждого есть свой способ договориться с пятилеткой."
        />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {shown.map((d, i) => (
            <Reveal as="li" key={d.id} variant="pop" delay={i * 70} className={lift[i]}>
              <Link to={`/vrachi#${d.id}`} className="group block rounded-[32px] outline-offset-4">
                <div className="mx-auto w-[74%] transition-transform duration-[240ms] ease-[var(--ease-spring)] group-hov:scale-[1.03] group-hov:-rotate-3">
                  <DoctorPortrait spec={d.portrait} />
                </div>
                <div className="relative -mt-6 rounded-[26px_24px_28px_22px] bg-paper px-5 pt-8 pb-5 text-center shadow-plush">
                  <h3 className="text-[20px] leading-tight font-black">{d.name}</h3>
                  <p className="mt-1 text-[15px] text-ink-soft">{d.role}</p>
                  <p className="mt-3 inline-block rounded-full bg-mint-soft px-3 py-1 text-[13.5px] font-extrabold">
                    Стаж {yearsLabel(d.experienceYears)}
                  </p>
                  <p className="mt-3 font-hand text-[18px] leading-snug text-lav-ink">
                    <span className="sr-only">Грыша говорит: </span>
                    {d.kidNote}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" variant="tilt-r" delay={210} className="self-start lg:mt-24">
            <Link
              to="/vrachi"
              className={cn(
                "group flex min-h-52 rotate-2 flex-col justify-between rounded-[30px] bg-ink p-6 text-cream shadow-plush transition-[rotate] duration-[240ms] ease-[var(--ease-spring)] hov:rotate-0",
              )}
            >
              <span className="font-display text-[26px] leading-tight font-black">
                И ещё {rest} {rest === 1 ? "специалист" : "специалиста"}:{" "}
                {doctors
                  .slice(3)
                  .map((d) => d.specialty)
                  .join(" и ")}
              </span>
              <span className="mt-6 inline-flex items-center gap-2 font-bold text-sun">
                Вся команда
                <IconArrowRight
                  size={20}
                  className="transition-transform duration-200 ease-out group-hov:translate-x-1"
                />
              </span>
            </Link>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}
