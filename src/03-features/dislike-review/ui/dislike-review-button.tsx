"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { ThumbsDownIcon } from "lucide-react"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useDislikeReview } from "../lib/use-dislike-review"

interface DislikeReviewButtonProps extends ButtonProps {
  reviewId: string
  dislikes: number
}

const DislikeReviewButton = ({ reviewId, dislikes, ...props }: DislikeReviewButtonProps) => {
  const { handleDislike, isLoading } = useDislikeReview({ reviewId })

  return (
    <Button onClick={handleDislike} variant="ghost" size="none" className="p-1 gap-1" disabled={isLoading} {...props}>
      <ThumbsDownIcon className="h-4 w-4" />
      {isLoading ? <ReloadIcon className="h-3 w-3 animate-spin" /> : dislikes}
    </Button>
  )
}

export { DislikeReviewButton }
