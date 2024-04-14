import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"
import Image from "next/image"

import { badgeVariants } from "@/01-shared/ui/badge"
import { cn } from "@/01-shared/utils/cn"
import { Team } from "../../../model/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"

export interface TeamBadgeProps extends HTMLAttributes<HTMLAnchorElement> {
  team: Team
}

const TeamBadge = forwardRef<HTMLAnchorElement, TeamBadgeProps>(({ team, className }, ref) => {
  return (
    <Link
      href={`/teams/${team.slug}`}
      ref={ref}
      className={cn(badgeVariants({ variant: "outline" }), "w-fit gap-1", className)}
    >
      <Avatar className="w-4 h-4 text-lg rounded-md">
        <AvatarImage src={team.logo} asChild>
          <Image src={team.logo} alt={team.name} fill />
        </AvatarImage>
        <AvatarFallback>{team.name[0]}</AvatarFallback>
      </Avatar>
      {team.name}
    </Link>
  )
})
TeamBadge.displayName = "TeamBadge"

export { TeamBadge }
