"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Trash } from "lucide-react"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useDeleteReview } from "../lib/use-delete-review"

interface DeleteReviewButtonProps extends ButtonProps {
  reviewId: string
}

const DeleteReviewButton = ({ reviewId, ...props }: DeleteReviewButtonProps) => {
  const { handleDelete, isLoading } = useDeleteReview({ reviewId })

  return (
    <Button onClick={handleDelete} variant="ghost" size="none" className="p-1 gap-1" disabled={isLoading} {...props}>
      {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : <Trash className="h-4 w-4" />}
    </Button>
  )
}

export { DeleteReviewButton }
