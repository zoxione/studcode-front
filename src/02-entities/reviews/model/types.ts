interface Review {
  _id: string
  text: string
  rating: number
  project: {
    _id: string
    title: string
  }
  reviewer: {
    _id: string
    username: string
    full_name: {
      surname: string
      name: string
      patronymic: string
    }
    avatar: string
  }
  likes: string[]
  dislikes: string[]
  created_at: string
  updated_at: string
}

export type { Review }
