import Link from "next/link"
import { HTMLAttributes, ReactNode, forwardRef } from "react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Skeleton } from "@/01-shared/ui/skeleton"
import { cn } from "@/01-shared/utils/cn"
import { TagBadge } from "@/02-entities/tag"
import { Project } from "../../../model/types"
import { ScrollArea, ScrollBar } from "@/01-shared/ui/scroll-area"

export interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  project?: Project
  loading?: boolean
  actions?: ReactNode[]
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(({ project, loading, actions, className }, ref) => {
  if (loading) {
    return (
      <div className="w-full max-w-xl flex items-center space-x-4">
        <Skeleton className="h-[60px] w-[60px] rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-5/6" />
          <div className="flex flex-row items-center gap-1">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <Skeleton className="h-10 w-8" />
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="group h-[60px] max-w-xl relative" ref={ref}>
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "flex flex-row items-center gap-4 rounded-md hover:bg-gradient-to-l from-accent duration-200",
          className,
        )}
      >
        <Avatar className="w-[60px] h-[60px] text-lg rounded-md">
          <AvatarImage src={project.logo} asChild>
            <Image src={project.logo} alt={project.title} fill className="group-hover:scale-105 duration-200" />
          </AvatarImage>
          <AvatarFallback className="group-hover:scale-105 duration-200">{project.title[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          <div className="mb-6 flex flex-row items-center gap-1 text-base font-semibold">
            <span className="flex-none">{project.title}</span>
            {project.tagline !== "" ? (
              <>
                <span>—</span>
                <p className="line-clamp-1">{project.tagline.toLowerCase()}</p>
              </>
            ) : null}
          </div>
        </div>
        <div className="w-fit flex items-center gap-2 pr-3">{actions}</div>
      </Link>

      <ScrollArea className="ml-[76px] -mt-7 mr-12">
        <div className="flex flex-row items-center gap-1">
          {project.tags.map((tag) => (
            <TagBadge key={tag._id} tag={tag} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
})
ProjectCard.displayName = "ProjectCard"

export { ProjectCard }
