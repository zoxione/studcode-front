import { TeamStatus } from "../model/types"

const prettyStatus = (status: TeamStatus) => {
  switch (status) {
    case "opened":
      return "Открытая"
    case "closed":
      return "Закрытая"
  }
}

export { prettyStatus }
