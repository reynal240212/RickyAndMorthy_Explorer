import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCharacters } from "../api/rickAndMorty";

export interface Character {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

interface PageInfo {
  next: string | null;
  prev: string | null;
}

export function useCharacters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const name = searchParams.get("name") || "";
  const status = searchParams.get("status") || "";
  const species = searchParams.get("species") || "";

  const [characters, setCharacters] = useState<Character[]>([]);
  const [info, setInfo] = useState<PageInfo>({ next: null, prev: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCharacters() {
      try {
        setLoading(true);
        setError(null);

        const data = await getCharacters({
          page,
          name: name || undefined,
          status: status || undefined,
          species: species || undefined,
        });

        setCharacters(data.results);
        setInfo({
          next: data.info.next,
          prev: data.info.prev,
        });
      } catch {
        setCharacters([]);
        setError("No se encontraron resultados");
      } finally {
        setLoading(false);
      }
    }

    loadCharacters();
  }, [page, name, status, species]);

  function updateFilters(filters: {
    name?: string;
    status?: string;
    species?: string;
  }) {
    setSearchParams({
      page: "1",
      name: filters.name ?? name,
      status: filters.status ?? status,
      species: filters.species ?? species,
    });
  }

  return {
    characters,
    loading,
    error,
    page,
    name,
    status,
    species,
    hasNext: Boolean(info.next),
    hasPrev: Boolean(info.prev),
    nextPage: () =>
      setSearchParams({ page: String(page + 1), name, status, species }),
    prevPage: () =>
      setSearchParams({
        page: String(Math.max(1, page - 1)),
        name,
        status,
        species,
      }),
    updateFilters,
  };
}
