import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorites";

interface Props {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
  compact?: boolean;
}

function CharacterCard({ id, name, image, species, status, compact = false }: Props) {
  const [favorite, setFavorite] = useState(isFavorite(id));
  const [showToast, setShowToast] = useState(false);

  // Efecto para ocultar el mensaje automáticamente
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite({ id, name, image, species, status });
    setFavorite(!favorite);
    setShowToast(true);
  };

  const statusColor =
    status === "Alive"
      ? "bg-green-500 text-black"
      : status === "Dead"
        ? "bg-red-500 text-white"
        : "bg-gray-500 text-white";

  return (
    <li className="relative group">
      {/* TOAST NOTIFICATION (Solo Tailwind) */}
      <div className={`absolute -top-10 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 pointer-events-none ${showToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}>
        <div className="bg-green-500 text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_15px_rgba(34,197,94,0.5)] whitespace-nowrap">
          {favorite ? "⭐ ¡A TU LISTA!" : "❌ ELIMINADO"}
        </div>
      </div>

      <Link
        to={`/characters/${id}`}
        className={`block rounded-2xl overflow-hidden border border-green-500/20 bg-gray-900/50 backdrop-blur-sm 
          hover:border-green-500/50 hover:shadow-[0_0_20px_rgba(74,222,128,0.15)] transition-all duration-300
          ${compact ? "max-w-[180px]" : ""}`}
      >
        {/* CONTENEDOR DE IMAGEN */}
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className={`w-full object-cover transition-transform duration-700 group-hover:scale-110
              ${compact ? "h-40" : "h-64"}`}
          />

          {/* OVERLAY DE ESTADO */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-0.5 text-[10px] uppercase tracking-widest font-black rounded-md shadow-lg ${statusColor}`}>
              {status}
            </span>
          </div>

          {/* BOTÓN DE FAVORITO  */}
          <button
            onClick={handleFavorite}
            className={`absolute bottom-3 right-3 p-2 rounded-xl border transition-all duration-300 backdrop-blur-md
              ${favorite
                ? "bg-yellow-400/20 border-yellow-400 text-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.4)]"
                : "bg-black/40 border-white/20 text-white hover:border-white/50"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={favorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>
        </div>

        {/* CONTENIDO */}
        <div className="p-4">
          <h3 className="font-bold text-lg truncate group-hover:text-green-400 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <p className="text-gray-400 text-sm">{species}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default CharacterCard;