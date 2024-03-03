"use client"

import { Button, ButtonProps } from "@/01-shared/ui/Button"
import { useAddMemberTeamMutation } from "../api/team-hooks"

interface JoinButtonProps extends ButtonProps {
  teamName: string
  userId: string
}

const JoinButton = ({ children, teamName, userId, ...props }: JoinButtonProps) => {
  const { mutate: addMember, status } = useAddMemberTeamMutation()

  const handleButton = () => {
    addMember({
      key: teamName,
      userId: userId,
      role: "member",
    })
  }

  return (
    <Button {...props} onClick={handleButton}>
      Вступить
    </Button>
  )
}

export { JoinButton }
