interface TrailerModalProps {
  title: string;
  trailerUrl: string;
  onClose: () => void;
}

function TrailerModal({ title, trailerUrl, onClose }: TrailerModalProps) {
  // Añadimos autoplay a la URL para mejorar la experiencia
  const finalUrl = `${trailerUrl}?autoplay=1`;

  return (
    <div
      onClick={onClose} // Cierra al hacer clic en el backdrop
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/85 backdrop-blur-sm
        p-4
      "
    >
      {/* MODAL - Detenemos la propagación para que no se cierre al hacer clic dentro del contenido */}
      <div
        onClick={(e) => e.stopPropagation()} 
        className="
          relative w-full max-w-4xl
          bg-slate-950 border border-green-500/40
          rounded-2xl overflow-hidden
          shadow-[0_0_50px_rgba(74,222,128,0.2)]
          animate-in fade-in zoom-in duration-300
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 bg-slate-900/50 border-b border-green-500/20">
          <h3 className="text-green-400 font-mono font-bold truncate pr-4">
            {title}
          </h3>

          <button
            onClick={onClose}
            className="
              text-gray-400 hover:text-red-400
              transition-colors duration-200
              text-2xl leading-none
            "
            aria-label="Cerrar modal"
          >
            &times;
          </button>
        </div>

        {/* CONTENEDOR DE VIDEO */}
        <div className="aspect-video w-full bg-black">
          <iframe
            src={finalUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;