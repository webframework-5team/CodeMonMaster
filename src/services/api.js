import axios from "axios";

const api = axios.create({
  baseURL: "http://52.78.157.84:8080", 
  // ↑ 여기 백엔드 팀원이 만든 서버 주소로 바꿔야 함
});

export default api;
