import api from "../services/api";

export const fetchRanking = async () => {
    const response = await api.get("/rank");
    return response.data;
};
