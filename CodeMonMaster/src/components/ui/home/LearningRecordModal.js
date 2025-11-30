export default function LearningRecordModal({ onClose, selectedTech }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg border p-6 shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">⚛️</span> {selectedTech?.name || "기술"} 학습 기록
        </h2>

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="minutes">학습 시간 (분)</label>
            <input id="minutes" type="number" min="1" placeholder="30" className="w-full border rounded-md px-3 py-2"/>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="notes">학습 내용 (선택)</label>
            <textarea id="notes" rows="4" placeholder="오늘 배운 내용을 간단히 적어보세요..." className="w-full border rounded-md px-3 py-2"/>
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
