import { parseJwt } from "./parse-jwt"

const isTokenValid = (token: string): boolean => {
  if (!token) {
    return false
  }
  const decodedToken = parseJwt(token)
  if (decodedToken === null) {
    return false
  }
  const nowUnix = (+new Date() / 1e3) | 0
  return decodedToken.exp > nowUnix
}

export { isTokenValid }
