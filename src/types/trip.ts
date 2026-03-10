/** Trip planner models */
export interface TripStop {
  id: string;
  placeId: number;
  label: string;
  type: 'restaurant' | 'park' | 'accommodation' | 'vet' | 'gas';
  order: number;
  estimatedTime?: string;
}

export interface Trip {
  id: string;
  userId: string;
  name: string;
  stops: TripStop[];
  createdAt: string;
}
