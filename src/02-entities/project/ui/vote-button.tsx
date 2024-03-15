"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Flame } from "lucide-react"
import { useSession } from "next-auth/react"
import { MouseEvent } from "react"
import { toast } from "sonner"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useGetOneProjectQuery, useVoteOneProjectMutation } from "../api/project-hooks"

interface VoteButtonProps extends ButtonProps {
  project_id: string
}

const VoteButton = ({ project_id, ...props }: VoteButtonProps) => {
  const { data: session } = useSession()
  const { data: project } = useGetOneProjectQuery(project_id)
  const { mutate: voteOneProject, status } = useVoteOneProjectMutation()

  const handleButtonClick = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (!session) {
      toast.error("Необходимо авторизоваться")
      return
    }
    voteOneProject(project_id)
  }

  if (!project) {
    return null
  }

  return (
    <Button
      onClick={handleButtonClick}
      variant="outline"
      size="icon"
      className="group flex flex-col h-10 w-8"
      disabled={status === "pending"}
      {...props}
    >
      {status === "pending" ? (
        <ReloadIcon className="h-3 w-3 animate-spin" />
      ) : (
        <>
          {project.voted ? (
            <Flame
              className={`h-4 w-4 stroke-2 fill-primary stroke-primary/90 animate-in zoom-in duration-200 group-hover:scale-110`}
            />
          ) : (
            <Flame className={`h-4 w-4 stroke-2 animate-in zoom-in duration-200 group-hover:scale-110`} />
          )}
          <span className="text-[10px] leading-normal">{project.flames}</span>
        </>
      )}
    </Button>
  )
}

export { VoteButton }
