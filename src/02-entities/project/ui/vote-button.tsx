"use client"

import { ReloadIcon } from "@radix-ui/react-icons"
import { Flame } from "lucide-react"
import { useSession } from "next-auth/react"
import { MouseEvent } from "react"
import { toast } from "sonner"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useVoteOneProjectMutation } from "../api/project-hooks"

interface VoteButtonProps extends ButtonProps {
  id: string
  flames: number
  voted: boolean
}

const VoteButton = ({ id, flames, voted, ...props }: VoteButtonProps) => {
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
      className="group flex flex-col h-10 w-8"
      disabled={status === "pending"}
      {...props}
    >
      {status === "pending" ? (
        <ReloadIcon className="h-3 w-3 animate-spin" />
      ) : (
        <>
          <Flame
            className={`h-4 w-4 stroke-2 ${
              voted ? "fill-primary stroke-primary/90" : ""
            } animate-in zoom-in duration-200 group-hover:scale-110`}
          />
          <span className="text-[10px] leading-normal">{flames}</span>
        </>
      )}
    </Button>
  )
}

export { VoteButton }
