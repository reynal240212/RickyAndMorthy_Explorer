const BASE_URL = "https://rickandmortyapi.com/api";

interface GetCharactersParams {
  page?: number;
  name?: string;
  status?: string;
  species?: string;
}

/* LISTADO + FILTROS */
export async function getCharacters(params: GetCharactersParams) {
  const query = new URLSearchParams();

  if (params.page) query.append("page", params.page.toString());
  if (params.name) query.append("name", params.name);
  if (params.status) query.append("status", params.status);
  if (params.species) query.append("species", params.species);

  const response = await fetch(
    `${BASE_URL}/character?${query.toString()}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener personajes");
  }

  return response.json();
}

/* DETALLE DE PERSONAJE */
export async function getCharacterById(id: string) {
  const response = await fetch(`${BASE_URL}/character/${id}`);

  if (!response.ok) {
    throw new Error("Error al obtener el personaje");
  }

  return response.json();
}

/* EPISODIOS (REQUEST AGRUPADO) */
export async function getEpisodesByIds(ids: number[]) {
  if (ids.length === 0) return [];

  const response = await fetch(
    `${BASE_URL}/episode/${ids.join(",")}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener episodios");
  }

  return response.json();
}
