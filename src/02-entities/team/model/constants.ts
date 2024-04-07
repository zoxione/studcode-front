const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const TEAM_STATUS_VALUES = ["opened", "closed"] as const

export { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES, TEAM_STATUS_VALUES }
