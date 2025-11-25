import { useState, useEffect } from "react";
import { fetchRanking } from "../api/ranking";

export default function useRanking(myName = "데모 사용자") {
    const [rankingData, setRankingData] = useState([]);
    const [myRank, setMyRank] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getRanking = async () => {
            try {
                setLoading(true);
                const data = await fetchRanking();
                if (data.isSuccess && data.result.rank) {
                    setRankingData(data.result.rank);
                    const myIndex = data.result.rank.findIndex((r) => r.name === myName);
                    setMyRank(myIndex >= 0 ? myIndex + 1 : "-");
                }
            } catch (err) {
                setError(err);
                console.error("랭킹 불러오기 실패:", err);
            } finally {
                setLoading(false);
            }
        };
        getRanking();
    }, [myName]);

    return { rankingData, myRank, loading, error };
}
