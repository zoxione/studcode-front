export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/projects/new", "/projects/:path/edit", "/:path/drafts", "/settings/:path*"],
}
