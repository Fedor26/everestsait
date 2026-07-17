import { cookies } from 'next/headers'

export interface SessionData {
  token: string
  username: string
  createdAt: number
  expiresAt: number
}

export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')

    if (!sessionCookie?.value) {
      return null
    }

    const sessionData = JSON.parse(sessionCookie.value) as SessionData

    // Check if session has expired
    if (sessionData.expiresAt < Date.now()) {
      return null
    }

    return sessionData
  } catch (error) {
    console.error('Session error:', error)
    return null
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const session = await getSession()
  return session !== null
}
