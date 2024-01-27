"use client"

import { Tabs, TabsList, TabsTrigger } from "@/01-shared/ui/Tabs"
import { TimeFrameProject } from "@/02-entities/project/api/types"
import { useRouter } from "next/navigation"

interface TimeFrameProjectsProps {
  timeFrame: TimeFrameProject
}

const TimeFrameProjects = ({ timeFrame }: TimeFrameProjectsProps) => {
  const router = useRouter()

  const handleChangeValue = (value: string) => {
    // router.refresh()
    router.replace("/?timeFrame=" + value, { scroll: false })
  }

  return (
    <Tabs defaultValue={timeFrame} className="w-[400px]" onValueChange={handleChangeValue}>
      <TabsList>
        <TabsTrigger value="day">День</TabsTrigger>
        <TabsTrigger value="week">Неделя</TabsTrigger>
        <TabsTrigger value="month">Месяц</TabsTrigger>
        <TabsTrigger value="year">Год</TabsTrigger>
      </TabsList>
      {/* <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent> */}
    </Tabs>
  )
}

export { TimeFrameProjects }
