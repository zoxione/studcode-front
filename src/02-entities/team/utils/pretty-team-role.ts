import { TeamUserRole } from "../model/types"

const prettyTeamRole = (role: TeamUserRole) => {
  switch (role) {
    case "member":
      return "Участник"
    case "owner":
      return "Владелец"
    case "invited":
      return "Приглашен"
  }
}

export { prettyTeamRole }
