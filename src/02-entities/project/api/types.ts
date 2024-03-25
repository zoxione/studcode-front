import { DeepPartial } from "@/01-shared/lib/deep-partial"
import { Project, ProjectStatus } from "../model/types"

type TimeFrameProject = "day" | "week" | "month" | "year" | "all"

interface GetAllProjectsFilter {
  page?: number
  limit?: number
  search?: string
  order?: keyof Project | `!${keyof Project}`
  time_frame?: TimeFrameProject
  tag_slug?: string
  status?: ProjectStatus
  creator_id?: string
  team_id?: string
}

interface GetAllProjectsResponse {
  filter: Required<GetAllProjectsFilter>
  info: {
    find_count: number
    total_count: number
    count_pages: number
  }
  results: Project[]
}

interface CreateProject extends Pick<Project, "title"> {
  creator: string
}

interface UpdateProject extends Omit<DeepPartial<Project>, "_id" | "tags" | "creator" | "created_at" | "updated_at"> {
  tags?: string[]
}

interface ProjectFiles {
  logo_file?: FileList
  screenshots_files?: FileList[]
}

export type {
  GetAllProjectsFilter,
  GetAllProjectsResponse,
  TimeFrameProject,
  CreateProject,
  UpdateProject,
  ProjectFiles,
}
