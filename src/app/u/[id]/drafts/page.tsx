import { ProjectsList } from "@/04-widgets/projects-list"

export default async function UserDrafts({ params }: { params: { id: string } }) {
  return <ProjectsList filter={{ creator_id: params.id, status: "draft" }} projectCardProps={{ isEdit: true }} />
}
