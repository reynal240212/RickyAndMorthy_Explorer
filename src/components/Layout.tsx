import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import heroImage from "../assets/fondo.jpg";

function Layout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/characters", label: "Characters" },
    { to: "/favorites", label: "Favorites" },
    { to: "/episodes", label: "Episodes" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-green-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link to="/characters" className="text-2xl font-extrabold tracking-wide">
            RICK<span className="text-green-400">EXPLORER</span>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden md:flex gap-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }: { isActive: boolean }) =>
                  `font-medium transition ${isActive ? "text-green-400" : "text-gray-300 hover:text-green-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* MOBILE BUTTON (Solo Tailwind) */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Línea superior */}
            <div className={`h-0.5 w-6 bg-green-400 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""
              }`} />
            {/* Línea media */}
            <div className={`h-0.5 w-6 bg-green-400 transition-all duration-300 ${isOpen ? "opacity-0" : ""
              }`} />
            {/* Línea inferior */}
            <div className={`h-0.5 w-6 bg-green-400 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""
              }`} />
          </button>
        </div>

        {/* MOBILE MENU */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 bg-black/95 border-b border-green-500/30 ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
          }`}>
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }: { isActive: boolean }) =>
                  `text-xl font-semibold transition ${isActive ? "text-green-400" : "text-gray-300"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      {/* RESTO DEL CONTENIDO (Hero, Main, Footer igual...) */}
      <section
        className="relative h-[70vh] md:h-[85vh] flex items-center justify-center text-center px-6 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.25),transparent_65%)]" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-[0_0_25px_rgba(74,222,128,0.7)]">
            Rick <span className="text-green-400 drop-shadow-[0_0_30px_rgba(74,222,128,0.6)]">Explorer</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">Explora el multiverso de Rick & Morty</p>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">{children}</main>

      <footer className="border-t border-gray-800 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Rick Explorer · Multiverse Edition
      </footer>
    </div>
  );
}

export default Layout;