import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { TeamUserRole } from "../model/types"
import { teamAPI } from "./team-api"
import { CreateTeam, GetAllTeamsFilter, TeamFiles, UpdateTeam } from "./types"

const useCreateOneTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (team: CreateTeam) => {
      return teamAPI.createOne(team)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
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

const useGetOneTeamQuery = (key: string) => {
  return useQuery({
    queryKey: ["teams", key],
    queryFn: () => teamAPI.getOne(key),
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
    },
  })
}

const useAddMemberTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key, userId, role }: { key: string; userId: string; role: TeamUserRole }) => {
      return teamAPI.updateMembers(key, [
        {
          action: "add",
          member: {
            user: userId,
            role: role,
          },
        },
      ])
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
    },
  })
}

const useRemoveMemberTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ key, userId, role }: { key: string; userId: string; role: TeamUserRole }) => {
      return teamAPI.updateMembers(key, [
        {
          action: "remove",
          member: {
            user: userId,
            role: role,
          },
        },
      ])
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
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
    },
  })
}

export {
  useAddMemberTeamMutation,
  useCreateOneTeamMutation,
  useDeleteOneTeamMutation,
  useGetAllTeamsQuery,
  useGetOneTeamQuery,
  useRemoveMemberTeamMutation,
  useUpdateOneTeamMutation,
  useUploadsOneTeamMutation,
}
