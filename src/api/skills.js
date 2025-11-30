import api from "../services/api";

export const fetchUserSkills = async (userId) => {
    const response = await api.get(`/skills/${userId}`);
    return response.data;
};

export const saveUserSkill = async (data) => {
    const response = await api.post("/skills", data);
    return response.data;
};

export const fetchTechStacks = async () => {
    const response = await api.get("/skills");
    return response.data;
};

export const fetchCharacters = async () => {
    const response = await api.get("/skills/characters");
    return response.data;
};
