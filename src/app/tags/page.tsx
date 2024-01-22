import { Button } from "@/01-shared/ui/Button"
import { Title } from "@/01-shared/ui/Title"
import { TagBadge, tagAPI } from "@/02-entities/tag"
import { TagCard } from "@/02-entities/tag/ui/tag-card"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export default async function Tags() {
  const { data: popularData } = await tagAPI.getAll({})
  const { data: allData } = await tagAPI.getAll({ limit: 1000 })
  const popularTags = popularData?.data ? popularData.data : []
  const allTags = allData?.data ? allData.data : []

  return (
    <Layout header={<Header />} footer={<Footer />} className="space-y-12">
      <div className="flex flex-col gap-4 my-8">
        <Link href="/">
          <Button variant="link" size="none" className="text-foreground">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            На главную
          </Button>
        </Link>
        <div>
          <Title order={2}>Теги</Title>
          <span className="">Просмотрите 20 620 проектов по 470 тегам</span>
        </div>
      </div>

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
