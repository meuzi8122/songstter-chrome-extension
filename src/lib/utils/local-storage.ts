import { Instrument } from "../songstter/tablature";

export const FAVORITE_INSTRUMENT_KEY = "favoriteInstruments";

function getLocalStorageValue<T>(
  key: string,
  defaultValue: T
): { value: T; hasKey: boolean } {
  const value = localStorage.getItem(key);
  if (value) {
    // 空配列も返却される
    return { value: JSON.parse(value), hasKey: true };
  }

  return { value: defaultValue, hasKey: false };
}

export function setLocalStorageValue<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getFavoriteInstruments(): Instrument[] {
  // デフォルトは全部の楽器が選択されている状態
  const { value, hasKey } = getLocalStorageValue<Instrument[]>(
    FAVORITE_INSTRUMENT_KEY,
    ["Guitar", "Bass"]
  );

  if (!hasKey) {
    setLocalStorageValue<Instrument[]>(FAVORITE_INSTRUMENT_KEY, value);
  }

  return value;
}
