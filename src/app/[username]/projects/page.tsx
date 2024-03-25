import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/lib/auth-options"
import { ProjectsList } from "@/04-widgets/projects-list"
import { userAPI } from "@/02-entities/user"

interface PageProps {
  params: { username: string }
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  const user = await userAPI.getOne(params.username)
  const isOwner = session?.user._id === user._id

  return <ProjectsList filter={{ creator_id: user._id, status: "published" }} isEdit={isOwner} />
}
