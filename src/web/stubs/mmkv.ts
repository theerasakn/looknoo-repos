/**
 * Web stub for react-native-mmkv using localStorage.
 */

export class MMKV {
  getString(key: string): string | undefined {
    return localStorage.getItem(key) ?? undefined;
  }
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
  delete(key: string): void {
    localStorage.removeItem(key);
  }
}
