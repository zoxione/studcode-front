import { ProjectStatus } from "../model/types"

const prettyStatus = (status: ProjectStatus) => {
  switch (status) {
    case "draft":
      return "Черновик"
    case "published":
      return "Опубликован"
  }
}

export { prettyStatus }
