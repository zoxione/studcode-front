import { Title } from "@/01-shared/ui/Title"
import { projectAPI } from "@/02-entities/project"
import { Tag, tagAPI } from "@/02-entities/tag"
import { SortProjects } from "@/03-features/sort-projects"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { HeaderPage } from "@/04-widgets/header-page"
import { Layout } from "@/04-widgets/layout"
import { ProjectsList } from "@/04-widgets/projects-list"
import { notFound } from "next/navigation"
import { z } from "zod"

const allowedValues = {
  order: ["votes", "alphabet"],
} as const

const ParamsSchema = z.object({
  order: z.enum(allowedValues.order).catch(allowedValues.order[0]),
})

export default async function Projects({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  let tag: Tag | null = null
  const tagId = searchParams?.tagId ? (searchParams.tagId as string) : ""
  if (tagId === "") {
    const { data: tags } = await tagAPI.getAll({})
    tag = tags?.data[0] !== undefined ? tags.data[0] : null
  } else {
    tag = (await tagAPI.getOneById(tagId)).data
  }
  if (tag === null) {
    notFound()
  }
  const tagName = tag?.name?.ru !== "" ? tag?.name?.ru : tag?.name?.en

  const searchParamsParsed = ParamsSchema.parse({
    order: searchParams?.order,
  })

  return (
    <Layout header={<Header />} footer={<Footer />} className="space-y-8">
      <HeaderPage
        className="my-8"
        title={tagName}
        description="Лучшие приложения для рабочей и личной продуктивности"
      />

      <SortProjects order={searchParamsParsed.order} />

      <ProjectsList tag_slug={tag.slug} />
    </Layout>
  )
}
