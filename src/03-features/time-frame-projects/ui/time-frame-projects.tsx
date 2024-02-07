"use client"

import { useRouter } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/01-shared/ui/Tabs"
import { TimeFrameProject } from "@/02-entities/project/api/types"

interface TimeFrameProjectsProps {
  timeFrame: TimeFrameProject
}

const TimeFrameProjects = ({ timeFrame }: TimeFrameProjectsProps) => {
  const router = useRouter()

  const handleChangeValue = (value: string) => {
    router.replace("/?timeFrame=" + value)
  }

  return (
    <Tabs defaultValue={timeFrame} className="w-full max-w-md" onValueChange={handleChangeValue}>
      <TabsList>
        <TabsTrigger value="day">День</TabsTrigger>
        <TabsTrigger value="week">Неделя</TabsTrigger>
        <TabsTrigger value="month">Месяц</TabsTrigger>
        <TabsTrigger value="year">Год</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export { TimeFrameProjects }
