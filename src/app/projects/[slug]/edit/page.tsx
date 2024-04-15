import { getServerSession } from "next-auth"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { authOptions } from "@/01-shared/lib/auth-options"
import { prettyStatus, projectAPI } from "@/02-entities/project"
import { EditProject } from "@/03-features/edit-project"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { HeaderSettingsPage } from "@/04-widgets/header-settings-page"
import { Layout } from "@/04-widgets/layout"

interface PageProps {
  params: { slug: string }
}

export default async function Page({ params }: PageProps) {
  const project = await projectAPI.getOne(params.slug)
  if (!project) {
    notFound()
  }

  const session = await getServerSession(authOptions)
  if (project.creator._id !== session?.user._id) {
    redirect("/denied")
  }

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <HeaderSettingsPage
        title={
          <Link
            href={`/projects/${project.slug}`}
            target="_blank"
            className="underline hover:text-primary duration-200"
          >
            {project.title}
          </Link>
        }
        description={`Статус: ${prettyStatus(project.status).toLowerCase()}`}
      />
      <EditProject projectId={project._id} />
    </Layout>
  )
}
