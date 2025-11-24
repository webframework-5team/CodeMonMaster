import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import QuestionsPage from "./pages/Questions/QuestionsPage";

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <BrowserRouter>
        <Routes>
          {/* 기본 진입 시 로그인 페이지 */}
          <Route path="/" element={<LoginPage />} />

          {/* 로그인 */}
          <Route path="/login" element={<LoginPage />} />

          {/* 회원가입 */}
          <Route path="/signup" element={<SignupPage />} />

          {/* 문제 페이지 */}
          <Route path="/questions" element={<QuestionsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
