"use client"

import { Project, ProjectCard } from "@/02-entities/project"
import { projectAPI } from "@/02-entities/project/api/project-api"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface ProjectsListProps {
  className?: string
  initialProjects: Project[]
}

let page = 1

export const ProjectsList = ({ initialProjects }: ProjectsListProps) => {
  const [projectsData, setProjectsData] = useState<Project[]>(initialProjects)
  const [isLoading, setIsLoading] = useState(true)

  console.log(initialProjects)
  console.log(projectsData)

  const [ref, inView] = useInView()

  // useEffect(() => {
  //   if (inView) {
  //     console.log("fetch more projects")
  //     setIsLoading(true)
  //     const delay = 500

  //     const timeoutId = setTimeout(async () => {
  //       const { data, error } = await projectsAPI.getAll({ page: page })
  //       const projects = data?.data ? data.data : []
  //       setProjectsData((prev) => [...prev, ...projects])
  //       page++
  //       setIsLoading(false)
  //     }, delay)

  //     return () => clearTimeout(timeoutId)
  //   }
  // }, [inView])

  return (
    <div className="flex flex-col gap-4">
      {initialProjects.map((project, index) => {
        if (index === initialProjects.length - 1) {
          return <ProjectCard key={project._id} project={project} ref={ref} />
        } else {
          return <ProjectCard key={project._id} project={project} />
        }
      })}
    </div>
  )
}
