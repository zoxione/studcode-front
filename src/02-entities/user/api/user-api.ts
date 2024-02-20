import { RecursivePartial } from "@/01-shared/utils/recursive-partial"

import { User } from "../model/types"

import { GetAllUsersFilter, GetAllUsersResponse } from "./types"

class UserAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Получение всех пользователей
   */
  async getAll(filter: GetAllUsersFilter): Promise<GetAllUsersResponse> {
    const url = new URL(`${this.baseUrl}`)
    for (const [key, value] of Object.entries(filter)) {
      if (value) {
        url.searchParams.append(key, value)
      }
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["users"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get users: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одного пользователя по id
   */
  async getOneById(id: string): Promise<User> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["users"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get one user: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Обновление пользователя по id
   */
  async updateOneById(id: string, project: RecursivePartial<User>): Promise<User> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["users"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to update user: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Удаление пользователя по id
   */
  async deleteOneById(id: string): Promise<User> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["users"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to delete user: ${res.statusText}`)
    }

    return await res.json()
  }
}

export const userAPI = new UserAPI(`${process.env.API_URL}/v1/users`)
