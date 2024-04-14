"use client"

import Image from "next/image"

import { Carousel, CarouselContent, CarouselItem } from "@/01-shared/ui/carousel"
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
                <div className="relative aspect-video h-[488px] overflow-hidden">
                  <Image
                    className="block object-cover z-[-10]"
                    src={screen}
                    fill
                    alt={`screenshot_${index}_background`}
                  />
                  <Image
                    className="block object-contain backdrop-blur-xl"
                    src={screen}
                    fill
                    alt={`screenshot_${index}`}
                  />
                </div>
              </a>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Fancybox>
    </Carousel>
  )
}

export { ScreensCarousel }
