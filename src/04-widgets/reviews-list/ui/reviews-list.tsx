"use client"

import { ReviewCard, useGetAllReviewsQuery } from "@/02-entities/reviews"

interface ReviewsListProps {
  project_id: string
}

const ReviewsList = ({ project_id }: ReviewsListProps) => {
  const { data: reviews } = useGetAllReviewsQuery({ project_id: project_id })

  if (!reviews) {
    return null
  }

  return (
    <>
      {reviews.results.map((review) => (
        <ReviewCard key={review._id} review={review} />
      ))}
    </>
  )
}

export { ReviewsList }
