import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"

import { useDislikeOneReviewMutation } from "@/02-entities/reviews"

interface useDislikeReviewProps {
  reviewId: string
}

const useDislikeReview = ({ reviewId }: useDislikeReviewProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { mutateAsync: dislikeReviewAsync } = useDislikeOneReviewMutation()

  const handleDislike = async () => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await dislikeReviewAsync(reviewId)
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleDislike,
    isLoading,
  }
}

export { useDislikeReview }
