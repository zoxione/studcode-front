import { HTMLAttributes, forwardRef } from "react"

import { Badge } from "@/01-shared/ui/badge"
import { cn } from "@/01-shared/utils/cn"
import { Specialization } from "../../../model/types"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/01-shared/ui/tooltip"

export interface SpecializationBadgeProps extends HTMLAttributes<HTMLAnchorElement> {
  specialization: Specialization
}

const SpecializationBadge = forwardRef<HTMLAnchorElement, SpecializationBadgeProps>(
  ({ specialization, className }, ref) => {
    return (
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Badge variant="secondary" className={cn("w-fit whitespace-nowrap", className)}>
            {specialization.name}
          </Badge>
        </TooltipTrigger>
        <TooltipContent side="top">{specialization.description}</TooltipContent>
      </Tooltip>
    )
  },
)
SpecializationBadge.displayName = "SpecializationBadge"

export { SpecializationBadge }
