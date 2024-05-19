import { getServerSession } from "next-auth"

import { authOptions } from "@/01-shared/lib/auth-options"
import { userAPI } from "@/02-entities/user"
import { TeamsList } from "@/04-widgets/teams-list"

interface PageProps {
  params: { username: string }
}

export default async function Page({ params }: PageProps) {
  const session = await getServerSession(authOptions)
  const user = await userAPI.getOne(params.username)
  const isOwner = session?.user._id === user._id

  return <TeamsList filter={{ member_id: user._id, member_role: "!invited" }} isEdit={isOwner} />
}
