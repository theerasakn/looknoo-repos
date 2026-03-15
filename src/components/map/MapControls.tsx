/**
 * MapControls — Zoom in/out buttons for the map view.
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from '../../theme/colors';
import { RADIUS, SHADOW, MIN_TOUCH } from '../../theme/spacing';
import { Icon } from '../ui/Icon';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  C: Theme;
}

/** Right-side zoom control buttons (40x40dp, borderRadius 12dp). */
export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  C,
}) => (
  <View style={styles.container}>
    <TouchableOpacity
      style={[styles.btn, SHADOW.card, { backgroundColor: C.bgCard }]}
      onPress={onZoomIn}
      activeOpacity={0.7}
    >
      <Icon name="add" size={20} color={C.textPrimary} />
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.btn, SHADOW.card, { backgroundColor: C.bgCard }]}
      onPress={onZoomOut}
      activeOpacity={0.7}
    >
      <Icon name="remove" size={20} color={C.textPrimary} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 16,
    top: '40%',
    gap: 8,
    zIndex: 5,
  },
  btn: {
    width: MIN_TOUCH,
    height: MIN_TOUCH,
    borderRadius: RADIUS.mapControl,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
