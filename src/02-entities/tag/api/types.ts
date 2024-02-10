import { Tag } from "../model/types"

interface GetAllTagsFilter {
  page?: number
  limit?: number
  search?: string
  order?: keyof Tag | `name.${keyof Tag["name"]}`
}

interface GetAllTagsResponse {
  filter: Required<GetAllTagsFilter>
  info: {
    find_count: number
    total_count: number
    count_pages: number
  }
  results: Tag[]
}

export type { GetAllTagsFilter, GetAllTagsResponse }
