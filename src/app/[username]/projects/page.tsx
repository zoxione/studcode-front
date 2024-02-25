import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/lib/auth-options"
import { ProjectsList } from "@/04-widgets/projects-list"
import { userAPI } from "@/02-entities/user"

export default async function UserProjects({ params }: { params: { username: string } }) {
  const session = await getServerSession(authOptions)
  const user = await userAPI.getOne(params.username)

  return (
    <ProjectsList
      filter={{ creator_id: user._id, status: "published" }}
      projectCardProps={{ isEdit: session ? true : false }}
    />
  )
}
