/**
 * FadeIn — Wrapper that animates children with opacity + translateY on mount.
 */

import React, { useEffect } from 'react';
import { ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  Easing,
} from 'react-native-reanimated';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
}

/** Animates children with fade-in + slide-up on mount. */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  style,
}) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    opacity.value = withDelay(
      delay,
      withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) }),
    );
    translateY.value = withDelay(
      delay,
      withTiming(0, { duration: 400, easing: Easing.out(Easing.ease) }),
    );
  }, [delay, opacity, translateY]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
};
