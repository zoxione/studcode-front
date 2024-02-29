import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Tag } from "../model/types"
import { GetAllTagsFilter } from "./types"
import { tagAPI } from "./tag-api"

const useGetAllTagsQuery = (filter: GetAllTagsFilter) => {
  const { page, limit, search, order } = filter
  return useQuery({
    queryKey: ["tags", page, limit, search, order],
    queryFn: () => tagAPI.getAll(filter),
  })
}

const useGetOneByIdTagQuery = (id: string) => {
  return useQuery({
    queryKey: ["tags", id],
    queryFn: () => tagAPI.getOneById(id),
  })
}

const useGetOneBySlugTagQuery = (slug: string) => {
  return useQuery({
    queryKey: ["tags", slug],
    queryFn: () => tagAPI.getOneBySlug(slug),
  })
}

const useUpdateOneByIdTagMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, tag }: { id: string; tag: Tag }) => {
      return tagAPI.updateOneById(id, tag)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] })
      await fetch(`/api/revalidate?tag=tags`)
    },
  })
}

const useDeleteOneByIdTagMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => {
      return tagAPI.deleteOneById(id)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] })
      await fetch(`/api/revalidate?tag=tags`)
    },
  })
}

export {
  useGetAllTagsQuery,
  useGetOneByIdTagQuery,
  useGetOneBySlugTagQuery,
  useUpdateOneByIdTagMutation,
  useDeleteOneByIdTagMutation,
}
