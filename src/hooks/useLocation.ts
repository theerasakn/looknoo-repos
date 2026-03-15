/**
 * useLocation — Requests and tracks device GPS location.
 * Falls back to default Bangkok coords if permission denied.
 */

import { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

interface Location {
  latitude: number;
  longitude: number;
}

/** Default Bangkok coordinates when GPS is unavailable. */
const BANGKOK: Location = { latitude: 13.7563, longitude: 100.5018 };

/** Returns current device location, falling back to Bangkok. */
export function useLocation(): {
  location: Location;
  loading: boolean;
  error: string | null;
} {
  const [location, setLocation] = useState<Location>(BANGKOK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function requestLocation() {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            if (mounted) {
              setError(
                '\u0E01\u0E23\u0E38\u0E13\u0E32\u0E40\u0E1B\u0E34\u0E14\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E14\u0E39\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48\u0E43\u0E01\u0E25\u0E49\u0E04\u0E38\u0E13',
              );
              setLoading(false);
            }
            return;
          }
        }

        // Using react-native built-in geolocation
        (navigator as { geolocation: typeof navigator.geolocation })
          .geolocation.getCurrentPosition(
            (pos) => {
              if (mounted) {
                setLocation({
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                });
                setLoading(false);
              }
            },
            () => {
              if (mounted) {
                setError(
                  '\u0E44\u0E21\u0E48\u0E2A\u0E32\u0E21\u0E32\u0E23\u0E16\u0E23\u0E31\u0E1A\u0E15\u0E33\u0E41\u0E2B\u0E19\u0E48\u0E07\u0E44\u0E14\u0E49',
                );
                setLoading(false);
              }
            },
            { enableHighAccuracy: true, timeout: 10000 },
          );
      } catch {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    requestLocation();
    return () => {
      mounted = false;
    };
  }, []);

  return { location, loading, error };
}
