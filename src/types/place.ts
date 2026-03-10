/** Place type for map markers and listings */
export type PlaceType = 'restaurant' | 'park' | 'accommodation' | 'vet' | 'gas';

export interface PetPolicy {
  sizeAccepted: string;
  leashRequired: boolean;
  waterBowl: boolean;
  shade: boolean;
  fencedArea: boolean;
}

export interface Place {
  id: number;
  type: PlaceType;
  label: string;
  latitude: number;
  longitude: number;
  dist: string;
  rating: number;
  petPolicy: PetPolicy;
  hours?: string;
  phone?: string;
}
