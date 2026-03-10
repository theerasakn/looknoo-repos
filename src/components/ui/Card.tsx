/**
 * Card — Themed card container with shadow and border.
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../theme/colors';
import { RADIUS, SHADOW } from '../../theme/spacing';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  C: Theme;
}

/** Themed card with rounded corners, shadow, and optional press. */
export const Card: React.FC<CardProps> = ({ children, style, onPress, C }) => {
  const cardStyle: ViewStyle = {
    ...styles.base,
    ...SHADOW.card,
    backgroundColor: C.bgCard,
    borderColor: `${C.border}30`,
    ...style,
  };

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  base: {
    borderRadius: RADIUS.card,
    borderWidth: 1,
    padding: 16,
  },
});
