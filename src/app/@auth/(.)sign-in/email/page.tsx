"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"

import { Button } from "@/01-shared/ui/Button"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/01-shared/ui/Dialog"
import { SignInForm } from "@/03-features/sign-in"

export default function Page() {
  const router = useRouter()
  const pathname = usePathname()
  console.log(pathname)

  return (
    <Dialog open={pathname === "/sign-in/email"}>
      <DialogContent
        className="sm:max-w-[380px]"
        onBackButton={() => router.back()}
        onCloseButton={() => router.push("/")}
        onEscapeKeyDown={() => router.push("/")}
        onPointerDownOutside={() => router.push("/")}
      >
        <DialogTitle className="text-center">Вход в аккаунт</DialogTitle>
        <SignInForm />
        <DialogFooter className="text-center">
          <Button asChild variant="link" size="none">
            <Link href={`/`}>Забыли пароль?</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
