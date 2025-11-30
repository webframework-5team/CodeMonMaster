import { useState, useEffect, useCallback } from "react";
import { fetchUserSkills } from "../api/skills";

export default function useUserSkills(userId) {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getSkills = useCallback(async () => {
        if (!userId) return;
        try {
            setLoading(true);
            const data = await fetchUserSkills(userId);
            if (data.isSuccess && data.result.skills) {
                setSkills(data.result.skills);
            }
        } catch (err) {
            setError(err);
            console.error("스킬 데이터 불러오기 실패:", err);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        getSkills();
    }, [getSkills]);

    return { skills, loading, error, refreshSkills: getSkills };
}
