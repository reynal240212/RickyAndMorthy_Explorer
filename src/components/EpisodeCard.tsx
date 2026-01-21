import { useState } from "react";
import TrailerModal from "./TrailerModal";

interface EpisodeProps {
  id: number;
  name: string;
  air_date: string;
  episode: string; // ej: S01E01
}

const episodeTrailers: Record<string, string> = {
  S01: "https://www.youtube.com/embed/BFTSrbB2wII",
  S02: "https://www.youtube.com/embed/li8i0C6Zpfg",
  S03: "https://www.youtube.com/embed/1H1G6r2Zz1Y",
  S04: "https://www.youtube.com/embed/hl1U0bxTHbY",
  S05: "https://www.youtube.com/embed/yRz8D-7o6nA",
};

function EpisodeCard({ name, air_date, episode }: EpisodeProps) {
  const [open, setOpen] = useState(false);

  const seasonKey = episode.substring(0, 3); 
  const trailerUrl = episodeTrailers[seasonKey];
  
  // URL oficial de Rick & Morty en Netflix
  const netflixUrl = "https://www.netflix.com/title/80014749";

  return (
    <>
      <li
        className="
          bg-slate-900/60 border border-green-500/20
          rounded-2xl p-6 flex flex-col h-full
          hover:border-green-400
          transition-all duration-300
          hover:shadow-[0_0_30px_rgba(74,222,128,0.15)]
          backdrop-blur-sm
        "
      >
        <div className="flex justify-between items-start mb-4">
          <p className="text-green-400 font-mono text-xs font-bold tracking-widest bg-green-500/10 px-3 py-1 rounded-md border border-green-500/20">
            {episode}
          </p>
          <span className="text-gray-600 font-mono text-[10px]">C-137_LOG</span>
        </div>

        <h3 className="text-2xl font-black text-white mb-2 leading-tight group-hover:text-green-400 transition-colors">
          {name}
        </h3>

        <p className="text-gray-400 font-mono text-sm mb-8 flex items-center gap-2">
          <span className="text-green-500">📅</span> {air_date}
        </p>

        {/* CONTENEDOR DE ACCIONES (mt-auto para empujar al final) */}
        <div className="mt-auto flex flex-col gap-3">
          
          {/* BOTÓN DE NETFLIX (Principal) */}
          <a
            href={netflixUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center justify-center gap-2
              bg-red-600 hover:bg-red-700
              text-white text-sm font-bold py-3 rounded-xl
              transition-all duration-300 transform hover:scale-[1.02]
              shadow-[0_4px_15px_rgba(220,38,38,0.3)]
            "
          >
            <span className="text-lg">📺</span> Ver en Netflix
          </a>

          {/* BOTÓN DE TRAILER (Secundario) */}
          {trailerUrl && (
            <button
              onClick={() => setOpen(true)}
              className="
                flex items-center justify-center gap-2
                bg-transparent border border-green-500/30 hover:border-green-500
                text-green-400 hover:text-green-300
                text-xs font-mono py-2 rounded-xl
                transition-all duration-300
              "
            >
              <span>▶</span> TRÁILER DE TEMPORADA
            </button>
          )}
        </div>
      </li>

      {open && trailerUrl && (
        <TrailerModal
          title={`${episode} - ${name}`}
          trailerUrl={trailerUrl}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}

export default EpisodeCard;