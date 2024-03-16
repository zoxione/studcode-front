"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useLeaveTeam } from "../lib/use-leave-team"

interface LeaveTeamButtonProps extends ButtonProps {
  teamName: string
  userId: string
}

const LeaveTeamButton = ({ teamName, userId, ...props }: LeaveTeamButtonProps) => {
  const { handleLeave, isLoading } = useLeaveTeam({ teamName, userId })

  return (
    <Button onClick={handleLeave} disabled={isLoading} {...props}>
      {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Выйти"}
    </Button>
  )
}

export { LeaveTeamButton }
