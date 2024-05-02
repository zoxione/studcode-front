import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"
import Image from "next/image"

import { TeamMember } from "../../../model/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"
import { SpecializationBadge } from "@/02-entities/specialization"

export interface TeamMemberCardProps extends HTMLAttributes<HTMLAnchorElement> {
  member: TeamMember
}

const TeamMemberCard = forwardRef<HTMLAnchorElement, TeamMemberCardProps>(({ member, className }, ref) => {
  return (
    <Link key={member.user._id} href={`/${member.user.username}`} ref={ref} className="group flex items-center gap-4">
      <Avatar className="h-12 w-12 text-sm">
        <AvatarImage src={member.user.avatar} asChild>
          <Image src={member.user.avatar} alt={member.user.username} fill />
        </AvatarImage>
        <AvatarFallback>{getUserInitials(member.user.full_name.surname, member.user.full_name.name)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold leading-none group-hover:text-primary duration-200">
          {member.user.full_name.surname} {member.user.full_name.name}
        </span>
        {member.user.specializations.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {member.user.specializations.map((spec) => (
              <SpecializationBadge key={spec._id} specialization={spec} />
            ))}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">Специализаций нет.</span>
        )}
      </div>
    </Link>
  )
})
TeamMemberCard.displayName = "TeamMemberCard"

export { TeamMemberCard }
