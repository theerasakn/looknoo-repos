/**
 * Place API service — fetches places from the backend.
 */

import { api } from './api';
import { Place } from '../types/place';

/** Fetches all places near the given coordinates. */
export async function fetchPlaces(
  lat: number,
  lng: number,
): Promise<Place[]> {
  const { data } = await api.get<Place[]>('/places', {
    params: { lat, lng },
  });
  return data;
}

/** Fetches a single place by ID. */
export async function fetchPlaceById(id: number): Promise<Place> {
  const { data } = await api.get<Place>(`/places/${id}`);
  return data;
}
