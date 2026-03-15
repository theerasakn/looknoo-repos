/**
 * Web stub for react-native-reanimated.
 * Provides basic implementations for web compatibility.
 */

import { View } from 'react-native';

const Animated = {
  View,
  Text: View,
  ScrollView: View,
  createAnimatedComponent: (comp: unknown) => comp,
};

export default Animated;

export function useSharedValue(initial: number) {
  return { value: initial };
}

export function useAnimatedStyle(updater: () => object) {
  return updater();
}

export function withTiming(toValue: number) {
  return toValue;
}

export function withDelay(_delay: number, value: number) {
  return value;
}

export function withSpring(toValue: number) {
  return toValue;
}

export function interpolateColor(
  _value: number,
  _inputRange: number[],
  outputRange: string[],
) {
  return outputRange[0];
}

export const Easing = {
  bezier: () => undefined,
  out: () => undefined,
  ease: undefined,
  linear: undefined,
};
