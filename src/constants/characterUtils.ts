// "types.tsx" 파일에서 Character(캐릭터)와 EmotionState(감정 상태)의 "설계도" (타입)를 가져옵니다.
// 'type' 키워드는 이것이 실제 코드가 아닌, TypeScript의 타입 체크용임을 명시합니다.
import type { Character, EmotionState } from "./types.tsx"

// "types.tsx" 파일에서 BADGES(배지 목록)와 TECH_STACKS(기술 스택 목록)의 "실제 데이터" (상수)를 가져옵니다.
import { BADGES, TECH_STACKS } from "./types.tsx"

// 가져온 상수 데이터를 다른 파일에서 쉽게 재사용할 수 있도록 다시 내보냅니다.
export { BADGES, TECH_STACKS }

/**
 * 캐릭터의 마지막 학습 날짜를 기준으로 현재 감정 상태를 계산합니다.
 * @param character - 현재 캐릭터 객체
 * @returns "excited", "happy", "neutral", "sad", "sleeping" 중 하나의 감정 상태 (EmotionState)
 */
export function calculateEmotionState(character: Character): EmotionState {
  const now = new Date() // 현재 시간
  const lastStudy = character.lastStudyDate ? new Date(character.lastStudyDate) : null // 마지막 학습 날짜

  // 학습 기록이 전혀 없으면 'neutral' 상태
  if (!lastStudy) return "neutral"

  // 마지막 학습일로부터 며칠이 지났는지 계산 (밀리초 -> 일)
  const daysSinceStudy = Math.floor((now.getTime() - lastStudy.getTime()) / (1000 * 60 * 60 * 24))

  // 날짜 경과에 따른 감정 상태 분기
  if (daysSinceStudy === 0) return "excited" // 오늘 공부함
  if (daysSinceStudy === 1) return "happy" // 1일 지남
  if (daysSinceStudy <= 3) return "neutral" // 2~3일 지남
  if (daysSinceStudy <= 7) return "sad" // 4~7일 지남
  return "sleeping" // 7일 초과
}

/**
 * 감정 상태(EmotionState)에 맞는 이모지(Emoji)를 반환합니다.
 * @param emotion - 감정 상태
 * @returns 감정 상태에 매칭되는 이모지 문자열
 */
export function getEmotionEmoji(emotion: EmotionState): string {
  // 감정 상태와 이모지를 1:1로 매핑한 객체
  const emotions = {
    excited: "🤩",
    happy: "😊",
    neutral: "😐",
    sad: "😢",
    sleeping: "😴",
  }
  return emotions[emotion] // 'excited'가 들어오면 '🤩' 반환
}

/**
 * 감정 상태와 기술 스택 이름에 맞는 동적 메시지를 반환합니다.
 * @param emotion - 감정 상태
 * @param techName - 현재 학습 중인 기술 스택의 이름
 * @returns "React를 기다리고 있어요" 같은 메시지 문자열
 */
export function getEmotionMessage(emotion: EmotionState, techName: string): string {
  const messages = {
    excited: `${techName} 공부 최고! 계속 달려봐요!`,
    happy: `${techName} 학습 중! 잘하고 있어요!`,
    neutral: `${techName}를 기다리고 있어요`,
    sad: `${techName}가 그리워해요...`,
    sleeping: `${techName}가 잠들었어요 💤`,
  }
  return messages[emotion]
}

/**
 * 다음 레벨업에 필요한 *총* 경험치를 계산합니다. (지수 함수 사용)
 * @param level - 현재 레벨
 * @returns 다음 레벨업에 필요한 총 경험치량
 */
export function calculateExperienceToNextLevel(level: number): number {
  // 예: 100 * (1.5^0) = 100 (Lv 1 -> 2)
  // 예: 100 * (1.5^1) = 150 (Lv 2 -> 3)
  // 예: 100 * (1.5^2) = 225 (Lv 3 -> 4)
  // 레벨이 오를수록 요구 경험치가 기하급수적으로 늘어납니다.
  return Math.floor(100 * Math.pow(1.5, level - 1))
}

/**
 * 학습 시간(분)을 기준으로 캐릭터에게 경험치를 추가하고, 레벨업을 처리합니다.
 * @param character - 현재 캐릭터 객체
 * @param minutes - 학습한 시간(분)
 * @returns 경험치와 레벨이 업데이트된 *새로운* 캐릭터 객체
 */
export function addExperience(character: Character, minutes: number): Character {
  const expGained = minutes * 10 // 1분 학습 = 10 경험치
  let newExp = character.experience + expGained // 현재 경험치 + 획득 경험치
  let newLevel = character.level
  let expToNext = character.experienceToNextLevel

  // 현재 경험치가 다음 레벨 경험치보다 많으면 레벨업 처리
  // (한 번에 여러 레벨을 오를 수 있도록 while 루프 사용)
  while (newExp >= expToNext) {
    newExp -= expToNext // 다음 레벨 경험치를 차감하고
    newLevel++ // 레벨 1 증가
    expToNext = calculateExperienceToNextLevel(newLevel) // 새로운 레벨에 맞는 다음 경험치량 재계산
  }

  // 업데이트된 값으로 새로운 캐릭터 객체를 반환 (불변성 유지)
  return {
    ...character, // 기존 캐릭터 속성 복사
    level: newLevel, // 업데이트된 레벨
    experience: newExp, // 업데이트된 경험치
    experienceToNextLevel: expToNext, // 업데이트된 다음 레벨 필요 경험치
  }
}

/**
 * 캐릭터의 현재 상태를 기준으로 새로 획득할 수 있는 배지가 있는지 확인합니다.
 * @param character - 현재 캐릭터 객체
 * @returns 새로 획득한 배지 ID들의 배열 (예: ["level-10", "streak-7"])
 */
