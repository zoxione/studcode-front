"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useJoinTeam } from "../lib/use-join-team"

interface JoinTeamButtonProps extends ButtonProps {
  teamName: string
  userId: string
}

const JoinTeamButton = ({ teamName, userId, ...props }: JoinTeamButtonProps) => {
  const { handleJoin, isLoading } = useJoinTeam({ teamName, userId })

  return (
    <Button onClick={handleJoin} disabled={isLoading} {...props}>
      {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Вступить"}
    </Button>
  )
}

export { JoinTeamButton }
