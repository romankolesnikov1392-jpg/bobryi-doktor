import { lazy, Suspense } from "react"
import { createBrowserRouter, type RouteObject } from "react-router"
import { Layout } from "@/components/layout/Layout"
import Home from "@/pages/Home"

const Services = lazy(() => import("@/pages/Services"))
const FirstVisit = lazy(() => import("@/pages/FirstVisit"))
const Doctors = lazy(() => import("@/pages/Doctors"))
const KidsZone = lazy(() => import("@/pages/KidsZone"))
const Parents = lazy(() => import("@/pages/Parents"))
const ArticlePage = lazy(() => import("@/pages/Article"))
const Prices = lazy(() => import("@/pages/Prices"))
const Contacts = lazy(() => import("@/pages/Contacts"))
const NotFound = lazy(() => import("@/pages/NotFound"))

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "uslugi", element: <Services /> },
      { path: "pervyj-vizit", element: <FirstVisit /> },
      { path: "vrachi", element: <Doctors /> },
      { path: "detskaya-zona", element: <KidsZone /> },
      { path: "roditelyam", element: <Parents /> },
      { path: "roditelyam/:slug", element: <ArticlePage /> },
      { path: "ceny", element: <Prices /> },
      { path: "kontakty", element: <Contacts /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]

// Прототипы hero/маскота — только в режиме разработки, в прод-сборку не попадают
if (import.meta.env.DEV) {
  const HeroPrototypes = lazy(() => import("@/prototypes/HeroPrototypes"))
  const MascotSheet = lazy(() => import("@/prototypes/MascotSheet"))
  routes.unshift(
    {
      path: "/prototypes/hero",
      element: (
        <Suspense>
          <HeroPrototypes />
        </Suspense>
      ),
    },
    {
      path: "/prototypes/mascot",
      element: (
        <Suspense>
          <MascotSheet />
        </Suspense>
      ),
    },
  )
}

// basename = base из vite.config (на GitHub Pages сайт живёт в /bobryi-doktor/)
export const router = createBrowserRouter(routes, { basename: import.meta.env.BASE_URL.replace(/\/$/, "") || "/" })
