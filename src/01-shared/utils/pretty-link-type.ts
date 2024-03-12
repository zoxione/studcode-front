import { LinkType } from "../types/link"

const prettyLinkType = (linkType: LinkType) => {
  switch (linkType) {
    case "main":
      return "Основная"
    case "github":
      return "Github"
    case "gitlab":
      return "Gitlab"
    case "vk":
      return "ВКонтакте"
    case "telegram":
      return "Telegram"
    case "discord":
      return "Discord"
    case "youtube":
      return "YouTube"
    case "other":
      return "Другое"
  }
}

export { prettyLinkType }
