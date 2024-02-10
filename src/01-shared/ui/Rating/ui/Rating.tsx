"use client"

import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons"
import { useCallback, useMemo, useState } from "react"

import { cn } from "@/01-shared/utils/cn"

import { Button } from "../../Button"


interface RatingProps {
  className?: string
  defaultValue: number
  count?: number
  sizeIcons?: number
  withLabels?: boolean
  readOnly?: boolean
  onSelectedClick?: (index: number) => void
}

const Rating = ({
  className,
  defaultValue,
  count = 5,
  sizeIcons = 22,
  withLabels = false,
  readOnly = false,
  onSelectedClick,
}: RatingProps) => {
  const [hoveredStars, setHoveredStars] = useState(0)

  const getStar = useCallback(
    (index: number) => {
      if (readOnly) {
        if (defaultValue >= index) {
          return <StarFilledIcon className="text-yellow-400 w-4 h-4" />
        } else {
          return <StarIcon className="text-yellow-400 w-4 h-4" />
        }
      } else {
        if (hoveredStars >= index) {
          return <StarFilledIcon className="text-yellow-400 w-4 h-4" />
        } else if (!hoveredStars && defaultValue >= index) {
          return <StarFilledIcon className="text-yellow-400 w-4 h-4" />
        }
        return <StarIcon className="text-yellow-400 w-4 h-4" />
      }
    },
    [defaultValue, hoveredStars, readOnly, sizeIcons],
  )

  const starRating = useMemo(() => {
    return Array(count)
      .fill(0)
      .map((_, i) => i + 1)
      .map((index) => (
        <div key={index}>
          <Button
            type="button"
            onClick={onSelectedClick && (() => onSelectedClick(index))}
            onMouseEnter={() => setHoveredStars(index)}
            onMouseLeave={() => setHoveredStars(0)}
            variant="ghost"
            size="none"
            className={`${readOnly ? "cursor-default" : "cursor-pointer"} hover:bg-transparent`}
          >
            {getStar(index)}
          </Button>
          {withLabels && <span>{index}</span>}
        </div>
      ))
  }, [count, getStar, onSelectedClick, withLabels])

  return <div className={cn("flex flex-row items-center gap-2", className)}>{starRating}</div>
}

export { Rating }
