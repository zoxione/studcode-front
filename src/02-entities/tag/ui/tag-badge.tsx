import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"

import { Tag } from "../model/types"

import { Badge } from "@/01-shared/ui/Badge"
import { cn } from "@/01-shared/utils/cn"

export interface TagBadgeProps extends HTMLAttributes<HTMLAnchorElement> {
  tag: Tag
}

const TagBadge = forwardRef<HTMLAnchorElement, TagBadgeProps>(({ tag, className }, ref) => {
  const tagName = tag.name.ru !== "" ? tag.name.ru : tag.name.en

  return (
    <Link href={`/projects?tagSlug=${tag.slug}`} ref={ref} className={cn("w-fit", className)}>
      <Badge variant="secondary" className="flex flex-row items-center gap-4">
        {tagName}
      </Badge>
    </Link>
  )
})
TagBadge.displayName = "TagBadge"

export { TagBadge }
