import { useState, useEffect } from "react";
import { fetchCharacters } from "../api/skills";

export default function useCharacters() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getCharacters = async () => {
            try {
                setLoading(true);
                const data = await fetchCharacters();
                if (data.isSuccess && data.result?.characters) {
                    const chars = data.result.characters.map((char) => ({
                        id: char.id,
                        name: char.name.trim(),
                        imgUrl: char.imgUrl,
                    }));
                    setCharacters(chars);
                }
            } catch (err) {
                setError(err);
                console.error("Failed to fetch characters:", err);
            } finally {
                setLoading(false);
            }
        };
        getCharacters();
    }, []);

    return { characters, loading, error };
}
