import { ProjectStatus } from "../model/types"

const explanationStatus = (status: ProjectStatus) => {
  switch (status) {
    case "draft":
      return "Черновик не отображается на сайте и не доступен по ссылке для других пользователей."
    case "published":
      return "Опубликованный проект отображается на сайте для других пользователей."
  }
}

export { explanationStatus }
