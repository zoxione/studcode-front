"use client"

import { useEffect } from "react"
import PhotoSwipeLightbox from "photoswipe/lightbox"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/01-shared/ui/Carousel"
import { cn } from "@/01-shared/utils/cn"

import "photoswipe/style.css"
import { ProjectCard, ProjectCardSmall, useGetAllProjectsQuery } from "@/02-entities/project"

interface ScreensCarouselProps {
  className?: string
  tagSlug: string
}

const ProjectsCarousel = ({ tagSlug, className }: ScreensCarouselProps) => {
  const { data: projects } = useGetAllProjectsQuery({ tag_slug: tagSlug })

  if (projects?.results.length === 0 || !projects) {
    return null
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={cn("w-full", className)}
    >
      <CarouselContent className="">
        {projects.results.map((project) => (
          <CarouselItem key={project._id} className="md:basis-1/2 lg:basis-1/3">
            <ProjectCardSmall project={project} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export { ProjectsCarousel }
