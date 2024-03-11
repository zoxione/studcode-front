import * as z from "zod"

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "./constants"
import { linkSchema } from "@/01-shared/types/link"

const fullNameSchema = z.object({
  surname: z
    .string()
    .min(2, { message: "Минимальная длина фамилии - 2 символа" })
    .max(32, { message: "Максимальная длина фамилии - 32 символов" }),
  name: z
    .string()
    .min(2, { message: "Минимальная длина имени - 2 символа" })
    .max(32, { message: "Максимальная длина имени - 32 символов" }),
  patronymic: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(2, { message: "Минимальная длина отчества - 2 символа" })
        .max(32, { message: "Максимальная длина отчества - 32 символов" }),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
})

const userSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Минимальная длина имени - 2 символа" })
    .max(16, { message: "Максимальная длина имени - 16 символов" }),
  email: z.string().email({ message: "Некорректная почта" }),
  password: z
    .string()
    .min(6, { message: "Минимальная длина пароля - 6 символов" })
    .max(24, { message: "Максимальная длина пароля - 24 символов" }),
  full_name: fullNameSchema,
  avatar_file: z
    .any()
    .refine((files) => files?.length == 1, "Аватар необходим.")
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Максимальный размер аватара - 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Принимаются только файлы типа .jpg, .jpeg, .png и .webp.",
    )
    .optional(),
  about: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(2, { message: "Минимальная длина о себе - 2 символа" })
        .max(256, { message: "Максимальная длина о себе - 256 символов" }),
    ])
    .optional()
    .transform((e) => (e === "" ? undefined : e)),
  links: z.array(linkSchema).max(5, {
    message: "Максимальное количество ссылок - 5",
  }),
})

export { fullNameSchema, userSchema }
