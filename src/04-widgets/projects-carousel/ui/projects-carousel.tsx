"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/01-shared/ui/carousel"
import { cn } from "@/01-shared/utils/cn"
import { Title } from "@/01-shared/ui/title"
import { GetAllProjectsFilter, ProjectCardSmall, useGetAllProjectsQuery } from "@/02-entities/project"

interface ScreensCarouselProps {
  className?: string
  label: string
  filter?: Omit<GetAllProjectsFilter, "status" | "limit">
}

const ProjectsCarousel = ({ label, filter, className }: ScreensCarouselProps) => {
  const { data: projects, status } = useGetAllProjectsQuery({ status: "published", limit: 20, ...filter })

  if (status === "pending") {
    return (
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className={cn("w-full space-y-2", className)}
      >
        <div className="flex flex-row justify-between items-center">
          <Title order={5} className="font-medium line-clamp-1">
            {label}
          </Title>
          <div className="flex flex-row items-center gap-2 relative">
            <CarouselPrevious className="static translate-y-0 rounded-md" />
            <CarouselNext className="static translate-y-0 rounded-md" />
          </div>
        </div>
        <CarouselContent className="">
          {Array(5)
            .fill(0)
            .map((_, i) => i + 1)
            .map((index) => (
              <CarouselItem key={index} className="w-fit basis-auto">
                <ProjectCardSmall loading />
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    )
  }

  if (projects?.results.length === 0 || !projects) {
    return null
  }

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className={cn("w-full space-y-2", className)}
    >
      <div className="flex flex-row justify-between items-center">
        <Title order={5} className="font-medium line-clamp-1">
          {label}
        </Title>
        <div className="flex flex-row items-center gap-2 relative">
          <CarouselPrevious className="static translate-y-0 rounded-md" />
          <CarouselNext className="static translate-y-0 rounded-md" />
        </div>
      </div>
      <CarouselContent className="">
        {projects.results.map((project) => (
          <CarouselItem key={project._id} className="w-fit basis-auto">
            <ProjectCardSmall project={project} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export { ProjectsCarousel }
