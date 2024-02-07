type TokenGeneric = {
  sub: string
  username: string
  email: string
  avatar: string
  iat: number
  exp: number
}

const parseJwt = (token: string): TokenGeneric | null => {
  try {
    return JSON.parse(atob(token.split(".")[1]))
  } catch (e) {
    return null
  }
}

export { parseJwt }
