import { DeepPartial } from "@/01-shared/lib/deep-partial"
import { User } from "../model/types"

interface GetAllUsersFilter {
  page?: number
  limit?: number
  search?: string
  order?: keyof User | `!${keyof User}`
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

interface UserFiles {
  avatar_file?: FileList
  cover_file?: FileList
}

interface UpdateUser extends Omit<DeepPartial<User>, "_id" | "specializations" | "created_at" | "updated_at"> {
  specializations?: string[]
}

export type { GetAllUsersFilter, GetAllUsersResponse, UpdateUser, UserFiles }
