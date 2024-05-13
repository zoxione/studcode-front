import Link from "next/link"
import { HTMLAttributes, ReactNode, forwardRef } from "react"
import Image from "next/image"

import { cn } from "@/01-shared/utils/cn"
import { Team } from "../../../model/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/01-shared/ui/tooltip"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"
import { Title } from "@/01-shared/ui/title"
import { Skeleton } from "@/01-shared/ui/skeleton"

export interface TeamCardProps extends HTMLAttributes<HTMLAnchorElement> {
  team?: Team
  loading?: boolean
  actions?: ReactNode[]
}

const TeamCard = forwardRef<HTMLAnchorElement, TeamCardProps>(({ team, loading, actions, className }, ref) => {
  if (loading) {
    return <Skeleton className="h-16 w-full max-w-md" />
  }

  if (!team) {
    return null
  }

  return (
    <div className="animate-in fade-in duration-300 max-w-md relative rounded-xl border bg-card text-card-foreground shadow">
      <Link href={`/teams/${team.slug}`} className={cn("flex flex-row items-center gap-4", className)}>
        <Avatar className="w-[60px] h-[60px] text-lg rounded-md">
          <AvatarImage src={team.logo} asChild>
            <Image src={team.logo} alt={team.name} fill />
          </AvatarImage>
          <AvatarFallback>{team.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 flex flex-col">
          <Title order={6} className="line-clamp-1">
            {team.name}
          </Title>
          <div className="flex items-center justify-start -space-x-1">
            {team.members?.slice(0, 3).map((member) => (
              <Tooltip key={member.user._id} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Avatar className="w-6 h-6 text-xs">
                    <AvatarImage src={member.user.avatar} asChild>
                      <Image src={member.user.avatar} alt={member.user.username} fill />
                    </AvatarImage>
                    <AvatarFallback>
                      {getUserInitials(member.user.full_name.surname, member.user.full_name.name)}
                    </AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent side="top">{member.user.username}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </Link>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-fit flex items-center gap-2 pr-3">
        {actions}
      </div>
    </div>
  )
})
TeamCard.displayName = "TeamCard"

export { TeamCard }
