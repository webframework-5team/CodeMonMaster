// --- React 및 라이브러리 import ---
import { useEffect, useState } from "react" // React의 기본 Hook (useEffect: 컴포넌트 생명주기 관리, useState: 상태 관리)
import { useNavigate } from "react-router-dom" // 페이지 이동(navigation)을 위한 Hook
import { useQuery } from "@tanstack/react-query" // 서버 데이터 fetching, caching을 위한 Hook
import { Link } from "react-router-dom" // 새로고침 없는 페이지 이동을 위한 컴포넌트

// --- 로컬 유틸리티 및 데이터 import ---
// storage.ts: 브라우저 로컬 스토리지에서 사용자 정보, 캐릭터, 세션 데이터를 가져오는 함수들
import { getCurrentUser, getCharacters, getSessions, setCurrentUser } from "../utils/storage.ts"
// types.tsx (characterUtils.ts를 통해 export됨): 기술 스택과 배지의 "원본 데이터" 목록
import { TECH_STACKS, BADGES } from "../constants/characterUtils.ts"

// --- UI 부품(컴포넌트) import ---
// card.tsx: 카드 UI를 구성하는 부품들
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.tsx"
// button.tsx: 표준 버튼 부품
import { Button } from "../components/ui/button.tsx"
// lucide-react: 아이콘 라이브러리
import { ArrowLeft, Trophy, BookOpen, Brain, Calendar, Award, LogOut, TrendingUp } from "lucide-react"


