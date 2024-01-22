import { ApiResponse } from "@/01-shared/api/types"
import { Project } from "../model/types"
import { GetAllProjectsFilter, GetAllProjectsResponse } from "./types"
import { getErrorMessage } from "@/01-shared/utils/get-error-message"

class ProjectAPI {
  private baseUrl: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  async createOne(project: Project): Promise<ApiResponse<Project>> {
    try {
      const res = await fetch(`${this.baseUrl}/projects`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }

  async getAll({
    page = 0,
    limit,
    search,
    time_frame,
  }: GetAllProjectsFilter): Promise<ApiResponse<GetAllProjectsResponse>> {
    try {
      let url = `${this.baseUrl}/projects?page=${page}`
      url += limit ? `&limit=${limit}` : ""
      url += search ? `&search=${search}` : ""
      url += time_frame ? `&time_frame=${time_frame}` : ""
      const res = await fetch(url, {
        method: "GET",
        cache: "no-store",
        // next: { revalidate: 60 },
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }

  async getOneById(id: string): Promise<ApiResponse<Project>> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }

  async updateOneById(id: string, project: Project): Promise<ApiResponse<Project>> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${id}`, {
        method: "PUT",
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }

  async deleteOneById(id: string): Promise<ApiResponse<Project>> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }

  async approveOneById(project: Project): Promise<ApiResponse<Project>> {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${project._id}`, {
        method: "PUT",
        body: JSON.stringify({ ...project, flames: project.flames + 1 }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (!res.ok) {
        return { error: res.statusText, data: null }
      }
      return {
        error: null,
        data: await res.json(),
      }
    } catch (error) {
      return {
        error: getErrorMessage(error),
        data: null,
      }
    }
  }
}

export const projectAPI = new ProjectAPI(`${process.env.API_URL}/v1`)
