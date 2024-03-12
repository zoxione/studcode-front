"use client"

import { ReviewCard, useGetAllReviewsQuery } from "@/02-entities/reviews"
import { DislikeReviewButton } from "@/03-features/dislike-review"
import { LikeReviewButton } from "@/03-features/like-review"

interface ReviewsListProps {
  project_id: string
}

const ReviewsList = ({ project_id }: ReviewsListProps) => {
  const { data: reviews } = useGetAllReviewsQuery({ project_id: project_id, order: "created_at" })

  if (!reviews) {
    return null
  }

  return (
    <>
      {reviews.results.map((review) => (
        <ReviewCard
          key={review._id}
          review={review}
          actions={[
            <LikeReviewButton key="like" reviewId={review._id} likes={review.likes} />,
            <DislikeReviewButton key="dislike" reviewId={review._id} dislikes={review.dislikes} />,
          ]}
        />
      ))}
    </>
  )
}

export { ReviewsList }
