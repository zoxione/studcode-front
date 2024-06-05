"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/01-shared/ui/card"
import { Dialog, DialogContent } from "@/01-shared/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/01-shared/ui/tabs"
import { SignInForm, SignUpForm } from "@/03-features/auth"

const AuthDialog = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleClose = () => {
    router.push(pathname, { scroll: false })
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-[380px] sm:max-h-[90vh] overflow-y-auto"
        withBackButton={false}
        onCloseButton={handleClose}
        onCloseAutoFocus={handleClose}
        onEscapeKeyDown={handleClose}
        onPointerDownOutside={handleClose}
        onInteractOutside={handleClose}
      >
        <Tabs defaultValue="sign-in" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Авторизация</TabsTrigger>
            <TabsTrigger value="sign-up">Регистрация</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Авторизация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SignInForm />
                <p className="text-center text-sm text-muted-foreground">
                  Входя в систему или регистрируясь в ней, вы принимаете нашу{" "}
                  <Link href="/privacy" target="_blank" className="underline underline-offset-4 hover:text-primary">
                    Политику конфиденциальности
                  </Link>
                  .
                </p>
              </CardContent>
              {/* <CardFooter className="justify-center text-center">
                <Button variant="link" size="none" asChild>
                  <Link href={`/`}>Забыли пароль?</Link>
                </Button>
              </CardFooter> */}
            </Card>
          </TabsContent>
          <TabsContent value="sign-up">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Регистрация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SignUpForm />
                <p className="text-center text-sm text-muted-foreground">
                  Входя в систему или регистрируясь в ней, вы принимаете нашу{" "}
                  <Link href="/privacy" target="_blank" className="underline underline-offset-4 hover:text-primary">
                    Политику конфиденциальности
                  </Link>
                  .
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export { AuthDialog }
