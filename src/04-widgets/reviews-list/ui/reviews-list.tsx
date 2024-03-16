"use client"

import { Separator } from "@/01-shared/ui/separator"
import { ReviewCard, useGetAllReviewsQuery, useGetOneMyReviewQuery } from "@/02-entities/reviews"
import { CreateReviewForm } from "@/03-features/create-review"
import { DeleteReviewButton } from "@/03-features/delete-review"
import { DislikeReviewButton } from "@/03-features/dislike-review"
import { LikeReviewButton } from "@/03-features/like-review"

interface ReviewsListProps {
  projectId: string
  userId: string | undefined
}

const ReviewsList = ({ projectId, userId }: ReviewsListProps) => {
  const userFilter = userId ? [{ user_id: `!${userId}` }, { user_id: userId }] : [{}, {}]
  const { data: reviews } = useGetAllReviewsQuery({
    project_id: projectId,
    order: "created_at",
    ...userFilter[0],
  })
  const { data: userReviews } = useGetOneMyReviewQuery({
    project_id: projectId,
    ...userFilter[1],
    enabled: !!userId,
  })

  if (!reviews) {
    return null
  }
  const userReview = userReviews?.results.length === 1 ? userReviews.results[0] : undefined

  return (
    <>
      {userReview ? (
        <div className="flex flex-col gap-2">
          <ReviewCard
            review={userReview}
            actions={[
              <LikeReviewButton key="like" reviewId={userReview._id} likes={userReview.likes} />,
              <DislikeReviewButton key="dislike" reviewId={userReview._id} dislikes={userReview.dislikes} />,
              <DeleteReviewButton key="delete" reviewId={userReview._id} />,
            ]}
          />
          <Separator />
        </div>
      ) : (
        <CreateReviewForm projectId={projectId} />
      )}
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
