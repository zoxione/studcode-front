import { userAPI } from "@/02-entities/user"
import { ProjectsList } from "@/04-widgets/projects-list"

interface PageProps {
  params: { username: string }
}

export default async function Page({ params }: PageProps) {
  const user = await userAPI.getOne(params.username)

  return <ProjectsList filter={{ creator_id: user._id, status: "draft" }} isEdit />
}
