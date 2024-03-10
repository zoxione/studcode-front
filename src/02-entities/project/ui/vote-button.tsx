"use client"

import { Flame } from "lucide-react"
import { MouseEvent } from "react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { ReloadIcon } from "@radix-ui/react-icons"

import { Button } from "@/01-shared/ui/Button"
import { useVoteOneProjectMutation } from "../api/project-hooks"

interface VoteButtonProps {
  id: string
  flames: number
}

const VoteButton = ({ id, flames }: VoteButtonProps) => {
  const { data: session } = useSession()
  const { mutate: voteOneProject, status } = useVoteOneProjectMutation()

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!session) {
      toast.error("Необходимо авторизоваться")
      return
    }
    voteOneProject(id)
  }

  return (
    <Button
      onClick={handleButtonClick}
      variant="outline"
      size="icon"
      className="flex flex-col h-10 w-8"
      disabled={status === "pending"}
    >
      <Flame className="h-4 w-4" />
      <span className="text-[10px] leading-normal">
        {status === "pending" ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : flames}
      </span>
    </Button>
  )
}

export { VoteButton }
