import { ReloadIcon } from "@radix-ui/react-icons"

import {
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/01-shared/ui/dropdown-menu"
import { PROJECT_STATUS_VALUES, Project, explanationStatus, prettyStatus } from "@/02-entities/project"
import { useEditProjectStatus } from "../lib/use-edit-project-status"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/01-shared/ui/tooltip"

interface EditProjectStatusMenuSubProps {
  project: Project
}

const EditProjectStatusMenuSub = ({ project }: EditProjectStatusMenuSubProps) => {
  const { handleEditStatus, isLoading } = useEditProjectStatus({ project })

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>Изменить статус</DropdownMenuSubTrigger>
      <DropdownMenuPortal>
        <DropdownMenuSubContent>
          <DropdownMenuRadioGroup value={project.status} onValueChange={handleEditStatus}>
            {PROJECT_STATUS_VALUES.map((status) => (
              <Tooltip key={status} delayDuration={0}>
                <TooltipTrigger asChild>
                  <DropdownMenuRadioItem value={status} disabled={isLoading}>
                    {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : prettyStatus(status)}
                  </DropdownMenuRadioItem>
                </TooltipTrigger>
                <TooltipContent side="right">{explanationStatus(status)}</TooltipContent>
              </Tooltip>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export { EditProjectStatusMenuSub }
