// "use client"
// Next.js 13+ (App Router)에서 사용되는 지시어입니다.
// 이 파일(또는 이 파일을 import하는 파일)이 브라우저(클라이언트) 환경에서 실행되어야 함을 명시합니다.
// (일반적으로 React의 Context API나 Hook을 사용하는 파일, 이벤트 리스너가 있는 파일에 필요합니다.
// 여기서는 이 타입을 사용하는 클라이언트 컴포넌트가 많아 미리 선언한 것으로 보입니다.)
"use client"

// --- 1. 타입(Type) 정의: 데이터의 "설계도" ---

/**
 * 앱에서 사용되는 개별 기술 스택(예: React)의 구조를 정의합니다.
 */
export type TechStack = {
  id: string // 고유 식별자 (예: "react")
  name: string // 이름 (예: "React")
  icon: string // 아이콘 (예: "⚛️")
  color: string // 고유 색상 (예: "#61DAFB")
  isCustom?: boolean // 사용자가 직접 추가했는지 여부 (선택 사항)
}

/**
 * 사용자가 선택할 수 있는 캐릭터의 동물 종류를 제한합니다.
 */
export type AnimalType = "cat" | "dog" | "rabbit" | "fox" | "bear" | "panda"

/**
 * 캐릭터의 감정 상태를 정해진 값으로 제한합니다.
 */
export type EmotionState = "excited" | "happy" | "neutral" | "sad" | "sleeping"

/**
 * 사용자의 학습 데이터를 대표하는 "캐릭터"의 핵심 구조입니다.
 * (가장 중요한 데이터 타입)
 */
export type Character = {
  id: string // 캐릭터 고유 ID
  techStackId: string // 현재 학습 중인 기술 스택 ID (TechStack.id 참조)
  animalType: AnimalType // 캐릭터의 동물 종류
  level: number // 현재 레벨
  experience: number // 현재 경험치
  experienceToNextLevel: number // 다음 레벨까지 필요한 총 경험치
  emotionState: EmotionState // 현재 감정 상태
  lastStudyDate: string | null // 마지막 학습 날짜 (ISO 8601 문자열)
  totalStudyMinutes: number // 총 누적 학습 시간(분)
  streak: number // 현재 연속 학습 일수
  earnedBadges: string[] // 획득한 배지 ID 목록 (Badge.id 참조)
  solvedProblems: string[] // 해결한 문제 ID 목록 (Problem.id 참조)
}

/**
 * 개별 학습 세션(기록)의 구조를 정의합니다.
 */
export type StudySession = {
  id: string
  characterId: string // 이 학습을 수행한 캐릭터 ID
  date: string // 학습 날짜
  durationMinutes: number // 학습 시간(분)
  notes: string // 학습 노트
}

/**
 * 사용자가 획득할 수 있는 "배지" 또는 "업적"의 구조를 정의합니다.
 */
export type Badge = {
  id: string // 배지 고유 ID (예: "level-10")
  name: string // 배지 이름 (예: "브론즈 레벨러")
  description: string // 획득 조건 설명
  icon: string // 아이콘 (예: "🥉")
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond" // 배지 등급
  type: "level" | "study_time" | "streak" | "problems" // 배지 종류 (획득 조건)
  requirement: number // 획득 조건 수치 (예: 레벨 10, 학습 시간 600분)
}

/**
 * 문제의 유형을 제한합니다 (객관식 또는 코딩)
 */
export type ProblemType = "multiple-choice" | "coding"

/**
 * 문제의 난이도를 제한합니다.
 */
export type ProblemDifficulty = "easy" | "medium" | "hard"

/**
 * 사용자가 풀게 될 "문제" (퀴즈 또는 코딩 테스트)의 구조를 정의합니다.
 */
export type Problem = {
  id: string
  techStackId: string // 이 문제가 속한 기술 스택 ID
  title: string // 문제 제목
  description: string // 문제 설명 (지문)
  type: ProblemType // 문제 유형
  difficulty: ProblemDifficulty // 난이도
  options?: string[] // (객관식) 선택지 목록
  correctAnswer?: number // (객관식) 정답 인덱스
  expReward: number // 문제 풀이 시 획득 경험치
  starterCode?: string // (코딩) 기본 제공 코드
  solution?: string // (코딩) 정답 코드
  testCases?: { input: string; expectedOutput: string }[] // (코딩) 테스트 케이스
}

/**
 * (미사용 또는 예정) 친구 시스템을 위한 친구 데이터 구조입니다.
 */
export type Friend = {
  id: string
  name: string
  avatar: string
  totalScore: number
  characters: Character[] // 친구가 보유한 캐릭터 목록
}

/**
 * (미사용 또는 예정) 랭킹 시스템 등을 위한 '전체 사용자'의 공개 프로필 구조입니다.
 */
export type GlobalUser = {
  id: string
  username: string
  avatar: string
  level: number // (대표 캐릭터 레벨 또는 총 레벨)
  totalScore: number
  totalStudyMinutes: number
  characterCount: number
}

/**
 * 앱에 가입한 "사용자" (계정)의 기본 정보 구조입니다.
 */
export type User = {
  id: string
  username: string
  email: string
  password: string // (보통 클라이언트에서는 password를 다루지 않으나, 타입은 정의될 수 있음)
  avatar: string // 프로필 사진 URL
  createdAt: string // 가입일
}

// --- 2. 상수(Constant) 데이터: 앱의 "원본 데이터" ---

