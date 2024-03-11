import { ChevronRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"

import { cn } from "@/01-shared/utils/cn"
import { Tag } from "../model/types"

export interface TagCardProps extends HTMLAttributes<HTMLAnchorElement> {
  tag: Tag
}

const TagCard = forwardRef<HTMLAnchorElement, TagCardProps>(({ tag, className }, ref) => {
  return (
    <Link
      href={`/tags/${tag.slug}`}
      ref={ref}
      className={cn(
        "group h-full w-full flex flex-row items-center gap-2 p-4 rounded-md hover:bg-accent duration-200",
        className,
      )}
    >
      <span className="flex-none w-10 h-10 bg-accent rounded-md flex justify-center items-center">{tag.icon}</span>
      <span className="grow line-clamp-1">{tag.name}</span>
      <ChevronRightIcon className="flex-none w-4 h-4 hidden group-hover:block" />
    </Link>
  )
})
TagCard.displayName = "TagCard"

export { TagCard }
