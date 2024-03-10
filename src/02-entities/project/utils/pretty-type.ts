import { ProjectType } from "../model/types"

const prettyType = (type: ProjectType) => {
  switch (type) {
    case "web":
      return "Веб-приложение"
    case "mobile":
      return "Мобильное приложение"
    case "desktop":
      return "Десктопное приложение"
    case "iot":
      return "Интернет-оборудование"
    case "game":
      return "Видеоигра"
    case "ui_ux":
      return "Интерфейсное решение"
    case "other":
      return "Другое"
  }
}

export { prettyType }
