import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';   // 방금 만든 로그인 페이지
import SignupPage from './pages/SignupPage'; // 방금 만든 회원가입 페이지

// (참고) 나중에 홈 페이지나 다른 페이지도 여기에 추가하면 됩니다.
// import HomePage from './pages/HomePage'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 주소창에 /login 이라고 치면 LoginPage.js를 보여줍니다. 
        */}
        <Route path="/login" element={<LoginPage />} />

        {/* 주소창에 /signup 이라고 치면 SignupPage.js를 보여줍니다. 
        */}
        <Route path="/signup" element={<SignupPage />} />

        {/* (예시) 주소창에 / (기본 주소) 라고 치면 LoginPage를 먼저 보여줍니다.
          나중에 이 부분을 홈페이지(HomePage)로 바꾸면 됩니다.
        */}
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;