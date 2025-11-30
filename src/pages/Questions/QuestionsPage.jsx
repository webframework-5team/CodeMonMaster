// src/pages/Questions/QuestionsPage.jsx
import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchQuestionsBySkill } from "../../services/questions";

import QuestionList from "../../components/questions/QuestionList";
import QuestionDetail from "../../components/questions/QuestionDetail";
import WrongAnswersModal from "../../components/questions/WrongAnswersModal";

function QuestionsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, skillId } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("EASY");
  const [solved, setSolved] = useState("NONE");
  const [selectedId, setSelectedId] = useState(null);

  const [totalCount, setTotalCount] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);

  // 오답노트
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [showWrongAnswersModal, setShowWrongAnswersModal] = useState(false);
  
  // localStorage 초기화 방지 플래그
  const isInitialized = useRef(false);

  console.log("받아온 userId:", userId);
  console.log("받아온 skillId:", skillId);

  // localStorage에서 오답노트 불러오기 (컴포넌트 마운트 시 한 번만)
  useEffect(() => {
    if (!userId || !skillId || isInitialized.current) return;

    const storageKey = `wrongAnswers_${userId}_${skillId}`;
    const saved = localStorage.getItem(storageKey);
    
    console.log(`[오답노트] Storage Key: ${storageKey}`);
    console.log(`[오답노트] Saved data:`, saved);
    
    if (saved && saved !== "[]") {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setWrongAnswers(parsed);
          console.log(`✅ 오답노트 불러오기 성공 (${parsed.length}개):`, parsed);
        }
      } catch (err) {
        console.error("❌ 오답노트 불러오기 실패:", err);
      }
    } else {
      console.log("📝 오답노트 없음 (새로 시작)");
    }
    
    isInitialized.current = true;
  }, [userId, skillId]);

  // 오답노트가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    if (!userId || !skillId || !isInitialized.current) return;
    
    const storageKey = `wrongAnswers_${userId}_${skillId}`;
    localStorage.setItem(storageKey, JSON.stringify(wrongAnswers));
    console.log(`💾 오답노트 저장 (${wrongAnswers.length}개) to ${storageKey}`);
  }, [wrongAnswers, userId, skillId]);

  // difficulty / solved 값 변할 때마다 목록 조회
  useEffect(() => {
    async function loadQuestions() {
      if (!userId || !skillId) {
        console.warn("userId 또는 skillId가 없습니다.");
        return;
      }

      try {
        console.log(`📡 문제 목록 조회: skillId=${skillId}, userId=${userId}, difficulty=${difficulty}, solved=${solved}`);
        const res = await fetchQuestionsBySkill(skillId, userId, difficulty, solved);
        const data = res.data?.result?.questions || [];
        setQuestions(data);
        console.log(`✅ 문제 목록 조회 성공 (${data.length}개):`, data);
      } catch (err) {
        console.error("❌ 문제 목록 조회 실패:", err);
        setQuestions([]);
      }
    }
    loadQuestions();
  }, [difficulty, solved, userId, skillId]);

  // 헤더 카운트 로딩 (전체 문제 수 / 해결한 문제 수)
  useEffect(() => {
    async function loadHeaderCounts() {
      if (!userId || !skillId) return;

      try {
        // 전체 문제 수 조회
        const totalRes = await fetchQuestionsBySkill(skillId, userId, "EASY", "NONE");
        const totalData = totalRes.data?.result?.questions || [];
        setTotalCount(totalData.length);

        // 해결한 문제 수 조회
        const solvedRes = await fetchQuestionsBySkill(skillId, userId, "EASY", "SOLVED");
        const solvedData = solvedRes.data?.result?.questions || [];
        setSolvedCount(solvedData.length);
        
        console.log(`📊 카운트: 해결=${solvedData.length} / 전체=${totalData.length}`);
      } catch (err) {
        console.error("❌ 헤더 카운트 조회 실패:", err);
      }
    }
    loadHeaderCounts();
  }, [userId, skillId]);

  // 오답노트에 추가
  const handleAddToWrongAnswers = (wrongAnswer) => {
    console.log("❌ 오답 추가:", wrongAnswer);
    
    setWrongAnswers((prev) => {
      // 중복 체크 (같은 questionId가 이미 있으면 교체)
      const filtered = prev.filter((item) => item.questionId !== wrongAnswer.questionId);
      const updated = [...filtered, wrongAnswer];
      console.log(`📝 오답노트 업데이트: ${prev.length}개 → ${updated.length}개`);
      return updated;
    });
  };

  // 오답노트 초기화
  const handleClearWrongAnswers = () => {
    console.log("🗑️ 오답노트 전체 삭제");
    setWrongAnswers([]);
    
    // localStorage에서도 삭제
    if (userId && skillId) {
      const storageKey = `wrongAnswers_${userId}_${skillId}`;
      localStorage.removeItem(storageKey);
    }
  };

  // 뒤로가기 (메인 화면으로)
  const handleGoBack = () => {
    navigate('/home');
  };

  // 기술 스택 이름 가져오기
  const skillName = questions.length > 0 ? "문제" : "문제";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-[1570px] mx-auto px-8 py-10">
        {/* 뒤로가기 버튼 */}
        <button
          onClick={handleGoBack}
          className="mb-4 flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur border border-gray-200 hover:bg-white hover:border-gray-300 transition text-sm font-semibold text-gray-700"
        >
          <span className="text-lg">←</span>
          뒤로가기
        </button>

        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">{skillName}</h1>
            <p className="text-sm text-gray-500">
              해결: {solvedCount} / {totalCount}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm font-semibold">
            🏆 {solvedCount} / {totalCount}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <QuestionList
              questions={questions}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              solved={solved}
              setSolved={setSolved}
              onSelect={setSelectedId}
              selectedId={selectedId}
              wrongAnswers={wrongAnswers}
              onShowWrongAnswers={() => setShowWrongAnswersModal(true)}
            />
          </div>

          <div className="lg:col-span-2">
            <QuestionDetail
              questionId={selectedId}
              userId={userId}
              onAddToWrongAnswers={handleAddToWrongAnswers}
            />
          </div>
        </div>
      </div>

      {/* 오답노트 모달 */}
      {showWrongAnswersModal && (
        <WrongAnswersModal
          wrongAnswers={wrongAnswers}
          onClose={() => setShowWrongAnswersModal(false)}
          onClear={handleClearWrongAnswers}
        />
      )}
    </div>
  );
}

export default QuestionsPage;
