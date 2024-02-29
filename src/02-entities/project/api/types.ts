import { DeepPartial } from "react-hook-form"

import { Project, ProjectStatus } from "../model/types"

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

interface CreateProject extends Pick<Project, "title"> {
  creator: string
}

interface UpdateProject extends Omit<DeepPartial<Project>, "_id" | "tags" | "creator" | "created_at" | "updated_at"> {
  tags?: string[]
}

interface ProjectFiles {
  logo_file?: FileList
  screenshots_files?: FileList
}

export type {
  GetAllProjectsFilter,
  GetAllProjectsResponse,
  TimeFrameProject,
  CreateProject,
  UpdateProject,
  ProjectFiles,
}
