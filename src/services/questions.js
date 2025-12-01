import api from "./api";

// 1) 스킬 기반 문제 리스트 조회
export const fetchQuestionsBySkill = (skillId, userId, difficulty, solved) => {
  return api.get(`/questions/skill/${skillId}`, {
    params: {
      userId: userId,
      difficulty: difficulty, // EASY, MEDIUM, HARD
      solved: solved, // SOLVED, UNSOLVED, NONE
    },
  });
};

// 2) 문제 상세 조회
export const fetchQuestionDetail = (questionId) => {
  return api.get(`/questions/${questionId}`);
};

// 3) 문제 제출 (정답)
export const submitQuestion = (questionId, userId, answer) => {
  return api.post(`/questions/${questionId}`, {
    userId: userId,
    answer: answer,
  });
};