import { ProjectPrice } from "../model/types"

const prettyPrice = (price: ProjectPrice) => {
  switch (price) {
    case "free":
      return "Бесплатно"
    case "free_options":
      return "Бесплатно с опциями"
    case "payment_required":
      return "Платно"
  }
}

export { prettyPrice }
