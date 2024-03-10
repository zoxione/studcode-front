"use client"

import { useRouter } from "next/navigation"

import { Button, ButtonProps } from "@/01-shared/ui/Button"

function BackPageButton({ children, ...props }: ButtonProps) {
  const router = useRouter()
  return (
    <Button onClick={() => router.back()} {...props}>
      {children}
    </Button>
  )
}

export { BackPageButton }
