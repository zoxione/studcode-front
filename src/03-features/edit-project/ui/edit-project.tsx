"use client"

import { InfoIcon } from "lucide-react"

import { Skeleton } from "@/01-shared/ui/skeleton"
import { useGetOneProjectQuery } from "@/02-entities/project"
import { EditProjectForm } from "./edit-project-form"

interface EditProjectProps {
  projectId: string
}

const EditProject = ({ projectId }: EditProjectProps) => {
  const { data: project, status } = useGetOneProjectQuery(projectId)

  if (status === "pending") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 auto-rows-min gap-8 lg:gap-16">
        <aside className="flex lg:flex-col gap-2 lg:sticky lg:top-[90px] lg:h-fit">
          {Array(4)
            .fill(0)
            .map((_, i) => i + 1)
            .map((index) => (
              <Skeleton key={index} className="h-7 w-full"></Skeleton>
            ))}
        </aside>
        <section className="col-span-1 lg:col-span-3 h-full">
          <div className="space-y-6">
            {Array(10)
              .fill(0)
              .map((_, i) => i + 1)
              .map((index) => (
                <div key={index} className="space-y-1">
                  <Skeleton className="h-3 w-2/6" />
                  <Skeleton className="h-8 w-full" />
                </div>
              ))}
          </div>
        </section>
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

  return <EditProjectForm project={project} />
}

export { EditProject }
