import { notFound } from "next/navigation"

import { Title } from "@/01-shared/ui/Title"
import { DeleteProjectButton, prettyStatus, projectAPI } from "@/02-entities/project"
import { EditProjectForm } from "@/04-widgets/edit-project"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"
import { getServerSession } from "next-auth"
import { authOptions } from "@/01-shared/lib/auth-options"

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const { id } = params
  const project = await projectAPI.getOneById(id)
  if (!project) {
    notFound()
  }

  const session = await getServerSession(authOptions)
  if (project.creator._id !== session?.user._id) {
    notFound()
  }

  return (
    <Layout header={<Header />} footer={<Footer />} className="">
      <div className="my-8 flex flex-row justify-between items-center">
        <div>
          <Title order={4}>{project.title}</Title>
          <span className="text-muted-foreground text-sm">Статус: {prettyStatus(project.status)}</span>
        </div>
        <DeleteProjectButton id={project._id} />
      </div>
      <EditProjectForm project={project} />
    </Layout>
  )
}
