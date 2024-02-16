import { GitHubLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { notFound } from "next/navigation"
import { YoutubeIcon } from "lucide-react"
import { Metadata, ResolvingMetadata } from "next"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Badge } from "@/01-shared/ui/Badge"
import { Button } from "@/01-shared/ui/Button"
import { Card, CardContent } from "@/01-shared/ui/Card"
import { Rating } from "@/01-shared/ui/Rating"
import { Title } from "@/01-shared/ui/Title"
import { prettyPrice, projectAPI } from "@/02-entities/project"
import { VoteButton } from "@/02-entities/project/ui/vote-button"
import { TagBadge } from "@/02-entities/tag"
import { SubmitReviewForm } from "@/03-features/submit-review"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { ReviewsList } from "@/04-widgets/reviews-list"
import { ScreensCarousel } from "@/04-widgets/screens-carousel"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = params.id
  const project = await projectAPI.getOneById(id)
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      url: `${process.env.APP_URL}/projects/${id}`,
      images: [project.logo, ...previousImages],
    },
  }
}

export const revalidate = 10

export default async function ProjectPage({ params }: PageProps) {
  const { id } = params
  const project = await projectAPI.getOneById(id)
  if (!project) {
    notFound()
  }

  const creatorInitials = getUserInitials(project.creator.full_name.surname, project.creator.full_name.name)

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      {project.screenshots.length > 0 ? (
        <ScreensCarousel className="absolute left-0 border-b-4 border-b-border" screens={project.screenshots} />
      ) : null}

      <div className={`${project.screenshots.length > 0 ? "mt-[488px]" : ""} py-12 space-y-12`}>
        <div className=" flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <Avatar className="w-20 h-20 text-3xl">
              <AvatarImage src={project.logo} width={80} height={80} alt={project.title} />
              <AvatarFallback>{project.title[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Title order={4}>{project.title}</Title>
              <span>{project.tagline}</span>
              <Rating defaultValue={project.rating} readOnly className="" />
            </div>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <VoteButton id={project._id} flames={project.flames} />
            <Button variant="default" asChild>
              <Link href={project.links.main} target="_blank">
                Посетить
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Title order={5}>Что такое {project.title}?</Title>
              <Card>
                <CardContent className="p-6">
                  <p>{project.description}</p>
                  {project.tags.length > 0 ? (
                    <div className="mt-4 flex flex-row items-center gap-2">
                      {project.tags.map((tag) => (
                        <TagBadge key={tag._id} tag={tag} />
                      ))}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2">
              <Title order={5}>Обзоры</Title>
              <div className="space-y-4">
                <SubmitReviewForm project_id={project._id} />
                <ReviewsList project_id={project._id} />
              </div>
            </div>
          </div>

          <Card className="order-first sm:order-last w-full sm:max-w-[210px] h-fit justify-self-end">
            <CardContent className="p-6 flex flex-row sm:flex-col sm:items-end justify-between gap-4 text-right">
              <div className="space-y-2">
                <Title order={6}>Ссылки</Title>
                <div className="flex flex-col sm:items-end gap-1">
                  {project.links.github ? (
                    <Badge variant="outline" className="w-fit" asChild>
                      <Link href={project.links.github} target="_blank">
                        <GitHubLogoIcon className="mr-1 h-4 w-4" />
                        Github
                      </Link>
                    </Badge>
                  ) : null}
                  {project.links.demo ? (
                    <Badge variant="outline" className="w-fit" asChild>
                      <Link href={project.links.demo} target="_blank">
                        <YoutubeIcon className="mr-1 h-4 w-4" />
                        Preview
                      </Link>
                    </Badge>
                  ) : null}
                </div>
              </div>
              <div className="space-y-2">
                <Title order={6}>Цена</Title>
                <Badge>{prettyPrice(project.price)}</Badge>
              </div>
              <div className="space-y-2">
                <Title order={6}>Автор</Title>
                <Avatar className="w-8 h-8 ml-auto text-sm" asChild>
                  <Link href={`/u/${project.creator._id}`}>
                    <AvatarImage src={project.creator.avatar} width={32} height={32} alt={project.creator.username} />
                    <AvatarFallback>{creatorInitials}</AvatarFallback>
                  </Link>
                </Avatar>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}
