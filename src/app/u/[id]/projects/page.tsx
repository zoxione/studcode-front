import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/lib/auth-options"
import { ProjectsList } from "@/04-widgets/projects-list"

export default async function UserProjects({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)

  return (
    <ProjectsList
      filter={{ creator_id: params.id, status: "published" }}
      projectCardProps={{ isEdit: session ? true : false }}
    />
  )
}
