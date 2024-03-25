import { notFound } from "next/navigation"
import { z } from "zod"

import { tagAPI } from "@/02-entities/tag"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { HeaderPage } from "@/04-widgets/header-page"
import { Layout } from "@/04-widgets/layout"
import { ProjectsList } from "@/04-widgets/projects-list"
import { SortProjectsSelect } from "@/03-features/sort-projects"

const allowedValues = {
  order: ["title", "flames"],
} as const

const ParamsSchema = z.object({
  order: z.enum(allowedValues.order).catch(allowedValues.order[0]),
})

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: PageProps) {
  let tag
  try {
    tag = await tagAPI.getOne(params.slug)
  } catch {
    notFound()
  }

  const searchParamsParsed = ParamsSchema.parse({
    order: searchParams?.order,
  })

  return (
    <Layout header={<Header />} footer={<Footer />} className="space-y-8">
      <HeaderPage className="my-8" title={tag.name} description={tag.description} />

      <SortProjectsSelect order={searchParamsParsed.order} />

      <ProjectsList filter={{ tag_slug: tag.slug, order: searchParamsParsed.order, status: "published" }} />
    </Layout>
  )
}
