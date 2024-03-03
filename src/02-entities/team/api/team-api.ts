import { Team } from "../model/types"
import { CreateTeam, GetAllTeamsFilter, GetAllTeamsResponse, TeamFiles, UpdateTeam, UpdateTeamMember } from "./types"

class TeamAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Создание новой команды
   */
  async createOne(team: CreateTeam): Promise<Team> {
    const res = await fetch(`${this.baseUrl}`, {
      method: "POST",
      body: JSON.stringify(team),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["teams"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to create team: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение всех команд
   */
  async getAll(filter: GetAllTeamsFilter): Promise<GetAllTeamsResponse> {
    const url = new URL(`${this.baseUrl}`)
    for (const [key, value] of Object.entries(filter)) {
      if (value) {
        url.searchParams.append(key, value)
      }
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["teams"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get teams: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одной команды по id/slug
   */
  async getOne(key: string): Promise<Team> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["teams"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get one team: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Обновление команды по id
   */
  async updateOneById(id: string, team: UpdateTeam): Promise<Team> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(team),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["teams"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to update team: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Обновление членов команды по id
   */
  async updateMembers(team_id: string, members: UpdateTeamMember[]): Promise<Team> {
    const res = await fetch(`${this.baseUrl}/${team_id}/members`, {
      method: "PUT",
      body: JSON.stringify({ members: members }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["teams"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to update team: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Загрузка файлов команды по id
   */
  async uploadsOneById(team_id: string, files: TeamFiles): Promise<Team> {
    const formData = new FormData()
    if (files.logo_file) {
      formData.append("logo_file", files.logo_file[0])
    }

    const res = await fetch(`${this.baseUrl}/${team_id}/uploads`, {
      method: "POST",
      body: formData,
      headers: {
        // "Content-Type": "application/json",
        // Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["teams"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to uploads files team: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Удаление команды по id
   */
  async deleteOneById(id: string): Promise<Team> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["teams"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to delete team: ${res.statusText}`)
    }

    return await res.json()
  }
}

export const teamAPI = new TeamAPI(`${process.env.API_URL}/v1/teams`)
