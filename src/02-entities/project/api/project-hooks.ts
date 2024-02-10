import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Project } from "../model/types"

import { projectAPI } from "./project-api"
import { CreateProject, GetAllProjectsFilter } from "./types"

const useCreateOneProjectMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (project: CreateProject) => {
      return projectAPI.createOne(project)
    },
    onSuccess: (project: Project) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Проект успешно создан")
      router.push(`/projects/${project._id}`)
    },
  })
}

const useGetAllProjectsQuery = (filter: GetAllProjectsFilter) => {
  const { page, limit, search, order, time_frame, tag_slug, creator_id, status } = filter
  return useQuery({
    queryKey: ["projects", page, limit, search, order, time_frame, tag_slug, creator_id, status],
    queryFn: () => projectAPI.getAll(filter),
  })
}

const useGetAllProjectsInfiniteQuery = (filter: GetAllProjectsFilter) => {
  const { page, limit, search, order, time_frame, tag_slug, creator_id, status } = filter
  return useInfiniteQuery({
    queryKey: ["projects", page, limit, search, order, time_frame, tag_slug, creator_id, status],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const res = await projectAPI.getAll({ ...filter, page: pageParam })
      return res
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPageIndex =
        lastPage.filter.page < lastPage?.info.count_pages - 1 ? (lastPage?.filter.page as number) + 1 : undefined
      return nextPageIndex
    },
  })
}

const useGetOneByIdProjectQuery = (id: string) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => projectAPI.getOneById(id),
  })
}

const useUpdateOneByIdProjectMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, project }: { id: string; project: Project }) => {
      return projectAPI.updateOneById(id, project)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}

const useDeleteOneByIdProjectMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (id: string) => {
      return projectAPI.deleteOneById(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      toast.success("Проект успешно удален")
      router.back()
    },
  })
}

const useVoteOneByIdProjectMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => {
      return projectAPI.voteOneById(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}

export {
  useCreateOneProjectMutation,
  useGetAllProjectsQuery,
  useGetAllProjectsInfiniteQuery,
  useGetOneByIdProjectQuery,
  useUpdateOneByIdProjectMutation,
  useDeleteOneByIdProjectMutation,
  useVoteOneByIdProjectMutation,
}
