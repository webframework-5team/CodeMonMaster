// src/pages/ProfilePage.js

import React, { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import useUserStats from "../hooks/useUserStats"
import { calculateBadgeCount, getBadgeInfo, getAllBadges } from "../utils/badgeUtils"

import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/profile/card.tsx"
import { Button } from "../components/ui/profile/button.tsx"
import {
  ArrowLeft,
  Trophy,
  BookOpen,
  Brain,
  Calendar,
  Award,
  LogOut,
  TrendingUp,
  Layers,
} from "lucide-react"

export default function ProfilePage() {
  const navigate = useNavigate()

  const userId = localStorage.getItem("userId")

  // 로그인 여부 체크
  useEffect(() => {
    if (!userId) navigate("/login")
  }, [userId, navigate])

  // 서버에서 마이페이지 데이터 가져오기
  const { data, isLoading, error } = useQuery({
    queryKey: ["mypage", userId],
    enabled: Boolean(userId),
    queryFn: async () => {
      const res = await axios.get(`/user/${userId}`)
      return res.data.result
    },
  })

  // 홈 화면과 동일 stats
  const { stats } = useUserStats(userId)

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>로딩 중...</div>
      </div>
    )

  if (error || !data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>데이터를 불러올 수 없습니다.</div>
      </div>
    )

  const result = data
  
  // ==========================================
  // ★ [수정 1] 총 경험치 계산 로직 추가
  // ==========================================
  // ※ 팀원과 합의한 레벨업 기준이 10점이라면 10으로, 100점이면 100으로 설정하세요.
  const levelUpExp = 100; 
  const totalCalculatedExp = ((result.level - 1) * levelUpExp) + result.exp;
  // ==========================================

  // 레벨 기반 뱃지 계산 (서버 값 무시)

  const badgeCount = calculateBadgeCount(result.level)
  const badgeInfo = getBadgeInfo(result.level)
  const allBadges = getAllBadges(result.level)

  /** 경험치바 계산 */
  let progressPercent = 0
  if (badgeInfo.nextTier) {
    const minLevel = badgeInfo.minLevel ?? 0
    const maxLevel = badgeInfo.nextTier
    const totalNeeded = maxLevel - minLevel
    const progressed = result.level - minLevel

    progressPercent = Math.max(0, Math.min(100, (progressed / totalNeeded) * 100))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

        {/* 상단 네비 */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/home">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              메인으로 돌아가기
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              localStorage.removeItem("userId")
              navigate("/login")
            }}
          >
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>

        {/* 기본 정보 카드 */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="text-6xl">👤</div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{result.name}</h1>
                <p className="text-muted-foreground">{result.email}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  가입일: {new Date(result.signUpDate).toLocaleDateString("ko-KR")}
                </p>

                {/* 뱃지 티어 */}
                <div className="mt-2 flex items-center gap-2">
                  <span className="text-lg">{badgeInfo.emoji}</span>
                  <span className="text-sm font-semibold" style={{ color: badgeInfo.color }}>
                    {badgeInfo.tier} 등급
                  </span>
                  {badgeInfo.nextTier && (
                    <span className="text-xs text-gray-500">
                      (레벨 {badgeInfo.nextTier}에 다음 등급)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 요약 정보 카드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{result.level}</div>
              <div className="text-sm">총 레벨</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
              
              {/* ========================================== */}
              {/* ★ [수정 2] result.exp 대신 계산된 값 사용 */}
              {/* ========================================== */}
              <div className="text-2xl font-bold">{totalCalculatedExp} EXP</div>
              <div className="text-sm">총 경험치</div>
              
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{result.totalTime}분</div>
              <div className="text-sm">총 학습 시간</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{stats.solvedQuestionCount}</div>
              <div className="text-sm">해결한 문제</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{result.maximumStraightDay}일</div>
              <div className="text-sm">최대 연속 학습</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-pink-500" />
              <div className="text-2xl font-bold">{badgeCount}</div>
              <div className="text-sm">획득한 뱃지</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-center">
              <Layers className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
              <div className="text-2xl font-bold">{result.stackCount}</div>
              <div className="text-sm">학습 중인 기술 스택</div>
            </CardContent>
          </Card>
        </div>

        {/* 뱃지 컬렉션 + 진행도 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              뱃지 컬렉션
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {allBadges.map((badge) => (
                <div
                  key={badge.id}
                  className={`
                    relative flex flex-col items-center p-4 rounded-lg border-2 transition-all cursor-pointer
                    ${badge.unlocked
                      ? "bg-white border-gray-300 shadow-md hover:scale-105 hover:shadow-lg"
                      : "bg-gray-100 border-gray-200 opacity-50"}
                  `}
                >
                  {!badge.unlocked && (
                    <div className="absolute top-2 right-2 text-gray-400">🔒</div>
                  )}

                  <div className="mb-2 flex items-center justify-center">
                    {badge.image ? (
                      <img src={badge.image} alt={badge.tier} className="w-16 h-16 object-contain" />
                    ) : (
                      <span className="text-5xl">{badge.emoji}</span>
                    )}
                  </div>

                  <span
                    className="font-semibold text-sm text-center mb-1"
                    style={{ color: badge.unlocked ? badge.color : "#9CA3AF" }}
                  >
                    {badge.tier}
                  </span>

                  <span className="text-xs text-gray-500 text-center">{badge.description}</span>

                  {badge.unlocked && (
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                      ✔
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 다음 뱃지까지 진행도 계싼 */}
            {badgeInfo.nextTier && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">다음 뱃지까지</span>
                  <span className="text-sm font-semibold text-purple-600">
                    레벨 {badgeInfo.levelsUntilNext} 남음
                  </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-4 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 flex items-center justify-end pr-2"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <span className="text-xs text-white font-bold">
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 모든 뱃지 획득 */}
            {badgeCount >= 8 && (
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border-2 border-yellow-300 text-center">
                <div className="text-3xl mb-2">🎉</div>
                <p className="font-bold text-lg text-yellow-800">축하합니다!</p>
                <p className="text-sm text-yellow-700">모든 뱃지를 획득하셨습니다!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* 기술 스택 */}
        <Card>
          <CardHeader>
            <CardTitle>기술 스택별 학습 현황</CardTitle>
          </CardHeader>
          <CardContent>
            {result.skillStatus.map((skill, idx) => (
              <div key={idx} className="flex justify-between border-b py-2">
                <div>
                  <div className="font-medium">{skill.skillName}</div>
                  <div className="text-sm">레벨 {skill.level}</div>
                </div>
                <div className="text-right font-bold">{skill.time}분</div>
              </div>
            ))}

            {result.skillStatus.length === 0 && (
              <p className="text-center py-4 text-muted-foreground">
                아직 학습 중인 기술 스택이 없습니다
              </p>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
