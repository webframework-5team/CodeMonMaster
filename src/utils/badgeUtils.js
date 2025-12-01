// src/utils/badgeUtils.js

/**
 * 레벨에 따른 뱃지 개수 계산 (8단계 시스템)
 * @param {number} level - 사용자 레벨
 * @returns {number} - 뱃지 개수
 */
export const calculateBadgeCount = (level) => {
  if (level < 5) return 0;
  if (level < 10) return 1;
  if (level < 20) return 2;
  if (level < 35) return 3;
  if (level < 50) return 4;
  if (level < 60) return 5;
  if (level < 85) return 6;
  if (level < 100) return 7;
  return 8;
};

/**
 * 레벨에 따른 대표 뱃지 티어 정보
 * (입문 트레이너 → … → 포켓몬 마스터)
 */
export const getBadgeInfo = (level) => {
  const badgeCount = calculateBadgeCount(level);

  const tiers = [
    {
      min: 0,
      max: 4,
      tier: "입문 트레이너",
      emoji: "🌱",
      color: "#9CA3AF",
      next: 5, // 다음 등급(초보 트레이너) 최소 레벨
    },
    {
      min: 5,
      max: 9,
      tier: "초보 트레이너",
      emoji: "🥉",
      color: "#CD7F32",
      next: 10,
    },
    {
      min: 10,
      max: 19,
      tier: "숙련 트레이너",
      emoji: "🥈",
      color: "#C0C0C0",
      next: 20,
    },
    {
      min: 20,
      max: 34,
      tier: "엘리트 트레이너",
      emoji: "🥇",
      color: "#FFD700",
      next: 35,
    },
    {
      min: 35,
      max: 49,
      tier: "베테랑 트레이너",
      emoji: "💎",
      color: "#E5E4E2",
      next: 50,
    },
    {
      min: 50,
      max: 59,
      tier: "최정예 트레이너",
      emoji: "💚",
      color: "#50C878",
      next: 60,
    },
    {
      min: 60,
      max: 84,
      tier: "챔피언",
      emoji: "💎",
      color: "#B9F2FF",
      next: 85,
    },
    {
      min: 85,
      max: 99,
      tier: "포켓몬 마스터",
      emoji: "👑",
      color: "#9D4EDD",
      next: 100,
    },
    {
      min: 100,
      max: Infinity,
      tier: "포켓몬 마스터",
      emoji: "👑",
      color: "#9D4EDD",
      next: null, // 최종 등급
    },
  ];

  const currentTier = tiers.find((t) => level >= t.min && level <= t.max);

  return {
    count: badgeCount,
    tier: currentTier.tier,
    emoji: currentTier.emoji,
    color: currentTier.color,
    nextTier: currentTier.next,
    levelsUntilNext: currentTier.next ? currentTier.next - level : 0,
  };
};

/**
 * 모든 뱃지 정보 가져오기 (뱃지 컬렉션용)
 */
export const getAllBadges = (userLevel) => {
  const badges = [
    {
      id: 1,
      tier: "입문 트레이너",
      emoji: "🌱",
      color: "#9CA3AF",
      requiredLevel: 5,
      image: "/images/badges/1_badge.png",
      description: "레벨 5 달성",
      unlocked: userLevel >= 5,
    },
    {
      id: 2,
      tier: "초보 트레이너",
      emoji: "🥉",
      color: "#CD7F32",
      requiredLevel: 10,
      image: "/images/badges/2_badge.png",
      description: "레벨 10 달성",
      unlocked: userLevel >= 10,
    },
    {
      id: 3,
      tier: "숙련 트레이너",
      emoji: "🥈",
      color: "#C0C0C0",
      requiredLevel: 20,
      image: "/images/badges/3_badge.png",
      description: "레벨 20 달성",
      unlocked: userLevel >= 20,
    },
    {
      id: 4,
      tier: "엘리트 트레이너",
      emoji: "🥇",
      color: "#FFD700",
      requiredLevel: 35,
      image: "/images/badges/4_badge.png",
      description: "레벨 35 달성",
      unlocked: userLevel >= 35,
    },
    {
      id: 5,
      tier: "베테랑 트레이너",
      emoji: "💎",
      color: "#E5E4E2",
      requiredLevel: 50,
      image: "/images/badges/5_badge.png",
      description: "레벨 50 달성",
      unlocked: userLevel >= 50,
    },
    {
      id: 6,
      tier: "최정예 트레이너",
      emoji: "💚",
      color: "#50C878",
      requiredLevel: 60,
      image: "/images/badges/6_badge.png",
      description: "레벨 60 달성",
      unlocked: userLevel >= 60,
    },
    {
      id: 7,
      tier: "챔피언",
      emoji: "💎",
      color: "#B9F2FF",
      requiredLevel: 85,
      image: "/images/badges/7_badge.png",
      description: "레벨 85 달성",
      unlocked: userLevel >= 85,
    },
    {
      id: 8,
      tier: "포켓몬 마스터",
      emoji: "👑",
      color: "#9D4EDD",
      requiredLevel: 100,
      image: "/images/badges/8_badge.png",
      description: "레벨 100 달성",
      unlocked: userLevel >= 100,
    },
  ];

  return badges;
};
