
import { User } from "@/02-entities/user"
import { Session } from "@/02-entities/session"

import { LogoutResponse, RefreshResponse, RegisterUser, SignIn, SignInResponse } from "./types"

class AuthAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Регистрация нового пользователя
   */
  async register(user: RegisterUser): Promise<User> {
    const res = await fetch(`${this.baseUrl}/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to register user: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Аутентификация пользователя
   */
  async login(signIn: SignIn): Promise<SignInResponse> {
    const res = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      body: JSON.stringify(signIn),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to login user: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение информации о текущем пользователе
   */
  async whoami(): Promise<Session> {
    const res = await fetch(`${this.baseUrl}/whoami`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to get account: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Обновление токенов
   */
  async refresh(): Promise<RefreshResponse> {
    const res = await fetch(`${this.baseUrl}/refresh`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to refresh tokens: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Выход из аккаунта
   */
  async logout(): Promise<LogoutResponse> {
    const res = await fetch(`${this.baseUrl}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to logout: ${res.statusText}`)
    }

    return await res.json()
  }
}

export const authAPI = new AuthAPI(`${process.env.API_URL}/v1/auth`)
