import React, { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

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

  // localStorage에서 userId 읽어오기
  const userId = localStorage.getItem("userId")

  // 로그인 여부 
  useEffect(() => {
    if (!userId) {
      navigate("/login")
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>로딩 중...</div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>데이터를 불러올 수 없습니다.</div>
      </div>
    )
  }

  const result = data

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">

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
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 요약 정보 카드들 */}
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
              <div className="text-2xl font-bold">{result.exp}</div>
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
              <div className="text-2xl font-bold">{result.solvedQuestions}</div>
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
              <div className="text-2xl font-bold">{result.badgeCount ?? 0}</div>
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

        {/* 기술 스택별 현황 */}
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
