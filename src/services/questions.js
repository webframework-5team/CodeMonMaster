import axios from "axios";

const API = "http://52.78.201.73:8080";

// 1) 스킬 기반 문제 리스트 조회
export function fetchQuestionsBySkill(skillId, userId, difficulty, solved) {
  return axios.get(`${API}/questions/skill/${skillId}`, {
    params: {
      userId: userId,
      difficulty: difficulty || "EASY", // NONE → "" 처리했기 때문에 기본 EASY 안전 처리
      solved: solved,
    },
  });
}

// 2) 문제 상세 조회
export function fetchQuestionDetail(questionId) {
  return axios.get(`${API}/questions/${questionId}`);
}

// 3) 문제 제출 (정답)
export function submitQuestion(questionId, body) {
  return axios.post(`${API}/questions/${questionId}`, body);
}
