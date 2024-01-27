import { getErrorMessage } from "@/01-shared/utils/get-error-message"
import { Tag } from "../model/types"
import { GetAllTagsFilter, GetAllTagsResponse } from "./types"
import { ApiResponse } from "@/01-shared/api/types"

class TagAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async getAll({ page = 0, limit, search }: GetAllTagsFilter): Promise<ApiResponse<GetAllTagsResponse>> {
    try {
      let url = `${this.baseUrl}/tags?page=${page}`
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

  async getOneById(id: string): Promise<ApiResponse<Tag>> {
    try {
      const res = await fetch(`${this.baseUrl}/tags/${id}`, {
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

  async getOneBySlug(slug: string): Promise<ApiResponse<Tag>> {
    try {
      const res = await fetch(`${this.baseUrl}/tags/slug/${slug}`, {
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

export const tagAPI = new TagAPI(`${process.env.API_URL}/v1`)
