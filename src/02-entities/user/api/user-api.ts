import { User } from "../model/types"
import { GetAllUsersFilter, GetAllUsersResponse, UpdateUser, UserFiles, UserFilesResponse } from "./types"

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
   * Получение одного пользователя
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
   * Обновление пользователя
   */
  async updateOne(key: string, user: UpdateUser): Promise<User> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
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
   * Удаление пользователя
   */
  // async deleteOne(key: string): Promise<User> {
  //   const res = await fetch(`${this.baseUrl}/${key}`, {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     credentials: "include",
  //     next: {
  //       tags: ["users"],
  //     },
  //   })

  //   if (!res.ok) {
  //     throw new Error(`Failed to delete user: ${res.statusText}`)
  //   }

  //   return await res.json()
  // }

  /**
   * Загрузка файлов пользователя
   */
  async uploadsOne(key: string, files: UserFiles): Promise<User> {
    const formData = new FormData()
    if (files.avatar_file) {
      formData.append("avatar_file", files.avatar_file[0])
    }
    if (files.cover_file) {
      formData.append("cover_file", files.cover_file[0])
    }

    const res = await fetch(`${this.baseUrl}/${key}/uploads`, {
      method: "POST",
      body: formData,
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
   * Получение файлов одного пользователя
   */
  async getOneFiles(key: string): Promise<UserFilesResponse> {
    const user = await this.getOne(key)
    let avatar_file: Blob | null = null
    let cover_file: Blob | null = null

    if (user.avatar !== "") {
      const res = await fetch(user.avatar, {
        method: "GET",
      })
      avatar_file = await res.blob()
    }
    if (user.cover !== "") {
      const res = await fetch(user.cover, {
        method: "GET",
      })
      cover_file = await res.blob()
    }

    return { avatar_file, cover_file }
  }
}

export const userAPI = new UserAPI(`${process.env.API_URL}/v1/users`)
