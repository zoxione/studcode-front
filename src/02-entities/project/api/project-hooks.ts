import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { projectAPI } from "./project-api"
import { CreateProject, GetAllProjectsFilter, ProjectFiles, UpdateProject } from "./types"

const useCreateOneProjectMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (project: CreateProject) => {
      return projectAPI.createOne(project)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      await fetch(`/api/revalidate?tag=projects`)
      queryClient.invalidateQueries({ queryKey: ["tags"] })
      await fetch(`/api/revalidate?tag=tags`)
    },
  })
}

const useGetAllProjectsQuery = (filter: GetAllProjectsFilter & { enabled?: boolean }) => {
  const { page, limit, search, order, time_frame, tag_slug, status, creator_id, team_id } = filter
  return useQuery({
    queryKey: ["projects", page, limit, search, order, time_frame, tag_slug, status, creator_id, team_id],
    queryFn: () => projectAPI.getAll(filter),
    enabled: filter.enabled,
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
      queryClient.invalidateQueries({ queryKey: ["tags"] })
      await fetch(`/api/revalidate?tag=tags`)
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
  return useMutation({
    mutationFn: (key: string) => {
      return projectAPI.deleteOne(key)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
      await fetch(`/api/revalidate?tag=projects`)
    },
  })
}

const useGetOneProjectFilesQuery = (key: string) => {
  return useQuery({
    queryKey: ["projects", "files", key],
    queryFn: () => projectAPI.getOneFiles(key),
  })
}

export {
  useCreateOneProjectMutation,
  useDeleteOneProjectMutation,
  useGetAllProjectsInfiniteQuery,
  useGetAllProjectsQuery,
  useGetOneProjectQuery,
  useUpdateOneProjectMutation,
  useUploadsOneProjectMutation,
  useVoteOneProjectMutation,
  useGetOneProjectFilesQuery,
}
