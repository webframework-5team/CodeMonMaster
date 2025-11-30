import React from "react";
import useUserStats from "../../../hooks/useUserStats";

export default function Stats({ userId }) {
  const { stats } = useUserStats(userId);

  const statsData = [
    { label: "스택 수", value: stats.learningCount, icon: "⚒️" },
    { label: "레벨", value: stats.level, icon: "🏆" },
    { label: "학습 시간", value: stats.learningMinutes + "분", icon: "⏱️" },
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
