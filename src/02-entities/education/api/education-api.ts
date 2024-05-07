import { Education } from "../model/types"
import { GetAllEducationsFilter, GetAllEducationsResponse } from "./types"

class EducationAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Получение всех образовательных учреждений
   */
  async getAll(filter: GetAllEducationsFilter): Promise<GetAllEducationsResponse> {
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
        tags: ["educations"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get educations: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одного образовательного учреждения
   */
  async getOne(key: string): Promise<Education> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["educations"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get one education: ${res.statusText}`)
    }

    return await res.json()
  }
}

export const educationAPI = new EducationAPI(`${process.env.API_URL}/v1/educations`)
