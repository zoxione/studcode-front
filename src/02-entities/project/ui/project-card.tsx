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
    <div>
      <Link
        href={`/projects/${project._id}`}
        scroll={false}
        // ref={ref}
        className={cn(
          "flex flex-row items-center gap-4 max-w-xl rounded-md hover:bg-gradient-to-l from-accent",
          className,
        )}
      >
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage src={project.logo} width={60} height={60} alt={project.title} />
          <AvatarFallback>{project.title[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col gap-2 overflow-hidden">
          <div className="mb-6 flex flex-row items-center gap-1 text-base font-semibold">
            <span className="flex-none">{project.title}</span>
            <span>—</span>
            <p className="line-clamp-1 ">{project.tagline}</p>
          </div>
        </div>
        <div className="w-fit pr-3">
          <ApproveButton project={project} />
        </div>
      </Link>
      <div className="absolute ml-[76px] -mt-7 flex flex-row items-center gap-1">
        {project.tags.map((tag) => (
          <TagBadge key={tag._id} tag={tag} />
        ))}
      </div>
    </div>
  )
})
ProjectCard.displayName = "ProjectCard"

export { ProjectCard }
