/**
 * Place store — manages places and bookmarks with MMKV persistence.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from './mmkvStorage';
import { Place } from '../types/place';

interface PlaceState {
  places: Place[];
  bookmarkedIds: number[];
  setPlaces: (places: Place[]) => void;
  toggleBookmark: (id: number) => void;
  isBookmarked: (id: number) => boolean;
}

/** Global place store with MMKV persistence */
export const usePlaceStore = create<PlaceState>()(
  persist(
    (set, get) => ({
      places: [],
      bookmarkedIds: [],
      setPlaces: (places) => set({ places }),
      toggleBookmark: (id) =>
        set((s) => ({
          bookmarkedIds: s.bookmarkedIds.includes(id)
            ? s.bookmarkedIds.filter((bid) => bid !== id)
            : [...s.bookmarkedIds, id],
        })),
      isBookmarked: (id) => get().bookmarkedIds.includes(id),
    }),
    {
      name: 'place-store',
      storage: createJSONStorage(() => storage),
      partialize: (s) => ({ bookmarkedIds: s.bookmarkedIds }),
    },
  ),
);
