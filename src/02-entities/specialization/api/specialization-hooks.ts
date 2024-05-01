import { useQuery } from "@tanstack/react-query"

import { specializationAPI } from "./specialization-api"
import { GetAllSpecializationsFilter } from "./types"

const useGetAllSpecializationsQuery = (filter: GetAllSpecializationsFilter) => {
  const { page, limit, search, order } = filter
  return useQuery({
    queryKey: ["specializations", page, limit, search, order],
    queryFn: () => specializationAPI.getAll(filter),
  })
}

const useGetOneSpecializationQuery = (key: string) => {
  return useQuery({
    queryKey: ["specializations", key],
    queryFn: () => specializationAPI.getOne(key),
  })
}

export { useGetAllSpecializationsQuery, useGetOneSpecializationQuery }
