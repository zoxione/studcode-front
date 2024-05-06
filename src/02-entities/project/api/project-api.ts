import { Project } from "../model/types"
import {
  CreateProject,
  GetAllProjectsFilter,
  GetAllProjectsResponse,
  ProjectFiles,
  ProjectFilesResponse,
  UpdateProject,
} from "./types"

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
      next: {
        tags: ["projects"],
      },
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
      next: {
        tags: ["projects"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get projects: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение одного проекта
   */
  async getOne(key: string): Promise<Project> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["projects"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to get one project: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Обновление проекта
   */
  async updateOne(key: string, project: UpdateProject): Promise<Project> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
      method: "PUT",
      body: JSON.stringify(project),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["projects"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to update project: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Удаление проекта
   */
  async deleteOne(key: string): Promise<Project> {
    const res = await fetch(`${this.baseUrl}/${key}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["projects"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to delete project: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Загрузка файлов проекта
   */
  async uploadsOne(key: string, files: ProjectFiles): Promise<Project> {
    const formData = new FormData()
    if (files.logo_file) {
      formData.append("logo_file", files.logo_file[0])
    }
    if (files.screenshots_files) {
      for (const filesList of Array.from(files.screenshots_files)) {
        for (const file of Array.from(filesList)) {
          formData.append("screenshots_files", file)
        }
      }
    }

    const res = await fetch(`${this.baseUrl}/${key}/uploads`, {
      method: "POST",
      body: formData,
      credentials: "include",
      next: {
        tags: ["projects"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to uploads files project: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Голосование за проект
   */
  async voteOne(key: string): Promise<Project> {
    const res = await fetch(`${this.baseUrl}/${key}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      next: {
        tags: ["projects"],
      },
    })

    if (!res.ok) {
      throw new Error(`Failed to vote project: ${res.statusText}`)
    }

    return await res.json()
  }

  /**
   * Получение файлов одного проекта
   */
  async getOneFiles(key: string): Promise<ProjectFilesResponse> {
    const project = await this.getOne(key)
    let logo_file: Blob | null = null
    let screenshots_files = []

    if (project.logo !== "") {
      const res = await fetch(project.logo, {
        method: "GET",
      })
      logo_file = await res.blob()
    }
    for (const screenshot of project.screenshots) {
      const res = await fetch(screenshot, {
        method: "GET",
      })
      const data = await res.blob()
      screenshots_files.push(data)
    }

    return { logo_file, screenshots_files }
  }
}

export const projectAPI = new ProjectAPI(`${process.env.API_URL}/v1/projects`)
