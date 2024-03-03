"use client"

import { ColumnDef } from "@tanstack/react-table"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/Avatar"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"
import { TeamMember } from "@/02-entities/team"
import { prettyTeamRole } from "@/02-entities/team/utils/pretty-team-role"
import { ActionsCell } from "./actions-cell"

export const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "user",
    header: "Аватар",
    cell: ({ row }) => {
      const user: TeamMember["user"] = row.getValue("user")
      return (
        <Avatar className="w-9 h-9 text-lg">
          <AvatarImage src={user.avatar} width={36} height={36} alt={user.username} />
          <AvatarFallback>{getUserInitials(user.full_name.surname, user.full_name.name)}</AvatarFallback>
        </Avatar>
      )
    },
  },
  {
    accessorKey: "user.username",
    header: "Имя пользователя",
  },
  {
    accessorKey: "role",
    header: "Роль",
    cell: ({ row }) => {
      const role: TeamMember["role"] = row.getValue("role")
      return prettyTeamRole(role)
    },
  },
  {
    id: "actions",
    header: ({ header }) => {
      return <div role="option" aria-selected />
    },
    cell: ActionsCell,
  },
]
