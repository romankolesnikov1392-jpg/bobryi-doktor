import { PageMeta } from "@/components/PageMeta"
import { HomeHero } from "@/components/home/HomeHero"
import { TrustSection } from "@/components/home/TrustSection"
import { ServicesPreview } from "@/components/home/ServicesPreview"
import { VisitTeaser } from "@/components/home/VisitTeaser"
import { KidsTeaser } from "@/components/home/KidsTeaser"
import { Reviews } from "@/components/home/Reviews"
import { DoctorsPreview } from "@/components/home/DoctorsPreview"
import { FinalCta } from "@/components/home/FinalCta"

export default function Home() {
  return (
    <>
      <PageMeta
        title="Главная"
        description="Детская стоматология «Бобрый доктор»: сначала знакомимся, лечим — когда ребёнок готов. Только детские врачи, игровая, седация для тревожных детей."
      />
      <HomeHero />
      <TrustSection />
      <ServicesPreview />
      <VisitTeaser />
      <KidsTeaser />
      <Reviews />
      <DoctorsPreview />
      <FinalCta />
    </>
  )
}
