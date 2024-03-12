import { HTMLAttributes, ReactNode, forwardRef } from "react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Card, CardContent } from "@/01-shared/ui/card"
import { Rating } from "@/01-shared/ui/rating"
import { Title } from "@/01-shared/ui/title"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"
import { normalizeDate } from "@/01-shared/utils/normalize-date"
import { Review } from "../model/types"

export interface ReviewCardProps extends HTMLAttributes<HTMLDivElement> {
  review: Review
  actions?: ReactNode[]
}

const ReviewCard = forwardRef<HTMLDivElement, ReviewCardProps>(({ review, actions, className }, ref) => {
  const reviewerInitials = getUserInitials(review.reviewer?.full_name.surname, review.reviewer?.full_name.name)

  return (
    <Card ref={ref}>
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-row items-center gap-2 ">
          <Avatar className="w-10 h-10" asChild>
            <Link href={`/${review.reviewer.username}`}>
              <AvatarImage src={review.reviewer.avatar} width={40} height={40} alt={review.reviewer.username} />
              <AvatarFallback>{reviewerInitials}</AvatarFallback>
            </Link>
          </Avatar>
          <div className="flex flex-col">
            <Title
              order={6}
              className="line-clamp-1"
            >{`${review.reviewer.full_name.surname} ${review.reviewer.full_name.name} ${review.reviewer.full_name.patronymic}`}</Title>
            <span className="text-sm text-muted-foreground leading-4">@{review.reviewer.username}</span>
          </div>
          <Rating defaultValue={review.rating} readOnly className="ml-auto mb-auto" />
        </div>
        <p>{review.text}</p>
        <div className="flex flex-row items-center gap-2 text-muted-foreground text-sm">
          {actions}
          <span className="ml-auto">{normalizeDate(review.created_at)}</span>
        </div>
      </CardContent>
    </Card>
  )
})
ReviewCard.displayName = "ReviewCard"

export { ReviewCard }
