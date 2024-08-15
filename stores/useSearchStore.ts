import { create } from 'zustand';

import { UserResponseTypes } from '@/services';

interface SearchState {
  searchResult: UserResponseTypes | null;
  setSearchResult: (result: UserResponseTypes | null) => void;
  clearSearchResult: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchResult: null,
  setSearchResult: (result) => set({ searchResult: result }),
  clearSearchResult: () => set({ searchResult: null }),
}));
