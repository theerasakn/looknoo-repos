/**
 * PlaceDetailScreen — Full place info with pet policy, reviews, and navigate.
 */

import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../theme';
import { TYPOGRAPHY } from '../theme/typography';
import { RADIUS, SHADOW } from '../theme/spacing';
import { openGoogleMaps } from '../utils/openMaps';
import { FadeIn } from '../components/layout/FadeIn';
import { TopBar } from '../components/layout/TopBar';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Btn } from '../components/ui/Btn';
import { StarR } from '../components/ui/StarR';
import { Icon } from '../components/ui/Icon';
import { Toggle } from '../components/ui/Toggle';

/** Place detail screen showing pet policy and reviews. */
export default function PlaceDetailScreen() {
  const C = useTheme();

  // Demo place data
  const place = {
    id: 1,
    label: 'Dog Cafe BKK',
    type: 'restaurant' as const,
    rating: 4.5,
    dist: '0.5 \u0E01\u0E21.',
    hours: '09:00 - 21:00',
    phone: '02-123-4567',
    petPolicy: {
      sizeAccepted: 'S-L',
      leashRequired: true,
      waterBowl: true,
      shade: true,
      fencedArea: false,
    },
  };

  const policyItems = [
    {
      label: '\u0E02\u0E19\u0E32\u0E14\u0E17\u0E35\u0E48\u0E23\u0E31\u0E1A',
      value: place.petPolicy.sizeAccepted,
      icon: 'paw' as const,
    },
    {
      label: '\u0E08\u0E39\u0E07\u0E2A\u0E32\u0E22\u0E08\u0E39\u0E07',
      value: place.petPolicy.leashRequired,
      icon: 'check' as const,
    },
    {
      label: '\u0E0A\u0E32\u0E21\u0E19\u0E49\u0E33',
      value: place.petPolicy.waterBowl,
      icon: 'check' as const,
    },
    {
      label: '\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E23\u0E48\u0E21',
      value: place.petPolicy.shade,
      icon: 'check' as const,
    },
    {
      label: '\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48\u0E25\u0E49\u0E2D\u0E21\u0E23\u0E31\u0E49\u0E27',
      value: place.petPolicy.fencedArea,
      icon: 'check' as const,
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: C.bgGray }]}>
      <TopBar title={place.label} C={C} />

      <ScrollView contentContainerStyle={styles.content}>
        <FadeIn>
          <View style={styles.headerRow}>
            <View style={{ flex: 1 }}>
              <Badge text={place.type} C={C} />
              <Text
                style={[
                  TYPOGRAPHY.h2,
                  { color: C.textPrimary, marginTop: 8 },
                ]}
              >
                {place.label}
              </Text>
              <View style={styles.metaRow}>
                <StarR rating={place.rating} C={C} />
                <Text
                  style={[TYPOGRAPHY.caption, { color: C.textSecondary }]}
                >
                  {place.dist}
                </Text>
              </View>
            </View>
          </View>
        </FadeIn>

        {/* Pet Policy Card */}
        <FadeIn delay={100}>
          <Card C={C} style={styles.policyCard}>
            <Text style={[TYPOGRAPHY.h3, { color: C.textPrimary }]}>
              {'\uD83D\uDC3E \u0E19\u0E42\u0E22\u0E1A\u0E32\u0E22\u0E2A\u0E31\u0E15\u0E27\u0E4C\u0E40\u0E25\u0E35\u0E49\u0E22\u0E07'}
            </Text>
            {policyItems.map((item) => (
              <View key={item.label} style={styles.policyRow}>
                <Text
                  style={[
                    TYPOGRAPHY.body,
                    { color: C.textPrimary, flex: 1 },
                  ]}
                >
                  {item.label}
                </Text>
                {typeof item.value === 'boolean' ? (
                  <Icon
                    name={item.value ? 'check' : 'close'}
                    size={20}
                    color={item.value ? C.secondary : C.red}
                  />
                ) : (
                  <Text
                    style={[TYPOGRAPHY.bodyMedium, { color: C.primary }]}
                  >
                    {item.value}
                  </Text>
                )}
              </View>
            ))}
          </Card>
        </FadeIn>

        {/* Info */}
        <FadeIn delay={200}>
          <Card C={C}>
            {place.hours && (
              <View style={styles.infoRow}>
                <Icon name="clock" size={18} color={C.textSecondary} />
                <Text
                  style={[TYPOGRAPHY.body, { color: C.textPrimary }]}
                >
                  {place.hours}
                </Text>
              </View>
            )}
            {place.phone && (
              <View style={styles.infoRow}>
                <Icon name="phone" size={18} color={C.textSecondary} />
                <Text
                  style={[TYPOGRAPHY.body, { color: C.textPrimary }]}
                >
                  {place.phone}
                </Text>
              </View>
            )}
          </Card>
        </FadeIn>

        {/* Reviews placeholder */}
        <FadeIn delay={300}>
          <Card C={C}>
            <Text style={[TYPOGRAPHY.h3, { color: C.textPrimary }]}>
              {'\u0E23\u0E35\u0E27\u0E34\u0E27'}
            </Text>
            <Text
              style={[
                TYPOGRAPHY.body,
                { color: C.textSecondary, marginTop: 8 },
              ]}
            >
              {'\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E21\u0E35\u0E23\u0E35\u0E27\u0E34\u0E27 \u0E40\u0E1B\u0E47\u0E19\u0E04\u0E19\u0E41\u0E23\u0E01\u0E17\u0E35\u0E48\u0E23\u0E35\u0E27\u0E34\u0E27!'}
            </Text>
          </Card>
        </FadeIn>

        <FadeIn delay={400}>
          <Btn
            variant="primary"
            size="lg"
            full
            icon="navigate"
            onPress={() => openGoogleMaps(place.label)}
            C={C}
          >
            {'\u0E19\u0E33\u0E17\u0E32\u0E07\u0E44\u0E1B\u0E17\u0E35\u0E48\u0E19\u0E35\u0E48'}
          </Btn>
        </FadeIn>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 16 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-start' },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  policyCard: { gap: 12 },
  policyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
});
