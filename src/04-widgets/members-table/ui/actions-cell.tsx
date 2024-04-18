import { Row } from "@tanstack/react-table"
import { ExternalLinkIcon, MoreHorizontal, Trash2Icon } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { Button } from "@/01-shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/01-shared/ui/dropdown-menu"
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
      <DropdownMenuContent className="w-40" align="end">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/${user.username}`} target="_blank">
              Профиль
              <ExternalLinkIcon className="ml-auto h-4 w-4" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => {
              removeMember({
                key: teamName,
                userId: user._id,
              })
            }}
          >
            Удалить
            <Trash2Icon className="ml-auto h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ActionsCell }
