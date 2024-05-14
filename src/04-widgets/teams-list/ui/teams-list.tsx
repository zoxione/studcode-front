"use client"

import { Pencil1Icon } from "@radix-ui/react-icons"
import { useSession } from "next-auth/react"
import Link from "next/link"

import { buttonVariants } from "@/01-shared/ui/button"
import { cn } from "@/01-shared/utils/cn"
import { GetAllTeamsFilter, TeamCard, TeamCardProps, useGetAllTeamsQuery } from "@/02-entities/team"

interface TeamsListProps {
  className?: string
  filter: GetAllTeamsFilter
  isEdit?: boolean
  teamCardProps?: TeamCardProps
}

export const TeamsList = ({ filter, isEdit, teamCardProps, className }: TeamsListProps) => {
  const { data: teams, status } = useGetAllTeamsQuery(filter)
  // const { data: teams, fetchNextPage, hasNextPage, isFetchingNextPage, status } = useGetAllTeamsInfiniteQuery(filter)
  const { data: session } = useSession()

  // const [ref, inView] = useInView({ threshold: 0.4 })
  // useEffect(() => {
  //   if (inView) {
  //     if (hasNextPage && !isFetchingNextPage) {
  //       fetchNextPage()
  //     }
  //   }
  // }, [inView])

  if (status === "error") {
    return null
  }

  return (
    <div className={cn("space-y-3", className)}>
      {status === "pending" ? (
        Array(3)
          .fill(0)
          .map((_, i) => i + 1)
          .map((index) => <TeamCard key={index} loading />)
      ) : teams.results?.length > 0 ? (
        teams.results?.map((team) => (
          <TeamCard
            key={team._id}
            team={team}
            actions={[
              isEdit &&
              team.members.some((member) => member.user._id === session?.user?._id && member.role === "owner") ? (
                <Link
                  key="edit"
                  href={`/teams/${team.slug}/edit`}
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "")}
                >
                  <Pencil1Icon className="w-4 h-4" />
                </Link>
              ) : null,
            ]}
            {...teamCardProps}
          />
        ))
      ) : (
        <span className="text-sm text-muted-foreground flex justify-center items-center text-center">
          {"(>_<)"} <br />
          Команды не найдены.
        </span>
      )}
    </div>
  )
}
