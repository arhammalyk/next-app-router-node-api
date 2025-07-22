const SECRET_KEY: string = process.env.NEXT_PUBLIC_SECRET_KEY ?? ""

const getKey = async () => {
  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined")
  }

  const keyBytes = new Uint8Array(
    SECRET_KEY.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
  )
  return await window.crypto.subtle.importKey(
    "raw",
    keyBytes,
    "AES-GCM",
    false,
    ["encrypt", "decrypt"]
  )
}

const getIv = () => window.crypto.getRandomValues(new Uint8Array(12))

export const encryptData = async (data: string) => {
  const key = await getKey()
  const iv = getIv()
  const enc = new TextEncoder()
  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(data)
  )
  return {
    iv: Array.from(iv),
    data: Array.from(new Uint8Array(encrypted)),
  }
}

interface EncryptedData {
  iv: number[]
  data: number[]
}

export const decryptData = async (encryptedData: EncryptedData) => {
  const key = await getKey()
  const iv = new Uint8Array(encryptedData.iv)
  const data = new Uint8Array(encryptedData.data)
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    data
  )
  const dec = new TextDecoder()
  return dec.decode(decrypted)
}

export const getStoredAuth = async () => {
  const storedAuth = localStorage.getItem("accessToken")
  if (storedAuth) {
    try {
      const decryptedAuth = await decryptData(JSON.parse(storedAuth))
      return JSON.parse(decryptedAuth)
    } catch (error) {
      console.error("Error decrypting stored accessToken:", error)
    }
  }
  return null
}

interface Auth {
  user: {
    _id: string
    id: string
    [key: string]: unknown
  }
  accessToken: string
}

export const setStoredAuth = async (auth: Auth) => {
  const authString = JSON.stringify(auth)
  try {
    const encryptedAuth = await encryptData(authString)
    const encryptedAuthString = JSON.stringify(encryptedAuth)
    localStorage.setItem("accessToken", encryptedAuthString)
    localStorage.setItem("userId", auth.user._id || auth.user.id)
  } catch (error) {
    console.error("Error encrypting auth data:", error)
  }
}

export const removeStoredAuth = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("userId")
}

export function generateNonRepeatingId(): string {
  const timestamp = Date.now().toString(36) // Convert current timestamp to base-36
  const randomPart = Math.random().toString(36).substring(2, 7) // Random part of the ID
  return `${timestamp}-${randomPart}`
}
export const getUserId = () => {
  return localStorage.getItem("userId")
}

export const getAccessToken = () => {
  return localStorage.getItem("accessToken")
}
