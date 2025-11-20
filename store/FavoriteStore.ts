import { create } from "zustand";
import { Meal } from "@/types";

interface FavoritesStore {
  favorites: Meal[];
  toggleFavorite: (meal: Meal) => void;
  isFavorite: (idMeal: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("favorites") || "[]")
      : [],

  toggleFavorite: (meal) =>
    set((state) => {
      const exists = state.favorites.some((f) => f.idMeal === meal.idMeal);

      let updated;
      if (exists) {
        updated = state.favorites.filter((f) => f.idMeal !== meal.idMeal);
      } else {
        updated = [meal, ...state.favorites];
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(updated));
      }

      return { favorites: updated };
    }),

  isFavorite: (idMeal) => {
    return get().favorites.some((meal) => meal.idMeal === idMeal);
  },
}));
