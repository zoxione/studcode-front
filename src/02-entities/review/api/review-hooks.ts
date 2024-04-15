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
  const { page, limit, search, order, project_id, user_id } = filter
  return useQuery({
    queryKey: ["reviews", page, limit, search, order, project_id, user_id],
    queryFn: () => reviewAPI.getAll(filter),
  })
}

const useGetOneMyReviewQuery = (
  filter: Pick<GetAllReviewsFilter, "project_id" | "user_id"> & { enabled?: boolean },
) => {
  const { project_id, user_id } = filter
  return useQuery({
    queryKey: ["reviews", project_id, user_id],
    queryFn: () => reviewAPI.getAll({ project_id: filter.project_id, user_id: filter.user_id }),
    enabled: filter.enabled,
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

const useLikeOneReviewMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (key: string) => {
      return reviewAPI.likeOne(key)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      await fetch(`/api/revalidate?tag=reviews`)
    },
  })
}

const useDislikeOneReviewMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (key: string) => {
      return reviewAPI.dislikeOne(key)
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
  useLikeOneReviewMutation,
  useDislikeOneReviewMutation,
  useGetOneMyReviewQuery,
}
