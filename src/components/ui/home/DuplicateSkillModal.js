import React from "react";

export default function DuplicateSkillModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg border p-6 shadow-lg w-full max-w-sm relative text-center">
                <div className="text-4xl mb-4">⚠️</div>
                <h2 className="text-lg font-bold mb-2">이미 추가된 스킬입니다</h2>
                <p className="text-gray-500 mb-6">
                    선택하신 기술 스택은 이미 학습 목록에 있습니다.<br />
                    다른 기술을 선택해주세요.
                </p>

                <button
                    onClick={onClose}
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-semibold"
                >
                    확인
                </button>

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
