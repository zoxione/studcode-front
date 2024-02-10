import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

import { User } from "@/02-entities/user"

import { authAPI } from "./auth-api"
import { RegisterUser, SignIn } from "./types"


const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  const { mutate: login } = useLoginMutation()
  let registerUser: RegisterUser
  return useMutation({
    mutationFn: (user: RegisterUser) => {
      registerUser = user
      return authAPI.register(user)
    },
    onSuccess: (user: User) => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] })
      toast.success("Вы зарегистрировались")
      login({ email: registerUser.email, password: registerUser.password })
      window.location.href = "/"
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
      // router.push("/")
      window.location.href = "/"
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

const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: () => {
      return authAPI.logout()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] })
      // router.push("/")
      window.location.href = "/"
    },
  })
}

export { useRegisterMutation, useLoginMutation, useWhoamiQuery, useRefreshQuery, useLogoutMutation }
