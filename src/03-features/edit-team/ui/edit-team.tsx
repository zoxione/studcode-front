"use client"

import { InfoIcon } from "lucide-react"

import { Skeleton } from "@/01-shared/ui/skeleton"
import { useGetOneTeamFilesQuery, useGetOneTeamQuery } from "@/02-entities/team"
import { EditTeamForm } from "./edit-team-form"

interface EditTeamProps {
  teamId: string
}

const EditTeam = ({ teamId }: EditTeamProps) => {
  const { data: team, status: teamStatus } = useGetOneTeamQuery(teamId)
  const { data: files, status: filesStatus } = useGetOneTeamFilesQuery(teamId)

  if (teamStatus === "pending" || filesStatus === "pending") {
    return (
      <div className="space-y-6">
        {Array(4)
          .fill(0)
          .map((_, i) => i + 1)
          .map((index) => (
            <div key={index} className="space-y-1">
              <Skeleton className="h-3 w-2/6" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
      </div>
    )
  }

  if (teamStatus === "error" || filesStatus === "error") {
    return (
      <div className="flex flex-col justify-center items-center">
        <InfoIcon className="w-6 h-6 text-primary" />
        <p className="text-sm text-muted-foreground">Возникла неизвестная ошибка.</p>
      </div>
    )
  }

  return <EditTeamForm team={team} files={files} />
}

export { EditTeam }
