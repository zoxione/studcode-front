import { useQuery } from "@tanstack/react-query"

import { tagAPI } from "./tag-api"
import { GetAllTagsFilter } from "./types"

const useGetAllTagsQuery = (filter: GetAllTagsFilter) => {
  const { page, limit, search, order } = filter
  return useQuery({
    queryKey: ["tags", page, limit, search, order],
    queryFn: () => tagAPI.getAll(filter),
  })
}

const useGetAllPopularTagsQuery = () => {
  return useQuery({
    queryKey: ["tags"],
    queryFn: () => tagAPI.getAllPopular(),
  })
}

const useGetOneTagQuery = (key: string) => {
  return useQuery({
    queryKey: ["tags", key],
    queryFn: () => tagAPI.getOne(key),
  })
}

export { useGetAllTagsQuery, useGetAllPopularTagsQuery, useGetOneTagQuery }
