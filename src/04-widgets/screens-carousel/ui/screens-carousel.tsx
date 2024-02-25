"use client"

import { Carousel, CarouselContent, CarouselItem } from "@/01-shared/ui/Carousel"
import { cn } from "@/01-shared/utils/cn"
import { Fancybox } from "@/01-shared/lib/fancybox"

interface ScreensCarouselProps {
  className?: string
  screens: string[]
}

const ScreensCarousel = ({ screens, className }: ScreensCarouselProps) => {
  return (
    <Carousel className={cn("", className)} opts={{ dragFree: true, loop: false }}>
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <CarouselContent className="-ml-1">
          {screens.map((screen, index) => (
            <CarouselItem className="basis-auto pl-1" key={index}>
              <a href={screen} data-fancybox="gallery">
                <img className="block w-full h-[488px] object-contain" src={screen} alt="screen" />
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Fancybox>
    </Carousel>
  )
}

export { ScreensCarousel }
