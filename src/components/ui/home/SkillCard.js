import React, { forwardRef, useImperativeHandle } from "react";
import { useNavigate } from "react-router-dom";
import useUserSkills from "../../../hooks/useUserSkills";

const SkillCard = forwardRef(({ onOpenRecordModal, userId }, ref) => {
  const { skills, refreshSkills } = useUserSkills(userId);
  const navigate = useNavigate();

  useImperativeHandle(ref, () => ({
    refresh: refreshSkills,
  }));

  const handleQuestionClick = (skillId) => {
    console.log("문제풀기 클릭:", { userId, skillId });
    navigate('/questions', {
      state: {
        userId: userId,
        skillId: skillId,
      }
    });
  };

  return (
    <div
      className="grid gap-6 justify-center"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
    >
      {skills.map((skill) => {
        const expPercent = skill.exp
          ? Math.min((skill.exp / 100) * 100, 100)
          : 0;

        return (
          <div
            key={skill.userSkillId}
            className="flex flex-col items-center gap-4"
          >
            {/* 카드 영역 */}
            <div className="bg-white p-6 rounded-xl border-2 shadow hover:scale-105 transition cursor-pointer w-full">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="w-24 h-24 rounded-full flex items-center justify-center relative"
                  style={{ backgroundColor: "rgba(97,218,251,0.125)" }}
                >
                  <img
                    src={
                      skill.characterImageUrl ||
                      "https://via.placeholder.com/96"
                    }
                    alt={skill.skillName}
                    className="w-24 h-24 rounded-full object-cover"
                  />
                  <div
                    className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-lg"
                    style={{ backgroundColor: "#61DAFB" }}
                  >
                    <img src={skill.skillImageUrl} alt="" />
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-lg">{skill.skillName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {skill.skillName}를 기다리고 있어요
                  </p>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
                  <span className="font-bold text-sm">레벨 {skill.level}</span>
                </div>

                <div className="w-full space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>경험치</span>
                    <span>{skill.exp} / 100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2"
                      style={{
                        width: `${expPercent}%`,
                        backgroundColor: "#61DAFB",
                      }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-around w-full mt-2 text-sm text-muted-foreground">
                  <div>
                    <span className="font-semibold">학습 시간</span>
                    <div>{skill.time}분</div>
                  </div>
                  <div>
                    <span className="font-semibold">연속 학습</span>
                    <div>{skill.straightDayCount}일</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 w-full">
              <button
                onClick={() => onOpenRecordModal(skill)}
                className="flex-1 py-2 bg-white text-black font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                학습기록
              </button>

              <button
                onClick={() => handleQuestionClick(skill.skillId)}
                className="flex-1 py-2 bg-white text-black font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                문제풀기
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default SkillCard;