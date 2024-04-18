"use client"

import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { useGetOneProjectQuery } from "@/02-entities/project"
import { Skeleton } from "@/01-shared/ui/skeleton"

interface ProjectTitleLinkProps {
  projectId: string
}

const ProjectTitleLink = ({ projectId }: ProjectTitleLinkProps) => {
  const { data: project, status } = useGetOneProjectQuery(projectId)

  if (status === "pending") {
    return <Skeleton className="w-full h-8" />
  }
  if (!project) {
    return null
  }

  return (
    <Link
      href={`/projects/${project.slug}`}
      target="_blank"
      className="w-fit flex items-center gap-2 transition-colors hover:text-primary"
    >
      {project.title}
      <ExternalLinkIcon className="h-4 w-4" />
    </Link>
  )
}

export { ProjectTitleLink }
