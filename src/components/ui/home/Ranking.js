import React, { useState, useEffect } from "react";
import { GiCrown } from "react-icons/gi";

export default function Ranking() {
  const [rankingData, setRankingData] = useState([]);
  const [myName, setMyName] = useState("데모 사용자"); 
  const [myRank, setMyRank] = useState(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch("http://52.78.157.84:8080/rank");
        const data = await res.json();
        if (data.isSuccess && data.result.rank) {
          setRankingData(data.result.rank);
          const myIndex = data.result.rank.findIndex(r => r.name === myName);
          setMyRank(myIndex >= 0 ? myIndex + 1 : "-");
        }
      } catch (err) {
        console.error("랭킹 불러오기 실패:", err);
      }
    };
    fetchRanking();
  }, []);

  const getRankIcon = (idx) => {
    if (idx === 0) return <GiCrown size={24} color="#FFD700" />; // 금
    if (idx === 1) return <GiCrown size={24} color="#C0C0C0" />; // 은
    if (idx === 2) return <GiCrown size={24} color="#CD7F32" />; // 동
    return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-500">{idx + 1}</span>;
  };

  return (
    <div className="bg-white text-black flex flex-col gap-6 rounded-xl border shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
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
                {getRankIcon(idx)}
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
