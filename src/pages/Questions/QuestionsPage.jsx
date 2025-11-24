// src/pages/Questions/QuestionsPage.jsx
import React, { useEffect, useState } from "react";
import {
  fetchQuestionsBySkill,
} from "../../services/questions";

import QuestionList from "../../components/questions/QuestionList";
import QuestionDetail from "../../components/questions/QuestionDetail";

function QuestionsPage() {
  // 문제 목록 / 필터 상태
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("ALL"); // ALL -> EASY/MEDIUM/HARD 3번 호출
  const [solved, setSolved] = useState("NONE");        // NONE / SOLVED / UNSOLVED
  const [selectedId, setSelectedId] = useState(null);

  // 상단 헤더용 카운트
  const [totalCount, setTotalCount] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);

  // 테스트용 유저/스킬 (나중에 로그인/캐릭터 연동 가능)
  const userId = 1;
  const skillId = 1;

  // 공통: difficulty 값에 따라 실제로 서버에 보낼 difficulty 리스트 계산
  const getDifficultyListForApi = () => {
    if (difficulty === "ALL") return ["EASY", "MEDIUM", "HARD"];
    return [difficulty];
  };

  // =========================================
  // 1) 현재 필터 조건에 맞는 문제 목록 로딩
  // =========================================
  useEffect(() => {
    async function loadQuestions() {
      try {
        const diffs = getDifficultyListForApi();
        let merged = [];

        for (const diff of diffs) {
          const res = await fetchQuestionsBySkill(
            skillId,
            userId,
            diff,
            solved // NONE / SOLVED / UNSOLVED 그대로 전달
          );
          const list = res.data?.result?.questions || [];
          merged = merged.concat(list);
        }

        // questionId 기준으로 중복 제거
        const unique = [];
        const seen = new Set();
        for (const q of merged) {
          if (!seen.has(q.questionId)) {
            seen.add(q.questionId);
            unique.push(q);
          }
        }

        setQuestions(unique);

        // 필터 바뀔 때마다 선택 초기화
        setSelectedId(null);
      } catch (err) {
        console.error("문제 목록 조회 실패:", err);
        setQuestions([]);
        setSelectedId(null);
      }
    }

    loadQuestions();
  }, [difficulty, solved]); // difficulty / solved 변경 시 재조회

  // =========================================
  // 2) 헤더 상단 "해결: x / y" 카운트 로딩 (한 번만)
  // =========================================
  useEffect(() => {
    async function loadHeaderCounts() {
      try {
        const diffs = ["EASY", "MEDIUM", "HARD"];

        // 전체 문제 수
        let total = 0;
        for (const diff of diffs) {
          const res = await fetchQuestionsBySkill(
            skillId,
            userId,
            diff,
            "NONE"          // solved 조건 없이 전체
          );
          const list = res.data?.result?.questions || [];
          total += list.length;
        }

        // 해결된 문제 수
        let solvedNum = 0;
        for (const diff of diffs) {
          const res = await fetchQuestionsBySkill(
            skillId,
            userId,
            diff,
            "SOLVED"        // 해결된 것만
          );
          const list = res.data?.result?.questions || [];
          solvedNum += list.length;
        }

        setTotalCount(total);
        setSolvedCount(solvedNum);
      } catch (err) {
        console.error("헤더 카운트 조회 실패:", err);
        setTotalCount(0);
        setSolvedCount(0);
      }
    }

    loadHeaderCounts();
  }, []); // 맨 처음 한 번만

  return (
  <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
    <div className="max-w-[1570px] mx-auto px-8 py-10">
   {/* ← 더 넓게 */}

      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">React 문제</h1>
          <p className="text-sm text-gray-500">
            해결: {solvedCount} / {totalCount}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold">
          🏆 {solvedCount} / {totalCount}
        </div>
      </div>

      {/* 메인 그리드 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* 왼쪽 문제 리스트 */}
      <div className="lg:col-span-1">
        <QuestionList
          questions={questions}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          solved={solved}
          setSolved={setSolved}
          onSelect={setSelectedId}
          selectedId={selectedId}
        />
      </div>

      {/* 오른쪽 상세 */}
      <div className="lg:col-span-2">
        <QuestionDetail questionId={selectedId} userId={userId} />
      </div>

    </div>

    </div>
  </div>
);

}

export default QuestionsPage;
