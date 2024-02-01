import { ChevronLeftIcon, Cross2Icon } from "@radix-ui/react-icons"
import Link from "next/link"

import { Button } from "@/01-shared/ui/Button"
import { Title } from "@/01-shared/ui/Title"
import { SignUpForm } from "@/03-features/sign-up"

export default function Page() {
  return (
    <div className="fixed left-[50%] top-[50%] z-50 grid w-full h-full sm:h-fit translate-x-[-50%] translate-y-[-50%] gap-8 border bg-background p-9 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-[380px]">
      <Button className="absolute left-4 top-4" size="none" variant="ghost" asChild>
        <Link href="/sign-up">
          <ChevronLeftIcon className="h-4 w-4" />
          <span className="sr-only">Back</span>
        </Link>
      </Button>
      <Button className="absolute right-4 top-4" size="none" variant="ghost" asChild>
        <Link href="/">
          <Cross2Icon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Link>
      </Button>
      <Title className="text-lg font-semibold leading-none tracking-tight text-center">Регистрация</Title>
      <SignUpForm />
    </div>
  )
}
