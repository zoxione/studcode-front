"use client"

import { Tabs, TabsList, TabsTrigger } from "@/01-shared/ui/tabs"
import { TimeFrameProject } from "@/02-entities/project/api/types"
import { useToggleTimeFrameProjects } from "../lib/use-toggle-time-frame-projects"

interface ToggleTimeFrameProjectsTabsProps {
  timeFrame: TimeFrameProject
}

const ToggleTimeFrameProjectsTabs = ({ timeFrame }: ToggleTimeFrameProjectsTabsProps) => {
  const { handleChangeValue } = useToggleTimeFrameProjects({})

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
