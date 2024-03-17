"use client"

import { EditIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"

import { Button, ButtonProps } from "@/01-shared/ui/button"

interface EditProjectButtonProps extends ButtonProps {
  projectSlug: string
}

const EditProjectButton = ({ projectSlug, ...props }: EditProjectButtonProps) => {
  const router = useRouter()

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    router.push(`/projects/${projectSlug}/edit`)
  }

  return (
    <Button onClick={(e) => handleClick(e)} variant="ghost" size="icon" {...props}>
      <EditIcon className="w-4 h-4" />
    </Button>
  )
}

export { EditProjectButton }
