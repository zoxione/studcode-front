import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"

import { useLikeOneReviewMutation } from "@/02-entities/reviews"

interface useLikeReviewProps {
  reviewId: string
}

const useLikeReview = ({ reviewId }: useLikeReviewProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { mutateAsync: likeReviewAsync } = useLikeOneReviewMutation()

  const handleLike = async () => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await likeReviewAsync(reviewId)
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleLike,
    isLoading,
  }
}

export { useLikeReview }
