import { projectSchema } from "@/02-entities/project"

const editProjectSchema = projectSchema.pick({
  title: true,
  tagline: true,
  description: true,
  main_link: true,
  github_link: true,
  youtube_link: true,
  logo_file: true,
  screenshots_files: true,
  price: true,
  tags: true,
  team: true,
})

export { editProjectSchema }
