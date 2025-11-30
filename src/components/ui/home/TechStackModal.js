import { useEffect, useState } from "react";

export default function TechStackModal({ onClose, onSelect }) {
  const [techStacks, setTechStacks] = useState([]);

  useEffect(() => {
    fetch("http://52.78.157.84:8080/skills")
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess && data.result?.skills) {
          // 서버에서 받아온 데이터를 테크스택 형태로 변환
          const stacks = data.result.skills.map((skill) => ({
            name: skill.skillName,
            emoji: "", // 기본 이모지, 필요하면 매핑 가능
            color: "#61DAFB", // 기본 색, 필요하면 SkillData 매핑
            bg: "rgba(97,218,251,0.125)",
            imgUrl: skill.skillImageUrl,
            skillId: skill.skillId,
          }));
          setTechStacks(stacks);
        }
      })
      .catch((err) => console.error("Failed to fetch skills:", err));
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg border p-6 shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-lg font-semibold mb-4">학습할 기술 스택을 선택하세요</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {techStacks.map((tech) => (
            <div
              key={tech.skillId}
              className="flex flex-col items-center gap-2 rounded-xl border shadow-sm p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
              style={{ borderColor: tech.color, borderWidth: "2px" }}
              onClick={() => onSelect(tech)}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-cover bg-center"
                style={{ backgroundColor: tech.bg, backgroundImage: `url(${tech.imgUrl})` }}
              >
                {tech.emoji}
              </div>
              <span className="font-semibold text-sm text-center">{tech.name}</span>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 opacity-70 hover:opacity-100"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
