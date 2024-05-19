import { DeepPartial } from "@/01-shared/lib/deep-partial"
import { Team, TeamUserRole } from "../model/types"

interface GetAllTeamsFilter {
  page?: number
  limit?: number
  search?: string
  order?: keyof Team | `!${keyof Team}`
  member_id?: string
  member_role?: TeamUserRole | `!${TeamUserRole}`
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

interface GetOneTeamsFilter {
  member_role?: TeamUserRole | `!${TeamUserRole}`
}

interface CreateTeam extends Pick<Team, "name" | "status" | "about"> {
  members: {
    user: string
    role: TeamUserRole
  }[]
}

interface UpdateTeam extends Omit<DeepPartial<Team>, "_id" | "created_at" | "updated_at"> {}

interface AddTeamMember {
  action: "add"
  member: {
    user: string
    role: TeamUserRole
  }
}

interface RemoveTeamMember {
  action: "remove"
  member: {
    user: string
  }
}

type UpdateTeamMember = AddTeamMember | RemoveTeamMember

interface TeamFiles {
  logo_file?: FileList
}

interface TeamFilesResponse {
  logo_file: Blob | null
}

export type {
  GetOneTeamsFilter,
  GetAllTeamsFilter,
  GetAllTeamsResponse,
  CreateTeam,
  UpdateTeam,
  TeamFiles,
  UpdateTeamMember,
  TeamFilesResponse,
}
