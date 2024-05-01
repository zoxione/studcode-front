import { Specialization } from "../model/types"
import { GetAllSpecializationsFilter, GetAllSpecializationsResponse } from "./types"

class SpecializationAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Получение всех специализаций
   */
  async getAll(filter: GetAllSpecializationsFilter): Promise<GetAllSpecializationsResponse> {
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
        tags: ["specializations"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get specializations: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одной специализации
   */
  async getOne(key: string): Promise<Specialization> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["specializations"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get one specialization: ${res.statusText}`)
    }

    return await res.json()
  }
}

export const specializationAPI = new SpecializationAPI(`${process.env.API_URL}/v1/specializations`)
