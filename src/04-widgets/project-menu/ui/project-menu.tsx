import { DotsVerticalIcon, Pencil1Icon } from "@radix-ui/react-icons"
import Link from "next/link"

import { Button } from "@/01-shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/01-shared/ui/dropdown-menu"
import { DeleteProjectMenuItem } from "@/03-features/delete-project"
import { EditProjectStatusMenuSub } from "@/03-features/edit-project-status"
import { Project } from "@/02-entities/project"

interface ProjectMenuProps {
  project: Project
}

const ProjectMenu = ({ project }: ProjectMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Открыть управление проектом</span>
          <DotsVerticalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        onClick={(event) => {
          event.preventDefault()
        }}
      >
        <DropdownMenuLabel>Управление проектом</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <EditProjectStatusMenuSub project={project} />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/projects/${project.slug}/edit`}>
              Изменить
              <Pencil1Icon className="ml-auto w-4 h-4" />
            </Link>
          </DropdownMenuItem>
          <DeleteProjectMenuItem projectId={project._id} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { ProjectMenu }
