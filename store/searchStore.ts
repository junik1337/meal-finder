import { create } from "zustand";

interface SearchStore {
  history: string[];
  addSearch: (query: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  history: [],
  addSearch: (query: string) =>
    set((state) => {
      if (!query.trim()) return state;

      const newHistory = [query, ...state.history];

      return {
        history: newHistory.slice(0, 5),
      };
    }),
}));
