import { Tag } from "../model/types"
import { GetAllTagsFilter, GetAllTagsResponse } from "./types"

class TagAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Получение всех тегов
   */
  async getAll(filter: GetAllTagsFilter): Promise<GetAllTagsResponse> {
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
        tags: ["tags"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get tags: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение всех популярных тегов
   */
  async getAllPopular(): Promise<Tag[]> {
    const res = await fetch(`${this.baseUrl}/popular`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["tags"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get popular tags: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одного тега
   */
  async getOne(key: string): Promise<Tag> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["tags"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get one tag: ${res.statusText}`)
    }

    return await res.json()
  }
}

export const tagAPI = new TagAPI(`${process.env.API_URL}/v1/tags`)
