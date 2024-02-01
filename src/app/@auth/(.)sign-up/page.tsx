"use client"

import { GitHubLogoIcon, EnvelopeClosedIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/01-shared/ui/Button"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/01-shared/ui/Dialog"

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
        <div className="flex flex-col gap-3">
          <Button variant="secondary" className="relative" disabled>
            <GitHubLogoIcon className="absolute left-3 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="secondary" className="relative" asChild>
            <Link href="/sign-up/email">
              <EnvelopeClosedIcon className="absolute left-3 h-4 w-4" />
              Почта
            </Link>
          </Button>
        </div>
        <DialogFooter className="text-center">
          Регистрируясь, вы соглашаетесь с
          <Button asChild variant="link" size="none">
            <Link href={`/`} target="_blank">
              условиями использования
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
