const getUserInitials = (surname: string, name: string, patronymic: string) => {
  return `${surname[0].toUpperCase()}${name[0].toUpperCase()}`
}

export { getUserInitials }
