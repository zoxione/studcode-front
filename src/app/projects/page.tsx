import Link from "next/link"

import { buttonVariants } from "@/01-shared/ui/button"
import { cn } from "@/01-shared/utils/cn"
import { tagAPI } from "@/02-entities/tag"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { HeaderPage } from "@/04-widgets/header-page"
import { Layout } from "@/04-widgets/layout"
import { ProjectsCarousel } from "@/04-widgets/projects-carousel"

interface PageProps {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export const revalidate = 60

export default async function Page({}: PageProps) {
  const popularTags = (await tagAPI.getAllPopular()).slice(0, 5)

  return (
    <Layout header={<Header />} footer={<Footer />} className="space-y-8 pb-8">
      <HeaderPage className="my-8" title="Проекты" description="Проекты самых популярных тегов." />
      <ProjectsCarousel label="Лучшие проекты за все время" filter={{ order: "!flames" }} />
      {popularTags.length > 0 ? (
        popularTags.map((tag) => <ProjectsCarousel key={tag._id} label={tag.name} filter={{ tag_slug: tag.slug }} />)
      ) : (
        <span className="text-sm text-muted-foreground flex justify-center items-center text-center">
          {"(>_<)"} <br />
          Проекты не найдены.
        </span>
      )}
      <Link href="/tags" className={cn(buttonVariants({ variant: "secondary" }), "w-full")}>
        Посмотреть все
      </Link>
    </Layout>
  )
}
