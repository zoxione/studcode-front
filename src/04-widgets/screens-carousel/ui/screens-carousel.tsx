"use client"

import { useEffect } from "react"
import PhotoSwipeLightbox from "photoswipe/lightbox"

import { Carousel, CarouselContent, CarouselItem } from "@/01-shared/ui/Carousel"
import { cn } from "@/01-shared/utils/cn"

import "photoswipe/style.css"

interface ScreensCarouselProps {
  className?: string
  screens: string[]
}

const ScreensCarousel = ({ screens, className }: ScreensCarouselProps) => {
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#screens-carousel-gallery",
      children: "a",
      initialZoomLevel: "fill",
      showHideAnimationType: "fade",
      pswpModule: () => import("photoswipe"),
    })
    lightbox.init()

    return () => {
      lightbox.destroy()
      // @ts-ignore
      lightbox = null
    }
  }, [])

  return (
    <Carousel className={cn("", className)} opts={{ dragFree: true, loop: false }}>
      <CarouselContent id="screens-carousel-gallery" className="pswp-gallery -ml-1">
        {screens.map((screen, index) => (
          <CarouselItem className="basis-auto pl-1" key={index}>
            <a
              href={screen}
              key={`screens-carousel-gallery-${index}`}
              target="_blank"
              rel="noreferrer"
              // data-pswp-width={640}
              // data-pswp-height={290}
            >
              <img className="block w-full h-[488px] object-contain" src={screen} alt="screen" />
            </a>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export { ScreensCarousel }
