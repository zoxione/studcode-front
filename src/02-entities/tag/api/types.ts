import { Tag } from "../model/types"

interface GetAllTagsFilter {
  page?: number
  limit?: number
  search?: string
}

interface GetAllTagsResponse {
  stats: {
    totalCount: number
  }
  data: Tag[]
}

export type { GetAllTagsFilter, GetAllTagsResponse }
