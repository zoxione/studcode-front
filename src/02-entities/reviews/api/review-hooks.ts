import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { Review } from "../model/types"
import { CreateReview, GetAllReviewsFilter } from "./types"
import { reviewAPI } from "./review-api"

const useCreateOneReviewMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (review: CreateReview) => {
      return reviewAPI.createOne(review)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      await fetch(`/api/revalidate?tag=reviews`)
    },
  })
}

const useGetAllReviewsQuery = (filter: GetAllReviewsFilter) => {
  const { page, limit, search, order } = filter
  return useQuery({
    queryKey: ["reviews", page, limit, search, order],
    queryFn: () => reviewAPI.getAll(filter),
  })
}

const useGetOneByIdReviewQuery = (id: string) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: () => reviewAPI.getOneById(id),
  })
}

const useUpdateOneByIdReviewMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, review }: { id: string; review: Review }) => {
      return reviewAPI.updateOneById(id, review)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      await fetch(`/api/revalidate?tag=reviews`)
    },
  })
}

const useDeleteOneByIdReviewMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => {
      return reviewAPI.deleteOneById(id)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      await fetch(`/api/revalidate?tag=reviews`)
    },
  })
}

export {
  useCreateOneReviewMutation,
  useGetAllReviewsQuery,
  useGetOneByIdReviewQuery,
  useUpdateOneByIdReviewMutation,
  useDeleteOneByIdReviewMutation,
}
