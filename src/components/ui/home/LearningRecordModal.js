import React, { useState } from "react";
import { updateUserLearningTime } from "../../../api/user";

export default function LearningRecordModal({ onClose, selectedTech }) {
  const [time, setTime] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedTech || !selectedTech.userSkillId) {
      alert("선택된 스킬 정보가 없습니다.");
      return;
    }

    try {
      await updateUserLearningTime({
        userSkillId: selectedTech.userSkillId,
        content: content,
        time: Number(time),
      });
      alert("학습 기록이 저장되었습니다!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("학습 기록 저장 실패:", error);
      alert("저장에 실패했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg border p-6 shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">⚛️</span> {selectedTech?.skillName || "기술"} 학습 기록
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="minutes">학습 시간 (분)</label>
            <input
              id="minutes"
              type="number"
              min="1"
              placeholder="30"
              className="w-full border rounded-md px-3 py-2"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="notes">학습 내용 (선택)</label>
            <textarea
              id="notes"
              rows="4"
              placeholder="오늘 배운 내용을 간단히 적어보세요..."
              className="w-full border rounded-md px-3 py-2"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            학습 완료!
          </button>
        </form>

        <button type="button" onClick={onClose} className="absolute top-4 right-4 opacity-70 hover:opacity-100">✕</button>
      </div>
    </div>
  );
}
