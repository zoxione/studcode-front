/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  env: {
    APP_URL: process.env.APP_URL,
    API_URL: process.env.API_URL,
    ACCESS_TOKEN_NAME: process.env.ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME: process.env.REFRESH_TOKEN_NAME,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
  },
}

export default nextConfig
