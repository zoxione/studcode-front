import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { User } from "../model/types"

import { GetAllUsersFilter } from "./types"
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
    queryFn: () => userAPI.getOneById(id),
  })
}

const useUpdateOneByIdUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, user }: { id: string; user: User }) => {
      return userAPI.updateOneById(id, user)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

const useDeleteOneByIdUserMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => {
      return userAPI.deleteOneById(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export { useGetAllUsersQuery, useGetOneByIdUserQuery, useUpdateOneByIdUserMutation, useDeleteOneByIdUserMutation }
