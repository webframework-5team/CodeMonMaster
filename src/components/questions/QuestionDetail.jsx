// src/components/questions/QuestionDetail.jsx
import React, { useEffect, useState } from "react";
import { fetchQuestionDetail, submitQuestion } from "../../services/questions";

function QuestionDetail({ questionId, userId }) {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null); // true / false / null
  const [submitting, setSubmitting] = useState(false);

  // 선택된 문제가 바뀔 때마다 상세 조회
  useEffect(() => {
    if (!questionId) {
      setQuestion(null);
      setOptions([]);
      setSelected(null);
      setResult(null);
      return;
    }

    async function loadDetail() {
      try {
        const res = await fetchQuestionDetail(questionId);
        const data = res.data?.result;
        if (!data) return;

        setQuestion(data);
        setOptions([
          data.selection1,
          data.selection2,
          data.selection3,
          data.selection4,
        ]);
        setSelected(null);
        setResult(null);
      } catch (err) {
        console.error("문제 상세 조회 실패:", err);
        setQuestion(null);
        setOptions([]);
      }
    }

    loadDetail();
  }, [questionId]);

  // 정답 제출
  const handleSubmit = async () => {
    if (selected === null || !question) return;

    try {
      setSubmitting(true);
      const res = await submitQuestion(questionId, userId, selected);
      const correct = res.data?.result?.isCorrect;
      setResult(correct);
    } catch (err) {
      console.error("정답 제출 실패:", err);
      setResult(false);
    } finally {
      setSubmitting(false);
    }
  };

  // 선택된 문제가 없을 때
  if (!questionId) {
    return (
      <div className="w-full h-full bg-white/80 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center">
        <p className="text-sm text-gray-500">
          왼쪽 목록에서 문제를 선택하세요
        </p>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="w-full h-full bg-white/80 backdrop-blur rounded-2xl shadow-lg flex items-center justify-center">
        <p className="text-sm text-gray-500">문제를 불러오는 중입니다...</p>
      </div>
    );
  }

  const difficultyBadgeClass =
    question.difficulty === "EASY"
      ? "bg-green-100 text-green-700"
      : question.difficulty === "MEDIUM"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <div className="w-full h-full bg-white/90 backdrop-blur rounded-2xl shadow-lg p-6 flex flex-col gap-6">
      {/* 헤더 */}
      <div>
        <div className="flex items-start justify-between mb-3">
          <h2 className="text-2xl font-bold text-gray-900 flex-1">
            {question.title}
          </h2>
          <span
            className={`text-xs px-3 py-1 rounded-full font-semibold ${difficultyBadgeClass}`}
          >
            {question.difficulty}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{question.content}</p>
        <div className="text-xs text-gray-500">보상: +{question.rewardExp} XP</div>
      </div>

      {/* 선택지 */}
      <div className="flex flex-col gap-3">
        {options.map((opt, idx) => {
          const isSelected = selected === idx;
          let optionClass =
            "w-full p-3 text-left border rounded-xl text-sm transition cursor-pointer ";

          if (result === null) {
            optionClass += isSelected
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100";
          } else {
            // 정답/오답 표시
            const isCorrectIdx = idx === question.answer; // 백엔드 정답 인덱스(0~3)라고 가정
            if (isCorrectIdx) {
              optionClass += "border-green-500 bg-green-50";
            } else if (isSelected && !isCorrectIdx) {
              optionClass += "border-red-500 bg-red-50";
            } else {
              optionClass += "border-gray-200 bg-gray-50";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              className={optionClass}
              onClick={() => result === null && setSelected(idx)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* 결과 메시지 */}
      {result !== null && (
        <div
          className={`mt-2 w-full rounded-xl p-3 text-sm font-semibold flex items-center justify-center ${
            result ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
          }`}
        >
          {result
            ? `정답입니다! +${question.rewardExp} XP 획득`
            : "틀렸습니다. 다시 도전해보세요!"}
        </div>
      )}

      {/* 제출 버튼 */}
      <button
        type="button"
        disabled={selected === null || submitting}
        onClick={handleSubmit}
        className="mt-auto w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-gray-800 transition"
      >
        {submitting ? "제출 중..." : "제출하기"}
      </button>
    </div>
  );
}

export default QuestionDetail;
