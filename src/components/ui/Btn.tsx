/**
 * Btn — Primary button component with 4 variants.
 * Variants: primary, secondary, outline, sos
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';
import { Theme } from '../../theme/colors';
import { RADIUS, MIN_TOUCH } from '../../theme/spacing';
import { TYPOGRAPHY } from '../../theme/typography';
import { Icon, IconName } from './Icon';

interface BtnProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'sos';
  size?: 'md' | 'lg';
  icon?: IconName;
  full?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  C: Theme;
}

/** Themed button with icon support and 4 visual variants. */
export const Btn: React.FC<BtnProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  full = false,
  disabled = false,
  loading = false,
  onPress,
  C,
}) => {
  const bgMap: Record<string, string> = {
    primary: C.primary,
    secondary: C.secondary,
    outline: 'transparent',
    sos: C.red,
  };

  const textMap: Record<string, string> = {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    outline: C.primary,
    sos: '#FFFFFF',
  };

  const containerStyle: ViewStyle = {
    backgroundColor: bgMap[variant],
    borderRadius: RADIUS.button,
    minHeight: MIN_TOUCH,
    paddingHorizontal: size === 'lg' ? 28 : 20,
    paddingVertical: size === 'lg' ? 14 : 10,
    opacity: disabled ? 0.5 : 1,
    alignSelf: full ? 'stretch' : 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    ...(variant === 'outline' && {
      borderWidth: 2,
      borderColor: C.primary,
    }),
  };

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={textMap[variant]} />
      ) : (
        <>
          {icon && <Icon name={icon} size={20} color={textMap[variant]} />}
          <Text
            style={[
              size === 'lg' ? TYPOGRAPHY.buttonLg : TYPOGRAPHY.button,
              { color: textMap[variant] },
            ]}
          >
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({});
