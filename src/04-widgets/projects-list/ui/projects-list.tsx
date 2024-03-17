"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Fragment, useEffect } from "react"
import { useInView } from "react-intersection-observer"

import { GetAllProjectsFilter, ProjectCard, useGetAllProjectsInfiniteQuery } from "@/02-entities/project"
import { cn } from "@/01-shared/utils/cn"
import { ProjectCardProps } from "@/02-entities/project/ui/project-card"
import { VoteProjectButton } from "@/03-features/vote-project"
import { EditProjectButton } from "@/03-features/edit-project"

interface ProjectsListProps {
  className?: string
  filter: GetAllProjectsFilter
  isEdit?: boolean
  projectCardProps?: ProjectCardProps
}

export const ProjectsList = ({ filter, isEdit, projectCardProps, className }: ProjectsListProps) => {
  const {
    data: projects,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetAllProjectsInfiniteQuery(filter)

  const [ref, inView] = useInView({ threshold: 0.4 })
  useEffect(() => {
    if (inView) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }, [inView])

  if (status === "error") {
    return null
  }

  return (
    <div className={cn("space-y-6", className)}>
      {status === "pending"
        ? Array(4)
            .fill(0)
            .map((_, i) => i + 1)
            .map((index) => <ProjectCard key={index} loading />)
        : projects.pages.map((group, i) => (
            <Fragment key={i}>
              {group.results.length > 0 ? (
                group.results.map((project) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    actions={[
                      isEdit ? <EditProjectButton key="edit" projectSlug={project.slug} /> : null,
                      <VoteProjectButton
                        key="vote"
                        projectId={project._id}
                        flames={project.flames}
                        voted={project.voted}
                      />,
                    ]}
                    {...projectCardProps}
                  />
                ))
              ) : (
                <span className="text-sm text-muted-foreground flex justify-center items-center text-center">
                  {"(>_<)"} <br />
                  Проекты не найдены.
                </span>
              )}
            </Fragment>
          ))}
      <div className="flex items-center justify-center my-6">
        {hasNextPage ? <ReloadIcon ref={ref} className="h-4 w-4 animate-spin" /> : null}
      </div>
    </div>
  )
}
