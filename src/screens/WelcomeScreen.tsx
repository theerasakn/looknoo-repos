/**
 * WelcomeScreen — 3 onboarding slides with swipe, dots, and skip.
 */

import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ViewToken,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import { useTheme } from '../theme';
import { TYPOGRAPHY } from '../theme/typography';
import { FadeIn } from '../components/layout/FadeIn';
import { Btn } from '../components/ui/Btn';

const { width } = Dimensions.get('window');

interface Slide {
  emoji: string;
  color: string;
  title: string;
  desc: string;
}

const SLIDES: Slide[] = [
  {
    emoji: '\uD83D\uDC36',
    color: '#2979FF',
    title: '\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48\u0E2A\u0E31\u0E15\u0E27\u0E4C\u0E40\u0E25\u0E35\u0E49\u0E22\u0E07\u0E40\u0E02\u0E49\u0E32\u0E44\u0E14\u0E49',
    desc: '\u0E23\u0E49\u0E32\u0E19\u0E2D\u0E32\u0E2B\u0E32\u0E23 \u0E17\u0E35\u0E48\u0E1E\u0E31\u0E01 \u0E2A\u0E27\u0E19\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E30 \u0E41\u0E25\u0E30\u0E2A\u0E31\u0E15\u0E27\u0E41\u0E1E\u0E17\u0E22\u0E4C',
  },
  {
    emoji: '\uD83D\uDDFA\uFE0F',
    color: '#00C853',
    title: '\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E17\u0E23\u0E34\u0E1B\u0E01\u0E31\u0E1A\u0E19\u0E49\u0E2D\u0E07\u0E2B\u0E21\u0E32',
    desc: '\u0E2A\u0E23\u0E49\u0E32\u0E07\u0E40\u0E2A\u0E49\u0E19\u0E17\u0E32\u0E07\u0E17\u0E23\u0E34\u0E1B\u0E17\u0E35\u0E48\u0E19\u0E49\u0E2D\u0E07\u0E2B\u0E21\u0E32\u0E44\u0E1B\u0E14\u0E49\u0E27\u0E22\u0E44\u0E14\u0E49\u0E17\u0E38\u0E01\u0E17\u0E35\u0E48',
  },
  {
    emoji: '\u2B50',
    color: '#FF9100',
    title: '\u0E23\u0E35\u0E27\u0E34\u0E27\u0E41\u0E25\u0E30\u0E41\u0E0A\u0E23\u0E4C\u0E1B\u0E23\u0E30\u0E2A\u0E1A\u0E01\u0E32\u0E23\u0E13\u0E4C',
    desc: '\u0E0A\u0E48\u0E27\u0E22\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E19\u0E2B\u0E21\u0E32\u0E04\u0E19\u0E2D\u0E37\u0E48\u0E19\u0E2B\u0E32\u0E17\u0E35\u0E48\u0E40\u0E17\u0E35\u0E48\u0E22\u0E27\u0E14\u0E35\u0E17\u0E35\u0E48\u0E2A\u0E38\u0E14',
  },
];

type Props = NativeStackScreenProps<AuthStackParamList, 'Welcome'>;

/** Welcome onboarding with 3 swipeable slides. */
export default function WelcomeScreen({ navigation }: Props) {
  const C = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const goToSlide = (index: number) => {
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      goToSlide(activeIndex + 1);
    } else {
      navigation.replace('Login');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: C.bgGray }]}>
      <TouchableOpacity
        style={styles.skipBtn}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={[TYPOGRAPHY.label, { color: C.textSecondary }]}>
          {'\u0E02\u0E49\u0E32\u0E21'}
        </Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <FadeIn>
              <View
                style={[
                  styles.emojiCircle,
                  { backgroundColor: `${item.color}26` },
                ]}
              >
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>
            </FadeIn>
            <FadeIn delay={150}>
              <Text
                style={[
                  TYPOGRAPHY.h2,
                  styles.slideTitle,
                  { color: C.textPrimary },
                ]}
              >
                {item.title}
              </Text>
            </FadeIn>
            <FadeIn delay={300}>
              <Text
                style={[
                  TYPOGRAPHY.body,
                  styles.slideDesc,
                  { color: C.textSecondary },
                ]}
              >
                {item.desc}
              </Text>
            </FadeIn>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <TouchableOpacity key={i} onPress={() => goToSlide(i)}>
              <View
                style={[
                  styles.dot,
                  {
                    backgroundColor:
                      i === activeIndex ? C.primary : C.border,
                    width: i === activeIndex ? 24 : 8,
                  },
                ]}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Btn onPress={handleNext} C={C} full size="lg">
          {activeIndex === SLIDES.length - 1
            ? '\u0E40\u0E23\u0E34\u0E48\u0E21\u0E40\u0E25\u0E22'
            : '\u0E16\u0E31\u0E14\u0E44\u0E1B'}
        </Btn>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  skipBtn: {
    position: 'absolute',
    top: 56,
    right: 20,
    zIndex: 10,
    padding: 8,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emojiCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: { fontSize: 72 },
  slideTitle: { textAlign: 'center', marginBottom: 12 },
  slideDesc: { textAlign: 'center' },
  footer: { paddingHorizontal: 24, paddingBottom: 40, gap: 20 },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  dot: { height: 8, borderRadius: 4 },
});
