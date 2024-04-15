const MAX_FILE_SIZE = 1024 * 1024 * 5
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const PROJECT_STATUS_VALUES = ["draft", "published"] as const
const PROJECT_TYPE_VALUES = ["web", "mobile", "desktop", "iot", "game", "ui_ux", "other"] as const
const PROJECT_PRICE_VALUES = ["free", "free_options", "payment_required"] as const

export { MAX_FILE_SIZE, ACCEPTED_IMAGE_TYPES, PROJECT_STATUS_VALUES, PROJECT_TYPE_VALUES, PROJECT_PRICE_VALUES }
