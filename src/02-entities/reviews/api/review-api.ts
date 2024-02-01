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
    })

    if (!res.ok) {
      throw new Error(`Failed to get reviews: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одного обзора по id
   */
  async getOneById(id: string): Promise<Review> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to get one review: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Обновление обзора по id
   */
  async updateOneById(id: string, project: Review): Promise<Review> {
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
      throw new Error(`Failed to update review: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Удаление обзора по id
   */
  async deleteOneById(id: string): Promise<Review> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to delete review: ${res.statusText}`)
    }

    return await res.json()
  }
}

export const reviewAPI = new ReviewAPI(`${process.env.API_URL}/v1/reviews`)
