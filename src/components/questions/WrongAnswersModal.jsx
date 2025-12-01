// src/components/questions/WrongAnswersModal.jsx
import React from "react";

function WrongAnswersModal({ wrongAnswers, onClose, onClear }) {
  if (!wrongAnswers || wrongAnswers.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">📝 오답노트</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
          <p className="text-center text-gray-500 py-8">
            아직 틀린 문제가 없습니다.
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
          >
            닫기
          </button>
        </div>
      </div>
    );
  }

  const handleClear = () => {
    if (window.confirm(`${wrongAnswers.length}개의 오답 기록을 모두 삭제하시겠습니까?`)) {
      onClear();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            📝 오답노트 ({wrongAnswers.length}개)
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm font-semibold hover:bg-red-200 transition"
            >
              전체 삭제
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none"
            >
              ×
            </button>
          </div>
        </div>

        {/* 오답 목록 */}
        <div className="overflow-y-auto p-6 space-y-6">
          {wrongAnswers.map((item, idx) => {
            const difficultyBadgeClass =
              item.difficulty === "EASY" || item.difficulty === "easy"
                ? "bg-green-100 text-green-700"
                : item.difficulty === "MEDIUM" || item.difficulty === "medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700";

            return (
              <div
                key={`${item.questionId}-${idx}`}
                className="bg-gray-50 rounded-xl p-5 border border-gray-200"
              >
                {/* 문제 제목 */}
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">
                    {item.title}
                  </h3>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-semibold ${difficultyBadgeClass}`}
                  >
                    {item.difficulty}
                  </span>
                </div>

                {/* 문제 내용 */}
                <p className="text-sm text-gray-600 mb-4">{item.content}</p>

                {/* 선택지 */}
                <div className="space-y-2 mb-4">
                  {item.options.map((opt, optIdx) => {
                    const isMyAnswer = optIdx === item.myAnswer;
                    const isCorrectAnswer = optIdx === item.correctAnswer;

                    let optionClass =
                      "w-full p-3 text-left border rounded-lg text-sm ";

                    if (isCorrectAnswer) {
                      optionClass += "border-green-500 bg-green-50";
                    } else if (isMyAnswer) {
                      optionClass += "border-red-500 bg-red-50";
                    } else {
                      optionClass += "border-gray-200 bg-white";
                    }

                    return (
                      <div key={optIdx} className={optionClass}>
                        <div className="flex items-center justify-between">
                          <span>{opt}</span>
                          {isCorrectAnswer && (
                            <span className="text-xs text-green-700 font-semibold">
                              ✓ 정답
                            </span>
                          )}
                          {isMyAnswer && !isCorrectAnswer && (
                            <span className="text-xs text-red-600 font-semibold">
                              ✗ 내 답
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 보상 정보 */}
                <div className="text-xs text-gray-500">
                  보상: +{item.rewardExp} XP
                </div>
              </div>
            );
          })}
        </div>

        {/* 푸터 */}
        <div className="border-t p-4">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default WrongAnswersModal;