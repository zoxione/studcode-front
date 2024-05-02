"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/01-shared/ui/avatar"
import { getUserInitials } from "@/01-shared/utils/get-user-initials"
import { TeamMember, prettyTeamRole } from "@/02-entities/team"
import { ActionsCell } from "./actions-cell"
import { SpecializationBadge } from "@/02-entities/specialization"

export const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "user",
    header: "Аватар",
    cell: ({ row }) => {
      const user: TeamMember["user"] = row.getValue("user")
      return (
        <Avatar className="w-9 h-9 text-lg">
          <AvatarImage src={user.avatar} asChild>
            <Image src={user.avatar} alt={user.username} fill />
          </AvatarImage>
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
    accessorKey: "user.email",
    header: "Электронная почта",
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
    accessorKey: "user.specializations",
    header: "Специализации",
    cell: ({ row }) => {
      const user: TeamMember["user"] = row.getValue("user")
      return (
        <div className="flex flex-col gap-1">
          {user.specializations.map((spec) => (
            <SpecializationBadge key={spec._id} specialization={spec} />
          ))}
        </div>
      )
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
