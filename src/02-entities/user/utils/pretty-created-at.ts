const prettyCreatedAt = (createdAt: string) => {
  const date = new Date(createdAt)
  return date.toLocaleDateString("ru-RU", { year: "numeric" })
}

export { prettyCreatedAt }
