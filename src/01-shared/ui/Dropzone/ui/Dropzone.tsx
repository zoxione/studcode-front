import React, { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react"
import PhotoSwipeLightbox from "photoswipe/lightbox"

import { cn } from "@/01-shared/utils/cn"

import { Card, CardContent } from "../../Card"
import { Input } from "../../Input"


import "photoswipe/style.css"

interface DropzoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, ""> {
  classNameWrapper?: string
  dropContent?: ReactNode | string
  handleOnDrop: (acceptedFiles: FileList | null) => void
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  ({ className, classNameWrapper, dropContent, handleOnDrop, accept, multiple = false, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
      let lightbox = new PhotoSwipeLightbox({
        gallery: "#preview-images-gallery",
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

    // Function to handle drag over event
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      handleOnDrop(null)
    }

    // Function to handle drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      const { files } = e.dataTransfer
      if (inputRef.current) {
        inputRef.current.files = files
        handleOnDrop(files)
      }
    }

    // Function to simulate a click on the file input element
    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click()
      }
    }

    return (
      <Card
        ref={ref}
        className={cn(
          `border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50`,
          classNameWrapper,
        )}
      >
        <CardContent
          className="h-full flex flex-col items-center justify-center space-y-2 p-1 text-xs"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex items-center justify-center text-muted-foreground overflow-hidden rounded-md">
            <span
              id="preview-images-gallery"
              className="pswp-gallery font-medium flex flex-row flex-wrap items-center gap-2"
            >
              {inputRef.current?.files?.length
                ? Array.from(inputRef.current.files).map((file) => {
                    if (file.type.includes("image")) {
                      return (
                        <a
                          href={URL.createObjectURL(file)}
                          key={file.name}
                          target="_blank"
                          rel="noreferrer"
                          data-pswp-width={1024}
                          data-pswp-height={768}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <img src={URL.createObjectURL(file)} className="w-20 h-20" alt={file.name} />
                        </a>
                      )
                    } else {
                      return null
                    }
                  })
                : dropContent}
            </span>
            <Input
              {...props}
              value={undefined}
              ref={inputRef}
              type="file"
              accept={accept}
              multiple={multiple}
              className={cn("hidden", className)}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnDrop(e.target.files)}
            />
          </div>
        </CardContent>
      </Card>
    )
  },
)
Dropzone.displayName = "Dropzone"

export { Dropzone }
