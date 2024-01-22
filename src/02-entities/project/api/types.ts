import { Project } from "../model/types"

type TimeFrameProject = "day" | "week" | "month" | "year"

interface GetAllProjectsFilter {
  page?: number
  limit?: number
  search?: string
  time_frame?: TimeFrameProject
}

interface GetAllProjectsResponse {
  stats: {
    totalCount: number
  }
  data: Project[]
}

export type { GetAllProjectsFilter, GetAllProjectsResponse, TimeFrameProject }
