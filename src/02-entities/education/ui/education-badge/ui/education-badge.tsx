import { HTMLAttributes, forwardRef } from "react"

import { Badge } from "@/01-shared/ui/badge"
import { cn } from "@/01-shared/utils/cn"
import { Education } from "../../../model/types"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/01-shared/ui/tooltip"

export interface EducationBadgeProps extends HTMLAttributes<HTMLAnchorElement> {
  education: Education
}

const EducationBadge = forwardRef<HTMLAnchorElement, EducationBadgeProps>(({ education, className }, ref) => {
  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <Badge variant="secondary" className={cn("w-fit whitespace-nowrap", className)}>
          {education.abbreviation}
        </Badge>
      </TooltipTrigger>
      <TooltipContent side="top">{education.name}</TooltipContent>
    </Tooltip>
  )
})
EducationBadge.displayName = "EducationBadge"

export { EducationBadge }
