"use client"

import useEmblaCarousel from "embla-carousel-react"
import { useEffect } from "react"
import PhotoSwipeLightbox from "photoswipe/lightbox"
import "photoswipe/style.css"

interface ScreensCarouselProps {
  screens: string[]
}

const ScreensCarousel = ({ screens }: ScreensCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#screens-carousel-gallery",
      children: "a",
      pswpModule: () => import("photoswipe"),
    })
    lightbox.init()

    return () => {
      lightbox.destroy()
      // @ts-ignore
      lightbox = null
    }
  }, [])

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes())
    }
  }, [emblaApi])

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="pswp-gallery flex" id="screens-carousel-gallery">
        {screens.map((screen, index) => (
          <a
            href={screen}
            key={"screens-carousel-gallery" + "-" + index}
            className="flex-[0_0_50%] min-w-0 pl-6 relative"
            target="_blank"
            rel="noreferrer"
            data-pswp-width={640}
            data-pswp-height={290}
          >
            <img className="block w-full h-96 object-contain" src={screen} alt="screen" />
          </a>
        ))}
      </div>
    </div>
  )
}

export { ScreensCarousel }
