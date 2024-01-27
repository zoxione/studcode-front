import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"
import { Tag } from "../model/types"

import { cn } from "@/01-shared/utils/cn"

export interface TagCardSmallProps extends HTMLAttributes<HTMLAnchorElement> {
  tag: Tag
}

const TagCardSmall = forwardRef<HTMLAnchorElement, TagCardSmallProps>(({ tag, className }, ref) => {
  const tagName = tag.name.ru !== "" ? tag.name.ru : tag.name.en

  return (
    <Link href={`/projects?tagId=${tag._id}`} ref={ref} scroll={false} className={cn("", className)}>
      <div className="h-full w-full flex flex-col items-center justify-center gap-2 border rounded-md px-10 py-3 text-center hover:bg-accent">
        <span>{tag.icon}</span>
        <span>{tagName}</span>
      </div>
    </Link>
  )
})
TagCardSmall.displayName = "TagCardSmall"

export { TagCardSmall }
