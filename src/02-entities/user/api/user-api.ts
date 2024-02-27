import { RecursivePartial } from "@/01-shared/utils/recursive-partial"

import { User } from "../model/types"

import { GetAllUsersFilter, GetAllUsersResponse, UserFiles } from "./types"

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
   * Получение одного пользователя по id/username/email
   */
  async getOne(key: string): Promise<User> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
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
  async updateOneById(id: string, user: RecursivePartial<User>): Promise<User> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(user),
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
   * Загрузка файлов пользователя по id
   */
  async uploadsOneById(user_id: string, files: UserFiles): Promise<User> {
    const formData = new FormData()
    if (files.avatar_file) {
      formData.append("avatar_file", files.avatar_file[0])
    }

    const res = await fetch(`${this.baseUrl}/${user_id}/uploads`, {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "application/json",
        // Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["users"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to uploads files user: ${res.statusText}`)
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
