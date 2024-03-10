import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Project } from "../model/types"
import { projectAPI } from "./project-api"
import { CreateProject, GetAllProjectsFilter, ProjectFiles, UpdateProject } from "./types"

const useCreateOneProjectMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (project: CreateProject) => {
      return projectAPI.createOne(project)
    },
    onSuccess: async (project: Project) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      await fetch(`/api/revalidate?tag=projects`)
      toast.success("Проект успешно создан")
      router.push(`/projects/${project.slug}/edit`)
    },
  })
}

const useGetAllProjectsQuery = (filter: GetAllProjectsFilter) => {
  const { page, limit, search, order, time_frame, tag_slug, status, creator_id, team_id } = filter
  return useQuery({
    queryKey: ["projects", page, limit, search, order, time_frame, tag_slug, status, creator_id, team_id],
    queryFn: () => projectAPI.getAll(filter),
  })
}

const useGetAllProjectsInfiniteQuery = (filter: GetAllProjectsFilter) => {
  const { page, limit, search, order, time_frame, tag_slug, status, creator_id, team_id } = filter
  return useInfiniteQuery({
    queryKey: ["projects", page, limit, search, order, time_frame, tag_slug, status, creator_id, team_id],
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

const useGetOneProjectQuery = (key: string) => {
  return useQuery({
    queryKey: ["projects", key],
    queryFn: () => projectAPI.getOne(key),
  })
}

const useUpdateOneProjectMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key, project }: { key: string; project: UpdateProject }) => {
      return projectAPI.updateOne(key, project)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      await fetch(`/api/revalidate?tag=projects`)
    },
  })
}

const useUploadsOneProjectMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key, files }: { key: string; files: ProjectFiles }) => {
      return projectAPI.uploadsOne(key, files)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      await fetch(`/api/revalidate?tag=projects`)
    },
  })
}

const useVoteOneProjectMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (key: string) => {
      return projectAPI.voteOne(key)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      await fetch(`/api/revalidate?tag=projects`)
    },
  })
}

const useDeleteOneProjectMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (key: string) => {
      return projectAPI.deleteOne(key)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      await fetch(`/api/revalidate?tag=projects`)
      toast.success("Проект успешно удален")
      router.back()
    },
  })
}

export {
  useCreateOneProjectMutation,
  useGetAllProjectsQuery,
  useGetAllProjectsInfiniteQuery,
  useGetOneProjectQuery,
  useUpdateOneProjectMutation,
  useDeleteOneProjectMutation,
  useVoteOneProjectMutation,
  useUploadsOneProjectMutation,
}
