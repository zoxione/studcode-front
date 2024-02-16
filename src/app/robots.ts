import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/projects/*/edit", "/u/*/drafts", "/u/settings/*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api", "/projects/*/edit", "/u/*/drafts", "/u/settings/*"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api", "/projects/*/edit", "/u/*/drafts", "/u/settings/*"],
      },
    ],
    sitemap: `${process.env.APP_URL}/sitemap.xml`,
  }
}
