"use client"

import { useGetOneProjectQuery } from "@/02-entities/project"
import { VoteProjectButton } from "./vote-project-button"
import { Skeleton } from "@/01-shared/ui/skeleton"

interface VoteProjectProps {
  projectId: string
}

const VoteProject = ({ projectId }: VoteProjectProps) => {
  const { data: project, status } = useGetOneProjectQuery(projectId)

  if (status === "pending") {
    return <Skeleton className="h-10 w-8" />
  }

  if (!project) {
    return null
  }

  return <VoteProjectButton projectId={projectId} flames={project.flames} voted={project.voted} />
}

export { VoteProject }
