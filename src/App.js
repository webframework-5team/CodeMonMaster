import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuestionsPage from "./pages/Questions/QuestionsPage";

function App() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <BrowserRouter>
        <Routes>
          <Route path="/questions" element={<QuestionsPage />} />
          <Route
            path="/"
            element={
              <div className="p-10 text-center text-2xl">
                CodeMon Master 시작 화면입니다. <br />
                /questions 로 이동하세요.
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
