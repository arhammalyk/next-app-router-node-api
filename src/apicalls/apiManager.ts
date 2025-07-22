import { getStoredAuth } from "../utils/localStorage"

interface ApiResponse {
  message: string | number
  [key: string]: unknown
}

interface ApiParams {
  [key: string]: string | number | boolean
}

type RequestBody = Record<string, unknown> | null

export default class ApiManager {
  private static singleton: ApiManager | null = null
  private accessToken?: string
  private userId?: string

  static readonly POST = "POST"
  static readonly GET = "GET"
  static readonly DELETE = "DELETE"
  static readonly PUT = "PUT"
  static readonly PATCH = "PATCH"

  // Returns an instance of this class
  static getInstance(): ApiManager {
    if (ApiManager.singleton == null) {
      ApiManager.singleton = new ApiManager()
    }
    return ApiManager.singleton
  }

  // Use this function to make POST calls to the server
  post(endpoint: string, body: RequestBody): Promise<ApiResponse> {
    const endpointUrl = this.generateEndpointUrl(endpoint)
    console.log(endpoint, "endpointUrl")

    return this._callServer(endpointUrl, body, ApiManager.POST)
  }

  // Use this function to make GET calls to the server
  get(endpoint: string, params: ApiParams): Promise<ApiResponse> {
    const endpointUrl = `${this.generateEndpointUrl(
      endpoint
    )}${this.convertToGetParams(params)}`
    return this._callServer(endpointUrl, null, ApiManager.GET)
  }

  // Use this function to make PUT calls to the server
  put(endpoint: string, body: RequestBody): Promise<ApiResponse> {
    const endpointUrl = this.generateEndpointUrl(endpoint)
    return this._callServer(endpointUrl, body, ApiManager.PUT)
  }

  patch(endpoint: string, body: RequestBody): Promise<ApiResponse> {
    const endpointUrl = this.generateEndpointUrl(endpoint)
    return this._callServer(endpointUrl, body, ApiManager.PATCH)
  }

  // Use this function to make DELETE calls to the server
  delete(endpoint: string, body?: RequestBody): Promise<ApiResponse> {
    const endpointUrl = this.generateEndpointUrl(endpoint)
    return this._callServer(endpointUrl, body, ApiManager.DELETE)
  }

  // Generate the URL for the specific endpoint
  private generateEndpointUrl(endpoint: string): string {
    return `${
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
    }${endpoint}`
  }

  // Convert object to GET params
  private convertToGetParams(params: ApiParams): string {
    const getParams = Object.keys(params)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(
            params[key].toString()
          )}`
      )
      .join("&")
    return `?${getParams}`
  }

  // Make the actual call to the server here. This should not be called from outside this class
  private async _callServer(
    endpoint: string,
    body: RequestBody = null,
    method: string = ApiManager.GET
  ): Promise<ApiResponse> {
    // Fetch the accessToken and userId asynchronously
    const accessToken = this.accessToken ?? (await getStoredAuth())?.accessToken
    const headers: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...(this.userId && { "user-id": this.userId }),
    }

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: headers,
        mode: "cors",
        body: body !== null ? JSON.stringify(body) : null,
      })

      const json: ApiResponse = await response.json()
      return json
    } catch (error) {
      // Ensure the error is an instance of Error
      if (!(error instanceof Error)) {
        throw new Error("An unknown error occurred")
      }

      throw error
    }
  }

  // Sets the accessToken in the session
  setAccessToken(accessToken: string): void {
    this.accessToken = accessToken
  }

  // Returns the accessToken in the session
  getAccessToken(): string | undefined {
    return this.accessToken
  }

  // Sets the user-id in the session
  setUserId(userId: string): void {
    this.userId = userId
  }

  // Returns the user-id in the session
  getUserId(): string | undefined {
    return this.userId
  }
}
