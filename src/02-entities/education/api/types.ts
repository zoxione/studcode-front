import { Education } from "../model/types"

interface GetAllEducationsFilter {
  page?: number
  limit?: number
  search?: string
  order?: keyof Education | `!${keyof Education}`
}

interface GetAllEducationsResponse {
  filter: Required<GetAllEducationsFilter>
  info: {
    find_count: number
    total_count: number
    count_pages: number
  }
  results: Education[]
}

export type { GetAllEducationsFilter, GetAllEducationsResponse }
