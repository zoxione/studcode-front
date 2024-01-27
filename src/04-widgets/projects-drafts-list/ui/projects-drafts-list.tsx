"use client"

import { cn } from "@/01-shared/utils/cn"
import { GetAllProjectsResponse } from "@/02-entities/project"
import { projectAPI } from "@/02-entities/project/api/project-api"
import { GetAllProjectsFilter } from "@/02-entities/project/api/types"
import { ProjectCardSmall } from "@/02-entities/project/ui/project-card-small"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useQuery } from "@tanstack/react-query"

interface ProjectsDraftsListProps extends GetAllProjectsFilter {
  className?: string
}

export const ProjectsDraftsList = ({
  className,
  limit,
  page,
  search,
  tag_slug,
  time_frame,
}: ProjectsDraftsListProps) => {
  const fetchProjects = async () => {
    const { data } = await projectAPI.getAll({ limit, page: page, search, tag_slug, time_frame })
    return data as GetAllProjectsResponse
  }
  const {
    data: projects,
    error,

    status,
  } = useQuery({
    queryKey: [`projects-${time_frame}`],
    queryFn: fetchProjects,
  })

  return status === "pending" ? (
    <ReloadIcon className="h-4 w-4 animate-spin mx-auto" />
  ) : status === "error" ? (
    <span>Ошибка: {error.message}</span>
  ) : (
    <div className={cn("space-y-4", className)}>
      {projects.data.map((project) => (
        <ProjectCardSmall key={project._id} project={project} />
      ))}
    </div>
  )
}
