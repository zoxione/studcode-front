import * as z from "zod"

type LinkType = "main" | "github" | "gitlab" | "vk" | "telegram" | "discord" | "youtube" | "other"

interface ILink {
  type: LinkType
  label: string
  url: string
}

const linkTypeValues = ["main", "github", "gitlab", "vk", "telegram", "discord", "youtube", "other"] as const

const linkSchema = z.object({
  type: z.enum(linkTypeValues),
  label: z
    .string()
    .min(2, { message: "Метка должна иметь больше 1 символа" })
    .max(24, { message: "Метка должна иметь меньше 25 символов" }),
  url: z.string().url({ message: "Некорректная ссылка" }),
})

export type { ILink, LinkType }
export { linkSchema, linkTypeValues }
