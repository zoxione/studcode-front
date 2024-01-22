/** @type {import('next').NextConfig} */
const nextConfig = {
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
  },
}

export default nextConfig
