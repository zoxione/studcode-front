"use client"

import { useRouter } from "next/navigation"

import { Dialog, DialogContent, DialogTitle } from "@/01-shared/ui/Dialog"
import { SignUpForm } from "@/03-features/sign-up"

export default function Page() {
  const router = useRouter()

  return (
    <Dialog defaultOpen>
      <DialogContent
        className="sm:max-w-[380px]"
        onBackButton={() => router.back()}
        onCloseButton={() => router.push("/")}
        onEscapeKeyDown={() => router.push("/")}
        onPointerDownOutside={() => router.push("/")}
      >
        <DialogTitle className="text-center">Регистрация</DialogTitle>
        <SignUpForm />
      </DialogContent>
    </Dialog>
  )
}
