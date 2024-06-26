import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Skeleton } from "@/01-shared/ui/skeleton"
import { cn } from "@/01-shared/utils/cn"
import { normalizeDate } from "@/01-shared/utils/normalize-date"
import { Project } from "../../../model/types"

export interface ProjectDraftCardProps extends HTMLAttributes<HTMLAnchorElement> {
  project?: Project
  loading?: boolean
}

const ProjectDraftCard = forwardRef<HTMLAnchorElement, ProjectDraftCardProps>(
  ({ project, loading, className }, ref) => {
    if (loading) {
      return (
        <div className="w-full max-w-xl flex items-center space-x-4">
          <Skeleton className="h-[60px] w-[60px] rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      )
    }

    if (!project) {
      return null
    }

    return (
      <Link
        href={`/projects/${project.slug}`}
        ref={ref}
        className={cn(
          "group flex flex-row items-center gap-4 max-w-xl rounded-md hover:bg-gradient-to-l from-accent duration-200",
          className,
        )}
      >
        <Avatar className="w-[60px] h-[60px] text-lg rounded-md">
          <AvatarImage src={project.logo} asChild>
            <Image src={project.logo} alt={project.title} fill className="group-hover:scale-105 duration-200" />
          </AvatarImage>
          <AvatarFallback className="group-hover:scale-105 duration-200">{project.title[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col overflow-hidden pr-3">
          <span className="text-base font-semibold">{project.title}</span>
          <p className="text-sm">
            Последнее изменение: <time dateTime={project.updated_at}>{normalizeDate(project.updated_at)}</time>
          </p>
        </div>
      </Link>
    )
  },
)
ProjectDraftCard.displayName = "ProjectDraftCard"

export { ProjectDraftCard }
