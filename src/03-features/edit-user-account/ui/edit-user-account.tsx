"use client"

import { InfoIcon } from "lucide-react"

import { Skeleton } from "@/01-shared/ui/skeleton"
import { useGetOneUserQuery } from "@/02-entities/user"
import { EditUserAccountForm } from "./edit-user-account-form"

interface EditUserAccountProps {
  userId: string
}

const EditUserAccount = ({ userId }: EditUserAccountProps) => {
  const { data: user, status } = useGetOneUserQuery(userId)

  if (status === "pending") {
    return (
      <div className="space-y-4">
        {Array(2)
          .fill(0)
          .map((_, i) => i + 1)
          .map((index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-2/6" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-5 w-5/6" />
            </div>
          ))}
        <Skeleton className="h-9 w-48" />
      </div>
    )
  }

  if (status === "error") {
    return (
      <div className="flex flex-col justify-center items-center">
        <InfoIcon className="w-6 h-6 text-primary" />
        <p className="text-sm text-muted-foreground">Возникла неизвестная ошибка.</p>
      </div>
    )
  }

  return <EditUserAccountForm user={user} />
}

export { EditUserAccount }
