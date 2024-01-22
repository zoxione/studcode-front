import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"
import { Tag } from "../model/types"

import { cn } from "@/01-shared/utils/cn"
import { Badge } from "@/01-shared/ui/Badge"

export interface TagBadgeProps extends HTMLAttributes<HTMLAnchorElement> {
  tag: Tag
}

const TagBadge = forwardRef<HTMLAnchorElement, TagBadgeProps>(({ tag, className }, ref) => {
  const tagName = tag.name.ru !== "" ? tag.name.ru : tag.name.en

  return (
    <Link href={`/projects?tagId=${tag._id}`} ref={ref} className={cn("", className)}>
      <Badge variant="secondary" className="flex flex-row items-center gap-4">
        {tagName}
      </Badge>
    </Link>
  )
})
TagBadge.displayName = "TagBadge"

export { TagBadge }
