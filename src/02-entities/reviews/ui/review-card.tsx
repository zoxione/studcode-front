import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { HTMLAttributes, forwardRef } from "react"

import { Review } from "../model/types"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Card, CardContent } from "@/01-shared/ui/Card"
import { Rating } from "@/01-shared/ui/Rating"
import { Title } from "@/01-shared/ui/Title"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"
import { normalizeDate } from "@/01-shared/utils/normalize-date"

export interface ReviewCardProps extends HTMLAttributes<HTMLAnchorElement> {
  review: Review
}

const ReviewCard = forwardRef<HTMLAnchorElement, ReviewCardProps>(({ review, className }, ref) => {
  const reviewerInitials = getUserInitials(
    review.reviewer?.full_name.surname || "",
    review.reviewer?.full_name.name || "",
    review.reviewer?.full_name.patronymic || "",
  )

  return (
    <Card>
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-row items-center gap-2 ">
          <Avatar className="w-10 h-10">
            <AvatarImage src={review.reviewer.avatar} width={40} height={40} alt={review.reviewer.username} />
            <AvatarFallback>{reviewerInitials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Title
              order={6}
            >{`${review.reviewer.full_name.surname} ${review.reviewer.full_name.name} ${review.reviewer.full_name.patronymic}`}</Title>
            <span className="text-muted-foreground leading-4">@{review.reviewer.username}</span>
          </div>
          <Rating defaultValue={review.rating} readOnly className="ml-auto mb-auto" />
        </div>
        <p>{review.text}</p>
        <div className="flex flex-row items-center gap-4">
          <span className="flex flex-row items-center gap-1">
            <PlusIcon className="h-4 w-4" />
            {review.likes.length}
          </span>
          <span className="flex flex-row items-center gap-1">
            <MinusIcon className="h-4 w-4" />
            {review.dislikes.length}
          </span>
          <span className="ml-auto text-muted-foreground">{normalizeDate(review.created_at)}</span>
        </div>
      </CardContent>
    </Card>
  )
})
ReviewCard.displayName = "ReviewCard"

export { ReviewCard }