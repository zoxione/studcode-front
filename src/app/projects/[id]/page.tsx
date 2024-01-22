import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Badge } from "@/01-shared/ui/Badge"
import { Button } from "@/01-shared/ui/Button"
import { Title } from "@/01-shared/ui/Title"
import { Project, projectsAPI } from "@/02-entities/project"
import { ApproveButton } from "@/02-entities/project/ui/approve-button"
import { TagBadge } from "@/02-entities/tags"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { ScreensCarousel } from "@/04-widgets/screens-carousel"
import { Flame } from "lucide-react"
import Image from "next/image"

async function getOneProject(id: string): Promise<Project> {
  const res = await fetch(`${process.env.API_URL}/v1/projects/${id}`, {
    method: "GET",
  })
  if (!res.ok) {
    throw new Error("[Failed] getOneProject")
  }
  return res.json()
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const { data: project, error } = await projectsAPI.getOneById(id)

  if (error) {
    return <div>{error}</div>
  }

  return (
    <Layout header={<Header />} footer={<Footer />} className="space-y-12">
      {project ? (
        <>
          <div className="flex flex-row items-center justify-between mt-8">
            <div className="flex flex-row items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={project.avatar} width={64} height={64} alt={project.title} />
                <AvatarFallback>{project.title[0]}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <Title order={4}>{project.title}</Title>
                <span>{project.tagline}</span>
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <Button variant="default" asChild>
                <a href={project.link.main} target="_blank">
                  Посетить
                </a>
              </Button>
              <ApproveButton project={project} />
            </div>
          </div>
          <div className="">
            <Title order={5}>Что такое {project.title}?</Title>
            <p>{project.description}</p>
            <div className="mt-4 flex flex-row items-center">
              {project.tags.map((tag) => (
                <TagBadge key={tag._id} tag={tag} />
              ))}
            </div>
          </div>
          <ScreensCarousel screens={project.screenshots} />
        </>
      ) : (
        <></>
      )}
    </Layout>
  )
}
