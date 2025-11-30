import axios from "axios";

const API = "http://52.78.157.84:8080";

// 1) 스킬 기반 문제 리스트 조회
export function fetchQuestionsBySkill(skillId, userId, difficulty, solved) {
  return axios.get(`${API}/questions/skill/${skillId}`, {
    params: {
      userId: userId,
      difficulty: difficulty, // EASY, MEDIUM, HARD
      solved: solved, // SOLVED, UNSOLVED, NONE
    },
  });
}

// 2) 문제 상세 조회
export function fetchQuestionDetail(questionId) {
  return axios.get(`${API}/questions/${questionId}`);
}

// 3) 문제 제출 (정답)
export function submitQuestion(questionId, userId, answer) {
  return axios.post(`${API}/questions/${questionId}`, {
    userId: userId,
    answer: answer,
  });
}
