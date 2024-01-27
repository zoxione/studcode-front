"use client"

import { cn } from "@/01-shared/utils/cn"
import { GetAllProjectsResponse, Project, ProjectCard } from "@/02-entities/project"
import { projectAPI } from "@/02-entities/project/api/project-api"
import { GetAllProjectsFilter, TimeFrameProject } from "@/02-entities/project/api/types"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useInfiniteQuery } from "@tanstack/react-query"
import { Fragment, useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface ProjectsListProps extends GetAllProjectsFilter {
  className?: string
}

export const ProjectsList = ({
  className,
  limit,
  page,
  search,
  tag_slug,
  time_frame,
  creator_id,
}: ProjectsListProps) => {
  const fetchProjects = async ({ pageParam }: { pageParam: number }) => {
    const { data } = await projectAPI.getAll({ limit, page: pageParam, search, tag_slug, time_frame, creator_id })
    return data as GetAllProjectsResponse
  }
  const {
    data: projects,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [`projects-${limit}-${page}-${search}-${tag_slug}-${time_frame}-${creator_id}`],
    queryFn: fetchProjects,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextPageIndex =
        lastPage.stats.page < lastPage?.stats.count_pages - 1 ? (lastPage?.stats.page as number) + 1 : undefined
      return nextPageIndex
    },
  })

  const [ref, inView] = useInView({ threshold: 0.4 })
  useEffect(() => {
    if (inView) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
  }, [inView])

  return status === "pending" ? (
    <ReloadIcon className="h-4 w-4 animate-spin mx-auto" />
  ) : status === "error" ? (
    <span>Ошибка: {error.message}</span>
  ) : (
    <div className={cn("space-y-6", className)}>
      {projects.pages.map((group, i) => (
        <Fragment key={i}>
          {group.data.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </Fragment>
      ))}
      <div className="flex items-center justify-center my-6">
        {hasNextPage ? <ReloadIcon ref={ref} className="h-4 w-4 animate-spin" /> : null}
      </div>
    </div>
  )
}
