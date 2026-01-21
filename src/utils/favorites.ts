export interface FavoriteCharacter {
  id: number;
  name: string;
  image: string;
  species: string;
  status: string;
}

const STORAGE_KEY = "rick_favorites";

export function getFavorites(): FavoriteCharacter[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function isFavorite(id: number): boolean {
  return getFavorites().some((c) => c.id === id);
}

export function toggleFavorite(character: FavoriteCharacter) {
  const favorites = getFavorites();
  const exists = favorites.find((c) => c.id === character.id);

  const updated = exists
    ? favorites.filter((c) => c.id !== character.id)
    : [...favorites, character];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
}
