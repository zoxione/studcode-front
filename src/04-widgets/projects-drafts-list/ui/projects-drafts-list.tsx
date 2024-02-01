"use client"

import { toast } from "sonner"

import { cn } from "@/01-shared/utils/cn"
import { ProjectCardSmall, useGetAllProjectsQuery } from "@/02-entities/project"

interface ProjectsDraftsListProps {
  className?: string
  limit: number
  creator_id: string
}

export const ProjectsDraftsList = ({ limit, creator_id, className }: ProjectsDraftsListProps) => {
  const {
    data: projects,
    error,
    status: statusProjects,
  } = useGetAllProjectsQuery({ limit: limit, status: "draft", creator_id })

  if (statusProjects === "error") {
    return null
  }

  return (
    <div className={cn("space-y-4", className)}>
      {statusProjects === "pending"
        ? Array(4)
            .fill(0)
            .map((_, i) => i + 1)
            .map((index) => <ProjectCardSmall key={index} loading />)
        : projects.results.map((project) => <ProjectCardSmall key={project._id} project={project} />)}
    </div>
  )
}
