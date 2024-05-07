import { useQuery } from "@tanstack/react-query"

import { educationAPI } from "./education-api"
import { GetAllEducationsFilter } from "./types"

const useGetAllEducationsQuery = (filter: GetAllEducationsFilter) => {
  const { page, limit, search, order } = filter
  return useQuery({
    queryKey: ["educations", page, limit, search, order],
    queryFn: () => educationAPI.getAll(filter),
  })
}

const useGetOneEducationQuery = (key: string) => {
  return useQuery({
    queryKey: ["educations", key],
    queryFn: () => educationAPI.getOne(key),
  })
}

export { useGetAllEducationsQuery, useGetOneEducationQuery }
