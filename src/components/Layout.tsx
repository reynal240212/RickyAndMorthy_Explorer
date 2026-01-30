import { Link, NavLink } from "react-router-dom";
import heroImage from "../assets/fondo.jpg";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-white">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-green-500/30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* LOGO */}
          <Link
            to="/characters"
            className="text-2xl font-extrabold tracking-wide"
          >
            RICK<span className="text-green-400">EXPLORER</span>
          </Link>

          {/* LINKS */}
          <div className="flex gap-6">
            {[
              { to: "/characters", label: "Characters" },
              { to: "/favorites", label: "Favorites" },
              { to: "/episodes", label: "Episodes" }
            ].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }: { isActive: boolean }) =>
                  `font-medium transition ${isActive
                    ? "text-green-400"
                    : "text-gray-300 hover:text-green-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative h-[75vh] md:h-[85vh] flex items-center justify-center text-center px-6 bg-no-repeat bg-center bg-cover"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Glow verde tipo portal */}
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.25),transparent_65%)]"
        />

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-[0_0_25px_rgba(74,222,128,0.7)]">
            Rick <span className="text-green-400 drop-shadow-[0_0_30px_rgba(74,222,128,0.6)]">Explorer</span>
          </h1>

          <p className="text-gray-300 text-lg md:text-xl">
            Explora el multiverso de Rick & Morty
          </p>
        </div>
      </section>

      {/* MAIN */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-800 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Rick Explorer · Multiverse Edition
      </footer>

    </div>
  );
}

export default Layout;