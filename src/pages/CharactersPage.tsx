import { useState } from "react";
import { useCharacters } from "../hooks/useCharacters";
import Filters from "../components/Filters";
import CharacterCard from "../components/CharacterCard";
import Pagination from "../components/Pagination";

function CharactersPage() {
  const {
    characters,
    loading,
    error,
    page,
    hasNext,
    hasPrev,
    nextPage,
    prevPage,
    updateFilters,
  } = useCharacters();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");

  function handleSearch() {
    updateFilters({ name: search, status, species });
  }

  if (loading) {
    return (
      <p className="text-center text-green-400 text-lg mt-20 animate-pulse">
        Cargando personajes…
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-red-500 text-lg mt-20">
        {error}
      </p>
    );
  }

  return (
    <section className="min-h-screen bg-gray-900 text-white px-4 pb-20">
      <div className="max-w-7xl mx-auto">

        {/* TÍTULO */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mt-10 mb-8">
          Rick & Morty{" "}
          <span className="text-green-400">Characters</span>
        </h2>

        {/* FILTROS */}
        <div className="mb-10">
          <Filters
            search={search}
            status={status}
            species={species}
            setSearch={setSearch}
            setStatus={setStatus}
            setSpecies={setSpecies}
            onSearch={handleSearch}
          />
        </div>

        {/* VACÍO */}
        {characters.length === 0 && (
          <p className="text-center text-gray-400 text-lg mt-10">
            No se encontraron personajes en este universo 🌌
          </p>
        )}

        {/* GRID DE CARDS */}
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {characters.map((c) => (
            <CharacterCard
              key={c.id}
              id={c.id}
              name={c.name}
              image={c.image}
              species={c.species}
              status={c.status}
            />
          ))}
        </ul>

        {/* PAGINACIÓN */}
        <div className="mt-12 flex justify-center">
          <Pagination
            page={page}
            hasPrev={hasPrev}
            hasNext={hasNext}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>

      </div>
    </section>
  );
}

export default CharactersPage;
