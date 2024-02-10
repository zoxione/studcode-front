import { Project, ProjectLinks, ProjectPrice, ProjectStatus } from "../model/types"

type TimeFrameProject = "day" | "week" | "month" | "year" | "all"

interface GetAllProjectsFilter {
  page?: number
  limit?: number
  search?: string
  order?: keyof Project
  time_frame?: TimeFrameProject
  tag_slug?: string
  creator_id?: string
  status?: ProjectStatus
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

interface CreateProject {
  title: string
  tagline?: string
  status?: ProjectStatus
  description?: string
  links?: ProjectLinks
  logo?: string
  screenshots?: string[]
  price?: ProjectPrice
  tags?: string[]
  creator: string
}

export type { GetAllProjectsFilter, GetAllProjectsResponse, TimeFrameProject, CreateProject }
