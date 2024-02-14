"use client"

import { toast } from "sonner"
import Link from "next/link"

import { cn } from "@/01-shared/utils/cn"
import { ProjectDraftCard, useGetAllProjectsQuery } from "@/02-entities/project"
import { Button } from "@/01-shared/ui/Button"

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
      {statusProjects === "pending" ? (
        Array(4)
          .fill(0)
          .map((_, i) => i + 1)
          .map((index) => <ProjectDraftCard key={index} loading />)
      ) : projects.results.length === 0 ? (
        <div className="flex flex-col items-center gap-2">
          <p className="text-center text-sm text-muted-foreground">У вас нет черновиков</p>
          <Button variant="secondary" asChild>
            <Link href="/projects/new">Создать проект</Link>
          </Button>
        </div>
      ) : (
        projects.results.map((project) => <ProjectDraftCard key={project._id} project={project} />)
      )}
    </div>
  )
}
