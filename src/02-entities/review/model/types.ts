interface ReviewProject {
  _id: string
  title: string
}

interface RewiewReviewer {
  _id: string
  username: string
  full_name: {
    surname: string
    name: string
    patronymic: string
  }
  avatar: string
}

interface Review {
  _id: string
  text: string
  rating: number
  likes: number
  dislikes: number
  project: ReviewProject
  reviewer: RewiewReviewer
  created_at: string
  updated_at: string
}

export type { Review }
