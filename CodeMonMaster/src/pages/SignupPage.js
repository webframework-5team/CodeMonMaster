import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

export default function SignupPage() {
  // 입력 값 상태
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // 비밀번호 보이기/숨기기
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 로딩 및 에러 상태
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // 기존 에러 지우기

    // 1. 비밀번호 일치 검사
    if (password !== confirmPassword) {
      setErrorMessage("비밀번호가 서로 다릅니다.");
      return;
    }

    setIsLoading(true);

    try {
      const userData = {
        name: username,
        email: email,
        password: password
      };

      // 2. 서버로 전송
      const response = await axios.post("/auth/signup", userData);

      console.log("가입 성공:", response.data);
      alert("회원가입 성공! 로그인 해주세요.");
      navigate("/login");

    } catch (error) {
      console.error("가입 에러 상세:", error);
      
      // ⭐️ [핵심] 진짜 중복인지 확인하는 로직
      if (error.response) {
        // 상황 1: 이미 있는 이메일이라서 서버가 500 에러를 낸 경우
        if (error.response.status === 500) {
          setErrorMessage("⚠️ 이미 가입된 이메일입니다. (다른 이메일을 써주세요)");
        }
        // 상황 2: 서버가 400 등 다른 에러와 함께 메시지를 보낸 경우
        else if (error.response.data && error.response.data.message) {
          setErrorMessage(`⚠️ ${error.response.data.message}`);
        }
        // 상황 3: 그 외 알 수 없는 서버 에러
        else {
          setErrorMessage("회원가입 중 오류가 발생했습니다.");
        }
      } 
      // 상황 4: 아예 서버가 꺼져있거나 인터넷이 끊긴 경우
      else {
        setErrorMessage("서버와 연결할 수 없습니다. 인터넷을 확인해주세요.");
      }
      
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-sm">
        
        {/* 로고 */}
        <div className="flex flex-col items-center mb-6">
          <FaBookOpen className="w-10 h-10 text-purple-600 mb-3" />
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            CodeMon Master
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            기술 스택을 캐릭터로 키우며 함께 성장하세요
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">

          {/* 사용자 이름 */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">사용자 이름</label>
            <input
              id="username"
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          {/* 이메일 */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">이메일</label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">비밀번호</label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">비밀번호 확인</label>
            <div className="relative mt-1">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 pr-10 
                  ${password !== confirmPassword && confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* ⭐️ 에러 메시지 표시 구역 */}
          {errorMessage && (
            <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-2 rounded border border-red-200">
              {errorMessage}
            </div>
          )}

          <div className="pt-2">
            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-900 hover:bg-gray-700'} 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}
            >
              {isLoading ? "처리 중..." : "회원가입"}
            </button>
          </div>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
            로그인
          </Link>
        </p>

      </div>
    </div>
  );
}