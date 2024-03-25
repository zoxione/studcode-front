import { Title } from "@/01-shared/ui/title"
import { tagAPI } from "@/02-entities/tag"
import { TagCard } from "@/02-entities/tag"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { HeaderPage } from "@/04-widgets/header-page"
import { Layout } from "@/04-widgets/layout"

export const revalidate = 60

export default async function Page() {
  const popularTags = await tagAPI.getAllPopular()
  const { results: allData } = await tagAPI.getAll({ limit: 1000 })
  const allTags = allData ? allData : []

  return (
    <Layout header={<Header />} footer={<Footer />} className="space-y-8 mb-8">
      <HeaderPage className="my-8" title="Теги" description="Более 300 различных тегов на сайте." />

      <div>
        <Title order={6} className="mb-2">
          Популярные
        </Title>
        <div className="grid grid-cols-auto-fit">
          {popularTags.length > 0 ? (
            popularTags.map((tag) => <TagCard key={tag._id} tag={tag} />)
          ) : (
            <span className="text-sm text-muted-foreground flex justify-center items-center text-center">
              {"(>_<)"} <br />
              Теги не найдены.
            </span>
          )}
        </div>
      </div>

      <div>
        <Title order={6} className="mb-2">
          Просмотреть все
        </Title>
        <div className="grid grid-cols-auto-fit">
          {allTags.length > 0 ? (
            allTags.map((tag) => <TagCard key={tag._id} tag={tag} />)
          ) : (
            <span className="text-sm text-muted-foreground flex justify-center items-center text-center">
              {"(>_<)"} <br />
              Теги не найдены.
            </span>
          )}
        </div>
      </div>
    </Layout>
  )
}
