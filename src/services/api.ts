/**
 * Axios instance with interceptors for PawTrip API.
 */

import axios from 'axios';

const API_BASE_URL = 'https://api.pawtrip.app/v1';

/** Pre-configured Axios instance for PawTrip API calls. */
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired — auth store will handle logout
    }
    return Promise.reject(error);
  },
);
