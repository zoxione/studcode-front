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
  const { page, limit, search, order, project_id } = filter
  return useQuery({
    queryKey: ["reviews", page, limit, search, order, project_id],
    queryFn: () => reviewAPI.getAll(filter),
  })
}

const useGetOneReviewQuery = (key: string) => {
  return useQuery({
    queryKey: ["reviews", key],
    queryFn: () => reviewAPI.getOne(key),
  })
}

const useUpdateOneReviewMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key, review }: { key: string; review: Review }) => {
      return reviewAPI.updateOne(key, review)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      await fetch(`/api/revalidate?tag=reviews`)
    },
  })
}

const useDeleteOneReviewMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (key: string) => {
      return reviewAPI.deleteOne(key)
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
  useGetOneReviewQuery,
  useUpdateOneReviewMutation,
  useDeleteOneReviewMutation,
}
