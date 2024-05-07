import { ILink } from "@/01-shared/types/link"
import { Education } from "@/02-entities/education"
import { Specialization } from "@/02-entities/specialization"

type UserRole = "user" | "admin"

interface UserFullName {
  surname: string
  name: string
  patronymic: string
}

interface User {
  _id: string
  username: string
  email: string
  password: string
  role: UserRole
  verify_email: string
  refresh_token: string
  full_name: UserFullName
  avatar: string
  cover: string
  about: string
  links: ILink[]
  specializations: Specialization[]
  education: Education | null
  created_at: string
  updated_at: string
}

export type { User, UserFullName, UserRole }
