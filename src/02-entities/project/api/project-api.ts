import { RecursivePartial } from "@/01-shared/utils/recursive-partial"
import { Project } from "../model/types"

import { CreateProject, GetAllProjectsFilter, GetAllProjectsResponse } from "./types"

class ProjectAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Создание нового проекта
   */
  async createOne(project: CreateProject): Promise<Project> {
    const res = await fetch(`${this.baseUrl}`, {
      method: "POST",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to create project: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение всех проектов
   */
  async getAll(filter: GetAllProjectsFilter): Promise<GetAllProjectsResponse> {
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
    })

    if (!res.ok) {
      throw new Error(`Failed to get projects: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одного проекта по id
   */
  async getOneById(id: string): Promise<Project> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to get one project: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Обновление проекта по id
   */
  async updateOneById(id: string, project: RecursivePartial<Project>): Promise<Project> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to update project: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Удаление проекта по id
   */
  async deleteOneById(id: string): Promise<Project> {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to delete project: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Голосование за проект по id
   */
  async voteOneById(project_id: string): Promise<Project> {
    const res = await fetch(`${this.baseUrl}/vote/${project_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })

    if (!res.ok) {
      throw new Error(`Failed to vote project: ${res.statusText}`)
    }

    return await res.json()
  }
}

export const projectAPI = new ProjectAPI(`${process.env.API_URL}/v1/projects`)
