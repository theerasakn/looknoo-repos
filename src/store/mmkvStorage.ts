/**
 * MMKV storage adapter for Zustand persist middleware.
 */

import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

const mmkv = new MMKV();

/** Zustand-compatible storage backed by MMKV */
export const storage: StateStorage = {
  getItem: (name: string) => {
    const value = mmkv.getString(name);
    return value ?? null;
  },
  setItem: (name: string, value: string) => {
    mmkv.set(name, value);
  },
  removeItem: (name: string) => {
    mmkv.delete(name);
  },
};
