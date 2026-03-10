/**
 * MapMarker — Custom map marker with type-based colors and selection state.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { Place, PlaceType } from '../../types/place';
import { Icon, IconName } from '../ui/Icon';

/** Marker color mapping by place type */
const TYPE_COLORS: Record<PlaceType, keyof Theme> = {
  restaurant: 'orange',
  accommodation: 'purple',
  park: 'secondary',
  vet: 'red',
  gas: 'primary',
};

const TYPE_ICONS: Record<PlaceType, IconName> = {
  restaurant: 'restaurant',
  accommodation: 'hotel',
  park: 'park',
  vet: 'vet',
  gas: 'gas',
};

interface MapMarkerProps {
  m: Place;
  zoom: number;
  selected: boolean;
  onPress: () => void;
  C: Theme;
}

/** Custom map marker with icon, color, tooltip on selection. */
export const MapMarker = React.memo<MapMarkerProps>(
  ({ m, zoom, selected, onPress, C }) => {
    const color = C[TYPE_COLORS[m.type]];
    const size = selected ? 40 : zoom > 14 ? 32 : 24;

    return (
      <View style={styles.wrapper}>
        {selected && (
          <View
            style={[
              styles.tooltip,
              { backgroundColor: C.bgCard, borderColor: `${C.border}30` },
            ]}
          >
            <Text
              style={[TYPOGRAPHY.caption, { color: C.textPrimary }]}
              numberOfLines={1}
            >
              {m.label}
            </Text>
            <Text style={[TYPOGRAPHY.caption, { color: C.textSecondary }]}>
              {m.dist}
            </Text>
          </View>
        )}
        <View
          style={[
            styles.pin,
            {
              width: size,
              height: size,
              backgroundColor: color,
              transform: selected
                ? [{ scale: 1.3 }, { translateY: -8 }]
                : [],
            },
          ]}
        >
          <Icon
            name={TYPE_ICONS[m.type]}
            size={size * 0.55}
            color="#FFFFFF"
          />
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  tooltip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 4,
    maxWidth: 140,
  },
  pin: {
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
