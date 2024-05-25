import { test, expect, Page } from "@playwright/test"
import donenv from "dotenv"

donenv.config({
  path: ".env.local",
})

const authorize = async ({ page, email, password }: { page: Page; email: string; password: string }) => {
  await page.goto("?dialog=auth")

  const emailInput = await page.waitForSelector("input[type='email']")
  if (!emailInput) throw new Error("emailInput not found")
  await emailInput.fill(email)

  const passwordInput = await page.waitForSelector("input[type='password']")
  if (!passwordInput) throw new Error("passwordInput not found")
  await passwordInput.fill(password)

  await page.click("button[type='submit']")
  return page
}

test.describe("Авторизация и аутентификация", () => {
  test("(E) Авторизация с неверной почтой", async ({ page }) => {
    if (!process.env.PLAYWRIGHT_PASSWORD) {
      throw new Error("PLAYWRIGHT_PASSWORD must be set in .env.local")
    }

    const pageRes = await authorize({ page, email: "wrong-email", password: process.env.PLAYWRIGHT_PASSWORD })

    const userMenuDetached = await pageRes.waitForSelector("button[id='user-menu']", { state: "detached" })
    expect(userMenuDetached).toBeNull()
  })

  test("(E) Авторизация с неверным паролем", async ({ page }) => {
    if (!process.env.PLAYWRIGHT_EMAIL) {
      throw new Error("PLAYWRIGHT_EMAIL must be set in .env.local")
    }

    const pageRes = await authorize({ page, email: process.env.PLAYWRIGHT_EMAIL, password: "wrong-password" })

    const userMenuDetached = await pageRes.waitForSelector("button[id='user-menu']", { state: "detached" })
    expect(userMenuDetached).toBeNull()
  })

  test("Авторизация", async ({ page }) => {
    if (!process.env.PLAYWRIGHT_EMAIL || !process.env.PLAYWRIGHT_PASSWORD) {
      throw new Error("PLAYWRIGHT_EMAIL and PLAYWRIGHT_PASSWORD must be set in .env.local")
    }

    const pageRes = await authorize({
      page,
      email: process.env.PLAYWRIGHT_EMAIL,
      password: process.env.PLAYWRIGHT_PASSWORD,
    })

    const userMenu = await pageRes.waitForSelector("button[id='user-menu']", { state: "attached" })
    expect(userMenu).toBeTruthy()
  })

  test("Выход", async ({ page }) => {
    if (!process.env.PLAYWRIGHT_EMAIL || !process.env.PLAYWRIGHT_PASSWORD) {
      throw new Error("PLAYWRIGHT_EMAIL and PLAYWRIGHT_PASSWORD must be set in .env.local")
    }

    const pageRes = await authorize({
      page,
      email: process.env.PLAYWRIGHT_EMAIL,
      password: process.env.PLAYWRIGHT_PASSWORD,
    })

    const userMenu = await pageRes.waitForSelector("button[id='user-menu']")
    if (!userMenu) throw new Error("userMenu not found")
    await userMenu.click()

    const logoutButton = await pageRes.waitForSelector("div[id='logout']")
    if (!logoutButton) throw new Error("logoutButton not found")
    await logoutButton.click()

    const userMenuDetached = await pageRes.waitForSelector("button[id='user-menu']", { state: "detached" })
    expect(userMenuDetached).toBeNull()
  })
})

test.describe("Пользователь", () => {
  test("Просмотр настроек пользователя", async ({ page }) => {
    if (!process.env.PLAYWRIGHT_EMAIL || !process.env.PLAYWRIGHT_PASSWORD) {
      throw new Error("PLAYWRIGHT_EMAIL and PLAYWRIGHT_PASSWORD must be set in .env.local")
    }

    const pageRes = await authorize({
      page,
      email: process.env.PLAYWRIGHT_EMAIL,
      password: process.env.PLAYWRIGHT_PASSWORD,
    })

    await pageRes.waitForSelector("button[id='user-menu']")
    await pageRes.goto("/settings")
    await expect(pageRes).toHaveURL("/settings")
  })

  test("(E) Просмотр настроек пользователя без авторизации", async ({ page }) => {
    await page.goto("/settings")
    await expect(page).toHaveURL(/\/\?dialog=auth/)
  })
})

test.describe("Проект", () => {
  test("Просмотр редактирования проекта", async ({ page }) => {
    if (!process.env.PLAYWRIGHT_EMAIL || !process.env.PLAYWRIGHT_PASSWORD || !process.env.PLAYWRIGHT_PROJECT_URL) {
      throw new Error("PLAYWRIGHT_EMAIL, PLAYWRIGHT_PASSWORD and PLAYWRIGHT_PROJECT_URL must be set in .env.local")
    }

    const pageRes = await authorize({
      page,
      email: process.env.PLAYWRIGHT_EMAIL,
      password: process.env.PLAYWRIGHT_PASSWORD,
    })

    await pageRes.waitForSelector("button[id='user-menu']")
    await pageRes.goto(process.env.PLAYWRIGHT_PROJECT_URL)
    await expect(pageRes).toHaveURL(process.env.PLAYWRIGHT_PROJECT_URL)
  })

  test("(E) Просмотр редактирования проекта без доступа", async ({ page }) => {
    if (!process.env.PLAYWRIGHT_PROJECT_URL) {
      throw new Error("PLAYWRIGHT_PROJECT_URL must be set in .env.local")
    }

    await page.goto(process.env.PLAYWRIGHT_PROJECT_URL)
    await expect(page).toHaveURL(/\/\?dialog=auth/)
  })
})

test.describe("Команда", () => {
  test("Просмотр редактирования команды", async ({ page }) => {
    if (!process.env.PLAYWRIGHT_EMAIL || !process.env.PLAYWRIGHT_PASSWORD || !process.env.PLAYWRIGHT_TEAM_URL) {
      throw new Error("PLAYWRIGHT_EMAIL, PLAYWRIGHT_PASSWORD and PLAYWRIGHT_TEAM_URL must be set in .env.local")
    }

    const pageRes = await authorize({
      page,
      email: process.env.PLAYWRIGHT_EMAIL,
      password: process.env.PLAYWRIGHT_PASSWORD,
    })

    await pageRes.waitForSelector("button[id='user-menu']")
    await pageRes.goto(process.env.PLAYWRIGHT_TEAM_URL)
    await expect(pageRes).toHaveURL(process.env.PLAYWRIGHT_TEAM_URL)
  })

  test("(E) Просмотр редактирования команды без доступа", async ({ page }) => {
    if (!process.env.PLAYWRIGHT_TEAM_URL) {
      throw new Error("PLAYWRIGHT_TEAM_URL must be set in .env.local")
    }

    await page.goto(process.env.PLAYWRIGHT_TEAM_URL)
    await expect(page).toHaveURL("/denied")
  })
})
