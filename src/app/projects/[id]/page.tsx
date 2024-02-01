import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { notFound } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Badge } from "@/01-shared/ui/Badge"
import { Button } from "@/01-shared/ui/Button"
import { Card, CardContent } from "@/01-shared/ui/Card"
import { Rating } from "@/01-shared/ui/Rating"
import { Title } from "@/01-shared/ui/Title"
import { projectAPI } from "@/02-entities/project"
import { VoteButton } from "@/02-entities/project/ui/vote-button"
import { TagBadge } from "@/02-entities/tag"
import { SubmitReviewForm } from "@/03-features/submit-review"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { ReviewsList } from "@/04-widgets/reviews-list"
import { ScreensCarousel } from "@/04-widgets/screens-carousel"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params
  const project = await projectAPI.getOneById(id)
  if (!project) {
    notFound()
  }

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
            <VoteButton project={project} />
            <Button variant="default" asChild>
              <a href={project.links.main} target="_blank">
                Посетить
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-8">
            <div className="space-y-4">
              <Title order={5}>Что такое {project.title}?</Title>
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
            </div>
            <div className="space-y-4">
              <Title order={5}>Обзоры</Title>
              <div className="space-y-4">
                <SubmitReviewForm project_id={project._id} />
                <ReviewsList project_id={project._id} />
              </div>
            </div>
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
