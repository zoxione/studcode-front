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
      <div className="space-y-6">
        {Array(4)
          .fill(0)
          .map((_, i) => i + 1)
          .map((index) => (
            <div key={index} className="space-y-1">
              <Skeleton className="h-3 w-2/6" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
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
