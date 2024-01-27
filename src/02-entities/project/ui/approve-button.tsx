"use client"

import { Button } from "@/01-shared/ui/Button"
import { Project, projectAPI } from "@/02-entities/project"
import { Flame } from "lucide-react"
import { MouseEvent } from "react"

interface ApproveButtonProps {
  project: Project
}

const ApproveButton = ({ project }: ApproveButtonProps) => {
  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const projectRes = await projectAPI.approveOneById(project)
  }

  return (
    <Button onClick={handleButtonClick} variant="outline" size="icon" className="flex flex-col h-10 w-8">
      <Flame className="h-4 w-4" />
      <span className="text-[10px] leading-normal">{project.flames}</span>
    </Button>
  )
}

export { ApproveButton }
