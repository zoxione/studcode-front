import { Tag } from "@/02-entities/tag"

type ProjectPrice = "free" | "free_options" | "payment_required"

type ProjectStatus = "draft" | "published" | "archived"

interface Project {
  _id: string
  title: string
  tagline: string
  status: ProjectStatus
  description: string
  flames: number
  links: {
    main: string
    github: string
    demo: string
  }
  logo: string
  screenshots: string[]
  price: ProjectPrice
  tags: Tag[]
  creator: {
    _id: string
    username: string
    avatar: string
  }
  created_at: string
  updated_at: string
}

export type { Project, ProjectPrice, ProjectStatus }
