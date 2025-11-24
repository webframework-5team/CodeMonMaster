
export default function AddButton() {
  return (
    <div className="flex justify-center mb-8">
      <button className="bg-blue-900 text-white px-6 py-3 rounded-md shadow hover:bg-blue-800 transition flex items-center">
        <span className="mr-2">+</span>
        새 기술 스택 추가
      </button>
    </div>
  );
}