import { User } from "../model/types"

interface GetAllUsersFilter {
  page?: number
  limit?: number
  search?: string
  order?: keyof User
}

interface GetAllUsersResponse {
  filter: Required<GetAllUsersFilter>
  info: {
    find_count: number
    total_count: number
    count_pages: number
  }
  results: User[]
}

export type { GetAllUsersFilter, GetAllUsersResponse }
