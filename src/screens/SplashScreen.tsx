/**
 * SplashScreen — Auto-navigates to Welcome after 2.8s with logo animation.
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import { useTheme } from '../theme';
import { TYPOGRAPHY } from '../theme/typography';
import { Icon } from '../components/ui/Icon';

type Props = NativeStackScreenProps<AuthStackParamList, 'Splash'>;

/** Splash screen with animated logo and loading dots. */
export default function SplashScreen({ navigation }: Props) {
  const C = useTheme();
  const scale = useSharedValue(0.3);
  const opacity = useSharedValue(0);
  const [dotCount, setDotCount] = useState(0);

  useEffect(() => {
    // Logo scale animation with spring curve
    scale.value = withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    });
    opacity.value = withTiming(1, { duration: 600 });

    // Animated dots cycle 0-3 every 350ms
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 350);

    // Auto-navigate after 2.8s
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2800);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(timer);
    };
  }, [navigation, scale, opacity]);

  const logoStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={[styles.container, { backgroundColor: C.primary }]}>
      <Animated.View style={[styles.logoWrap, logoStyle]}>
        <View style={styles.logoCircle}>
          <Icon name="paw" size={64} color={C.primary} />
        </View>
        <Text style={[TYPOGRAPHY.h1, styles.title]}>PawTrip</Text>
      </Animated.View>
      <Text style={styles.dots}>
        {'\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14'}
        {'.'.repeat(dotCount)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    gap: 16,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 36,
  },
  dots: {
    position: 'absolute',
    bottom: 80,
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16,
  },
});
