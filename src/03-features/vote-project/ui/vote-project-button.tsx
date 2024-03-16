"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Flame } from "lucide-react"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useVoteProject } from "../lib/use-vote-project"

interface VoteProjectButtonProps extends ButtonProps {
  projectId: string
}

const VoteProjectButton = ({ projectId, ...props }: VoteProjectButtonProps) => {
  const { handleVote, isLoading, project } = useVoteProject({ projectId })

  if (!project) {
    return null
  }

  return (
    <Button
      onClick={(e) => handleVote(e)}
      variant="outline"
      size="icon"
      className="group flex flex-col h-10 w-8"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ReloadIcon className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {project.voted ? (
            <Flame className="h-4 w-4 stroke-2 fill-primary stroke-primary/90 animate-in zoom-in duration-200 group-hover:scale-110" />
          ) : (
            <Flame className="h-4 w-4 stroke-2 animate-in zoom-in duration-200 group-hover:scale-110" />
          )}
          <span className="text-[10px] leading-normal">{project.flames}</span>
        </>
      )}
    </Button>
  )
}

export { VoteProjectButton }
