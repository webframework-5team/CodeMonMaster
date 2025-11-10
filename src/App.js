import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProfilePage from './pages/profile_page.tsx'  // ← .tsx 추가!
import './index.css'

const queryClient = new QueryClient()

function App() {
  return (
    // 1. React Query Provider (앱 전체 데이터 관리)
    <QueryClientProvider client={queryClient}>
      {/* 2. BrowserRouter (앱 전체 페이지 이동 관리) */}
      <BrowserRouter>
        <Routes>
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;