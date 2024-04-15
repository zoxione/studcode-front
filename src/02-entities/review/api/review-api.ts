import { Review } from "../model/types"
import { CreateReview, GetAllReviewsFilter, GetAllReviewsResponse } from "./types"

class ReviewAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Создание нового обзора
   */
  async createOne(review: CreateReview): Promise<Review> {
    const res = await fetch(`${this.baseUrl}`, {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["reviews"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to create review: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение всех обзоров
   */
  async getAll(filter: GetAllReviewsFilter): Promise<GetAllReviewsResponse> {
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
        tags: ["reviews"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get reviews: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одного обзора
   */
  async getOne(key: string): Promise<Review> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["reviews"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get one review: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Обновление обзора
   */
  async updateOne(key: string, project: Review): Promise<Review> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["reviews"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to update review: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Удаление обзора
   */
  async deleteOne(key: string): Promise<Review> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["reviews"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to delete review: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Лайк обзора
   */
  async likeOne(key: string): Promise<Review> {
    const res = await fetch(`${this.baseUrl}/${key}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["reviews"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to like review: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Дизлайк обзора
   */
  async dislikeOne(key: string): Promise<Review> {
    const res = await fetch(`${this.baseUrl}/${key}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["reviews"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to dislike review: ${res.statusText}`)
    }

    return await res.json()
  }
}

export const reviewAPI = new ReviewAPI(`${process.env.API_URL}/v1/reviews`)
