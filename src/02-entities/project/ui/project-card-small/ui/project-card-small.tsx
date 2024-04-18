import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"
import Image from "next/image"
import { Flame } from "lucide-react"

import { cn } from "@/01-shared/utils/cn"
import { Title } from "@/01-shared/ui/title"
import { Project } from "../../../model/types"
import { Skeleton } from "@/01-shared/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"

export interface ProjectCardSmallProps extends HTMLAttributes<HTMLAnchorElement> {
  project?: Project
  loading?: boolean
}

const ProjectCardSmall = forwardRef<HTMLAnchorElement, ProjectCardSmallProps>(
  ({ project, loading, className }, ref) => {
    if (loading) {
      return (
        <div className="w-36 h-36 flex flex-col items-center justify-center gap-2 border rounded-md px-10 py-3 text-center">
          <Skeleton className="w-14 h-14 rounded-md" />
          <Skeleton className="w-16 h-4" />
          <Skeleton className="w-6 h-4" />
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
          "group w-36 h-36 flex flex-col items-center justify-center gap-2 overflow-hidden border rounded-md px-10 py-3 text-center hover:bg-accent duration-200",
          className,
        )}
      >
        <Avatar className="w-14 h-14 text-lg rounded-md">
          <AvatarImage src={project.logo} asChild>
            <Image src={project.logo} alt={project.title} fill className="group-hover:scale-105 duration-200" />
          </AvatarImage>
          <AvatarFallback className="group-hover:scale-105 duration-200">{project.title[0]}</AvatarFallback>
        </Avatar>
        <Title order={6} className="text-center leading-[1.2] line-clamp-1">
          {project.title}
        </Title>
        <div className="flex items-center gap-[2px]">
          {project.flames}
          <Flame className="h-4 w-4 stroke-2 fill-primary stroke-primary/90" />
        </div>
      </Link>
    )
  },
)
ProjectCardSmall.displayName = "ProjectCardSmall"

export { ProjectCardSmall }
