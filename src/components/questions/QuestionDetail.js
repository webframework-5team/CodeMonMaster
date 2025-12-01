// src/components/questions/QuestionDetail.js
import React, { useEffect, useState } from "react";
import { fetchQuestionDetail, submitQuestion } from "../../services/questions";

function QuestionDetail({ questionId, userId, onAddToWrongAnswers, onCorrectAnswer, isQuestionSolved }) {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null); // true / false / null
  const [submitting, setSubmitting] = useState(false);
  const [alreadySolved, setAlreadySolved] = useState(false); // 이미 푼 문제인지 여부

  // 선택된 문제가 바뀔 때마다 상세 조회
  useEffect(() => {
    if (!questionId || !userId) {
      setQuestion(null);
      setOptions([]);
      setSelected(null);
      setResult(null);
      setAlreadySolved(false);
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
        
        // ✅ localStorage에서 solved 상태 확인
        const solved = isQuestionSolved(questionId);
        setAlreadySolved(solved);
        
        console.log("문제 로드:", {
          questionId: data.questionId,
          title: data.title,
          difficulty: data.difficulty,
          solved: solved,
          alreadySolved: solved
        });
      } catch (err) {
        console.error("문제 상세 조회 실패:", err);
        setQuestion(null);
        setOptions([]);
        setAlreadySolved(false);
      }
    }

    loadDetail();
  }, [questionId, userId, isQuestionSolved]);

  // 정답 제출
  const handleSubmit = async () => {
    if (selected === null || !question) return;

    // 인덱스 변환: UI(0,1,2,3) → API(1,2,3,4)
    const answerToSend = selected + 1;

    console.log("정답 제출:", {
      questionId,
      userId,
      selected: selected,
      answerToSend: answerToSend,
      alreadySolved: alreadySolved
    });

    try {
      setSubmitting(true);
      const res = await submitQuestion(questionId, userId, answerToSend);
      const correct = res.data?.result?.isCorrect;
      setResult(correct);

      console.log(correct ? "정답!" : "오답!");

      if (correct) {
        // 정답인 경우
        if (alreadySolved) {
          // 이미 푼 문제인 경우
          console.log("⚠️ 이미 푼 문제입니다. (재풀이)");
        } else {
          // 처음 푼 문제인 경우
          console.log("✅ 처음 푼 문제입니다. localStorage에 저장합니다.");
        }
        
        // 부모 컴포넌트에 알림 (questionId 전달)
        if (onCorrectAnswer) {
          onCorrectAnswer(questionId);
        }
      } else {
        // 오답인 경우 - 오답노트에 추가
        if (onAddToWrongAnswers) {
          const wrongAnswerData = {
            questionId: question.questionId,
            title: question.title,
            content: question.content,
            difficulty: question.difficulty,
            options: options,
            myAnswer: selected,
            correctAnswer: null, // 서버에서 정답 정보를 제공하지 않는 경우
            rewardExp: question.rewardExp,
          };
          
          console.log("오답노트에 추가:", wrongAnswerData);
          onAddToWrongAnswers(wrongAnswerData);
        }
      }
    } catch (err) {
      console.error("정답 제출 실패:", err);
      console.error("에러 상세:", err.response?.data);
      setResult(false);
    } finally {
      setSubmitting(false);
    }
  };

  // 다시 도전하기
  const handleRetry = () => {
    setSelected(null);
    setResult(null);
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
    question.difficulty === "EASY" || question.difficulty === "easy"
      ? "bg-green-100 text-green-700"
      : question.difficulty === "MEDIUM" || question.difficulty === "medium"
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
          <div className="flex items-center gap-2">
            {alreadySolved && (
              <span className="text-xs px-3 py-1 rounded-full font-semibold bg-green-100 text-green-700">
                ✓ 해결 완료
              </span>
            )}
            <span
              className={`text-xs px-3 py-1 rounded-full font-semibold ${difficultyBadgeClass}`}
            >
              {question.difficulty}
            </span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mb-2">{question.content}</p>
        <div className="text-xs text-gray-500">
          {alreadySolved 
            ? "⚠️ 이미 해결한 문제입니다 (재풀이 가능하지만 경험치는 한 번만 지급됩니다)" 
            : `보상: +${question.rewardExp} XP`}
        </div>
      </div>

      {/* 선택지 */}
      <div className="flex flex-col gap-3">
        {options.map((opt, idx) => {
          const isSelected = selected === idx;
          let optionClass =
            "w-full p-3 text-left border rounded-xl text-sm transition cursor-pointer ";

          if (result === null) {
            // 제출 전: 선택 여부만 표시
            optionClass += isSelected
              ? "border-indigo-500 bg-indigo-50"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100";
          } else if (result === true) {
            // 정답인 경우
            if (isSelected) {
              optionClass += "border-green-500 bg-green-50";
            } else {
              optionClass += "border-gray-200 bg-gray-50";
            }
          } else {
            // 오답인 경우 - 내가 선택한 답만 표시
            if (isSelected) {
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
              disabled={result === true}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                {result === true && isSelected && (
                  <span className="text-xs text-green-700 font-semibold">✓ 정답</span>
                )}
                {result === false && isSelected && (
                  <span className="text-xs text-red-600 font-semibold">✗ 오답</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* 결과 메시지 */}
      {result !== null && (
        <div
          className={`w-full rounded-xl p-3 text-sm font-semibold flex items-center justify-center ${
            result ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
          }`}
        >
          {result
            ? alreadySolved
              ? "정답입니다! ✓ (이미 해결한 문제라 경험치는 추가 지급되지 않을 수 있습니다)"
              : `정답입니다! +${question.rewardExp} XP 획득 🎉`
            : "틀렸습니다. 다시 도전해보세요!"}
        </div>
      )}

      {/* 제출/다시도전 버튼 */}
      {result === null || result === false ? (
        <button
          type="button"
          disabled={selected === null || submitting}
          onClick={result === null ? handleSubmit : handleRetry}
          className={`mt-auto w-full py-3 rounded-xl text-white text-sm font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transition ${
            result === false
              ? "bg-indigo-600 hover:bg-indigo-700"
              : "bg-gray-900 hover:bg-gray-800"
          }`}
        >
          {submitting
            ? "처리 중..."
            : result === false
            ? "다시 도전하기"
            : "제출하기"}
        </button>
      ) : (
        <button
          type="button"
          disabled
          className="mt-auto w-full py-3 rounded-xl bg-gray-400 text-white text-sm font-semibold cursor-not-allowed"
        >
          제출 완료
        </button>
      )}
    </div>
  );
}

export default QuestionDetail;
