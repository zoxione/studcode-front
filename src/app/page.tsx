import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Hero } from "@/04-widgets/hero"
import { Layout } from "@/04-widgets/layout"
import { z } from "zod"

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
  // const searchParamsParsed = ParamsSchema.parse({
  //   timeFrame: searchParams?.timeFrame,
  // })

  // console.log(searchParamsParsed)

  // const { data, error } = await projectsAPI.getAll({ time_frame: searchParamsParsed.timeFrame })
  // const projects = data?.data ? data.data : []
  // console.log(projects.length)

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <Hero className="my-8" />
      {/* <div className="space-y-2 my-12">
        <TimeFrameProjects timeFrame={searchParamsParsed.timeFrame} />
        <Title order={4} className="mb-4">
          Лучшие проекты за месяц
        </Title>
      </div> */}

      {/* <ProjectsList initialProjects={projects} /> */}
    </Layout>
  )
}
