
export const saveUserSkill = async ({ userId, skillId, characterId }) => {
  try {
    const res = await fetch("http://52.78.157.84:8080/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, skillId, characterId }),
    });
    return await res.json();
  } catch (err) {
    console.error("Failed to save skill:", err);
    throw err;
  }
};
