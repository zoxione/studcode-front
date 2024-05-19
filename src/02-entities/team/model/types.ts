import * as z from "zod"

import { User } from "@/02-entities/user"
import { teamSchema } from "./schema"

type TeamStatus = z.infer<typeof teamSchema>["status"]

type TeamUserRole = "owner" | "member" | "invited"

interface TeamMember {
  user: Pick<User, "_id" | "username" | "avatar" | "full_name" | "email" | "specializations">
  role: TeamUserRole
}

interface Team {
  _id: string
  name: string
  about: string
  status: TeamStatus
  logo: string
  slug: string
  members: TeamMember[]
  created_at: string
  updated_at: string
}

export type { Team, TeamStatus, TeamMember, TeamUserRole }
