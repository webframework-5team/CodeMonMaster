import React, { useState, useEffect } from "react";

export default function Stats() {
  const [stats, setStats] = useState({
    learningCount: 0,
    level: 0,
    learningMinutes: 0,
    solvedQuestionCount: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://52.78.157.84:8080/user/1/stats");
        const data = await res.json();
        if (data.isSuccess && data.result) {
          setStats(data.result);
        }
      } catch (err) {
        console.error("Stats 불러오기 실패:", err);
      }
    };

    fetchStats();
  }, []);

  const statsData = [
    { label: "학습 횟수", value: stats.learningCount, icon: "📚" },
    { label: "레벨", value: stats.level, icon: "🏆" },
    { label: "학습 시간", value: stats.learningMinutes + "분", icon: "⏱️" },
    { label: "풀이한 문제", value: stats.solvedQuestionCount, icon: "📝" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
      {statsData.map((item, idx) => (
        <div key={idx} className="bg-white rounded-lg p-4 text-center shadow-sm">
          <div className="text-2xl">{item.icon}</div>
          <div className="text-2xl font-bold">{item.value}</div>
          <div className="text-sm text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
