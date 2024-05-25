"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useDeleteUser } from "../lib/use-delete-user"

interface DeleteUserButtonProps extends ButtonProps {
  userId: string
}

const DeleteUserButton = ({ userId, ...props }: DeleteUserButtonProps) => {
  const { handleDelete, isLoading } = useDeleteUser({ userId })

  return (
    <Button onClick={handleDelete} variant="destructive" disabled={isLoading} {...props}>
      {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Удалить"}
    </Button>
  )
}

export { DeleteUserButton }
