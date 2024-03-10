import { DeepPartial } from "@/01-shared/lib/deep-partial"
import { Team, TeamUserRole } from "../model/types"

interface GetAllTeamsFilter {
  page?: number
  limit?: number
  search?: string
  order?: keyof Team
  member_id?: string
}

interface GetAllTeamsResponse {
  filter: Required<GetAllTeamsFilter>
  info: {
    find_count: number
    total_count: number
    count_pages: number
  }
  results: Team[]
}

interface CreateTeam extends Pick<Team, "name" | "status" | "about"> {
  members: {
    user: string
    role: TeamUserRole
  }[]
}

interface UpdateTeam extends Omit<DeepPartial<Team>, "_id" | "created_at" | "updated_at"> {}

interface UpdateTeamMember {
  member: {
    user: string
    role: TeamUserRole
  }
  action: "add" | "remove"
}

interface TeamFiles {
  logo_file?: FileList
}

export type { GetAllTeamsFilter, GetAllTeamsResponse, CreateTeam, UpdateTeam, TeamFiles, UpdateTeamMember }
