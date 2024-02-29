"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Fragment, useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { GetAllProjectsFilter, ProjectCard, useGetAllProjectsInfiniteQuery } from "@/02-entities/project"
import { cn } from "@/01-shared/utils/cn"
import { ProjectCardProps } from "@/02-entities/project/ui/project-card"

interface ProjectsListProps {
  className?: string
  filter: GetAllProjectsFilter
  projectCardProps?: ProjectCardProps
}

export const ProjectsList = ({ filter, projectCardProps, className }: ProjectsListProps) => {
  const {
    data: projects,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status: statusProjects,
  } = useGetAllProjectsInfiniteQuery(filter)

  const [ref, inView] = useInView({ threshold: 0.4 })
  useEffect(() => {
    if (inView) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }, [inView])

  if (statusProjects === "error") {
    return null
  }

  return (
    <div className={cn("space-y-6", className)}>
      {statusProjects === "pending"
        ? Array(4)
            .fill(0)
            .map((_, i) => i + 1)
            .map((index) => <ProjectCard key={index} loading />)
        : projects.pages.map((group, i) => (
            <Fragment key={i}>
              {group.results.map((project) => (
                <ProjectCard key={project._id} project={project} {...projectCardProps} />
              ))}
            </Fragment>
          ))}
      <div className="flex items-center justify-center my-6">
        {hasNextPage ? <ReloadIcon ref={ref} className="h-4 w-4 animate-spin" /> : null}
      </div>
    </div>
  )
}
