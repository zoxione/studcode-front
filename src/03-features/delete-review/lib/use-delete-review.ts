import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"

import { useDeleteOneReviewMutation } from "@/02-entities/reviews"

interface useDeleteReviewProps {
  reviewId: string
}

const useDeleteReview = ({ reviewId }: useDeleteReviewProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session } = useSession()
  const { mutateAsync: deleteReviewAsync } = useDeleteOneReviewMutation()

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      if (!session) {
        toast.error("Вы не авторизованы")
        return
      }
      await deleteReviewAsync(reviewId)
      toast.success("Отзыв удален")
    } catch (error) {
      toast.error("Произошла ошибка")
    } finally {
      setIsLoading(false)
    }
  }

  return {
    handleDelete,
    isLoading,
  }
}

export { useDeleteReview }
