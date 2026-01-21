interface EpisodeFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedSeason: string;
  setSelectedSeason: (val: string) => void;
}

export function EpisodeFilters({ 
  searchTerm, 
  setSearchTerm, 
  selectedSeason, 
  setSelectedSeason 
}: EpisodeFiltersProps) {
  
  const seasons = ["All", "S01", "S02", "S03", "S04", "S05"];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-10 bg-slate-900/50 p-6 rounded-2xl border border-green-500/20 backdrop-blur-sm">
      
      {/* BUSCADOR POR NOMBRE */}
      <div className="flex-1">
        <label className="block text-green-500 font-mono text-[10px] uppercase tracking-widest mb-2 ml-1">
          Buscar Episodio
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Ej: Pilot, Anatomy Park..."
          className="w-full bg-black/40 border border-green-500/30 rounded-xl px-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all font-mono"
        />
      </div>

      {/* FILTRO POR TEMPORADA */}
      <div className="w-full md:w-64">
        <label className="block text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-2 ml-1">
          Temporada
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          <select
            value={selectedSeason}
            onChange={(e) => setSelectedSeason(e.target.value)}
            className="w-full bg-black/40 border border-blue-500/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition-all font-mono appearance-none"
          >
            {seasons.map(s => (
              <option key={s} value={s === "All" ? "" : s}>
                {s === "All" ? "Todas las Dimensiones" : `Temporada ${s.slice(2)}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}