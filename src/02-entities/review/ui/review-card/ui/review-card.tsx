import { HTMLAttributes, ReactNode, forwardRef } from "react"
import Link from "next/link"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Card, CardContent } from "@/01-shared/ui/card"
import { Rating } from "@/01-shared/ui/rating"
import { Title } from "@/01-shared/ui/title"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"
import { normalizeDate } from "@/01-shared/utils/normalize-date"
import { Review } from "../../../model/types"
import { Skeleton } from "@/01-shared/ui/skeleton"

export interface ReviewCardProps extends HTMLAttributes<HTMLDivElement> {
  review?: Review
  actions?: ReactNode[]
  loading?: boolean
}

const ReviewCard = forwardRef<HTMLDivElement, ReviewCardProps>(({ review, actions, loading }, ref) => {
  if (loading) {
    return (
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex flex-row items-center gap-2 ">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col gap-1">
              <Skeleton className="w-52 h-4" />
              <Skeleton className="w-14 h-3" />
            </div>
            <Skeleton className="ml-auto mb-auto w-32 h-5" />
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
          <div className="flex flex-row items-center gap-2 text-muted-foreground text-sm">
            <Skeleton className="w-10 h-5" />
            <Skeleton className="w-10 h-5" />
            <Skeleton className="ml-auto w-16 h-5" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!review) {
    return null
  }

  const reviewerInitials = getUserInitials(review.reviewer?.full_name.surname, review.reviewer?.full_name.name)

  return (
    <Card ref={ref}>
      <CardContent className="p-4 space-y-3">
        <div className="flex flex-row items-center gap-2 ">
          <Avatar className="w-10 h-10" asChild>
            <Link href={`/${review.reviewer.username}`}>
              <AvatarImage src={review.reviewer.avatar} asChild>
                <Image src={review.reviewer.avatar} alt={review.reviewer.username} fill />
              </AvatarImage>
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
        <p className="whitespace-pre-line">{review.text}</p>
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
