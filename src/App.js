import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProfilePage from './pages/ProfilePage.tsx'  // ← .tsx 추가!
import LoginPage from './pages/LoginPage.tsx';   // 방금 만든 로그인 페이지
import SignupPage from './pages/SignupPage.tsx'; // 방금 만든 회원가입 페이지
import './index.css'


const queryClient = new QueryClient()



function App() {
  return (
    // 1. React Query Provider (앱 전체 데이터 관리)
    <QueryClientProvider client={queryClient}>
      {/* 2. BrowserRouter (앱 전체 페이지 이동 관리) */}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;