import React, { ChangeEvent, ReactNode, useRef } from "react"

import { cn } from "@/01-shared/utils/cn"
import { Card, CardContent } from "../../card"
import { Input } from "../../input"

interface DropzoneProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  classNameWrapper?: string
  classNamePreview?: string
  dropContent?: ReactNode | string
  preview?: boolean
  value: FileList | Blob[] | null
  onChange: (files: FileList | Blob[] | null) => void
  onUpdate?: (file: FileList | Blob[] | null) => void
}

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      className,
      classNameWrapper,
      dropContent,
      value,
      onChange,
      onUpdate,
      accept,
      multiple = false,
      classNamePreview,
      preview = false,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    // Function to handle drag over event
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      onChange(null)
    }

    // Function to handle drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()

      const { files } = e.dataTransfer
      if (inputRef.current) {
        inputRef.current.files = files
        onChange(files)
      }
    }

    // Function to simulate a click on the file input element
    const handleButtonClick = () => {
      if (inputRef.current) {
        inputRef.current.click()
      }
    }

    const handleRemove = (index: number) => {
      if (value) {
        if (multiple) {
          console.log("TODO")
        } else {
          onChange(null)
          if (onUpdate) onUpdate(null)
        }
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
          className="size-full flex flex-col items-center justify-center space-y-2 p-0 text-xs"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="size-full flex items-center justify-center text-muted-foreground overflow-hidden rounded-xl">
            <span className="size-full relative font-medium flex flex-row flex-wrap items-center justify-center gap-2 min-h-[24px]">
              {value?.length && preview
                ? Array.from(value).map((file, index) => {
                    if (file.type.includes("image")) {
                      return (
                        <img
                          key={index}
                          src={URL.createObjectURL(file)}
                          className={cn("", classNamePreview)}
                          alt={file?.name}
                        />
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                onChange(e.target.files)
                if (onUpdate) onUpdate(e.target.files || null)
              }}
            />
          </div>
        </CardContent>
      </Card>
    )
  },
)
Dropzone.displayName = "Dropzone"

export { Dropzone }
