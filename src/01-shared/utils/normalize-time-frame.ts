const normalizeTimeFrame = (timeFrame: string) => {
  const now = new Date()
  let result = `${now.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })} ${now.getFullYear()}`

  switch (timeFrame) {
    case "day":
      now.setDate(now.getDate() - 1)
      break
    case "week":
      now.setDate(now.getDate() - 7)
      break
    case "month":
      now.setDate(now.getDate() - 30)
      break
    case "year":
      now.setDate(now.getDate() - 365)
      break
  }

  result = `${now.toLocaleDateString("ru-RU", { day: "numeric", month: "long" })} ${now.getFullYear()} - ${result}`
  return result
}

export { normalizeTimeFrame }
