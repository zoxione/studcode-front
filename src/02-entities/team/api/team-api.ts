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
   * Получение одной команды
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
   * Обновление команды
   */
  async updateOne(key: string, team: UpdateTeam): Promise<Team> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
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
   * Обновление участников команды
   */
  async updateMembers(key: string, members: UpdateTeamMember[]): Promise<Team> {
    const res = await fetch(`${this.baseUrl}/${key}/members`, {
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
   * Добавление участника в команду
   */
  async addMember(key: string, member: UpdateTeamMember["member"]): Promise<Team> {
    const res = await fetch(`${this.baseUrl}/${key}/members/add`, {
      method: "PUT",
      body: JSON.stringify(member),
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
   * Удаление участника из команды
   */
  async removeMember(key: string, member: Pick<UpdateTeamMember["member"], "user">): Promise<Team> {
    const res = await fetch(`${this.baseUrl}/${key}/members/remove`, {
      method: "PUT",
      body: JSON.stringify(member),
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
   * Загрузка файлов команды
   */
  async uploadsOne(key: string, files: TeamFiles): Promise<Team> {
    const formData = new FormData()
    if (files.logo_file) {
      formData.append("logo_file", files.logo_file[0])
    }

    const res = await fetch(`${this.baseUrl}/${key}/uploads`, {
      method: "POST",
      body: formData,
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
   * Удаление команды
   */
  async deleteOne(key: string): Promise<Team> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
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
