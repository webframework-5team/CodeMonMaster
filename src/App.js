
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';   // 방금 만든 로그인 페이지
import SignupPage from './pages/SignupPage'; // 방금 만든 회원가입 페이지
import HomePage from './pages/HomePage';
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


          {/* 주소창에 / (기본 주소) 라고 치면 HomePage를보여줍니다.
          */}
          <Route path="/home" element={<HomePage />} />
        
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
