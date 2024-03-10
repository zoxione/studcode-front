import { z } from "zod"
import { getServerSession } from "next-auth"

import { Title } from "@/01-shared/ui/Title"
import { normalizeTimeFrame } from "@/01-shared/utils/normalize-time-frame"
import { TagBadge, tagAPI } from "@/02-entities/tag"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Hero } from "@/04-widgets/hero"
import { Layout } from "@/04-widgets/layout"
import { ProjectsDraftsList } from "@/04-widgets/projects-drafts-list"
import { ProjectsList } from "@/04-widgets/projects-list"
import { authOptions } from "@/01-shared/lib/auth-options"
import { ToggleTimeFrameProjectsTabs } from "@/03-features/toggle-time-frame-projects"

const allowedValues = {
  timeFrame: ["week", "month", "year"],
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

  const tags = await tagAPI.getAllPopular()

  const session = await getServerSession(authOptions)

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <Hero className="my-8" />

      <div className="mt-20 mb-8 grid grid-cols-1 lg:grid-cols-3 lg:gap-8">
        <div className="col-span-2">
          <ToggleTimeFrameProjectsTabs timeFrame={searchParamsParsed.timeFrame} />
          <Title order={4} className="mt-6 mb-4">
            Лучшие проекты за {timeFrameNormalized}
          </Title>
          <ProjectsList filter={{ time_frame: searchParamsParsed.timeFrame, status: "published" }} />
        </div>
        <div className="space-y-8">
          <div className="flex flex-col gap-4">
            <Title order={4}>Популярные теги</Title>
            {tags.length > 0 ? (
              tags.map((tag) => <TagBadge key={tag._id} tag={tag} />)
            ) : (
              <span className="text-sm text-muted-foreground flex justify-center items-center text-center">
                {"(='X'=)"} <br />
                Теги не найдены.
              </span>
            )}
          </div>
          {session ? (
            <div className="flex flex-col gap-4">
              <Title order={4}>Ваши черновики</Title>
              <ProjectsDraftsList limit={5} creator_id={session.user._id} />
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  )
}
