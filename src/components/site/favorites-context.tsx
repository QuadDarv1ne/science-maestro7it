"use client";

import * as React from "react";

const STORAGE_KEY = "science-maestro7it:favorites";

interface FavoritesContextValue {
  favorites: number[]; // publication IDs
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
  count: number;
}

const FavoritesContext = React.createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = React.useState<number[]>([]);

  // Load from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed.filter((x) => typeof x === "number"));
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Persist to localStorage on change
  const persist = React.useCallback((next: number[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  }, []);

  const isFavorite = React.useCallback(
    (id: number) => favorites.includes(id),
    [favorites]
  );

  const toggleFavorite = React.useCallback(
    (id: number) => {
      setFavorites((prev) => {
        const next = prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const addFavorite = React.useCallback(
    (id: number) => {
      setFavorites((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const removeFavorite = React.useCallback(
    (id: number) => {
      setFavorites((prev) => {
        const next = prev.filter((x) => x !== id);
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const clearFavorites = React.useCallback(() => {
    setFavorites([]);
    persist([]);
  }, []);

  const value = React.useMemo(
    () => ({
      favorites,
      isFavorite,
      toggleFavorite,
      addFavorite,
      removeFavorite,
      clearFavorites,
      count: favorites.length,
    }),
    [favorites, isFavorite, toggleFavorite, addFavorite, removeFavorite, clearFavorites]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = React.useContext(FavoritesContext);
  if (!ctx) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return ctx;
}
