import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { RecursivePartial } from "@/01-shared/utils/recursive-partial"

import { User } from "../model/types"

import { GetAllUsersFilter, UserFiles } from "./types"
import { userAPI } from "./user-api"

const useGetAllUsersQuery = (filter: GetAllUsersFilter) => {
  const { page, limit, search, order } = filter
  return useQuery({
    queryKey: ["users", page, limit, search, order],
    queryFn: () => userAPI.getAll(filter),
  })
}

const useGetOneByIdUserQuery = (id: string) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => userAPI.getOne(id),
  })
}

const useUpdateOneByIdUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: RecursivePartial<User> }) => {
      return userAPI.updateOneById(id, user)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      const res = await fetch(`/api/revalidate?tag=users`)
      toast.success("Данные успешно обновлены")
    },
  })
}

const useUploadsOneByIdUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, files }: { id: string; files: UserFiles }) => {
      return userAPI.uploadsOneById(id, files)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user"] })
      const res = await fetch(`/api/revalidate?tag=user`)
    },
  })
}

const useDeleteOneByIdUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => {
      return userAPI.deleteOneById(id)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      const res = await fetch(`/api/revalidate?tag=users`)
    },
  })
}

export {
  useGetAllUsersQuery,
  useGetOneByIdUserQuery,
  useUpdateOneByIdUserMutation,
  useUploadsOneByIdUserMutation,
  useDeleteOneByIdUserMutation,
}
