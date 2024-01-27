import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Title } from "@/01-shared/ui/Title"
import { cn } from "@/01-shared/utils/cn"
import { TagBadge } from "@/02-entities/tag"
import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"
import { Project } from "../model/types"
import { ApproveButton } from "./approve-button"
import { normalizeDate } from "@/01-shared/utils/normalize-date"

export interface ProjectCardSmallProps extends HTMLAttributes<HTMLDivElement> {
  project: Project
}

const ProjectCardSmall = forwardRef<HTMLDivElement, ProjectCardSmallProps>(({ project, className }, ref) => {
  return (
    <Link
      href={`/projects/${project._id}`}
      className={cn(
        "flex flex-row items-center gap-4 max-w-xl rounded-md hover:bg-gradient-to-l from-accent",
        className,
      )}
    >
      <Avatar className="w-[60px] h-[60px] flex flex-col gap-0">
        <AvatarImage src={project.logo} width={60} height={60} alt={project.title} />
        <AvatarFallback>{project.title[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col overflow-hidden">
        <span className="text-base font-semibold">{project.title}</span>
        <p className="text-sm">Последнее изменение: {normalizeDate(project.updated_at)}</p>
      </div>
    </Link>
  )
})
ProjectCardSmall.displayName = "ProjectCardSmall"

export { ProjectCardSmall }
