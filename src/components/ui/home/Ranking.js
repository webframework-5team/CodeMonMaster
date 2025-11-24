import React, { useState, useEffect } from "react";

export default function Ranking() {
  const [rankingData, setRankingData] = useState([]);
  const [myName, setMyName] = useState("데모 사용자"); // 본인 이름 기준으로 표시
  const [myRank, setMyRank] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch("http://52.78.157.84:8080/rank");
        const data = await res.json();
        if (data.isSuccess && data.result.rank) {
          setRankingData(data.result.rank);

          // 내 순위 계산
          const myIndex = data.result.rank.findIndex(r => r.name === myName);
          setMyRank(myIndex >= 0 ? myIndex + 1 : "-");
        }
      } catch (err) {
        console.error("랭킹 불러오기 실패:", err);
      }
    };

    fetchRanking();
  }, []);

  return (
    <div className="bg-white text-black flex flex-col gap-6 rounded-xl border shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
            <path d="M4 22h16"></path>
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
          </svg>
          전체 사용자 랭킹
        </h2>
        <div className="text-sm font-semibold px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
          내 순위: {myRank}
        </div>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto">
        {rankingData.map((user, idx) => {
          const isMe = user.name === myName;
          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isMe
                  ? "bg-blue-100 border-2 border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex-shrink-0">
                <span className="text-2xl">👤</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold truncate">
                  {user.name} {isMe && <span className="ml-2 text-xs text-blue-600">(나)</span>}
                </div>
                <div className="text-xs text-gray-500">
                  {user.skillCount}개 기술 • {user.totalTime.toLocaleString()}분
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg">Lv.{user.level}</div>
                <div className="text-xs text-gray-500">{user.score.toLocaleString()}점</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
