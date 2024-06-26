// pnpm install -g @unlighthouse/cli puppeteer

import dotenv from "dotenv"
dotenv.config({
  path: ".env.local",
})

const unlighthouseConfig = {
  site: process.env.UNLIGHTHOUSE_SITE_URL,
  debug: true,
  puppeteerOptions: {
    headless: false,
  },
  puppeteerClusterOptions: {
    maxConcurrency: 1,
  },
  hooks: {
    async authenticate(page: any) {
      await page.goto(process.env.UNLIGHTHOUSE_LOGIN_URL)
      const emailInput = await page.$('input[type="email"]')
      await emailInput.type(process.env.UNLIGHTHOUSE_EMAIL)
      const passwordInput = await page.$('input[type="password"]')
      await passwordInput.type(process.env.UNLIGHTHOUSE_PASSWORD)
      await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation()])
    },
  },
  ci: {
    reporter: "json",
  },
  scanner: {
    device: "desktop",
  },
  urls: [
    "/",
    "/projects",
    "/tags",
    "/about",
    "/rules",
    "/terms",
    "/privacy",
    "/tags/iskusstvo",
    "/projects/devoid-ai-664200f94ab59491c2eda441",
    "/projects/new",
    "/projects/devoid-ai-664200f94ab59491c2eda441/edit",
    "/zoxione",
    "/zoxione/teams",
    "/zoxione/projects",
    "/zoxione/drafts",
    "/settings",
    "/settings/account",
    "/teams/chervyachki",
    "/teams/new",
    "/teams/chervyachki/edit",
    "/teams/chervyachki/edit/members",
    "/teams/chervyachki/edit/additional",
    "/denied",
  ],
}

export default unlighthouseConfig
