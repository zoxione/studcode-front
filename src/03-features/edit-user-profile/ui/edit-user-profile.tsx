"use client"

import { InfoIcon } from "lucide-react"

import { Skeleton } from "@/01-shared/ui/skeleton"
import { useGetOneUserFilesQuery, useGetOneUserQuery } from "@/02-entities/user"
import { EditUserProfileForm } from "./edit-user-profile-form"

interface EditUserProfileProps {
  userId: string
}

const EditUserProfile = ({ userId }: EditUserProfileProps) => {
  const { data: user, status: userStatus } = useGetOneUserQuery(userId)
  const { data: files, status: filesStatus } = useGetOneUserFilesQuery(userId)

  if (userStatus === "pending" || filesStatus === "pending") {
    return (
      <div className="space-y-4">
        <Skeleton className="h-36 w-full" />
        <div className="flex items-center gap-6">
          <Skeleton className="shrink-0 h-24 w-24 rounded-full" />
          <div className="flex flex-col gap-1 w-full">
            <Skeleton className="h-5 w-3/6" />
            <Skeleton className="h-5 w-3/6" />
          </div>
        </div>
        {Array(3)
          .fill(0)
          .map((_, i) => i + 1)
          .map((index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-2/6" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        <div className="space-y-4">
          <Skeleton className="h-7 w-2/5" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-2/6" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
        {Array(3)
          .fill(0)
          .map((_, i) => i + 1)
          .map((index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-2/6" />
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-9 w-full" />
            </div>
          ))}
        <Skeleton className="h-9 w-48" />
      </div>
    )
  }

  if (userStatus === "error" || filesStatus === "error") {
    return (
      <div className="flex flex-col justify-center items-center">
        <InfoIcon className="w-6 h-6 text-primary" />
        <p className="text-sm text-muted-foreground">Возникла неизвестная ошибка.</p>
      </div>
    )
  }

  return <EditUserProfileForm user={user} files={files} />
}

export { EditUserProfile }
