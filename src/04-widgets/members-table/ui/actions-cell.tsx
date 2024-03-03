import { Row } from "@tanstack/react-table"
import { MoreHorizontal, Trash2Icon } from "lucide-react"
import { usePathname } from "next/navigation"
import { ExternalLinkIcon } from "@radix-ui/react-icons"
import Link from "next/link"

import { Button } from "@/01-shared/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/01-shared/ui/DropdownMenu"
import { TeamMember, useRemoveMemberTeamMutation } from "@/02-entities/team"

const ActionsCell = ({ row }: { row: Row<TeamMember> }) => {
  const { mutate: removeMember } = useRemoveMemberTeamMutation()
  const pathname = usePathname()
  const segments = pathname.split("/")
  const teamName = segments[segments.indexOf("teams") + 1]
  const user: TeamMember["user"] = row.getValue("user")
  const role: TeamMember["role"] = row.getValue("role")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0" role="option">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuItem asChild>
          <Link href={`/${user.username}`} target="_blank">
            <ExternalLinkIcon className="mr-2 h-4 w-4" />
            Профиль
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => {
            removeMember({
              key: teamName,
              userId: user._id,
              role: role,
            })
          }}
        >
          <Trash2Icon className="mr-2 h-4 w-4" />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ActionsCell }
