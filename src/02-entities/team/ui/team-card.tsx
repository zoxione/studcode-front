import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { Skeleton } from "@/01-shared/ui/Skeleton"
import { cn } from "@/01-shared/utils/cn"
import { Team } from "../model/types"

export interface TeamCardProps extends HTMLAttributes<HTMLAnchorElement> {
  team?: Team
  loading?: boolean
}

const TeamCard = forwardRef<HTMLAnchorElement, TeamCardProps>(({ team, loading, className }, ref) => {
  if (loading) {
    return (
      <div className="w-full max-w-xl flex items-center space-x-4">
        <Skeleton className="h-[60px] w-[60px] rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/6" />
        </div>
        <Skeleton className="h-10 w-8" />
      </div>
    )
  }

  if (!team) {
    return null
  }

  return (
    <Link
      ref={ref}
      href={`/teams/${team.name}`}
      className={cn(
        "w-fit flex flex-row items-center gap-2 rounded-md hover:bg-gradient-to-l from-accent duration-200",
        className,
      )}
    >
      <Avatar className="w-9 h-9 text-lg rounded-md">
        <AvatarImage src={team.logo} width={36} height={36} alt={team.name} />
        <AvatarFallback>{team.name[0]}</AvatarFallback>
      </Avatar>
      <span className="flex-none text-xs font-semibold pr-2">{team.name}</span>
    </Link>
  )
})
TeamCard.displayName = "TeamCard"

export { TeamCard }
