import { useWhoamiQuery } from "../api/auth-hooks"

const useSession = () => {
  return useWhoamiQuery()
}

export { useSession }
