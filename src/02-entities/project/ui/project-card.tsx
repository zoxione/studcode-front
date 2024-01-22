import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Title } from "@/01-shared/ui/Title"
import { cn } from "@/01-shared/utils/cn"
import { TagBadge } from "@/02-entities/tag"
import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"
import { Project } from "../model/types"
import { ApproveButton } from "./approve-button"

export interface ProjectCardProps extends HTMLAttributes<HTMLDivElement> {
  project: Project
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(({ project, className }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex flex-row items-center gap-4 max-w-xl border hover:border-primary p-2 rounded-md", className)}
    >
      <Avatar className="w-12 h-12" asChild>
        <Link href={`/projects/${project._id}`} className="flex flex-col gap-0">
          <AvatarImage src={project.logo} width={48} height={48} alt={project.title} />
          <AvatarFallback>{project.title[0]}</AvatarFallback>
        </Link>
      </Avatar>
      <div className="flex flex-col gap-4 flex-1">
        <Link href={`/projects/${project._id}`} className="flex flex-col gap-0">
          <Title order={6} className="">
            {project.title}
          </Title>
          <p className="text-sm font-medium leading-none">{project.tagline}</p>
        </Link>
        <div className="flex flex-row items-center">
          {project.tags.map((tag) => (
            <TagBadge key={tag._id} tag={tag} />
          ))}
        </div>
      </div>
      <ApproveButton project={project} />
    </div>
  )
})
ProjectCard.displayName = "ProjectCard"

export { ProjectCard }
