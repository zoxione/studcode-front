"use client"

import { Flame } from "lucide-react"
import { MouseEvent } from "react"
import { toast } from "sonner"

import { Button } from "@/01-shared/ui/Button"
import { Project, useVoteOneByIdProjectMutation } from "@/02-entities/project"
import { useWhoamiQuery } from "@/02-entities/user"

interface VoteButtonProps {
  project: Project
}

const VoteButton = ({ project }: VoteButtonProps) => {
  const { data: user } = useWhoamiQuery()
  const { mutate: voteOneProject } = useVoteOneByIdProjectMutation()

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!user) {
      toast.error("Необходимо авторизоваться")
    } else {
      voteOneProject(project._id)
    }
  }

  return (
    <Button onClick={handleButtonClick} variant="outline" size="icon" className="flex flex-col h-10 w-8">
      <Flame className="h-4 w-4" />
      <span className="text-[10px] leading-normal">{project.flames}</span>
    </Button>
  )
}

export { VoteButton }
