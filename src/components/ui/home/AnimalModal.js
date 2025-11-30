import React from "react";
import useCharacters from "../../../hooks/useCharacters";

export default function AnimalModal({
  onClose,
  onChangeTechStack,
  selectedStack,
  onCharacterSelect,
}) {
  const { characters } = useCharacters();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-lg border p-6 shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto relative">
        <h2 className="text-lg font-semibold mb-4">
          캐릭터와 기술 스택을 확인하세요
        </h2>

        <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg mb-4">
          <img
            src={selectedStack.imgUrl}
            alt={selectedStack.name}
            className="w-10 h-10 object-contain"
          />
          <span className="font-semibold">{selectedStack.name}</span>
          <button
            onClick={onChangeTechStack}
            className="ml-auto inline-flex items-center justify-center gap-1 px-3 py-1 text-sm font-medium border rounded-md hover:bg-gray-200 transition"
          >
            변경
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {characters.map((char) => (
            <div
              key={char.id}
              className="bg-white text-black flex flex-col items-center gap-2 rounded-xl border shadow-sm p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105"
              onClick={() => onCharacterSelect(char)}
            >
              <img
                src={char.imgUrl}
                alt={char.name}
                className="w-16 h-16 object-contain"
              />
              <span className="font-semibold text-sm text-center">
                {char.name}
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
