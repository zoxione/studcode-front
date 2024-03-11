import { useRouter } from "next/navigation"

interface useToggleTimeFrameProjectsProps {}

const useToggleTimeFrameProjects = ({}: useToggleTimeFrameProjectsProps) => {
  const router = useRouter()

  const handleChangeValue = (value: string) => {
    router.replace("/?timeFrame=" + value)
  }

  return { handleChangeValue }
}

export { useToggleTimeFrameProjects }
