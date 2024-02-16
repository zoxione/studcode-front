"use client"

import { Flame } from "lucide-react"
import { MouseEvent } from "react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"

import { Button } from "@/01-shared/ui/Button"
import { Project, useVoteOneByIdProjectMutation } from "@/02-entities/project"

interface VoteButtonProps {
  id: string
  flames: number
}

const VoteButton = ({ id, flames }: VoteButtonProps) => {
  const { data: session } = useSession()
  const { mutate: voteOneProject } = useVoteOneByIdProjectMutation()

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!session) {
      toast.error("Необходимо авторизоваться")
      return
    }

    voteOneProject(id)
  }

  return (
    <Button onClick={handleButtonClick} variant="outline" size="icon" className="flex flex-col h-10 w-8">
      <Flame className="h-4 w-4" />
      <span className="text-[10px] leading-normal">{flames}</span>
    </Button>
  )
}

export { VoteButton }
