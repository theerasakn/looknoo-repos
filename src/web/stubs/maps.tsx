/**
 * Web stub for react-native-maps.
 * Renders a styled placeholder div instead of native MapView.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MapViewProps {
  style?: object;
  children?: React.ReactNode;
  onPress?: () => void;
  onRegionChangeComplete?: (region: { latitudeDelta: number; longitudeDelta: number }) => void;
  initialRegion?: object;
  ref?: React.Ref<unknown>;
}

const MapView = React.forwardRef<unknown, MapViewProps>(
  ({ style, children, onPress }) => (
    <View
      style={[styles.map, style]}
      onTouchEnd={onPress}
    >
      <Text style={styles.label}>Google Maps</Text>
      <Text style={styles.sub}>(Web Preview Mode)</Text>
      {children}
    </View>
  ),
);

MapView.displayName = 'MapView';

export default MapView;

export const Marker: React.FC<{
  children?: React.ReactNode;
  coordinate?: object;
  onPress?: () => void;
}> = ({ children, onPress }) => (
  <View onTouchEnd={onPress} style={styles.marker}>
    {children}
  </View>
);

export const PROVIDER_GOOGLE = 'google';

const styles = StyleSheet.create({
  map: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: { fontSize: 24, fontWeight: '700', color: '#2979FF', opacity: 0.5 },
  sub: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  marker: { position: 'absolute' },
});
