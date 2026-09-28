/** React 19 сам поднимает <title> и <meta> в <head> */
export function PageMeta({ title, description }: { title: string; description?: string }) {
  const full = title === "Главная" ? "Бобрый доктор — детская стоматология" : `${title} — Бобрый доктор`
  return (
    <>
      <title>{full}</title>
      {description && <meta name="description" content={description} />}
    </>
  )
}
