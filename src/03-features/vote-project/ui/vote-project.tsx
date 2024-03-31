"use client"

import { useGetOneProjectQuery } from "@/02-entities/project"
import { VoteProjectButton } from "./vote-project-button"

interface VoteProjectProps {
  projectId: string
}

const VoteProject = ({ projectId }: VoteProjectProps) => {
  const { data: project } = useGetOneProjectQuery(projectId)
  if (!project) {
    return null
  }

  return <VoteProjectButton projectId={projectId} flames={project.flames} voted={project.voted} />
}

export { VoteProject }
