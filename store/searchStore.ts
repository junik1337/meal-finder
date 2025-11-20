import { create } from "zustand";

interface SearchStore {
  history: string[];
  addSearch: (query: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  history: [],
  addSearch: (query: string) =>
    set((state) => {
      const clean = query.trim();
      if (!clean) return state;

      if (state.history.includes(clean)) {
        const withoutDup = state.history.filter((h) => h !== clean);
        return { history: [clean, ...withoutDup].slice(0, 5) };
      }

      const newHistory = [query, ...state.history];

      return {
        history: newHistory.slice(0, 5),
      };
    }),
}));
