import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { teamAPI } from "./team-api"
import { CreateTeam, GetAllTeamsFilter, GetOneTeamsFilter, TeamFiles, UpdateTeam, UpdateTeamMember } from "./types"

const useCreateOneTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (team: CreateTeam) => {
      return teamAPI.createOne(team)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      await fetch(`/api/revalidate?tag=users`)
    },
  })
}

const useGetAllTeamsQuery = (filter: GetAllTeamsFilter) => {
  const { page, limit, search, order, member_id } = filter
  return useQuery({
    queryKey: ["teams", page, limit, search, order, member_id],
    queryFn: () => teamAPI.getAll(filter),
  })
}

const useGetAllTeamsInfiniteQuery = (filter: GetAllTeamsFilter) => {
  const { page, limit, search, order, member_id } = filter
  return useInfiniteQuery({
    queryKey: ["teams", page, limit, search, order, member_id],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const res = await teamAPI.getAll({ ...filter, page: pageParam })
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

const useGetOneTeamQuery = (key: string, filter?: GetOneTeamsFilter) => {
  return useQuery({
    queryKey: ["teams", key],
    queryFn: () => teamAPI.getOne(key, filter),
  })
}

const useUpdateOneTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key, team }: { key: string; team: UpdateTeam }) => {
      return teamAPI.updateOne(key, team)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      await fetch(`/api/revalidate?tag=users`)
    },
  })
}

const useDeleteOneTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (key: string) => {
      return teamAPI.deleteOne(key)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      await fetch(`/api/revalidate?tag=users`)
    },
  })
}

const useUpdateMembersTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key, updateMember }: { key: string; updateMember: UpdateTeamMember }) => {
      return teamAPI.updateMembers(key, updateMember)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      await fetch(`/api/revalidate?tag=users`)
    },
  })
}

const useJoinTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key }: { key: string }) => {
      return teamAPI.join(key)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      await fetch(`/api/revalidate?tag=users`)
    },
  })
}

const useLeaveTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key }: { key: string }) => {
      return teamAPI.leave(key)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      await fetch(`/api/revalidate?tag=users`)
    },
  })
}

const useUploadsOneTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key, files }: { key: string; files: TeamFiles }) => {
      return teamAPI.uploadsOne(key, files)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
      queryClient.invalidateQueries({ queryKey: ["users"] })
      await fetch(`/api/revalidate?tag=users`)
    },
  })
}

const useGetOneTeamFilesQuery = (key: string) => {
  return useQuery({
    queryKey: ["teams", "files", key],
    queryFn: () => teamAPI.getOneFiles(key),
  })
}

export {
  useUpdateMembersTeamMutation,
  useJoinTeamMutation,
  useCreateOneTeamMutation,
  useDeleteOneTeamMutation,
  useGetAllTeamsQuery,
  useGetAllTeamsInfiniteQuery,
  useGetOneTeamQuery,
  useLeaveTeamMutation,
  useUpdateOneTeamMutation,
  useUploadsOneTeamMutation,
  useGetOneTeamFilesQuery,
}
