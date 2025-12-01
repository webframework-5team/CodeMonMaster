// src/components/questions/QuestionList.js
import React, { useState } from "react";

function QuestionList({
  questions,
  difficulty,
  setDifficulty,
  solved,
  setSolved,
  onSelect,
  selectedId,
  wrongAnswers,
  onShowWrongAnswers,
}) {
  return (
    <div className="w-full h-full flex flex-col gap-4 bg-white/80 backdrop-blur rounded-2xl p-4 shadow-lg">
      {/* 난이도 선택 */}
      <select
        className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="EASY">쉬움</option>
        <option value="MEDIUM">보통</option>
        <option value="HARD">어려움</option>
      </select>

      {/* 해결 여부 선택 */}
      <select
        className="w-full p-3 border border-gray-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
        value={solved}
        onChange={(e) => setSolved(e.target.value)}
      >
        <option value="NONE">모든 문제</option>
        <option value="UNSOLVED">미해결</option>
        <option value="SOLVED">해결됨</option>
      </select>

      {/* 오답노트 버튼 */}
      <button
        type="button"
        onClick={onShowWrongAnswers}
        className="w-full mt-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition relative"
      >
        오답노트 보기
        {wrongAnswers && wrongAnswers.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {wrongAnswers.length}
          </span>
        )}
      </button>

      {/* 문제 목록 */}
      <div className="mt-2 flex flex-col gap-3 overflow-y-auto max-h-[600px] pr-1">
        {questions.length === 0 && (
          <p className="text-xs text-gray-500">등록된 문제가 없습니다.</p>
        )}

        {questions.map((q) => {
          const isSelected = selectedId === q.questionId;
          const isSolved = q.solved === true;

          return (
            <div
              key={q.questionId}
              className={`p-4 rounded-2xl border text-sm cursor-pointer transition-all shadow-sm relative ${
                isSelected
                  ? "bg-indigo-50 border-indigo-400"
                  : isSolved
                  ? "bg-green-50 border-green-300 hover:bg-green-100"
                  : "bg-white border-gray-200 hover:bg-gray-50 hover:border-indigo-200"
              }`}
              onClick={() => onSelect(q.questionId)}
            >
              {/* 해결 완료 체크 마크 */}
              {isSolved && (
                <div className="absolute top-2 right-2 bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
              )}
              
              <div className="flex justify-between items-center mb-1 pr-6">
                <p className={`font-semibold truncate ${isSolved ? "text-green-800" : "text-gray-800"}`}>
                  {q.title}
                </p>
                <span
                  className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                    q.difficulty === "EASY"
                      ? "bg-green-100 text-green-700"
                      : q.difficulty === "MEDIUM"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {q.difficulty?.toLowerCase()}
                </span>
              </div>

              <p className="text-[11px] text-gray-500 mt-1">
                {isSolved ? "✓ 해결 완료" : `+${q.exp} XP`}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default QuestionList;
