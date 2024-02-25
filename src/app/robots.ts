import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api", "/projects/*/edit", "/*/drafts", "/settings/*"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api", "/projects/*/edit", "/*/drafts", "/settings/*"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api", "/projects/*/edit", "/*/drafts", "/settings/*"],
      },
    ],
    sitemap: `${process.env.APP_URL}/sitemap.xml`,
  }
}
