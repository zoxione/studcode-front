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

interface UpdateUser
  extends Omit<DeepPartial<User>, "_id" | "specializations" | "education" | "created_at" | "updated_at"> {
  specializations?: string[]
  education?: string | null
}

interface UserFiles {
  avatar_file?: FileList
  cover_file?: FileList
}

interface UserFilesResponse {
  avatar_file: Blob | null
  cover_file: Blob | null
}

export type { GetAllUsersFilter, GetAllUsersResponse, UpdateUser, UserFiles, UserFilesResponse }
