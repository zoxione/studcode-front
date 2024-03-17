"use client"

import { ReloadIcon } from "@radix-ui/react-icons"

import { Button, ButtonProps } from "@/01-shared/ui/button"
import { useVerifyEmailUser } from "../lib/use-verify-email-user"

interface VerifyEmailUserButtonProps extends ButtonProps {}

const VerifyEmailUserButton = ({ ...props }: VerifyEmailUserButtonProps) => {
  const { handleVerifyEmail, isLoading } = useVerifyEmailUser({})

  return (
    <Button onClick={(e) => handleVerifyEmail(e)} variant="secondary" size="sm" disabled={isLoading} {...props}>
      {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : "Подтвердить почту"}
    </Button>
  )
}

export { VerifyEmailUserButton }
