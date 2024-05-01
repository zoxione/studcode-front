import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useSession } from "next-auth/react"

import { User } from "../model/types"
import { GetAllUsersFilter, UpdateUser, UserFiles } from "./types"
import { userAPI } from "./user-api"

const useGetAllUsersQuery = (filter: GetAllUsersFilter & { enabled?: boolean }) => {
  const { page, limit, search, order } = filter
  return useQuery({
    queryKey: ["users", page, limit, search, order],
    queryFn: () => userAPI.getAll(filter),
    enabled: filter.enabled,
  })
}

const useGetOneUserQuery = (key: string) => {
  return useQuery({
    queryKey: ["users", key],
    queryFn: () => userAPI.getOne(key),
  })
}

const useUpdateOneUserMutation = () => {
  const queryClient = useQueryClient()
  const { update } = useSession()
  return useMutation({
    mutationFn: ({ key, user }: { key: string; user: UpdateUser }) => {
      return userAPI.updateOne(key, user)
    },
    onSuccess: async (user: User) => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      await fetch(`/api/revalidate?tag=users`)
      queryClient.invalidateQueries({ queryKey: ["auth-user"] })
      await fetch(`/api/revalidate?tag=auth-user`)
      update({ _id: user._id, email: user.email, avatar: user.avatar, username: user.username })
    },
  })
}

// const useDeleteOneUserMutation = () => {
//   const queryClient = useQueryClient()
//   return useMutation({
//     mutationFn: (key: string) => {
//       return userAPI.deleteOne(key)
//     },
//     onSuccess: async () => {
//       queryClient.invalidateQueries({ queryKey: ["users"] })
//       await fetch(`/api/revalidate?tag=users`)
//     },
//   })
// }

const useUploadsOneUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key, files }: { key: string; files: UserFiles }) => {
      return userAPI.uploadsOne(key, files)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      await fetch(`/api/revalidate?tag=users`)
    },
  })
}

export { useGetAllUsersQuery, useGetOneUserQuery, useUpdateOneUserMutation, useUploadsOneUserMutation }
