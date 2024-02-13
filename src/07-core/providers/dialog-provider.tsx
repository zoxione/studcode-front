"use client"

import { useSearchParams } from "next/navigation"

import { AuthDialog } from "@/04-widgets/auth-dialog"

const DialogProvider = () => {
  const searchParams = useSearchParams()
  const dialogType = searchParams.get("dialog")
  let dialog = null

  switch (dialogType) {
    case "auth":
      dialog = <AuthDialog />
      break
    default:
      break
  }

  return dialog
}

export { DialogProvider }
