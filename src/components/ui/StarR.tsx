/**
 * StarR — Star rating display with half-star support.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../../theme/colors';
import { Icon } from './Icon';

interface StarRProps {
  rating: number;
  size?: number;
  C: Theme;
}

/** Renders 1–5 stars with half-star support based on rating value. */
export const StarR: React.FC<StarRProps> = ({ rating, size = 18, C }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <Icon key={i} name="star" size={size} color={C.orange} />,
      );
    } else if (rating >= i - 0.5) {
      stars.push(
        <Icon key={i} name="starHalf" size={size} color={C.orange} />,
      );
    } else {
      stars.push(
        <Icon key={i} name="starOutline" size={size} color={C.border} />,
      );
    }
  }
  return <View style={styles.row}>{stars}</View>;
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
});
