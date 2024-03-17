import { userAPI } from "@/02-entities/user"
import { ProjectsList } from "@/04-widgets/projects-list"

export default async function UserDrafts({ params }: { params: { username: string } }) {
  const user = await userAPI.getOne(params.username)

  return <ProjectsList filter={{ creator_id: user._id, status: "draft" }} isEdit />
}
