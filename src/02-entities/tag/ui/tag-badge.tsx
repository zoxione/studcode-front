import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"


import { Badge } from "@/01-shared/ui/Badge"
import { cn } from "@/01-shared/utils/cn"

import { Tag } from "../model/types"

export interface TagBadgeProps extends HTMLAttributes<HTMLAnchorElement> {
  tag: Tag
}

const TagBadge = forwardRef<HTMLAnchorElement, TagBadgeProps>(({ tag, className }, ref) => {
  const tagName = tag.name.ru !== "" ? tag.name.ru : tag.name.en

  return (
    <Badge variant="secondary" className="flex flex-row items-center gap-4" asChild>
      <Link href={`/projects?tagSlug=${tag.slug}`} ref={ref} className={cn("w-fit", className)}>
        {tagName}
      </Link>
    </Badge>
  )
})
TagBadge.displayName = "TagBadge"

export { TagBadge }
