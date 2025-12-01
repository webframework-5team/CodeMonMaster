import { Link } from "react-router-dom";

export default function Header() {
  // 새록고침
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-4">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          학습 동료들
        </h1>

        {/* 프로필 버튼 */}
        <Link to="/profile">
          <button className="size-9 flex justify-center items-center rounded-md hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="7" r="4" />
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            </svg>
          </button>
        </Link>

        {/* 새로고침 버튼 */}
        <button 
          onClick={handleRefresh}
          className="size-9 flex justify-center items-center rounded-md hover:bg-gray-200 transition-colors"
          aria-label="새로고침"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>

      <p className="text-lg text-muted-foreground">
        기술 스택을 캐릭터로 키우며 함께 성장하세요
      </p>
    </header>
  );
}