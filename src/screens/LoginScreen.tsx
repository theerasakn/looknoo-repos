/**
 * LoginScreen — Google OAuth with demo mode fallback.
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation/types';
import { useTheme } from '../theme';
import { TYPOGRAPHY } from '../theme/typography';
import { RADIUS, SHADOW } from '../theme/spacing';
import { FadeIn } from '../components/layout/FadeIn';
import { Btn } from '../components/ui/Btn';
import { Icon } from '../components/ui/Icon';
import { useGoogleAuth } from '../hooks/useGoogleAuth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

/** Login screen with Google OAuth and demo fallback. */
export default function LoginScreen({ navigation }: Props) {
  const C = useTheme();
  const { isConfigured, loading, error, signIn, signInDemo } =
    useGoogleAuth();

  const handleDemoLogin = () => {
    signInDemo();
    navigation.replace('DogProfile');
  };

  const handleGoogleLogin = async () => {
    await signIn();
    // On success, auth store triggers navigation via RootNavigator
    navigation.replace('DogProfile');
  };

  return (
    <View style={[styles.container, { backgroundColor: C.bgGray }]}>
      <FadeIn style={styles.content}>
        <View
          style={[styles.logoCircle, { backgroundColor: C.primaryLight }]}
        >
          <Icon name="paw" size={48} color={C.primary} />
        </View>

        <Text style={[TYPOGRAPHY.h1, { color: C.textPrimary }]}>
          PawTrip
        </Text>
        <Text
          style={[
            TYPOGRAPHY.body,
            styles.subtitle,
            { color: C.textSecondary },
          ]}
        >
          {'\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19'}
        </Text>
      </FadeIn>

      <FadeIn delay={200} style={styles.actions}>
        {isConfigured ? (
          <Btn
            variant="primary"
            size="lg"
            full
            loading={loading}
            onPress={handleGoogleLogin}
            C={C}
          >
            {'\u0E40\u0E02\u0E49\u0E32\u0E2A\u0E39\u0E48\u0E23\u0E30\u0E1A\u0E1A\u0E14\u0E49\u0E27\u0E22 Google'}
          </Btn>
        ) : (
          <View
            style={[
              styles.setupCard,
              SHADOW.card,
              { backgroundColor: C.bgCard, borderColor: `${C.border}30` },
            ]}
          >
            <Icon name="sos" size={24} color={C.orange} />
            <Text
              style={[
                TYPOGRAPHY.bodyMedium,
                { color: C.textPrimary },
              ]}
            >
              {'\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32 Google Client ID \u0E01\u0E48\u0E2D\u0E19'}
            </Text>
            <Text
              style={[
                TYPOGRAPHY.caption,
                { color: C.textSecondary },
              ]}
            >
              {'\u0E15\u0E31\u0E49\u0E07\u0E04\u0E48\u0E32 GOOGLE_CLIENT_ID \u0E43\u0E19 useGoogleAuth.ts'}
            </Text>
          </View>
        )}

        {error && (
          <View
            style={[styles.errorCard, { backgroundColor: C.redLight }]}
          >
            <Text style={[TYPOGRAPHY.caption, { color: C.red }]}>
              {error}
            </Text>
          </View>
        )}

        <Btn
          variant="outline"
          size="lg"
          full
          onPress={handleDemoLogin}
          C={C}
        >
          {'\u0E02\u0E49\u0E32\u0E21\u0E44\u0E1B\u0E01\u0E48\u0E2D\u0E19'}
        </Btn>
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 8,
    textAlign: 'center',
  },
  actions: {
    gap: 16,
  },
  setupCard: {
    borderRadius: RADIUS.card,
    borderWidth: 1,
    padding: 20,
    alignItems: 'center',
    gap: 8,
  },
  errorCard: {
    borderRadius: RADIUS.input,
    padding: 12,
    alignItems: 'center',
  },
});
