interface RegisterUser {
  username: string
  email: string
  password: string
}

interface SignIn {
  email: string
  password: string
}

interface SignInResponse {
  access_token: string
  refresh_token: string
}

interface SessionUser {
  _id: string
  username: string
  email: string
  avatar: string
}

interface RefreshResponse {
  access_token: string
  refresh_token: string
}

interface LogoutResponse {
  message: string
}

export type { RegisterUser, SignIn, SignInResponse, SessionUser, RefreshResponse, LogoutResponse }
