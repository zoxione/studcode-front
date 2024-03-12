"use client"

import { ThumbsUpIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"
import { ReloadIcon } from "@radix-ui/react-icons"

import { useLikeOneReviewMutation } from "@/02-entities/reviews"
import { Button, ButtonProps } from "@/01-shared/ui/button"

interface LikeReviewButtonProps extends ButtonProps {
  reviewId: string
  likes: number
}

const LikeReviewButton = ({ reviewId, likes, children, ...props }: LikeReviewButtonProps) => {
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

  return (
    <Button onClick={handleLike} variant="ghost" size="none" className="p-1 gap-1" disabled={isLoading} {...props}>
      <ThumbsUpIcon className="h-4 w-4" />
      {isLoading ? <ReloadIcon className="h-3 w-3 animate-spin" /> : likes}
    </Button>
  )
}

export { LikeReviewButton }
