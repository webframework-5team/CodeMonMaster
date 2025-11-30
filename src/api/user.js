import api from "../services/api";

export const fetchUserStats = async (userId) => {
    const response = await api.get(`/user/${userId}/stats`);
    return response.data;
};

export const updateUserLearningTime = async (data) => {
    const response = await api.patch('/user/time', data);
    return response.data;
};
