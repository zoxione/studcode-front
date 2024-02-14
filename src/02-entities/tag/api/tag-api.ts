import { Tag } from "../model/types"

import { GetAllTagsFilter, GetAllTagsResponse } from "./types"

class TagAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Создание нового тега
   */
  // async createOne(tag: CreateTag): Promise<Tag> {
  //   const res = await fetch(`${this.baseUrl}`, {
  //     method: "POST",
  //     body: JSON.stringify(tag),
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //     credentials: "include",
  //   })

  //   if (!res.ok) {
  //     throw new Error(`Failed to create tag: ${res.statusText}`)
  //   }

  //   return await res.json()
  // }

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
    })

    if (!res.ok) {
      throw new Error(`Failed to get tags: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одного тега по id
   */
  async getOneById(id: string): Promise<Tag> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to get one tag: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одного тега по slug
   */
  async getOneBySlug(slug: string): Promise<Tag> {
    const res = await fetch(`${this.baseUrl}/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to get one tag: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Обновление тега по id
   */
  async updateOneById(id: string, project: Tag): Promise<Tag> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to update tag: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Удаление тега по id
   */
  async deleteOneById(id: string): Promise<Tag> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to delete tag: ${res.statusText}`)
    }

    return await res.json()
  }
}

export const tagAPI = new TagAPI(`${process.env.API_URL}/v1/tags`)
