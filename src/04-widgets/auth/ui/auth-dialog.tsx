"use client"

import Link from "next/link"
import { Button } from "@/01-shared/ui/Button"
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/01-shared/ui/Dialog"
import { Input } from "@/01-shared/ui/Input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { SignUpForm } from "@/03-features/sign-up"
import { SignInForm } from "@/03-features/sign-in"
import { EnvelopeClosedIcon, GitHubLogoIcon } from "@radix-ui/react-icons"

const AuthDialog = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const modal = searchParams.get("modal")
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const onClose = useCallback(() => {
    router.push(pathname, { scroll: false })
  }, [pathname, router])

  const onBack = useCallback(() => {
    router.back()
  }, [router])

  let dialogContent = (
    <DialogContent
      className="sm:max-w-[380px]"
      withBackButton={false}
      onCloseButton={onClose}
      onEscapeKeyDown={onClose}
      onPointerDownOutside={onClose}
    >
      <DialogTitle className="text-center">Вход в аккаунт</DialogTitle>
      <div className="flex flex-col gap-3">
        <Button variant="secondary" className="relative" disabled>
          <GitHubLogoIcon className="absolute left-3 h-4 w-4" />
          GitHub
        </Button>
        <Button variant="secondary" className="relative" asChild>
          <Link href={`${pathname}?modal=auth/email`} scroll={false}>
            <EnvelopeClosedIcon className="absolute left-3 h-4 w-4" />
            Почта
          </Link>
        </Button>
      </div>
      <DialogFooter className="text-center">
        Нет аккаунта?{" "}
        <Button asChild variant="link" size="none">
          <Link href={`${pathname}?modal=auth/signup`} scroll={false}>
            Регистрация
          </Link>
        </Button>
      </DialogFooter>
    </DialogContent>
  )
  if (modal === "auth/email") {
    dialogContent = (
      <DialogContent
        className="sm:max-w-[380px]"
        onBackButton={onBack}
        onCloseButton={onClose}
        onEscapeKeyDown={onClose}
        onPointerDownOutside={onClose}
      >
        <DialogTitle className="text-center">Вход в аккаунт</DialogTitle>
        <SignInForm />
        <DialogFooter className="text-center">
          <Button asChild variant="link" size="none">
            <Link href={`/`} scroll={false}>
              Забыли пароль?
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    )
  } else if (modal === "auth/signup") {
    dialogContent = (
      <DialogContent
        className="sm:max-w-[380px]"
        onBackButton={onBack}
        onCloseButton={onClose}
        onEscapeKeyDown={onClose}
        onPointerDownOutside={onClose}
      >
        <DialogTitle className="text-center">Регистрация</DialogTitle>
        <div className="flex flex-col gap-3">
          <Button variant="secondary" className="relative" disabled>
            <GitHubLogoIcon className="absolute left-3 h-4 w-4" />
            GitHub
          </Button>
          <Button variant="secondary" className="relative" asChild>
            <Link href={`${pathname}?modal=auth/signup/email`} scroll={false}>
              <EnvelopeClosedIcon className="absolute left-3 h-4 w-4" />
              Почта
            </Link>
          </Button>
        </div>
        <DialogFooter className="text-center">
          Регистрируясь, вы соглашаетесь с
          <Button asChild variant="link" size="none">
            <Link href={`/`} scroll={false} target="_blank">
              условиями использования
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    )
  } else if (modal === "auth/signup/email") {
    dialogContent = (
      <DialogContent
        className="sm:max-w-[380px]"
        onBackButton={onBack}
        onCloseButton={onClose}
        onEscapeKeyDown={onClose}
        onPointerDownOutside={onClose}
      >
        <DialogTitle className="text-center">Регистрация</DialogTitle>
        <SignUpForm />
      </DialogContent>
    )
  }

  return <Dialog open={isOpen}>{dialogContent}</Dialog>
}

export { AuthDialog }
