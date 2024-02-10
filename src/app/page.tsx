import { z } from "zod"

import { Title } from "@/01-shared/ui/Title"
import { normalizeTimeFrame } from "@/01-shared/utils/normalize-time-frame"
import { TagBadge, tagAPI } from "@/02-entities/tag"
import { TimeFrameProjects } from "@/03-features/time-frame-projects"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Hero } from "@/04-widgets/hero"
import { Layout } from "@/04-widgets/layout"
import { ProjectsDraftsList } from "@/04-widgets/projects-drafts-list"
import { ProjectsList } from "@/04-widgets/projects-list"
import { getSession } from "@/03-features/auth"

const allowedValues = {
  timeFrame: ["day", "week", "month", "year"],
} as const

const ParamsSchema = z.object({
  timeFrame: z.enum(allowedValues.timeFrame).catch(allowedValues.timeFrame[0]),
})

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const searchParamsParsed = ParamsSchema.parse({
    timeFrame: searchParams?.timeFrame,
  })
  const timeFrameNormalized = normalizeTimeFrame(searchParamsParsed.timeFrame)

  const { results: tags } = await tagAPI.getAll({ limit: 5 })

  const session = getSession()

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <Hero className="my-8" />

      <div className="mt-20 mb-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2">
          <TimeFrameProjects timeFrame={searchParamsParsed.timeFrame} />
          <Title order={4} className="mt-6 mb-4">
            Лучшие проекты за {timeFrameNormalized}
          </Title>
          <ProjectsList filter={{ time_frame: searchParamsParsed.timeFrame }} />
        </div>
        <div className="space-y-8">
          <div className="flex flex-col gap-4">
            <Title order={4}>Популярные теги</Title>
            {tags.map((tag) => (
              <TagBadge key={tag._id} tag={tag} />
            ))}
          </div>
          {session ? (
            <div className="flex flex-col gap-4">
              <Title order={4}>Ваши черновики</Title>
              <ProjectsDraftsList limit={5} creator_id={session.sub} />
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  )
}
