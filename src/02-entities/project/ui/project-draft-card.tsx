import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Skeleton } from "@/01-shared/ui/Skeleton"
import { cn } from "@/01-shared/utils/cn"
import { normalizeDate } from "@/01-shared/utils/normalize-date"

import { Project } from "../model/types"

export interface ProjectDraftCardProps extends HTMLAttributes<HTMLDivElement> {
  project?: Project
  loading?: boolean
}

const ProjectDraftCard = forwardRef<HTMLDivElement, ProjectDraftCardProps>(({ project, loading, className }, ref) => {
  if (loading) {
    return (
      <div className="w-full max-w-xl flex items-center space-x-4">
        <Skeleton className="h-[60px] w-[60px] rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/6" />
        </div>
        <Skeleton className="h-10 w-8" />
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <Link
      href={`/projects/${project._id}`}
      className={cn(
        "flex flex-row items-center gap-4 max-w-xl rounded-md hover:bg-gradient-to-l from-accent duration-200",
        className,
      )}
    >
      <Avatar className="w-[60px] h-[60px] text-lg">
        <AvatarImage src={project.logo} width={60} height={60} alt={project.title} />
        <AvatarFallback>{project.title[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col overflow-hidden pr-3">
        <span className="text-base font-semibold">{project.title}</span>
        <p className="text-sm">Последнее изменение: {normalizeDate(project.updated_at)}</p>
      </div>
    </Link>
  )
})
ProjectDraftCard.displayName = "ProjectDraftCard"

export { ProjectDraftCard }
