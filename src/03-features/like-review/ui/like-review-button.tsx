"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { ThumbsUpIcon } from "lucide-react"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useLikeReview } from "../lib/use-like-review"

interface LikeReviewButtonProps extends ButtonProps {
  reviewId: string
  likes: number
}

const LikeReviewButton = ({ reviewId, likes, ...props }: LikeReviewButtonProps) => {
  const { handleLike, isLoading } = useLikeReview({ reviewId })

  return (
    <Button onClick={handleLike} variant="ghost" size="none" className="p-1 gap-1" disabled={isLoading} {...props}>
      <ThumbsUpIcon className="h-4 w-4" />
      {isLoading ? <ReloadIcon className="h-3 w-3 animate-spin" /> : likes}
    </Button>
  )
}

export { LikeReviewButton }
