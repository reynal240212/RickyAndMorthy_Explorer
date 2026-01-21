import { useState, useEffect } from "react";
import EpisodeCard from "../components/EpisodeCard";
import { EpisodeFilters } from "../components/EpisodeFilters";

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllWithGraphQL = async () => {
      setLoading(true);
      
      // Definimos la consulta: pedimos las páginas 1, 2 y 3 juntas
      // O simplemente pedimos todos los episodios de una vez
      const query = `
        query {
          episodesByIds(ids: [${Array.from({length: 51}, (_, i) => i + 1)}]) {
            id
            name
            air_date
            episode
          }
        }
      `;

      try {
        const response = await fetch("https://rickandmortyapi.com/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });

        const { data } = await response.json();
        setEpisodes(data.episodesByIds);
      } catch (err) {
        console.error("Error en la conexión GraphQL:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllWithGraphQL();
  }, []);

  // Lógica de filtrado (se mantiene igual, es muy eficiente)
  const filteredEpisodes = episodes.filter((ep) => {
    const matchesName = ep.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeason = selectedSeason === "" || ep.episode.startsWith(selectedSeason);
    return matchesName && matchesSeason;
  });

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-20 text-green-500 font-mono">
      <div className="w-10 h-10 border-2 border-t-transparent border-green-500 rounded-full animate-spin mb-4" />
      EXTRAYENDO DATOS MEDIANTE GRAPHQL...
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-10">
        <h1 className="text-5xl font-black text-white italic tracking-tighter">
          EPISODE <span className="text-green-500">ARCHIVES</span>
        </h1>
        <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-[0.3em]">
          Query Mode: GraphQL Optimized
        </p>
      </header>

      <EpisodeFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        selectedSeason={selectedSeason}
        setSelectedSeason={setSelectedSeason}
      />

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEpisodes.map((ep) => (
          <EpisodeCard key={ep.id} {...ep} />
        ))}
      </ul>
    </div>
  );
}

export default EpisodesPage;