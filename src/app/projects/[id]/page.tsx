import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Badge } from "@/01-shared/ui/Badge"
import { Button } from "@/01-shared/ui/Button"
import { Card, CardContent, CardHeader } from "@/01-shared/ui/Card"
import { Rating } from "@/01-shared/ui/Rating"
import { Title } from "@/01-shared/ui/Title"
import { Project, projectAPI } from "@/02-entities/project"
import { ApproveButton } from "@/02-entities/project/ui/approve-button"
import { TagBadge } from "@/02-entities/tag"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { ScreensCarousel } from "@/04-widgets/screens-carousel"
import { GitHubLogoIcon, MinusIcon, PlusIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { notFound } from "next/navigation"

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
  const { data: project, error } = await projectAPI.getOneById(id)

  if (!project || error) {
    notFound()
  }

  console.log(project)

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      {project.screenshots.length > 0 ? (
        <ScreensCarousel className="absolute left-0 border-b-4 border-b-border" screens={project.screenshots} />
      ) : null}

      <div className={`${project.screenshots.length > 0 ? "mt-[488px]" : ""} py-12 space-y-12`}>
        <div className=" flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={project.logo} width={80} height={80} alt={project.title} />
              <AvatarFallback>{project.title[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Title order={4}>{project.title}</Title>
              <span>{project.tagline}</span>
              <Rating defaultValue={4} className="" />
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <ApproveButton project={project} />
            <Button variant="default" asChild>
              <a href={project.links.main} target="_blank">
                Посетить
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="">
            <Title order={5} className="mb-4">
              Что такое {project.title}?
            </Title>
            <Card>
              <CardContent className="p-6">
                <p>{project.description}</p>
                <div className="mt-4 flex flex-row items-center gap-4">
                  {project.tags.map((tag) => (
                    <TagBadge key={tag._id} tag={tag} />
                  ))}
                </div>
              </CardContent>
            </Card>
            <Title order={5} className="mt-8 mb-4">
              Обзоры
            </Title>
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex flex-row items-center gap-2 ">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={project.logo} width={40} height={40} alt={project.title} />
                    <AvatarFallback>{project.title[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <Title order={6}>Иван Васильевич Ломоносов</Title>
                    <span className="text-muted-foreground leading-4">@justbill</span>
                  </div>
                  <Rating defaultValue={4} className="ml-auto mb-auto" />
                </div>
                <p>{project.description}</p>
                <div className="flex flex-row items-center gap-4">
                  <span className="flex flex-row items-center gap-1">
                    <PlusIcon className="h-4 w-4" />
                    228
                  </span>
                  <span className="flex flex-row items-center gap-1">
                    <MinusIcon className="h-4 w-4" />
                    228
                  </span>
                  <span className="ml-auto text-muted-foreground">2 марта 2018</span>
                </div>
              </CardContent>
            </Card>
          </div>
          <Card className="order-first sm:order-last w-full sm:max-w-[180px] h-fit justify-self-end">
            <CardContent className="p-6 flex flex-col items-end gap-2">
              <Title order={6} className="">
                Ссылки
              </Title>
              <div className="flex flex-col gap-1">
                <Badge variant="outline" className="w-fit">
                  <GitHubLogoIcon className="mr-1 h-4 w-4" />
                  Github
                </Badge>
                <Badge variant="outline" className="w-fit">
                  <TwitterLogoIcon className="mr-1 h-4 w-4" />
                  Twitter
                </Badge>
              </div>
              <Title order={6} className="mt-2">
                Цена
              </Title>
              <Badge>Бесплатно</Badge>
              <Title order={6} className="mt-4">
                Автор
              </Title>
              <Link href={`/u/${project.creator._id}`}>
                <Avatar className="w-8 h-8">
                  <AvatarImage src={project.creator.avatar} width={32} height={32} alt={project.creator.username} />
                  <AvatarFallback>{project.creator.username[0]}</AvatarFallback>
                </Avatar>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
