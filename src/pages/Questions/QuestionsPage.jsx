// src/pages/Questions/QuestionsPage.jsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";   // ← 추가
import {
  fetchQuestionsBySkill,
} from "../../services/questions";

import QuestionList from "../../components/questions/QuestionList";
import QuestionDetail from "../../components/questions/QuestionDetail";

function QuestionsPage() {
  const location = useLocation();
  const { userId, skillId } = location.state || {};   // ← 전달받은 값

  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState("ALL");
  const [solved, setSolved] = useState("NONE");
  const [selectedId, setSelectedId] = useState(null);

  const [totalCount, setTotalCount] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);

  console.log("받아온 userId:", userId);
  console.log("받아온 skillId:", skillId);

  // ❗❗ 여기서부터는 아직 기존 로직 그대로 유지 (활용 X)
  // difficulty / solved 값 변할 때마다 목록 조회
  useEffect(() => {
    async function loadQuestions() {
      try {
        // 아직 userId와 skillId 활용 안 함 (요청대로)
      } catch (err) {
        console.error("문제 목록 조회 실패:", err);
      }
    }
    loadQuestions();
  }, [difficulty, solved]);

  // 헤더 카운트 로딩 (아직 활용 X)
  useEffect(() => {
    async function loadHeaderCounts() {
      try {
        // 아직 userId와 skillId 활용 안 함
      } catch (err) {
        console.error("헤더 카운트 조회 실패:", err);
      }
    }
    loadHeaderCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-[1570px] mx-auto px-8 py-10">

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
            />
          </div>

          <div className="lg:col-span-2">
            <QuestionDetail questionId={selectedId} userId={userId} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default QuestionsPage;
