"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { ThumbsDownIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { toast } from "sonner"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useDislikeOneReviewMutation } from "@/02-entities/reviews"

interface DislikeReviewButtonProps extends ButtonProps {
  reviewId: string
  dislikes: number
}

const DislikeReviewButton = ({ reviewId, dislikes, children, ...props }: DislikeReviewButtonProps) => {
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

  return (
    <Button onClick={handleDislike} variant="ghost" size="none" className="p-1 gap-1" disabled={isLoading} {...props}>
      <ThumbsDownIcon className="h-4 w-4" />
      {isLoading ? <ReloadIcon className="h-3 w-3 animate-spin" /> : dislikes}
    </Button>
  )
}

export { DislikeReviewButton }
