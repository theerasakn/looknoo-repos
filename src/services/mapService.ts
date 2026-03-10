/**
 * Map service — location and geocoding helpers.
 */

import { Place } from '../types/place';
import { distanceKm } from '../utils/distance';

/** Finds the nearest place of a given type from current coordinates. */
export function findNearestByType(
  places: Place[],
  type: Place['type'],
  lat: number,
  lng: number,
): Place | undefined {
  const filtered = places.filter((p) => p.type === type);
  if (filtered.length === 0) return undefined;

  return filtered.reduce((nearest, place) => {
    const dNearest = distanceKm(lat, lng, nearest.latitude, nearest.longitude);
    const dPlace = distanceKm(lat, lng, place.latitude, place.longitude);
    return dPlace < dNearest ? place : nearest;
  });
}
