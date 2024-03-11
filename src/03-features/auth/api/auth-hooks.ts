import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { authAPI } from "./auth-api"
import { RegisterUser } from "./types"

const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: RegisterUser) => {
      return authAPI.register(user)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] })
      await fetch(`/api/revalidate?tag=auth-user`)
    },
  })
}

const useWhoamiQuery = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authAPI.whoami(),
    meta: { slug: "auth-user-whoami-query" },
  })
}

const useRefreshQuery = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authAPI.refresh(),
  })
}

export { useRefreshQuery, useRegisterMutation, useWhoamiQuery }
