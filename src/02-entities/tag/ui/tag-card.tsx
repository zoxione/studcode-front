import { ChevronRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"

import { Tag } from "../model/types"

import { cn } from "@/01-shared/utils/cn"

export interface TagCardProps extends HTMLAttributes<HTMLAnchorElement> {
  tag: Tag
}

const TagCard = forwardRef<HTMLAnchorElement, TagCardProps>(({ tag, className }, ref) => {
  const tagName = tag.name.ru !== "" ? tag.name.ru : tag.name.en

  return (
    <Link
      href={`/tags/${tag.slug}`}
      ref={ref}
      className={cn(
        "h-full w-full flex flex-row items-center gap-2 p-4 rounded-md hover:bg-accent duration-200",
        className,
      )}
    >
      <span className="">{tag.icon}</span>
      <span className="grow line-clamp-1">{tagName}</span>
      <ChevronRightIcon className="w-4 h-4" />
    </Link>
  )
})
TagCard.displayName = "TagCard"

export { TagCard }
