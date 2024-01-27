import { Project, ProjectLinks, ProjectPrice, ProjectStatus } from "../model/types"

type TimeFrameProject = "day" | "week" | "month" | "year"

interface GetAllProjectsFilter {
  page?: number
  limit?: number
  search?: string
  time_frame?: TimeFrameProject
  tag_slug?: string
  creator_id?: string
}

interface GetAllProjectsResponse {
  stats: {
    page: number
    limit: number
    search: string
    time_frame: TimeFrameProject
    find_count: number
    total_count: number
    count_pages: number
  }
  data: Project[]
}

interface CreateProject {
  title: string
  tagline: string
  status: ProjectStatus
  description: string
  flames: number
  links: ProjectLinks
  logo: string
  screenshots: string[]
  price: ProjectPrice
  tags: string[]
  creator: string
}

export type { GetAllProjectsFilter, GetAllProjectsResponse, TimeFrameProject, CreateProject }
