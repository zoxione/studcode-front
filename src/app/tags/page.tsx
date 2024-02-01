import { Title } from "@/01-shared/ui/Title"
import { tagAPI } from "@/02-entities/tag"
import { TagCard } from "@/02-entities/tag"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { HeaderPage } from "@/04-widgets/header-page"
import { Layout } from "@/04-widgets/layout"

export default async function Tags() {
  const { results: popularData } = await tagAPI.getAll({})
  const { results: allData } = await tagAPI.getAll({ limit: 1000 })
  const popularTags = popularData ? popularData : []
  const allTags = allData ? allData : []

  return (
    <Layout header={<Header />} footer={<Footer />} className="space-y-8">
      <HeaderPage className="my-8" title="Теги" description="Просмотрите 20 620 проектов по 470 тегам" />

      <div>
        <Title order={6} className="mb-2">
          Популярные
        </Title>
        <div className="grid grid-cols-5">
          {popularTags.map((tag) => (
            <TagCard key={tag._id} tag={tag} />
          ))}
        </div>
      </div>

      <div>
        <Title order={6} className="mb-2">
          Просмотреть все
        </Title>
        <div className="grid grid-cols-5">
          {allTags.map((tag) => (
            <TagCard key={tag._id} tag={tag} />
          ))}
        </div>
      </div>
    </Layout>
  )
}
