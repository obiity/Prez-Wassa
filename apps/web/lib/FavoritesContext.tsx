"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ContentItem } from "@/types/content";

interface FavoritesContextType {
  favorites: ContentItem[];
  addFavorite: (item: ContentItem) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<ContentItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from local storage on mount
    try {
      const stored = localStorage.getItem("wassa_favorites");
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load favorites", e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    // Save to local storage whenever favorites change
    if (isLoaded) {
      try {
        localStorage.setItem("wassa_favorites", JSON.stringify(favorites));
      } catch (e) {
        console.error("Failed to save favorites", e);
      }
    }
  }, [favorites, isLoaded]);

  const addFavorite = (item: ContentItem) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some((item) => item.id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
