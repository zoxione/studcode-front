"use client"

import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { useGetOneTeamQuery } from "@/02-entities/team"
import { Skeleton } from "@/01-shared/ui/skeleton"

interface TeamNameLinkProps {
  teamId: string
}

const TeamNameLink = ({ teamId }: TeamNameLinkProps) => {
  const { data: team, status } = useGetOneTeamQuery(teamId)

  if (status === "pending") {
    return <Skeleton className="w-full h-8" />
  }
  if (!team) {
    return null
  }

  return (
    <Link
      href={`/teams/${team.slug}`}
      target="_blank"
      className="w-fit flex items-center gap-2 transition-colors hover:text-primary"
    >
      {team.name}
      <ExternalLinkIcon className="h-4 w-4" />
    </Link>
  )
}

export { TeamNameLink }
