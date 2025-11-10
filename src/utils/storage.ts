import type { Character, StudySession, TechStack, AnimalType, Friend, GlobalUser, User } from "../constants/types.tsx"
import { calculateExperienceToNextLevel } from "../constants/characterUtils.ts"

const STORAGE_KEYS = {
  CHARACTERS: "learning-app-characters",
  SESSIONS: "learning-app-sessions",
  FRIENDS: "learning-app-friends",
  CUSTOM_STACKS: "learning-app-custom-stacks",
  GLOBAL_USERS: "learning-app-global-users",
  CURRENT_USER: "learning-app-current-user",
  USERS: "learning-app-users",
}

function migrateCharacter(character: any): Character {
  return {
    ...character,
    earnedBadges: character.earnedBadges || [],
    solvedProblems: character.solvedProblems || [],
    animalType: character.animalType || "cat",
  }
}

export function getCharacters(): Character[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.CHARACTERS)
  if (!data) return []

  const characters = JSON.parse(data)
  return characters.map(migrateCharacter)
}

export function saveCharacters(characters: Character[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.CHARACTERS, JSON.stringify(characters))
}

export function createCharacter(techStack: TechStack, animalType: AnimalType): Character {
  if (techStack.isCustom) {
    const customStacks = getCustomStacks()
    if (!customStacks.find((s) => s.id === techStack.id)) {
      customStacks.push(techStack)
      saveCustomStacks(customStacks)
    }
  }

  return {
    id: `char-${Date.now()}-${Math.random()}`,
    techStackId: techStack.id,
    animalType,
    level: 1,
    experience: 0,
    experienceToNextLevel: calculateExperienceToNextLevel(1),
    emotionState: "neutral",
    lastStudyDate: null,
    totalStudyMinutes: 0,
    streak: 0,
    earnedBadges: [],
    solvedProblems: [],
  }
}

export function getSessions(): StudySession[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.SESSIONS)
  return data ? JSON.parse(data) : []
}

export function saveSessions(sessions: StudySession[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(sessions))
}

export function addSession(session: Omit<StudySession, "id">): StudySession {
  const sessions = getSessions()
  const newSession: StudySession = {
    ...session,
    id: `session-${Date.now()}-${Math.random()}`,
  }
  sessions.push(newSession)
  saveSessions(sessions)
  return newSession
}

export function getCustomStacks(): TechStack[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_STACKS)
  return data ? JSON.parse(data) : []
}

export function saveCustomStacks(stacks: TechStack[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.CUSTOM_STACKS, JSON.stringify(stacks))
}

export function getFriends(): Friend[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.FRIENDS)
  return data ? JSON.parse(data) : []
}

export function saveFriends(friends: Friend[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.FRIENDS, JSON.stringify(friends))
}

export function generateMockFriend(name: string): Friend {
  const avatars = ["👨", "👩", "🧑", "👦", "👧", "🧔", "👱", "👴", "👵"]
  const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]

  // Generate random characters for the friend
  const numCharacters = Math.floor(Math.random() * 5) + 1
  const mockCharacters: Character[] = []

  for (let i = 0; i < numCharacters; i++) {
    const level = Math.floor(Math.random() * 30) + 1
    const exp = Math.floor(Math.random() * 500)
    mockCharacters.push({
      id: `mock-${Date.now()}-${i}`,
      techStackId: `mock-stack-${i}`,
      animalType: ["cat", "dog", "rabbit", "fox", "bear", "panda"][Math.floor(Math.random() * 6)] as AnimalType,
      level,
      experience: exp,
      experienceToNextLevel: calculateExperienceToNextLevel(level),
      emotionState: "happy",
      lastStudyDate: new Date().toISOString(),
      totalStudyMinutes: Math.floor(Math.random() * 2000),
      streak: Math.floor(Math.random() * 30),
      earnedBadges: [],
      solvedProblems: [],
    })
  }

  const totalScore = mockCharacters.reduce((sum, char) => sum + char.level * 100 + char.experience, 0)

  return {
    id: `friend-${Date.now()}-${Math.random()}`,
    name,
    avatar: randomAvatar,
    totalScore,
    characters: mockCharacters,
  }
}

export function getGlobalUsers(): GlobalUser[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.GLOBAL_USERS)

  if (!data) {
    // Initialize with mock users
    const mockUsers = generateMockGlobalUsers()
    saveGlobalUsers(mockUsers)
    return mockUsers
  }

  return JSON.parse(data)
}

export function saveGlobalUsers(users: GlobalUser[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.GLOBAL_USERS, JSON.stringify(users))
}

export function generateMockGlobalUsers(): GlobalUser[] {
  const names = [
    "김코딩",
    "이개발",
    "박프론트",
    "최백엔드",
    "정풀스택",
    "강데이터",
    "조디자인",
    "윤알고리즘",
    "임클라우드",
    "한보안",
    "서머신러닝",
    "오블록체인",
    "신모바일",
    "권게임",
    "황AI",
    "송웹",
    "전앱",
    "홍시스템",
    "유네트워크",
    "노데브옵스",
  ]

  const avatars = ["👨‍💻", "👩‍💻", "🧑‍💻", "👨‍🎓", "👩‍🎓", "🧑‍🎓", "👨‍🔬", "👩‍🔬", "🧑‍🔬", "👨‍💼"]

  return names.map((name, index) => {
    const level = Math.floor(Math.random() * 80) + 10
    const totalScore = level * 100 + Math.floor(Math.random() * 5000)
    const totalStudyMinutes = Math.floor(Math.random() * 5000) + 500
    const characterCount = Math.floor(Math.random() * 8) + 1

    return {
      id: `global-user-${index}`,
      username: name,
      avatar: avatars[index % avatars.length],
      level,
      totalScore,
      totalStudyMinutes,
      characterCount,
    }
  })
}

export function updateCurrentUserInGlobalRanking(characters: Character[]): void {
  const globalUsers = getGlobalUsers()
  const currentUserIndex = globalUsers.findIndex((u) => u.id === "current-user")

  const totalLevel = characters.reduce((sum, char) => sum + char.level, 0)
  const totalScore = characters.reduce((sum, char) => sum + char.level * 100 + char.experience, 0)
  const totalStudyMinutes = characters.reduce((sum, char) => sum + char.totalStudyMinutes, 0)

  const currentUser: GlobalUser = {
    id: "current-user",
    username: "나",
    avatar: "🙋",
    level: totalLevel,
    totalScore,
    totalStudyMinutes,
    characterCount: characters.length,
  }

  if (currentUserIndex >= 0) {
    globalUsers[currentUserIndex] = currentUser
  } else {
    globalUsers.push(currentUser)
  }

  saveGlobalUsers(globalUsers)
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
  return data ? JSON.parse(data) : null
}

export function setCurrentUser(user: User | null): void {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user))
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
  }
}

export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const data = localStorage.getItem(STORAGE_KEYS.USERS)
  return data ? JSON.parse(data) : []
}

export function saveUsers(users: User[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
}

export function registerUser(username: string, email: string, password: string): User | null {
  const users = getUsers()

  // Check if user already exists
  if (users.find((u) => u.email === email)) {
    return null
  }

  const avatars = ["👨‍💻", "👩‍💻", "🧑‍💻", "👨‍🎓", "👩‍🎓", "🧑‍🎓"]
  const newUser: User = {
    id: `user-${Date.now()}`,
    username,
    email,
    password, // In production, this should be hashed
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)
  return newUser
}

export function loginUser(email: string, password: string): User | null {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)
  return user || null
}