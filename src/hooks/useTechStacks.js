import { useState, useEffect } from "react";
import { fetchTechStacks } from "../api/skills";

export default function useTechStacks() {
    const [techStacks, setTechStacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getTechStacks = async () => {
            try {
                setLoading(true);
                const data = await fetchTechStacks();
                if (data.isSuccess && data.result?.skills) {
                    const stacks = data.result.skills.map((skill) => ({
                        name: skill.skillName,
                        emoji: "",
                        color: "#61DAFB",
                        bg: "rgba(97,218,251,0.125)",
                        imgUrl: skill.skillImageUrl,
                        skillId: skill.skillId,
                    }));
                    setTechStacks(stacks);
                }
            } catch (err) {
                setError(err);
                console.error("Failed to fetch skills:", err);
            } finally {
                setLoading(false);
            }
        };
        getTechStacks();
    }, []);

    return { techStacks, loading, error };
}
