import * as z from "zod"

import { projectSchema } from "@/02-entities/project"

const editProjectSchema = projectSchema
  .pick({
    title: true,
    tagline: true,
    type: true,
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
  .merge(
    z.object({
      confirm: z.literal(true, {
        errorMap: () => ({ message: "Необходимо подтвердить." }),
      }),
    }),
  )

export { editProjectSchema }
