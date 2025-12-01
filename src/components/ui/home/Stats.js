import React from "react";
import useUserStats from "../../../hooks/useUserStats";

export default function Stats({ userId }) {
  const { stats } = useUserStats(userId);

  // 1. 총 경험치 계산하기
  // 공식: (지나온 레벨 * 레벨당 경험치) + 현재 가지고 있는 경험치
  // ※ 주의: 레벨업 기준이 100점이면 100을, 10점이면 10을 넣으세요!
  const levelUpExp = 100; // 지금은 100으로 해뒀습니다.
  const totalExp = ((stats.level - 1) * levelUpExp) + stats.learningMinutes;

  const statsData = [
    { label: "스택 수", value: stats.learningCount, icon: "⚒️" },
    { label: "레벨", value: stats.level, icon: "🏆" },
    
    // 2. 여기를 '학습 시간' 대신 '총 경험치'로 바꿨습니다.
    { label: "총 경험치", value: totalExp + " EXP", icon: "🔥" },
    
    { label: "풀이한 문제", value: stats.solvedQuestionCount, icon: "📝" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
      {statsData.map((item, idx) => (
        <div
          key={idx}
          className="bg-white rounded-lg p-4 text-center shadow-sm"
        >
          <div className="text-2xl">{item.icon}</div>
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="text-sm text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  );
}