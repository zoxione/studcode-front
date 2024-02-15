import { ProjectsList } from "@/04-widgets/projects-list"

export default async function UserProjects({ params }: { params: { id: string } }) {
  return <ProjectsList filter={{ creator_id: params.id, status: "published" }} projectCardProps={{ isEdit: true }} />
}
