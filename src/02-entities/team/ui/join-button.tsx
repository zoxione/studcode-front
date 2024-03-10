"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

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
    <Button onClick={handleButton} disabled={status === "pending"} {...props}>
      {status === "pending" ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : "Вступить"}
    </Button>
  )
}

export { JoinButton }
