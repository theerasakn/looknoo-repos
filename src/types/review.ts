/** Review model */
export interface PetToggles {
  leash: boolean;
  water: boolean;
  shade: boolean;
  fenced: boolean;
}

export interface Review {
  id: string;
  placeId: number;
  userId: string;
  rating: number;
  text?: string;
  photos: string[];
  petToggles: PetToggles;
  dogName?: string;
  createdAt: string;
}
