import { useState } from "react";
import useTechStacks from "../../hooks/useTechStacks";

export default function TechStackModal({ onClose, onSelect }) {
  const { techStacks } = useTechStacks();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg border p-6 shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-lg font-semibold mb-4">
          학습할 기술 스택을 선택하세요
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
          {techStacks.map((tech) => (
            <div
              key={tech.skillId}
              className="flex flex-col items-center gap-2 rounded-xl border shadow-sm p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
              style={{ borderColor: tech.color, borderWidth: "2px" }}
              onClick={() => onSelect(tech)}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-cover bg-center bg-transparent"
                style={{
                  backgroundImage: `url(${tech.imgUrl})`,
                }}
              >
                {tech.emoji}
              </div>
              <span className="font-semibold text-sm text-center">
                {tech.name}
              </span>
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
