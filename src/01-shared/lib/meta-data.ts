import { Metadata } from "next"

const metaData: Metadata = {
  title: {
    template: "%s | Студенческий Код",
    default: "Студенческий Код",
  },
  description:
    "Студенческий Код - это платформа, на которой каждый студент может публиковать свои проекты и взаимодействовать с другими студентами, обсуждая и оценивая их работы",
  keywords: ["студенческий код", "проекты", "студенты", "код", "учеба", "студент"],
  metadataBase: new URL(process.env.APP_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: process.env.APP_URL,
    siteName: "Студенческий Код",
    locale: "ru-RU",
    title: "Студенческий Код",
    description:
      "Студенческий Код - это платформа, на которой каждый студент может публиковать свои проекты и взаимодействовать с другими студентами, обсуждая и оценивая их работы",
    images: [{ url: `${process.env.APP_URL}/icon.png`, width: 512, height: 512, alt: "Студенческий Код" }],
  },
  appleWebApp: {
    title: "Студенческий Код",
    statusBarStyle: "default",
    startupImage: [`${process.env.APP_URL}/icon.png`],
  },
}

export { metaData }
