/**
 * Review API service — manages reviews for places.
 */

import { api } from './api';
import { Review } from '../types/review';

/** Fetches reviews for a given place. */
export async function fetchReviews(placeId: number): Promise<Review[]> {
  const { data } = await api.get<Review[]>(`/places/${placeId}/reviews`);
  return data;
}

/** Submits a new review. */
export async function submitReview(
  review: Omit<Review, 'id' | 'createdAt'>,
): Promise<Review> {
  const { data } = await api.post<Review>('/reviews', review);
  return data;
}
