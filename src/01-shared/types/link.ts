import * as z from "zod"

type LinkType = "main" | "github" | "gitlab" | "vk" | "telegram" | "discord" | "youtube" | "other"

interface ILink {
  type: LinkType
  label: string
  url: string
}

const linkSchema = z.object({
  type: z.enum(["main", "github", "gitlab", "vk", "telegram", "discord", "youtube", "other"]),
  label: z
    .string()
    .min(2, { message: "Метка должна иметь больше 1 символа" })
    .max(24, { message: "Метка должна иметь меньше 25 символов" }),
  url: z.string().url({ message: "Некорректная ссылкаНекорректная ссылка" }),
})

export type { ILink }
export { linkSchema }
