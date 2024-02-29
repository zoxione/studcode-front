import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { User } from "@/02-entities/user"
import { authAPI } from "./auth-api"
import { RegisterUser } from "./types"

const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  let registerUser: RegisterUser
  return useMutation({
    mutationFn: (user: RegisterUser) => {
      registerUser = user
      return authAPI.register(user)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["auth-user"] })
      await fetch(`/api/revalidate?tag=auth-user`)
      toast.success("Вы успешно зарегистрировались")
    },
  })
}

// const useLoginMutation = () => {
//   const queryClient = useQueryClient()
//   const router = useRouter()
//   return useMutation({
//     mutationFn: (user: SignIn) => {
//       return authAPI.login(user)
//     },
//     onSuccess: async () => {
//       queryClient.invalidateQueries({ queryKey: ["auth-user"] })
//       const res = await fetch(`/api/revalidate?tag=auth-user`)
//       toast.success("Вы вошли в аккаунт")
//       // router.push("/")
//       window.location.href = "/"
//     },
//   })
// }

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

// const useLogoutMutation = () => {
//   const queryClient = useQueryClient()
//   const router = useRouter()
//   return useMutation({
//     mutationFn: () => {
//       return authAPI.logout()
//     },
//     onSuccess: async () => {
//       queryClient.invalidateQueries({ queryKey: ["auth-user"] })
//       const res = await fetch(`/api/revalidate?tag=auth-user`)
//       // router.push("/")
//       window.location.href = "/"
//     },
//   })
// }

export { useRefreshQuery, useRegisterMutation, useWhoamiQuery }
