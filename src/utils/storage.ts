// ✅ storage.ts (서버 기반 버전)

export interface StoredUser {
  userId: number
  token?: string
}

const STORAGE_KEYS = {
  USER_ID: "userId",            // ✅ 프론트 전체가 사용하는 key로 통일
  TOKEN: "token"
}

// ✅ 현재 로그인한 사용자 불러오기
export function getCurrentUser(): StoredUser | null {
  if (typeof window === "undefined") return null
  
  const userId = localStorage.getItem(STORAGE_KEYS.USER_ID)
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN)

  if (!userId) return null

  return {
    userId: Number(userId),
    token: token || undefined
  }
}

// ✅ 로그인 정보 저장
export function setCurrentUser(user: StoredUser | null): void {
  if (typeof window === "undefined") return

  if (user) {
    localStorage.setItem(STORAGE_KEYS.USER_ID, String(user.userId))

    if (user.token) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, user.token)
    }
  } else {
    localStorage.removeItem(STORAGE_KEYS.USER_ID)
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
  }
}
