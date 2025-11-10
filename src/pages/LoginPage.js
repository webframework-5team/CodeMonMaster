import React from 'react';
import { Link } from 'react-router-dom';
import { FaBookOpen } from 'react-icons/fa'; // react-icons 라이브러리에서 아이콘을 가져옵니다.

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-lg w-full max-w-sm">
        
        {/* 아이콘 + 제목 + 부제목 */}
        <div className="flex flex-col items-center mb-6">
          <FaBookOpen className="w-10 h-10 text-purple-600 mb-3" /> {/* 아이콘 */}
          
          {/* --- 수정된 부분 --- */}
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
            CodeMon Master
          </h2>
          {/* --- 수정된 부분 --- */}

          <p className="mt-2 text-sm text-gray-600">
            기술 스택을 캐릭터로 키우며 함께 성장하세요
          </p>
        </div>

        {/* 폼(Form) */}
        <form className="space-y-4">
          
          {/* 이메일 입력창 */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* 비밀번호 입력창 */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* 로그인 버튼 (검은색) */}
          <div className="pt-2"> {/* 버튼 위쪽 여백 추가 */}
            <button 
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
            >
              로그인
            </button>
          </div>

        </form>

        {/* 회원가입으로 이동 */}
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