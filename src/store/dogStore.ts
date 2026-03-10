/**
 * Dog profile store — manages user's dog profiles with MMKV persistence.
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { storage } from './mmkvStorage';
import { Dog } from '../types/dog';

interface DogState {
  dogs: Dog[];
  addDog: (dog: Dog) => void;
  updateDog: (id: string, updates: Partial<Dog>) => void;
  removeDog: (id: string) => void;
}

/** Global dog profile store with MMKV persistence */
export const useDogStore = create<DogState>()(
  persist(
    (set) => ({
      dogs: [],
      addDog: (dog) => set((s) => ({ dogs: [...s.dogs, dog] })),
      updateDog: (id, updates) =>
        set((s) => ({
          dogs: s.dogs.map((d) => (d.id === id ? { ...d, ...updates } : d)),
        })),
      removeDog: (id) =>
        set((s) => ({ dogs: s.dogs.filter((d) => d.id !== id) })),
    }),
    { name: 'dog-store', storage: createJSONStorage(() => storage) },
  ),
);
