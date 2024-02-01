import { Review } from "../model/types"

interface GetAllReviewsFilter {
  page?: number
  limit?: number
  search?: string
  order?: keyof Review
  project_id?: string
}

interface GetAllReviewsResponse {
  filter: Required<GetAllReviewsFilter>
  info: {
    find_count: number
    total_count: number
    count_pages: number
  }
  results: Review[]
}

interface CreateReview {
  text: string
  rating: number
  project: string
  reviewer: string
}

export type { GetAllReviewsFilter, GetAllReviewsResponse, CreateReview }
