import { Pencil1Icon } from "@radix-ui/react-icons"
import { Metadata, ResolvingMetadata } from "next"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { notFound } from "next/navigation"

import { authOptions } from "@/01-shared/lib/auth-options"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Badge } from "@/01-shared/ui/badge"
import { Button, buttonVariants } from "@/01-shared/ui/button"
import { Card, CardContent } from "@/01-shared/ui/card"
import { Rating } from "@/01-shared/ui/rating"
import { Title } from "@/01-shared/ui/title"
import { cn } from "@/01-shared/utils/cn"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"
import { getYouTubeId } from "@/01-shared/utils/get-youtube-id"
import { prettyPrice, projectAPI } from "@/02-entities/project"
import { TagBadge } from "@/02-entities/tag"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { LinksList } from "@/04-widgets/links-list"
import { ReviewsList } from "@/04-widgets/reviews-list"
import { ScreensCarousel } from "@/04-widgets/screens-carousel"
import { VoteProjectButton } from "@/03-features/vote-project"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
  const slug = params.slug
  const project = await projectAPI.getOne(slug)
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: project.title,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      url: `${process.env.APP_URL}/projects/${slug}`,
      images: [project.logo, ...previousImages],
    },
  }
}

export const revalidate = 60

export default async function Page({ params }: PageProps) {
  const { slug } = params
  const project = await projectAPI.getOne(slug)
  if (!project) {
    notFound()
  }

  const creatorInitials = getUserInitials(project.creator.full_name.surname, project.creator.full_name.name)
  const session = await getServerSession(authOptions)
  const isOwner = session?.user.username === project.creator.username

  const mainLink = project.links.find((link) => link.type === "main")
  const youtubeLink = project.links.find((link) => link.type === "youtube")
  const youtubeId = youtubeLink ? getYouTubeId(youtubeLink.url) : null

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      {project.screenshots.length > 0 ? (
        <ScreensCarousel className="absolute left-0 border-b-4 border-b-border w-full" screens={project.screenshots} />
      ) : null}

      <div className={`${project.screenshots.length > 0 ? "mt-[488px]" : ""} py-12 space-y-12`}>
        <div className=" flex flex-row items-center justify-between">
          <div className="flex flex-row items-center gap-4">
            <Avatar className="w-20 h-20 text-3xl rounded-md">
              <AvatarImage src={project.logo} width={80} height={80} alt={project.title} />
              <AvatarFallback>{project.title[0]}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Title order={4}>{project.title}</Title>
              <span>{project.tagline}</span>
              <Rating defaultValue={project.rating} readOnly className="" />
            </div>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <VoteProjectButton projectId={project._id} flames={project.flames} voted={project.voted} />
            {isOwner ? (
              <Link
                href={`/projects/${project.slug}/edit`}
                className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
              >
                <Pencil1Icon className="w-4 h-4" />
              </Link>
            ) : null}
            {mainLink ? (
              <Button variant="default" asChild>
                <Link href={mainLink.url} target="_blank">
                  Посетить
                </Link>
              </Button>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Title order={5}>Что такое {project.title}?</Title>
              <Card>
                <CardContent className="p-6">
                  <p className="whitespace-pre-line">{project.description}</p>
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
            {youtubeId ? (
              <div className="space-y-2">
                <Card>
                  <CardContent className="p-6">
                    <iframe
                      className="rounded-lg"
                      title={project.title}
                      width="100%"
                      height="340"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </CardContent>
                </Card>
              </div>
            ) : null}
            <div className="space-y-2">
              <Title order={5}>Обзоры</Title>
              <div className="space-y-4">
                <ReviewsList projectId={project._id} userId={session?.user._id} />
              </div>
            </div>
          </div>

          <Card className="order-first sm:order-last w-full sm:max-w-[210px] h-fit justify-self-end">
            <CardContent className="p-6 flex flex-row sm:flex-col sm:items-end justify-between gap-4 text-right">
              <div className="space-y-2">
                <Title order={6}>Ссылки</Title>
                <LinksList className="flex-col sm:items-end" links={project.links} />
              </div>
              <div className="space-y-2">
                <Title order={6}>Цена</Title>
                <Badge>{prettyPrice(project.price)}</Badge>
              </div>
              <div className="space-y-2">
                <Title order={6}>Авторы</Title>
                <Avatar className="w-8 h-8 ml-auto text-sm" asChild>
                  <Link href={`/${project.creator.username}`}>
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
