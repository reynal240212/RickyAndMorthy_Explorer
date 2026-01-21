import { Link } from "react-router-dom";
import { useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorites";

interface Props {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  compact?: boolean;
}

function CharacterCard({
  id,
  name,
  image,
  species,
  status,
  compact = false,
}: Props) {
  const [favorite, setFavorite] = useState(isFavorite(id));

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite({ id, name, image, species, status });
    setFavorite(!favorite);
  };

  const statusColor =
    status === "Alive"
      ? "bg-green-400 text-black"
      : status === "Dead"
      ? "bg-red-500 text-white"
      : "bg-gray-500 text-white";

  return (
    <li>
      <Link
        to={`/characters/${id}`}
        className={`group block rounded-xl overflow-hidden border border-green-500/30 bg-gray-900
          hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/30 transition
          ${compact ? "max-w-[180px]" : ""}`}
      >
        {/* IMAGE */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            className={`w-full object-cover
              ${compact ? "h-36" : "h-56"}`}
          />

          {/* STATUS */}
          <span
            className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold rounded-full ${statusColor}`}
          >
            {status}
          </span>

          {/* FAVORITE */}
          <button
            onClick={handleFavorite}
            className={`absolute bottom-2 right-2 text-lg transition
              ${favorite ? "text-yellow-400" : "text-gray-300 hover:text-yellow-300"}`}
          >
            ★
          </button>
        </div>

        {/* INFO */}
        <div className={`p-3 ${compact ? "text-sm" : ""}`}>
          <h3 className="font-semibold truncate">{name}</h3>
          <p className="text-gray-400">{species}</p>
        </div>
      </Link>
    </li>
  );
}

export default CharacterCard;
