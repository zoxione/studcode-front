import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { Team, TeamUserRole } from "../model/types"
import { teamAPI } from "./team-api"
import { CreateTeam, GetAllTeamsFilter, TeamFiles, UpdateTeam } from "./types"

const useCreateOneTeamMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (team: CreateTeam) => {
      return teamAPI.createOne(team)
    },
    onSuccess: async (team: Team) => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
      toast.success("Команда успешно создана")
      router.push(`/teams/${team.name}`)
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

const useGetOneByIdTeamQuery = (id: string) => {
  return useQuery({
    queryKey: ["teams", id],
    queryFn: () => teamAPI.getOne(id),
  })
}

const useUpdateOneByIdTeamMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: ({ id, team }: { id: string; team: UpdateTeam }) => {
      return teamAPI.updateOneById(id, team)
    },
    onSuccess: async (team: Team) => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
      router.push(`/teams/${team.name}`)
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
          payload: {
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
          payload: {
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

const useUploadsOneByIdTeamMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, files }: { id: string; files: TeamFiles }) => {
      return teamAPI.uploadsOneById(id, files)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
    },
  })
}

const useDeleteOneByIdTeamMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: (id: string) => {
      return teamAPI.deleteOneById(id)
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["teams"] })
      await fetch(`/api/revalidate?tag=teams`)
      toast.success("Команда успешно удалена")
      router.back()
    },
  })
}

export {
  useCreateOneTeamMutation,
  useDeleteOneByIdTeamMutation,
  useGetAllTeamsQuery,
  useGetOneByIdTeamQuery,
  useUpdateOneByIdTeamMutation,
  useUploadsOneByIdTeamMutation,
  useAddMemberTeamMutation,
  useRemoveMemberTeamMutation,
}
