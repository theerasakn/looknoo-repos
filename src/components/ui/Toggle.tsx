/**
 * Toggle — 52x30dp animated switch component.
 */

import React, { useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';
import { Theme } from '../../theme/colors';

interface ToggleProps {
  on: boolean;
  onToggle: () => void;
  C: Theme;
  color?: string;
}

const TRACK_W = 52;
const TRACK_H = 30;
const THUMB_SIZE = 24;
const THUMB_MARGIN = 3;

/** Animated toggle switch, 52x30dp with smooth thumb transition. */
export const Toggle: React.FC<ToggleProps> = ({
  on,
  onToggle,
  C,
  color,
}) => {
  const progress = useSharedValue(on ? 1 : 0);
  const activeColor = color ?? C.secondary;

  useEffect(() => {
    progress.value = withTiming(on ? 1 : 0, { duration: 200 });
  }, [on, progress]);

  const trackStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [C.border, activeColor],
    ),
  }));

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withTiming(
          on ? TRACK_W - THUMB_SIZE - THUMB_MARGIN : THUMB_MARGIN,
          { duration: 200 },
        ),
      },
    ],
  }));

  return (
    <TouchableOpacity onPress={onToggle} activeOpacity={0.8}>
      <Animated.View style={[styles.track, trackStyle]}>
        <Animated.View style={[styles.thumb, thumbStyle]} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  track: {
    width: TRACK_W,
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
});
