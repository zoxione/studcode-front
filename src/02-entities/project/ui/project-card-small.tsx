import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"

import { cn } from "@/01-shared/utils/cn"

import { Project } from "../model/types"

export interface ProjectCardSmallProps extends HTMLAttributes<HTMLAnchorElement> {
  project: Project
}

const ProjectCardSmall = forwardRef<HTMLAnchorElement, ProjectCardSmallProps>(({ project, className }, ref) => {
  return (
    <Link href={`/projects/${project._id}`} ref={ref} className={cn("", className)}>
      <div className="h-full w-full max-w-xs flex flex-col items-center justify-center gap-2 border rounded-md px-10 py-3 text-center hover:bg-accent duration-200">
        <span>{project.logo}</span>
        <span>{project.title}</span>
      </div>
    </Link>
  )
})
ProjectCardSmall.displayName = "ProjectCardSmall"

export { ProjectCardSmall }
