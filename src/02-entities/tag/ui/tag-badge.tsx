import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"


import { badgeVariants } from "@/01-shared/ui/Badge"
import { cn } from "@/01-shared/utils/cn"

import { Tag } from "../model/types"

export interface TagBadgeProps extends HTMLAttributes<HTMLAnchorElement> {
  tag: Tag
}

const TagBadge = forwardRef<HTMLAnchorElement, TagBadgeProps>(({ tag, className }, ref) => {
  const tagName = tag.name.ru !== "" ? tag.name.ru : tag.name.en

  return (
    <Link
      href={`/tags/${tag.slug}`}
      ref={ref}
      className={cn(badgeVariants({ variant: "secondary" }), "w-fit", className)}
    >
      {tagName}
    </Link>
  )
})
TagBadge.displayName = "TagBadge"

export { TagBadge }
