import { ReloadIcon } from "@radix-ui/react-icons"

import {
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/01-shared/ui/dropdown-menu"
import { PROJECT_STATUS_VALUES, Project, prettyStatus } from "@/02-entities/project"
import { useEditProjectStatus } from "../lib/use-edit-project-status"

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
              <DropdownMenuRadioItem key={status} value={status} disabled={isLoading}>
                {isLoading ? <ReloadIcon className="h-4 w-4 animate-spin" /> : prettyStatus(status)}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuSubContent>
      </DropdownMenuPortal>
    </DropdownMenuSub>
  )
}

export { EditProjectStatusMenuSub }
