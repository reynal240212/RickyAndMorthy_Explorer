import { useEffect, useState } from "react";
import { getCharacterById, getEpisodesByIds } from "../api/rickAndMorty";

interface Episode {
  id: number;
  name: string;
  episode: string;
}

export function useCharacterDetail(id: string) {
  const [character, setCharacter] = useState<any>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);

        const characterData = await getCharacterById(id);
        setCharacter(characterData);

        const episodeIds = characterData.episode.map((url: string) =>
          Number(url.split("/").pop())
        );

        const episodesData = await getEpisodesByIds(episodeIds);
        setEpisodes(Array.isArray(episodesData) ? episodesData : [episodesData]);
      } catch {
        setError("Error al cargar el personaje");
      } finally {
        setLoading(false);
      }
    }

    loadDetail();
  }, [id]);

  return { character, episodes, loading, error };
}
