import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Ranking from './Ranking';
import AddButton from './AddSkillButton';
import Header from './Header';
import SkillCard from './SkillCard';
import Stats from './Stats';
import TechStackModal from './TechStackModal';
import AnimalModal from './AnimalModal';
import LearningRecordModal from './LearningRecordModal';
import { saveUserSkill } from "../../../api/skills";
import { getCurrentUser } from "../../../utils/storage";

export default function LearningBuddies() {
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);
  const [isAnimalModalOpen, setIsAnimalModalOpen] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);

  const skillCardRef = useRef();

  // localStorage에서 userId 가져오기
  const currentUser = getCurrentUser();
  const userId = currentUser ? currentUser.userId : null;

  // 유저 정보 가져오기 (이름 등)
  const { data: userData } = useQuery({
    queryKey: ["userProfile", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axios.get(`/user/${userId}`);
      return res.data.result;
    },
  });

  const userName = userData ? userData.name : "게스트";

  const handleCharacterSelect = async (character) => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      const res = await saveUserSkill({
        userId,
        skillId: selectedTech.skillId,
        characterId: character.id,
      });
      console.log("저장 성공:", res);
      setIsAnimalModalOpen(false);
      skillCardRef.current?.refresh();
    } catch (err) {
      console.error("저장 실패:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Stats userId={userId} />
        <AddButton onClick={() => setIsTechModalOpen(true)} />
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          <div className="lg:col-span-2 space-y-8">
            <SkillCard ref={skillCardRef} onOpenRecordModal={() => setIsRecordModalOpen(true)} userId={userId} />
          </div>
          <Ranking myName={userName} />
        </div>
      </div>

      {isTechModalOpen && (
        <TechStackModal
          onClose={() => setIsTechModalOpen(false)}
          onSelect={(tech) => {
            setSelectedTech(tech);
            setIsTechModalOpen(false);
            setIsAnimalModalOpen(true);
          }}
        />
      )}

      {isAnimalModalOpen && (
        <AnimalModal
          onClose={() => setIsAnimalModalOpen(false)}
          onChangeTechStack={() => {
            setIsAnimalModalOpen(false);
            setIsTechModalOpen(true);
          }}
          selectedStack={selectedTech}
          onCharacterSelect={handleCharacterSelect}
        />
      )}

      {isRecordModalOpen && <LearningRecordModal onClose={() => setIsRecordModalOpen(false)} selectedTech={selectedTech} />}
    </div>
  );
}
