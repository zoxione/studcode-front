import { Tag } from "@/02-entities/tag"
import { UserFullName } from "@/02-entities/user"

type ProjectPrice = "free" | "free_options" | "payment_required"

type ProjectStatus = "draft" | "published" | "archived" | ""

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

interface Project {
  _id: string
  title: string
  tagline: string
  status: ProjectStatus
  description: string
  flames: number
  links: ProjectLinks
  logo: string
  screenshots: string[]
  price: ProjectPrice
  rating: number
  tags: Tag[]
  creator: ProjectCreator
  slug: string
  created_at: string
  updated_at: string
}

export type { Project, ProjectPrice, ProjectStatus, ProjectLinks, ProjectCreator }
