import { HTMLAttributes, forwardRef } from "react"

import { cn } from "@/01-shared/utils/cn"
import { Specialization } from "../../../model/types"

export interface SpecializationCardProps extends HTMLAttributes<HTMLAnchorElement> {
  specialization: Specialization
}

const SpecializationCard = forwardRef<HTMLAnchorElement, SpecializationCardProps>(
  ({ specialization, className }, ref) => {
    return (
      <div className={cn("flex flex-col", className)}>
        <span className="text-sm font-medium">{specialization.name}</span>
        <span className="text-sm text-muted-foreground">{specialization.description}.</span>
      </div>
    )
  },
)
SpecializationCard.displayName = "SpecializationCard"

export { SpecializationCard }