export function checkAndAwardBadges(character: Character): string[] {
  const newBadges: string[] = [] // 새로 딴 배지 ID를 담을 배열

  // 'types.tsx'에 정의된 모든 배지 목록(BADGES)을 순회
  for (const badge of BADGES) {
    // 이미 획득한 배지라면 건너뛰기
    if (character.earnedBadges.includes(badge.id)) continue

    let shouldAward = false // 배지 획득 여부 플래그

    // 배지 타입(level, study_time 등)에 따라 획득 조건 검사
    switch (badge.type) {
      case "level":
        shouldAward = character.level >= badge.requirement
        break
      case "study_time":
        shouldAward = character.totalStudyMinutes >= badge.requirement
        break
      case "streak":
        shouldAward = character.streak >= badge.requirement
        break
      case "problems":
        shouldAward = character.solvedProblems.length >= badge.requirement
        break
    }

    // 획득 조건을 만족했다면, 새 배지 목록에 ID 추가
    if (shouldAward) {
      newBadges.push(badge.id)
    }
  }

  return newBadges // 새로 획득한 배지 ID 배열 반환
}

/**
 * 문제 풀이 보상으로 고정 경험치를 추가하고, 레벨업을 처리합니다.
 * (addExperience 함수와 로직이 거의 동일하나, 분(minutes) 대신 고정 exp를 받음)
 * @param character - 현재 캐릭터 객체
 * @param expReward - 문제 풀이 보상으로 받은 경험치
 * @returns 경험치와 레벨이 업데이트된 *새로운* 캐릭터 객체
 */
export function addExperienceFromProblem(character: Character, expReward: number): Character {
  let newExp = character.experience + expReward
  let newLevel = character.level
  let expToNext = character.experienceToNextLevel

  // 레벨업 처리 (while 루프)
  while (newExp >= expToNext) {
    newExp -= expToNext
    newLevel++
    expToNext = calculateExperienceToNextLevel(newLevel)
  }

  // 업데이트된 값으로 새로운 캐릭터 객체를 반환 (불변성 유지)
  return {
    ...character,
    level: newLevel,
    experience: newExp,
    experienceToNextLevel: expToNext,
  }
}

/**
 * 캐릭터의 동물 종류와 레벨에 따라 "진화"된 이모지를 반환합니다.
 * @param animalType - "cat", "dog" 등 동물의 종류
 * @param level - 현재 캐릭터 레벨
 * @returns 레벨(성장 단계)에 맞는 이모지 문자열
 */
export function getAnimalEmoji(animalType: string, level: number): string {
  // 동물 종류별, 성장 단계별 이모지 맵
  // 'cat'의 경우 'baby', 'young', 'adult', 'master' 4단계 진화
  const animalEvolution = {
    cat: {
      baby: "🐱", // Level 1-9: Baby cat
      young: "😺", // Level 10-19: Young cat
      adult: "😸", // Level 20-29: Adult cat
      master: "😻", // Level 30+: Master cat with heart eyes
    },
    dog: {
      baby: "🐶", // Level 1-9: Puppy
      young: "🐕", // Level 10-19: Young dog
      adult: "🦮", // Level 20-29: Guide dog (adult)
      master: "🐕‍🦺", // Level 30+: Service dog (master)
    },
    rabbit: {
      baby: "🐰", // Level 1-9: Baby rabbit
      young: "🐇", // Level 10-19: Young rabbit
      adult: "🐰", // Level 20-29: Adult rabbit
      master: "🐇", // Level 30+: Master rabbit
    },
    fox: {
      baby: "🦊", // Level 1-9: Baby fox
      young: "🦊", // Level 10-19: Young fox (slightly different)
      adult: "🦊", // Level 20-29: Adult fox
      master: "🦊", // Level 30+: Master fox
    },
    bear: {
      baby: "🐻", // Level 1-9: Baby bear
      young: "🐻", // Level 10-19: Young bear
      adult: "🐻‍❄️", // Level 20-29: Polar bear (adult)
      master: "🧸", // Level 30+: Teddy bear (master)
    },
    panda: {
      baby: "🐼", // Level 1-9: Baby panda
      young: "🐼", // Level 10-19: Young panda
      adult: "🐼", // Level 20-29: Adult panda
      master: "🐼", // Level 30+: Master panda
    },
  }

  // 레벨에 따라 현재 성장 단계("baby", "young", "adult", "master")를 결정합니다.
  let stage: keyof typeof animalEvolution.cat // 'baby', 'young' ...
  if (level < 10) {
    stage = "baby"
  } else if (level < 20) {
    stage = "young"
  } else if (level < 30) {
    stage = "adult"
  } else {
    stage = "master"
  }

  // 동물 타입과 성장 단계에 맞는 이모지를 맵에서 찾아 반환합니다.
  // (만약 맵에 없는 동물이면 기본값 '🐾' 반환)
  // animalEvolution['cat']['baby'] -> "🐱"
  return animalEvolution[animalType as keyof typeof animalEvolution]?.[stage] || "🐾"
}

/**
 * 레벨을 기준으로 현재 성장 단계의 이름("baby", "young" 등)을 반환합니다.
 * (getAnimalEmoji 함수 내부 로직과 중복되지만, 이름만 필요할 때 사용)
 * @param level - 현재 캐릭터 레벨
 * @returns "baby", "young", "adult", "master" 중 하나의 문자열
 */
export function getGrowthStage(level: number): string {
  if (level < 10) return "baby"
  if (level < 20) return "young"
  if (level < 30) return "adult"
  return "master"
}