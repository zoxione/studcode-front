import Link from "next/link"
import { HTMLAttributes, forwardRef } from "react"
import Image from "next/image"

import { TeamMember } from "../../../model/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"

export interface TeamMemberCardProps extends HTMLAttributes<HTMLAnchorElement> {
  member: TeamMember
}

const TeamMemberCard = forwardRef<HTMLAnchorElement, TeamMemberCardProps>(({ member, className }, ref) => {
  return (
    <Link
      key={member.user._id}
      href={`/${member.user.username}`}
      ref={ref}
      className="w-fit flex items-center hover:bg-accent rounded-full"
    >
      <Avatar className="h-8 w-8 text-sm">
        <AvatarImage src={member.user.avatar} asChild>
          <Image src={member.user.avatar} alt={member.user.username} fill />
        </AvatarImage>
        <AvatarFallback>{getUserInitials(member.user.full_name.surname, member.user.full_name.name)}</AvatarFallback>
      </Avatar>
      <p className="ml-2 pr-2">{member.user.username}</p>
    </Link>
  )
})
TeamMemberCard.displayName = "TeamMemberCard"

export { TeamMemberCard }
