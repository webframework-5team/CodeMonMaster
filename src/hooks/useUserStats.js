import { useState, useEffect } from "react";
import { fetchUserStats } from "../api/user";

export default function useUserStats(userId = 1) {
    const [stats, setStats] = useState({
        learningCount: 0,
        level: 0,
        learningMinutes: 0,
        solvedQuestionCount: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getStats = async () => {
            try {
                setLoading(true);
                const data = await fetchUserStats(userId);
                if (data.isSuccess && data.result) {
                    setStats(data.result);
                }
            } catch (err) {
                setError(err);
                console.error("Stats 불러오기 실패:", err);
            } finally {
                setLoading(false);
            }
        };

        getStats();
    }, [userId]);

    return { stats, loading, error };
}
