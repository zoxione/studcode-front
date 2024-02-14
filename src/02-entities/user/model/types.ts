type UserRole = "user" | "admin"

interface UserFullName {
  surname: string
  name: string
  patronymic: string
}

interface UserLinks {
  github: string
  vkontakte: string
  telegram: string
}

interface User {
  _id: string
  username: string
  email: string
  password: string
  role: UserRole
  refresh_token: string
  full_name: UserFullName
  avatar: string
  about: string
  links: UserLinks
  awards: any[] // TODO
  projects: any[] // TODO
  created_at: string
  updated_at: string
}

export type { User, UserFullName, UserLinks, UserRole }
