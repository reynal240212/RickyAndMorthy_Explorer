import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCharacterDetail } from "../hooks/useCharacterDetail";
import { DNAAnimation } from "../components/DNAAnimation";

function CharacterDetailPage() {
  const { id } = useParams();
  const { character, episodes, loading: apiLoading, error } = useCharacterDetail(id!);
  const [fakeLoading, setFakeLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setFakeLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const showLoading = apiLoading || fakeLoading;

  if (showLoading) return <DNAAnimation />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-red-500 font-mono text-2xl bg-red-500/10 p-8 border border-red-500/50 rounded-xl">
          ⚠️ ERROR DE TRANSMISIÓN: {error}
        </div>
        <Link to="/characters" className="mt-8 text-green-500 font-mono text-lg hover:text-green-300">
          &gt; REINTENTAR CONEXIÓN
        </Link>
      </div>
    );
  }

  if (!character) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 animate-in fade-in zoom-in duration-500">
      {/* BOTÓN DE RETORNO - Más visible */}
      <Link
        to="/characters"
        className="inline-block mb-10 text-green-500 hover:text-green-300 font-mono text-sm font-bold tracking-[0.2em] transition-all"
      >
        [ ← VOLVER A LA BASE DE DATOS ]
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* COLUMNA PERFIL */}
        <div className="lg:col-span-1 flex flex-col items-center">
          <div className="relative w-full max-w-sm group">
            <div className="absolute -inset-1 bg-green-500 rounded-3xl blur opacity-30"></div>
            <img
              src={character.image}
              alt={character.name}
              className="relative w-full rounded-3xl border-4 border-green-500/20 shadow-2xl"
            />
            <div className={`absolute -bottom-4 left-1/2 -translate-x-1/2 px-8 py-2 rounded-full text-sm font-black uppercase tracking-widest border-2 backdrop-blur-md shadow-xl ${character.status === "Alive" ? "bg-green-600 text-white border-green-400" :
                character.status === "Dead" ? "bg-red-600 text-white border-red-400" :
                  "bg-gray-700 text-white border-gray-500"
              }`}>
              {character.status}
            </div>
          </div>

          <h2 className="mt-12 text-5xl font-black text-white text-center tracking-tight leading-tight">
            {character.name}
          </h2>
          <p className="mt-4 text-green-400/80 font-mono text-sm tracking-widest bg-green-500/5 px-4 py-1 rounded-md border border-green-500/10">
            SUBJECT ID: {character.id}
          </p>
        </div>

        {/* COLUMNA DATOS */}
        <div className="lg:col-span-2 space-y-10">

          {/* DOSSIER - Letras más grandes y claras */}
          <section className="bg-slate-900/40 border border-green-500/20 rounded-[2rem] p-10 backdrop-blur-xl">
            <h3 className="text-green-400 font-mono text-xs uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
              <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]"></span>
              DATOS DE FILIACIÓN
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { label: "Especie", value: character.species },
                { label: "Género", value: character.gender },
                { label: "Origen", value: character.origin.name },
                { label: "Ubicación Actual", value: character.location.name }
              ].map((info, idx) => (
                <div key={idx} className="space-y-2 border-l-2 border-green-500/30 pl-6 hover:border-green-400 transition-colors">
                  <span className="text-gray-400 text-xs uppercase font-mono font-bold tracking-[0.2em]">{info.label}</span>
                  <p className="text-white text-2xl font-semibold tracking-tight">{info.value}</p>
                </div>
              ))}
            </div>
          </section>

          {/* EPISODIOS - Lista más legible */}
          <section className="bg-slate-900/40 border border-blue-500/20 rounded-[2rem] p-10">
            <h3 className="text-blue-400 font-mono text-xs uppercase tracking-[0.5em] mb-10 flex items-center gap-4">
              <span className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_#60a5fa]"></span>
              HISTORIAL DE AVISTAMIENTOS
            </h3>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto pr-4 custom-scrollbar">
              {episodes.map((ep) => (
                <li key={ep.id} className="flex justify-between items-center bg-white/5 hover:bg-white/10 p-5 rounded-2xl border border-white/5 transition-all group">
                  <span className="text-gray-200 text-lg font-medium group-hover:text-blue-300 transition-colors truncate mr-4">
                    {ep.name}
                  </span>
                  <span className="text-blue-400 font-mono text-xs font-bold bg-blue-400/10 px-3 py-1.5 rounded-lg border border-blue-400/20">
                    {ep.episode}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailPage;