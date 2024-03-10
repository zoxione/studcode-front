"use client"

import { useRouter } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "@/01-shared/ui/Tabs"
import { TimeFrameProject } from "@/02-entities/project/api/types"

interface ToggleTimeFrameProjectsTabsProps {
  timeFrame: TimeFrameProject
}

const ToggleTimeFrameProjectsTabs = ({ timeFrame }: ToggleTimeFrameProjectsTabsProps) => {
  const router = useRouter()

  const handleChangeValue = (value: string) => {
    router.replace("/?timeFrame=" + value)
  }

  return (
    <Tabs defaultValue={timeFrame} className="w-full max-w-md" onValueChange={handleChangeValue}>
      <TabsList>
        <TabsTrigger value="week">Неделя</TabsTrigger>
        <TabsTrigger value="month">Месяц</TabsTrigger>
        <TabsTrigger value="year">Год</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export { ToggleTimeFrameProjectsTabs }
