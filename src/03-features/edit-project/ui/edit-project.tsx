"use client"

import { InfoIcon } from "lucide-react"

import { Skeleton } from "@/01-shared/ui/skeleton"
import { useGetOneProjectFilesQuery, useGetOneProjectQuery } from "@/02-entities/project"
import { EditProjectForm } from "./edit-project-form"
import { MainInfoSectionLoading } from "./main-info-section"

interface EditProjectProps {
  projectId: string
}

const EditProject = ({ projectId }: EditProjectProps) => {
  const { data: project, status: projectStatus } = useGetOneProjectQuery(projectId)
  const { data: files, status: filesStatus } = useGetOneProjectFilesQuery(projectId)

  if (projectStatus === "pending" || filesStatus === "pending") {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-4 auto-rows-min gap-8 lg:gap-16">
        <aside className="flex lg:flex-col gap-2 lg:sticky lg:top-[90px] lg:h-fit">
          {Array(4)
            .fill(0)
            .map((_, i) => i + 1)
            .map((index) => (
              <Skeleton key={index} className="h-8 w-full"></Skeleton>
            ))}
        </aside>
        <section className="col-span-1 lg:col-span-3 h-full space-y-8 mb-8">
          <MainInfoSectionLoading />
        </section>
      </div>
    )
  }

  if (projectStatus === "error" || filesStatus === "error") {
    return (
      <div className="flex flex-col justify-center items-center">
        <InfoIcon className="w-6 h-6 text-primary" />
        <p className="text-sm text-muted-foreground">Возникла неизвестная ошибка.</p>
      </div>
    )
  }

  return <EditProjectForm project={project} files={files} />
}

export { EditProject }