/**
 * 앱에서 기본으로 제공하는 기술 스택의 "마스터 목록"입니다.
 * 이 데이터는 characterUtils.ts 등에서 사용됩니다.
 */
export const TECH_STACKS: TechStack[] = [
  { id: "react", name: "React", icon: "⚛️", color: "#61DAFB" },
  { id: "typescript", name: "TypeScript", icon: "📘", color: "#3178C6" },
  { id: "nodejs", name: "Node.js", icon: "🟢", color: "#339933" },
  { id: "python", name: "Python", icon: "🐍", color: "#3776AB" },
  { id: "javascript", name: "JavaScript", icon: "💛", color: "#F7DF1E" },
  { id: "nextjs", name: "Next.js", icon: "▲", color: "#000000" },
  { id: "vue", name: "Vue.js", icon: "💚", color: "#4FC08D" },
  { id: "angular", name: "Angular", icon: "🅰️", color: "#DD0031" },
  { id: "java", name: "Java", icon: "☕", color: "#007396" },
  { id: "csharp", name: "C#", icon: "#️⃣", color: "#239120" },
  { id: "go", name: "Go", icon: "🔵", color: "#00ADD8" },
  { id: "rust", name: "Rust", icon: "🦀", color: "#000000" },
]

/**
 * 앱의 모든 "배지(업적)"의 "마스터 목록"입니다.
 * characterUtils.ts의 checkAndAwardBadges 함수가 이 목록을 기준으로 배지 획득을 검사합니다.
 */
export const BADGES: Badge[] = [
  // --- 레벨 달성 배지 ---
  {
    id: "level-10",
    name: "브론즈 레벨러",
    description: "레벨 10 달성",
    icon: "🥉",
    tier: "bronze",
    type: "level",
    requirement: 10,
  },
  {
    id: "level-20",
    name: "실버 레벨러",
    description: "레벨 20 달성",
    icon: "🥈",
    tier: "silver",
    type: "level",
    requirement: 20,
  },
  {
    id: "level-30",
    name: "골드 레벨러",
    description: "레벨 30 달성",
    icon: "🥇",
    tier: "gold",
    type: "level",
    requirement: 30,
  },
  {
    id: "level-50",
    name: "플래티넘 레벨러",
    description: "레벨 50 달성",
    icon: "🏆",
    tier: "platinum",
    type: "level",
    requirement: 50,
  },
  {
    id: "level-100",
    name: "다이아몬드 레벨러",
    description: "레벨 100 달성",
    icon: "💎",
    tier: "diamond",
    type: "level",
    requirement: 100,
  },

  // --- 누적 학습 시간 배지 (단위: 분) ---
  {
    id: "study-600",
    name: "브론즈 학습자",
    description: "10시간 학습", // 600분
    icon: "🎖️",
    tier: "bronze",
    type: "study_time",
    requirement: 600,
  },
  {
    id: "study-3000",
    name: "실버 학습자",
    description: "50시간 학습", // 3000분
    icon: "🏅",
    tier: "silver",
    type: "study_time",
    requirement: 3000,
  },
  {
    id: "study-6000",
    name: "골드 학습자",
    description: "100시간 학습", // 6000분
    icon: "🎗️",
    tier: "gold",
    type: "study_time",
    requirement: 6000,
  },
  {
    id: "study-12000",
    name: "플래티넘 학습자",
    description: "200시간 학습", // 12000분
    icon: "👑",
    tier: "platinum",
    type: "study_time",
    requirement: 12000,
  },
  {
    id: "study-30000",
    name: "다이아몬드 학습자",
    description: "500시간 학습", // 30000분
    icon: "⭐",
    tier: "diamond",
    type: "study_time",
    requirement: 30000,
  },

  // --- 연속 학습일수(스트릭) 배지 ---
  {
    id: "streak-7",
    name: "일주일 연속",
    description: "7일 연속 학습",
    icon: "🔥",
    tier: "bronze",
    type: "streak",
    requirement: 7,
  },
  {
    id: "streak-30",
    name: "한 달 연속",
    description: "30일 연속 학습",
    icon: "💪",
    tier: "silver",
    type: "streak",
    requirement: 30,
  },
  {
    id: "streak-100",
    name: "백일 연속",
    description: "100일 연속 학습",
    icon: "🌟",
    tier: "gold",
    type: "streak",
    requirement: 100,
  },
  {
    id: "streak-365",
    name: "일 년 연속",
    description: "365일 연속 학습",
    icon: "🎊",
    tier: "platinum",
    type: "streak",
    requirement: 365,
  },

  // --- 누적 문제 해결 배지 ---
  {
    id: "problems-10",
    name: "문제 해결사",
    description: "10문제 해결",
    icon: "🧩",
    tier: "bronze",
    type: "problems",
    requirement: 10,
  },
  {
    id: "problems-50",
    name: "숙련된 해결사",
    description: "50문제 해결",
    icon: "🎯",
    tier: "silver",
    type: "problems",
    requirement: 50,
  },
  {
    id: "problems-100",
    name: "전문 해결사",
    description: "100문제 해결",
    icon: "🚀",
    tier: "gold",
    type: "problems",
    requirement: 100,
  },
  {
    id: "problems-500",
    name: "마스터 해결사",
    description: "500문제 해결",
    icon: "🏆",
    tier: "platinum",
    type: "problems",
    requirement: 500,
  },
  {
    id: "problems-1000",
    name: "전설의 해결사",
    description: "1000문제 해결",
    icon: "💫",
    tier: "diamond",
    type: "problems",
    requirement: 1000,
  },
]