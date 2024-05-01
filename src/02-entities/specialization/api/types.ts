import { Specialization } from "../model/types"

interface GetAllSpecializationsFilter {
  page?: number
  limit?: number
  search?: string
  order?: keyof Specialization | `!${keyof Specialization}`
}

interface GetAllSpecializationsResponse {
  filter: Required<GetAllSpecializationsFilter>
  info: {
    find_count: number
    total_count: number
    count_pages: number
  }
  results: Specialization[]
}

export type { GetAllSpecializationsFilter, GetAllSpecializationsResponse }
