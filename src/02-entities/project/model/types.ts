import * as z from "zod"

import { ILink } from "@/01-shared/types/link"
import { Tag } from "@/02-entities/tag"
import { UserFullName } from "@/02-entities/user"
import { projectSchema } from "./schema"

type ProjectPrice = z.infer<typeof projectSchema>["price"]

type ProjectStatus = z.infer<typeof projectSchema>["status"]

type ProjectType = z.infer<typeof projectSchema>["type"]

interface ProjectLinks {
  main: string
  github: string
  demo: string
}

interface ProjectCreator {
  _id: string
  username: string
  avatar: string
  full_name: UserFullName
}

interface ProjectTeam {
  _id: string
  name: string
  logo: string
  slug: string
}

interface Project {
  _id: string
  title: string
  tagline: string
  status: ProjectStatus
  type: ProjectType
  description: string
  flames: number
  links: ILink[]
  logo: string
  screenshots: string[]
  price: ProjectPrice
  rating: number
  slug: string
  creator: ProjectCreator
  team: ProjectTeam | null
  tags: Tag[]
  created_at: string
  updated_at: string
  voted: boolean
}

export type { Project, ProjectPrice, ProjectStatus, ProjectLinks, ProjectType, ProjectCreator }
