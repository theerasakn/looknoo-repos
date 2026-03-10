/**
 * Badge — Small colored label with auto-tinted background.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '../../theme/colors';
import { RADIUS } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';

interface BadgeProps {
  text: string;
  color?: string;
  C: Theme;
}

/** Renders a rounded badge with 18% opacity background tint. */
export const Badge: React.FC<BadgeProps> = ({ text, color, C }) => {
  const badgeColor = color ?? C.primary;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: `${badgeColor}2E` },
      ]}
    >
      <Text style={[TYPOGRAPHY.caption, { color: badgeColor }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: RADIUS.tag,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
});