// ProfilePage 컴포넌트 정의
export default function ProfilePage() {
  // mounted 상태: 컴포넌트가 브라우저에 성공적으로 마운트되었는지 확인 (hydration 오류 방지)
  const [mounted, setMounted] = useState(false)
  // navigate 함수: 페이지를 이동시킬 때 사용 (예: navigate('/login'))
  const navigate = useNavigate()

  // --- 1. 서버 데이터 Fetching (React Query) ---
  // useQuery를 사용해 '/api/user/me' (내 정보) API에서 데이터를 가져옵니다.
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user", "me"], // 이 데이터의 고유 캐시 키
    queryFn: async () => { // 실제 데이터를 가져오는 함수
      const response = await fetch("/api/user/me")
      if (!response.ok) throw new Error("Failed to fetch user data")
      return response.json() // JSON 형태로 변환된 데이터를 반환
    },
    enabled: mounted, // mounted가 true가 되어야만 이 쿼리가 실행됨
  })

  // --- 2. 인증(Authentication) 및 마운트 처리 ---
  // 컴포넌트가 처음 렌더링될 때 한 번 실행됩니다.
  useEffect(() => {
    // 로컬 스토리지에서 현재 사용자 정보를 가져옵니다.
    const user = getCurrentUser()
    if (!user) {
      // 사용자 정보가 없으면 (로그인 X) /login 페이지로 강제 이동
      navigate("/login")
      return
    }
    // 사용자 정보가 있으면, 컴포넌트가 마운트되었음을 true로 설정
    setMounted(true)
  }, [navigate]) // navigate 함수가 변경될 때만 (사실상 1회) 실행

  // --- 3. 로그아웃 핸들러 ---
  const handleLogout = () => {
    // window.confirm은 브라우저의 '확인/취소' 대화상자를 띄웁니다.
    // (참고: 실제 앱에서는 alert()나 confirm() 대신 커스텀 모달을 사용하는 것이 좋습니다.)
    if (window.confirm("로그아웃 하시겠습니까?")) {
      setCurrentUser(null) // 로컬 스토리지에서 사용자 정보 삭제
      navigate("/login") // 로그인 페이지로 이동
    }
  }

  // --- 4. 로딩 상태 UI ---
  // 컴포넌트가 마운트되지 않았거나, API에서 사용자 데이터를 아직 받아오는 중일 때
  if (!mounted || userLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          {/* 로딩 스피너 */}
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">로딩 중...</p>
        </div>
      </div>
    )
  }

  // --- 5. 로컬 데이터 조회 ---
  // (로딩이 끝난 후) 로컬 스토리지에서 현재 유저, 캐릭터, 세션 정보를 다시 가져옵니다.
  const user = getCurrentUser()
  // user가 (로그아웃 등으로) 갑자기 사라지면, 렌더링을 중단 (null 반환)
  if (!user) return null

  const characters = getCharacters() // 모든 캐릭터 목록
  const sessions = getSessions()     // 모든 학습 기록

  // --- 6. 통계 계산 ---
  // (이곳의 계산은 모두 로컬 데이터를 기반으로 함)
  // reduce: 배열을 순회하며 값을 누적 (총합 계산)
  const totalLevel = characters.reduce((sum, char) => sum + char.level, 0)
  const totalExp = characters.reduce((sum, char) => sum + char.experience, 0)
  const totalStudyTime = characters.reduce((sum, char) => sum + char.totalStudyMinutes, 0)
  const totalProblems = characters.reduce((sum, char) => sum + char.solvedProblems.length, 0)
  // map: 배열의 각 요소를 변환 (여기서는 각 캐릭터의 streak 값만 뽑아냄) 후, 최대값 계산
  const maxStreak = Math.max(...characters.map((c) => c.streak), 0)
  // flatMap: 2차원 배열을 1차원으로 평탄화 (모든 캐릭터의 배지 목록을 하나의 배열로 합침)
  const allBadges = characters.flatMap((c) => c.earnedBadges)
  // Set: 중복을 허용하지 않는 자료구조. 중복된 배지 ID를 제거함
  const uniqueBadges = [...new Set(allBadges)]

  // 최근 학습 기록 (sort: 날짜 내림차순 정렬, slice: 상위 10개만 자르기)
  const recentProblems = sessions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  // 기술 스택별 학습 현황 (map: 각 캐릭터 데이터를 {이름, 시간, 레벨} 객체로 변환)
  const studyByTech = characters.map((char) => {
    // TECH_STACKS 원본 목록에서 캐릭터의 techStackId와 일치하는 정보를 찾음
    const techStack = TECH_STACKS.find((t) => t.id === char.techStackId)
    return {
      name: techStack?.name || "Unknown", // 기술 스택 이름
      minutes: char.totalStudyMinutes, // 학습 시간
      level: char.level, // 레벨
    }
  })

  // --- 7. JSX 렌더링 ---
  return (
    // 전체 페이지 배경
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        
        {/* 헤더: 뒤로가기, 로그아웃 버튼 */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard"> {/* /dashboard 페이지로 이동하는 링크 */}
            <Button variant="ghost" size="sm"> {/* button.tsx 부품 사용 */}
              <ArrowLeft className="w-4 h-4 mr-2" />
              대시보드로 돌아가기
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={handleLogout}> {/* 로그아웃 함수 연결 */}
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>

        {/* 프로필 헤더 카드 */}
        <Card className="mb-8"> {/* card.tsx 부품 사용 */}
          <CardContent className="pt-6">
            <div className="flex items-center gap-6">
              <div className="text-6xl">{user.avatar}</div> {/* 유저 아바타 (이모지) */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
                <p className="text-muted-foreground">{user.email}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  가입일: {new Date(user.createdAt).toLocaleDateString("ko-KR")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 통계 그리드 (6개 항목) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* 총 레벨 카드 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">{totalLevel}</div>
              <div className="text-sm text-muted-foreground">총 레벨</div>
            </CardContent>
          </Card>
          {/* 총 경험치 카드 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">{totalExp.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">총 경험치</div>
            </CardContent>
          </Card>
          {/* 총 학습 시간 카드 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <BookOpen className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">{totalStudyTime}분</div>
              <div className="text-sm text-muted-foreground">총 학습 시간</div>
            </CardContent>
          </Card>
          {/* 해결한 문제 카드 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <div className="text-2xl font-bold">{totalProblems}</div>
              <div className="text-sm text-muted-foreground">해결한 문제</div>
            </CardContent>
          </Card>
          {/* 최대 연속 학습 카드 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <Calendar className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">{maxStreak}일</div>
              <div className="text-sm text-muted-foreground">최대 연속 학습</div>
            </CardContent>
          </Card>
          {/* 획득한 뱃지 카드 */}
          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-pink-500" />
              <div className="text-2xl font-bold">{uniqueBadges.length}</div>
              <div className="text-sm text-muted-foreground">획득한 뱃지</div>
            </CardContent>
          </Card>
          {/* 학습 중인 기술 스택 카드 (2칸 차지) */}
          <Card className="col-span-2">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold">{characters.length}</div>
              <div className="text-sm text-muted-foreground">학습 중인 기술 스택</div>
            </CardContent>
          </Card>
        </div>

        {/* 메인 콘텐츠 그리드 (2열) */}
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* 기술 스택별 학습 현황 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>기술 스택별 학습 현황</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* 6번에서 계산한 studyByTech 배열을 map으로 순회하며 렌더링 */}
                {studyByTech.map((tech, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{tech.name}</div>
                      <div className="text-sm text-muted-foreground">레벨 {tech.level}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{tech.minutes}분</div>
                    </div>
                  </div>
                ))}
                {/* 학습 스택이 없으면 메시지 표시 */}
                {studyByTech.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">아직 학습 중인 기술 스택이 없습니다</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 최근 학습 기록 카드 */}
          <Card>
            <CardHeader>
              <CardTitle>최근 학습 기록</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* 6번에서 계산한 recentProblems 배열을 map으로 순회 */}
                {recentProblems.map((session) => {
                  // 세션 기록에 맞는 캐릭터와 기술 스택 정보를 찾음
                  const character = characters.find((c) => c.id === session.characterId)
                  const techStack = TECH_STACKS.find((t) => t.id === character?.techStackId)
                  return (
                    <div key={session.id} className="flex items-start justify-between border-b pb-2 last:border-0">
                      <div className="flex-1">
                        <div className="font-medium">{techStack?.name || "Unknown"}</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(session.date).toLocaleDateString("ko-KR")}
                        </div>
                        {session.notes && <div className="text-sm text-muted-foreground mt-1">{session.notes}</div>}
                      </div>
                      <div className="text-sm font-medium">{session.durationMinutes}분</div>
                    </div>
                  )
                })}
                {/* 학습 기록이 없으면 메시지 표시 */}
                {recentProblems.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">아직 학습 기록이 없습니다</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 획득한 뱃지 카드 (2칸 차지) */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>획득한 뱃지</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {/* 6번에서 계산한 uniqueBadges(ID 목록)를 map으로 순회 */}
                {uniqueBadges.map((badgeId) => {
                  // BADGES 원본 목록에서 ID에 맞는 배지 정보를 찾음
                  const badge = BADGES.find((b) => b.id === badgeId)
                  if (!badge) return null // 배지 정보가 없으면 렌더링 X
                  return (
                    <div key={badgeId} className="text-center p-4 bg-muted rounded-lg">
                      <div className="text-4xl mb-2">{badge.icon}</div>
                      <div className="font-medium text-sm">{badge.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{badge.description}</div>
                    </div>
                  )
                })}
                {/* 획득한 뱃지가 없으면 메시지 표시 */}
                {uniqueBadges.length === 0 && (
                  <p className="col-span-full text-center text-muted-foreground py-8">아직 획득한 뱃지가 없습니다</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}