import { ProjectStatus } from "../model/types"

const prettyStatus = (status: ProjectStatus) => {
  switch (status) {
    case "archived":
      return "Архив"
    case "draft":
      return "Черновик"
    case "published":
      return "Опубликован"
  }
}

export { prettyStatus }
