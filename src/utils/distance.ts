/**
 * Distance calculation utility.
 */

/** Calculates distance in km between two lat/lng coordinates (Haversine). */
export function distanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/** Formats distance as Thai string, e.g. "1.2 km." */
export function formatDistThai(km: number): string {
  if (km < 1) {
    return `${Math.round(km * 1000)} \u0E21.`;
  }
  return `${km.toFixed(1)} \u0E01\u0E21.`;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}
