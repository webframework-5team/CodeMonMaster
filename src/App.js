import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // ✅ 추가
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import QuestionsPage from "./pages/Questions/QuestionsPage";
import ProfilePage from "./pages/ProfilePage";


// QueryClient (추가)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
        <BrowserRouter>
          <Routes>
            {/* 기본 진입 시 로그인 페이지 */}
            <Route path="/" element={<LoginPage />} />

            {/* 로그인 */}
            <Route path="/login" element={<LoginPage />} />

            {/* 주소창에 / (기본 주소) 라고 치면 HomePage를보여줍니다. */}
            <Route path="/home" element={<HomePage />} />
          
            {/* 회원가입 */}
            <Route path="/signup" element={<SignupPage />} />

            {/* 문제 페이지 */}
            <Route path="/questions" element={<QuestionsPage />} />

<<<<<<< HEAD
          {/* 문제 페이지 */}
          <Route path="/questions" element={<QuestionsPage />} />

          {/* 마이 프로필 페이지*/}
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
=======
            {/* 마이 프로필 페이지*/}
            <Route path="/profile" element={<ProfilePage />} />
>>>>>>> 1d45dd3 (feat : 프로필 페이지까지 연동 완료)

          </Routes>
        </BrowserRouter>
      </div>
    </QueryClientProvider>  
  );
}

export default App;