/**
 * Opens Google Maps navigation to the given destination.
 */

import { Linking } from 'react-native';

/** Opens Google Maps driving directions to the named destination. */
export function openGoogleMaps(destination: string): void {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}&travelmode=driving`;
  Linking.openURL(url);
}
