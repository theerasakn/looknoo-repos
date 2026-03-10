/**
 * DogProfileScreen — 3-step stepper for creating a dog profile.
 * Step 1: Name + Breed | Step 2: Size selection | Step 3: Health toggles
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import { useTheme } from '../theme';
import { TYPOGRAPHY } from '../theme/typography';
import { RADIUS } from '../theme/spacing';
import { useAuthStore } from '../store/authStore';
import { useDogStore } from '../store/dogStore';
import { Dog } from '../types/dog';
import { FadeIn } from '../components/layout/FadeIn';
import { Btn } from '../components/ui/Btn';
import { Toggle } from '../components/ui/Toggle';
import { Card } from '../components/ui/Card';

type Props = NativeStackScreenProps<AuthStackParamList, 'DogProfile'>;
type DogSize = 'S' | 'M' | 'L' | 'XL';

const SIZES: { key: DogSize; label: string; desc: string }[] = [
  { key: 'S', label: '\u0E40\u0E25\u0E47\u0E01', desc: '< 10 \u0E01\u0E01.' },
  { key: 'M', label: '\u0E01\u0E25\u0E32\u0E07', desc: '10-25 \u0E01\u0E01.' },
  { key: 'L', label: '\u0E43\u0E2B\u0E0D\u0E48', desc: '25-45 \u0E01\u0E01.' },
  { key: 'XL', label: '\u0E43\u0E2B\u0E0D\u0E48\u0E21\u0E32\u0E01', desc: '> 45 \u0E01\u0E01.' },
];

/** Dog profile 3-step stepper screen. */
export default function DogProfileScreen({ navigation }: Props) {
  const C = useTheme();
  const setOnboardingComplete = useAuthStore(
    (s) => s.setOnboardingComplete,
  );
  const addDog = useDogStore((s) => s.addDog);
  const user = useAuthStore((s) => s.user);

  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [size, setSize] = useState<DogSize>('M');
  const [vaccine, setVaccine] = useState(false);
  const [vaccineBook, setVaccineBook] = useState(false);
  const [flea, setFlea] = useState(false);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const dog: Dog = {
      id: Date.now().toString(),
      userId: user?.sub ?? 'demo',
      name: name || 'My Dog',
      breed: breed || undefined,
      size,
      vaccineComplete: vaccine,
      vaccineBooklet: vaccineBook,
      fleaPrevention: flea,
    };
    addDog(dog);
    setOnboardingComplete();
  };

  const handleSkip = () => {
    setOnboardingComplete();
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: C.bgGray }]}
      contentContainerStyle={styles.content}
    >
      <FadeIn>
        <Text style={[TYPOGRAPHY.h2, { color: C.textPrimary }]}>
          {'\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E19\u0E49\u0E2D\u0E07\u0E2B\u0E21\u0E32'}
        </Text>
      </FadeIn>

      {/* Progress bar */}
      <View style={styles.progressRow}>
        {[1, 2, 3].map((s) => (
          <View
            key={s}
            style={[
              styles.progressSeg,
              {
                backgroundColor: s <= step ? C.primary : C.border,
              },
            ]}
          />
        ))}
      </View>

      {/* Step content */}
      {step === 1 && (
        <FadeIn style={styles.stepContent}>
          <Text style={[TYPOGRAPHY.label, { color: C.textPrimary }]}>
            {'\u0E0A\u0E37\u0E48\u0E2D\u0E19\u0E49\u0E2D\u0E07\u0E2B\u0E21\u0E32'}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: C.bgCard,
                color: C.textPrimary,
                borderColor: `${C.border}50`,
              },
            ]}
            value={name}
            onChangeText={setName}
            placeholder={'\u0E0A\u0E37\u0E48\u0E2D\u0E19\u0E49\u0E2D\u0E07\u0E2B\u0E21\u0E32\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13'}
            placeholderTextColor={C.textSecondary}
          />
          <Text
            style={[
              TYPOGRAPHY.label,
              { color: C.textPrimary, marginTop: 16 },
            ]}
          >
            {'\u0E1E\u0E31\u0E19\u0E18\u0E38\u0E4C'}
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: C.bgCard,
                color: C.textPrimary,
                borderColor: `${C.border}50`,
              },
            ]}
            value={breed}
            onChangeText={setBreed}
            placeholder={'\u0E40\u0E0A\u0E48\u0E19 \u0E1E\u0E38\u0E14\u0E40\u0E14\u0E49\u0E25, \u0E0A\u0E34\u0E2B\u0E4C\u0E2A\u0E38'}
            placeholderTextColor={C.textSecondary}
          />
        </FadeIn>
      )}

      {step === 2 && (
        <FadeIn style={styles.stepContent}>
          <Text style={[TYPOGRAPHY.label, { color: C.textPrimary }]}>
            {'\u0E02\u0E19\u0E32\u0E14\u0E19\u0E49\u0E2D\u0E07\u0E2B\u0E21\u0E32'}
          </Text>
          <View style={styles.sizeGrid}>
            {SIZES.map((s) => (
              <Card
                key={s.key}
                C={C}
                onPress={() => setSize(s.key)}
                style={{
                  flex: 1,
                  minWidth: '45%',
                  alignItems: 'center',
                  borderColor:
                    size === s.key ? C.primary : `${C.border}30`,
                  borderWidth: size === s.key ? 2.5 : 1,
                  transform:
                    size === s.key ? [{ scale: 1.03 }] : [],
                }}
              >
                <Text
                  style={[TYPOGRAPHY.h3, { color: C.textPrimary }]}
                >
                  {s.label}
                </Text>
                <Text
                  style={[
                    TYPOGRAPHY.caption,
                    { color: C.textSecondary },
                  ]}
                >
                  {s.desc}
                </Text>
              </Card>
            ))}
          </View>
        </FadeIn>
      )}

      {step === 3 && (
        <FadeIn style={styles.stepContent}>
          <Text style={[TYPOGRAPHY.label, { color: C.textPrimary }]}>
            {'\u0E02\u0E49\u0E2D\u0E21\u0E39\u0E25\u0E2A\u0E38\u0E02\u0E20\u0E32\u0E1E'}
          </Text>
          <View style={styles.toggleRow}>
            <Text style={[TYPOGRAPHY.body, { color: C.textPrimary, flex: 1 }]}>
              {'\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19\u0E04\u0E23\u0E1A'}
            </Text>
            <Toggle on={vaccine} onToggle={() => setVaccine(!vaccine)} C={C} />
          </View>
          <View style={styles.toggleRow}>
            <Text style={[TYPOGRAPHY.body, { color: C.textPrimary, flex: 1 }]}>
              {'\u0E2A\u0E21\u0E38\u0E14\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19'}
            </Text>
            <Toggle
              on={vaccineBook}
              onToggle={() => setVaccineBook(!vaccineBook)}
              C={C}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={[TYPOGRAPHY.body, { color: C.textPrimary, flex: 1 }]}>
              {'\u0E1B\u0E49\u0E2D\u0E07\u0E01\u0E31\u0E19\u0E40\u0E2B\u0E47\u0E1A/\u0E2B\u0E21\u0E31\u0E14'}
            </Text>
            <Toggle on={flea} onToggle={() => setFlea(!flea)} C={C} />
          </View>
        </FadeIn>
      )}

      <View style={styles.footer}>
        <Btn variant="primary" size="lg" full onPress={handleNext} C={C}>
          {step === 3
            ? '\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01 \uD83C\uDF89'
            : '\u0E16\u0E31\u0E14\u0E44\u0E1B'}
        </Btn>
        <Btn variant="outline" size="md" onPress={handleSkip} C={C}>
          {'\u0E02\u0E49\u0E32\u0E21\u0E44\u0E1B\u0E01\u0E48\u0E2D\u0E19'}
        </Btn>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, gap: 20 },
  progressRow: { flexDirection: 'row', gap: 4 },
  progressSeg: { flex: 1, height: 4, borderRadius: 2 },
  stepContent: { gap: 12 },
  input: {
    borderWidth: 1,
    borderRadius: RADIUS.input,
    padding: 14,
    fontSize: 16,
  },
  sizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  footer: { gap: 12, marginTop: 16, alignItems: 'center' },
});
