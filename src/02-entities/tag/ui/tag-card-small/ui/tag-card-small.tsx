import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"

import { cn } from "@/01-shared/utils/cn"
import { Tag } from "../../../model/types"

export interface TagCardSmallProps extends HTMLAttributes<HTMLAnchorElement> {
  tag: Tag
}

const TagCardSmall = forwardRef<HTMLAnchorElement, TagCardSmallProps>(({ tag, className }, ref) => {
  return (
    <Link
      href={`/tags/${tag.slug}`}
      ref={ref}
      className={cn(
        "h-full w-full flex flex-col items-center justify-center gap-2 border rounded-md px-10 py-3 text-center hover:bg-accent duration-200",
        className,
      )}
    >
      <span>{tag.icon}</span>
      <span>{tag.name}</span>
    </Link>
  )
})
TagCardSmall.displayName = "TagCardSmall"

export { TagCardSmall }
