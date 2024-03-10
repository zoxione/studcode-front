import { UserFullName } from "@/02-entities/user"

type TeamStatus = "opened" | "closed"

type TeamUserRole = "owner" | "member"

interface TeamMember {
  user: {
    _id: string
    username: string
    avatar: string
    full_name: UserFullName
  }
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
