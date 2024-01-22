import { getErrorMessage } from "@/01-shared/utils/get-error-message"
import { User } from "../model/types"
import { Account, GetAllUsersFilter, GetAllUsersResponse, SignIn, SignInResponse } from "./types"
import { ApiResponse } from "@/01-shared/api/types"

class UserAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async register(user: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const res = await fetch(`${this.baseUrl}/auth/register`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }

  async login(signIn: SignIn): Promise<ApiResponse<SignInResponse>> {
    try {
      const res = await fetch(`${this.baseUrl}/auth/login`, {
        method: "POST",
        body: JSON.stringify(signIn),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }

  async whoAmI(): Promise<ApiResponse<Account>> {
    try {
      const res = await fetch(`${this.baseUrl}/auth/whoami`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }

  async getAll({ page = 0, limit, search }: GetAllUsersFilter): Promise<ApiResponse<GetAllUsersResponse>> {
    try {
      let url = `${this.baseUrl}/users?page=${page}`
      url += limit ? `&limit=${limit}` : ""
      url += search ? `&search=${search}` : ""
      const res = await fetch(url, {
        method: "GET",
        next: { revalidate: 60 },
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }

  async getOneById(id: string): Promise<ApiResponse<User>> {
    try {
      const res = await fetch(`${this.baseUrl}/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }
}

export const userAPI = new UserAPI(`${process.env.API_URL}/v1`)
