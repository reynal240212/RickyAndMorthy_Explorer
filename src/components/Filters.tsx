interface FiltersProps {
  search: string;
  status: string;
  species: string;
  setSearch: (v: string) => void;
  setStatus: (v: string) => void;
  setSpecies: (v: string) => void;
  onSearch: () => void;
}

function Filters({
  search,
  status,
  species,
  setSearch,
  setStatus,
  setSpecies,
  onSearch,
}: FiltersProps) {
  return (
    <div
      className="
        bg-slate-900/80 backdrop-blur
        p-4 rounded-xl
        shadow-lg mb-8
        border border-lime-500/30
        flex flex-wrap items-center gap-3
      "
    >
      {/* SEARCH */}
      <input
        className="
          flex-1 min-w-[200px]
          bg-slate-800 text-slate-100 placeholder-slate-400
          px-3 py-2 rounded-md
          border border-slate-700
          focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400
        "
        placeholder="Buscar por nombre"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />

      {/* STATUS */}
      <select
        className="
          bg-slate-800 text-slate-100
          px-3 py-2 rounded-md
          border border-slate-700
          focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400
        "
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="">Estado</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      {/* SPECIES */}
      <input
        className="
          bg-slate-800 text-slate-100 placeholder-slate-400
          px-3 py-2 rounded-md
          border border-slate-700
          focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400
        "
        placeholder="Especie"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />

      {/* BUTTON */}
      <button
        onClick={onSearch}
        className="
          bg-lime-500 text-slate-900 font-bold
          px-6 py-2 rounded-md
          hover:bg-lime-400 active:scale-95
          transition-all duration-200
          shadow-lg shadow-lime-500/30
        "
      >
        Buscar
      </button>
    </div>
  );
}

export default Filters;
