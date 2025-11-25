import api from "../services/api";

export const fetchUserStats = async (userId) => {
    const response = await api.get(`/user/${userId}/stats`);
    return response.data;
};
