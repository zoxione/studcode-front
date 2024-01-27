import { Title } from "@/01-shared/ui/Title"
import { projectAPI } from "@/02-entities/project"
import { Tag, tagAPI } from "@/02-entities/tag"
import { SortProjects } from "@/03-features/sort-projects"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
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
  params,
  searchParams,
}: {
  params: { tagSlug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const tagSlug = params.tagSlug
  const { data: tag } = await tagAPI.getOneBySlug(tagSlug)
  const tagName = tag?.name?.ru !== "" ? tag?.name?.ru : tag?.name?.en
  if (tag === null) {
    notFound()
  }

  const searchParamsParsed = ParamsSchema.parse({
    order: searchParams?.order,
  })

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <div className="space-y-2 my-12">
        <Title order={3}>{tagName}</Title>
        <SortProjects order={searchParamsParsed.order} />
      </div>

      <ProjectsList tag_slug={tag.slug} />
    </Layout>
  )
}
