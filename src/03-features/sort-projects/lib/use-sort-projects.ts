import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"

interface useSortProjectsProps {}

const useSortProjects = ({}: useSortProjectsProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams],
  )

  const handleChangeValue = (value: string) => {
    router.push(pathname + "?" + createQueryString("order", value))
  }

  return {
    handleChangeValue,
  }
}

export { useSortProjects }
