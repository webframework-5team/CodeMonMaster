import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookOpen, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://52.78.157.84:8080/auth/login", {
        email: email,
        password: password
      });

      const result = response.data.result;

      console.log("로그인 성공:", response.data);

      // userId 저장 (서버에서 아직 안 줄 경우 임시로 1 저장)
      const userId = result?.userId || 1; 
      localStorage.setItem("userId", userId);
      
      if (result?.token) {
        localStorage.setItem("token", result.token);
      }
      
      alert(`로그인 성공! 메인으로 이동합니다.`);
      navigate("/profile"); 

    } catch (error) {
      console.error("로그인 에러:", error);
      alert("이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-sm">
        
        <div className="flex flex-col items-center mb-6">
          <FaBookOpen className="w-10 h-10 text-purple-600 mb-3" />
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            CodeMon Master
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            기술 스택을 캐릭터로 키우며 함께 성장하세요
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
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

          <div className="pt-2">
            <button 
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              로그인
            </button>
          </div>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          계정이 없으신가요?{' '}
          <Link to="/signup" className="font-medium text-purple-600 hover:text-purple-500">
            회원가입
          </Link>
        </p>

      </div>
    </div>
  );
}