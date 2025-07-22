import { setStoredAuth } from "../../utils/localStorage"
import ApiManager from "../apiManager"
import { USER_API_ENDPOINTS } from "../endPoints"

const apiManager = ApiManager.getInstance()

interface User {
  // Define the properties of your user object here
  // For example:
  _id: string
  id: string
  name: string
  email: string
  [key: string]: unknown // Allow for other properties
}

export const login = async (email: string, password: string) => {
  try {
    const credentials = {
      email: email,
      password: password,
    }
    const response = await apiManager.post(
      USER_API_ENDPOINTS.LOGIN,
      credentials
    )
    if (!response.success) return { success: false, user: null }

    // Store the token and user information securely in localStorage
    await setStoredAuth({
      user: response.user as User,
      accessToken: response.accessToken as string,
    })

    // Set the token in ApiManager for future requests
    apiManager.setAccessToken(response.accessToken as string)
    return {
      success: true,
      user: response.user as User,
      accessToken: response.accessToken as string,
    }
  } catch (error) {
    let errorMessage = "Login failed. Please try again."
    if (error instanceof Error) {
      if (
        "response" in error &&
        typeof error.response === "object" &&
        error.response &&
        "data" in error.response &&
        typeof error.response.data === "object" &&
        error.response.data &&
        "detail" in error.response.data
      ) {
        errorMessage = error.response.data.detail as string
      } else {
        errorMessage = error.message
      }
    }
    throw new Error(errorMessage)
  }
}

export const updateUser = async (updated: Partial<User>) => {
  try {
    const response = await apiManager.put(
      USER_API_ENDPOINTS.UPDATE_USER,
      updated
    )

    return response
  } catch (error) {
    let errorMessage = "Update failed. Please try again."
    if (error instanceof Error) {
      if (
        "response" in error &&
        typeof error.response === "object" &&
        error.response &&
        "data" in error.response &&
        typeof error.response.data === "object" &&
        error.response.data &&
        "detail" in error.response.data
      ) {
        errorMessage = error.response.data.detail as string
      } else {
        errorMessage = error.message
      }
    }
    throw new Error(errorMessage)
  }
}
