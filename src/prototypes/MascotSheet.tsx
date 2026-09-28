import { Grysha, GryshaFace, type GryshaPose } from "@/components/mascot/Grysha"
import { CategoryArt } from "@/components/illustrations/CategoryArt"
import { TrustArt } from "@/components/illustrations/TrustArt"
import { DoctorPortrait } from "@/components/illustrations/DoctorPortrait"
import { FoodArt } from "@/components/illustrations/FoodArt"
import { ComicScene } from "@/components/illustrations/ComicScene"
import { ClinicMap } from "@/components/illustrations/ClinicMap"
import { categories } from "@/data/services"
import { trustPoints } from "@/data/trust"
import { doctors } from "@/data/doctors"
import { quiz } from "@/data/quiz"
import { visitSteps } from "@/data/visit"

/* Лист персонажа и иллюстраций — только для разработки (/prototypes/mascot) */
const poses: GryshaPose[] = ["greet", "explain", "happy", "cheer", "bye", "think"]

export default function MascotSheet() {
  return (
    <main className="min-h-screen space-y-10 bg-cream p-8">
      <div className="grid grid-cols-7 gap-4">
        {poses.map((p) => (
          <figure key={p} className="rounded-3xl bg-mint-soft p-4">
            <Grysha pose={p} animated={false} sticker />
            <figcaption className="mt-2 text-center font-display font-black">{p}</figcaption>
          </figure>
        ))}
        <figure className="rounded-3xl bg-white p-4">
          <Grysha pose="greet" animated={false} variant="line" />
          <div className="mx-auto mt-2 w-16">
            <GryshaFace />
          </div>
        </figure>
      </div>
      <div className="flex gap-6">
        {categories.map((c) => (
          <div key={c.id} className="w-28 rounded-3xl bg-paper p-3 shadow-plush-sm">
            <CategoryArt category={c.id} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-6">
        {trustPoints.map((t) => (
          <div key={t.art} className="rounded-3xl bg-paper p-3 shadow-plush-sm">
            <TrustArt art={t.art} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-6">
        {doctors.map((d) => (
          <DoctorPortrait key={d.id} spec={d.portrait} />
        ))}
      </div>
      <div className="grid grid-cols-10 gap-3">
        {quiz.map((q) => (
          <div key={q.id} className="rounded-2xl bg-paper p-2 shadow-plush-sm">
            <FoodArt id={q.id} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-6">
        {visitSteps.map((s) => (
          <ComicScene key={s.scene} scene={s.scene} className="rounded-3xl border-4 border-ink" />
        ))}
      </div>
      <div className="max-w-3xl">
        <ClinicMap />
      </div>
    </main>
  )
}
