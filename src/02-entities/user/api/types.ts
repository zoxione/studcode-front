import { User } from "../model/types"

interface SignIn {
  email: string
  password: string
}

interface SignInResponse {
  access_token: string
  refresh_token: string
}

interface Account {
  sub: string
  username: string
  email: string
  avatar: string
  iat: number
  exp: number
}

interface LogoutResponse {
  message: string
}

interface RefreshResponse {
  access_token: string
  refresh_token: string
}

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

interface RegisterUser {
  username: string
  email: string
  password: string
}

export type {
  GetAllUsersFilter,
  GetAllUsersResponse,
  Account,
  SignIn,
  SignInResponse,
  LogoutResponse,
  RefreshResponse,
  RegisterUser,
}
