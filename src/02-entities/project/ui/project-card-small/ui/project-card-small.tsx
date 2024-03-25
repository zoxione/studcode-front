import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"

import { cn } from "@/01-shared/utils/cn"
import { Title } from "@/01-shared/ui/title"
import { Project } from "../../../model/types"

export interface ProjectCardSmallProps extends HTMLAttributes<HTMLAnchorElement> {
  project: Project
}

const ProjectCardSmall = forwardRef<HTMLAnchorElement, ProjectCardSmallProps>(({ project, className }, ref) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      ref={ref}
      className={cn(
        "w-36 h-36 flex flex-col items-center justify-center gap-2 overflow-hidden border rounded-md px-10 py-3 text-center hover:bg-accent duration-200",
        className,
      )}
    >
      <img src={project.logo} alt={project.title} className="w-12 h-12 rounded-md" />
      <Title order={6}>{project.title}</Title>
      <p className="text-sm line-clamp-3">{project.tagline}</p>
    </Link>
  )
})
ProjectCardSmall.displayName = "ProjectCardSmall"

export { ProjectCardSmall }
