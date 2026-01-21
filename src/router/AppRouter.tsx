import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import CharactersPage from "../pages/CharactersPage";
import CharacterDetailPage from "../pages/CharacterDetailPage";
import FavoritesPage from "../pages/FavoritesPage";
import EpisodesPage from "../pages/EpisodesPage";


function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Redirección inicial */}
          <Route path="/" element={<Navigate to="/characters" />} />

          {/* Listado de personajes */}
          <Route path="/characters" element={<CharactersPage />} />

          {/* Detalle de personaje */}
          <Route path="/characters/:id" element={<CharacterDetailPage />} />

          {/* ⭐ FAVORITOS  */}
          <Route path="/favorites" element={<FavoritesPage />} />

          {/* EPISODIOS */}
          <Route path="/episodes" element={<EpisodesPage />} />


          {/* Ruta 404 */}
          <Route
            path="*"
            element={
              <div className="empty">
                404 - Dimensión desconocida
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRouter;
