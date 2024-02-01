import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { RegisterUser, SignIn } from "./types"
import { authAPI } from "./auth-api"

const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (user: RegisterUser) => {
      return authAPI.register(user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] })
    },
  })
}

const useLoginMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (user: SignIn) => {
      return authAPI.login(user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] })
      toast.success("Вы вошли в аккаунт")
      router.push("/")
    },
  })
}

const useWhoamiQuery = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authAPI.whoami(),
    retry: 1,
  })
}

const useRefreshQuery = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authAPI.refresh(),
  })
}

const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: () => {
      return authAPI.logout()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] })
      router.push("/")
    },
  })
}

export { useRegisterMutation, useLoginMutation, useWhoamiQuery, useRefreshQuery, useLogoutMutation }
