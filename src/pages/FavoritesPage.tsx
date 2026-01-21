import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import { getFavorites } from "../utils/favorites";

interface FavoriteCharacter {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

function FavoritesPage() {
  const [favorites, setFavorites] = useState<FavoriteCharacter[]>([]);

  useEffect(() => {
    const loadFavorites = () => setFavorites(getFavorites());

    loadFavorites();
    window.addEventListener("storage", loadFavorites);

    return () => window.removeEventListener("storage", loadFavorites);
  }, []);

  /* EMPTY STATE */
  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
        <h2
          className="
            text-4xl font-extrabold mb-4
            text-green-400
            drop-shadow-[0_0_15px_rgba(74,222,128,1)]
          "
        >
          Favorites
        </h2>

        <p className="text-gray-400 text-lg max-w-md">
          No has guardado personajes todavía ⭐
          <br />
          El multiverso está esperando decisiones valientes.
        </p>
      </div>
    );
  }

  /* FAVORITES LIST */
  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* HEADER */}
      <div className="mb-8 text-center">
        <h2
          className="
            text-3xl md:text-4xl font-extrabold
            text-green-400
            drop-shadow-[0_0_12px_rgba(74,222,128,1)]
          "
        >
          Favorites
        </h2>

        <p
          className="
            mt-2 text-gray-300 text-sm md:text-base
            drop-shadow-[0_0_6px_rgba(74,222,128,0.4)]
          "
        >
          {favorites.length} favorito{favorites.length !== 1 && "s"} guardado
          {favorites.length !== 1 && "s"}
        </p>
      </div>

      {/* GRID */}
      <ul
        className="
          grid gap-6
          grid-cols-2
          sm:grid-cols-3
          md:grid-cols-4
          lg:grid-cols-5
        "
      >
        {favorites.map((char) => (
          <CharacterCard key={char.id} {...char} compact />
        ))}
      </ul>
    </div>
  );
}

export default FavoritesPage;
