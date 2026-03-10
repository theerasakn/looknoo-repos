/**
 * TripScreen — Trip planner with timeline of stops.
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
import { PlaceType } from '../types/place';
import { openGoogleMaps } from '../utils/openMaps';
import { FadeIn } from '../components/layout/FadeIn';
import { Card } from '../components/ui/Card';
import { Btn } from '../components/ui/Btn';
import { Icon, IconName } from '../components/ui/Icon';
import { Badge } from '../components/ui/Badge';

interface DemoStop {
  id: string;
  label: string;
  type: PlaceType;
  time: string;
}

const TYPE_ICONS: Record<PlaceType, IconName> = {
  restaurant: 'restaurant',
  accommodation: 'hotel',
  park: 'park',
  vet: 'vet',
  gas: 'gas',
};

const TYPE_COLORS: Record<PlaceType, string> = {
  restaurant: '#FF9100',
  accommodation: '#AA00FF',
  park: '#00C853',
  vet: '#FF1744',
  gas: '#2979FF',
};

const DEMO_TRIP: DemoStop[] = [
  { id: '1', label: 'Dog Cafe BKK', type: 'restaurant', time: '09:00' },
  { id: '2', label: 'Paw Park Sukhumvit', type: 'park', time: '11:00' },
  { id: '3', label: 'Pet Care Clinic', type: 'vet', time: '14:00' },
  { id: '4', label: 'Pet Stay Resort', type: 'accommodation', time: '16:00' },
];

/** Trip planner screen with timeline layout. */
export default function TripScreen() {
  const C = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: C.bgGray }]}>
      <FadeIn style={styles.header}>
        <Text style={[TYPOGRAPHY.h2, { color: C.textPrimary }]}>
          {'\u0E17\u0E23\u0E34\u0E1B\u0E02\u0E2D\u0E07\u0E09\u0E31\u0E19'}
        </Text>
        <Text style={[TYPOGRAPHY.body, { color: C.textSecondary }]}>
          {'\u0E27\u0E32\u0E07\u0E41\u0E1C\u0E19\u0E40\u0E2A\u0E49\u0E19\u0E17\u0E32\u0E07\u0E01\u0E31\u0E1A\u0E19\u0E49\u0E2D\u0E07\u0E2B\u0E21\u0E32'}
        </Text>
      </FadeIn>

      <ScrollView contentContainerStyle={styles.timeline}>
        {DEMO_TRIP.map((stop, i) => (
          <FadeIn key={stop.id} delay={i * 100}>
            <View style={styles.timelineItem}>
              {/* Timeline connector */}
              <View style={styles.timelineLeft}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: TYPE_COLORS[stop.type] },
                  ]}
                >
                  <Icon
                    name={TYPE_ICONS[stop.type]}
                    size={14}
                    color="#FFFFFF"
                  />
                </View>
                {i < DEMO_TRIP.length - 1 && (
                  <View
                    style={[styles.line, { backgroundColor: C.border }]}
                  />
                )}
              </View>

              {/* Stop card */}
              <Card C={C} style={styles.stopCard}>
                <View style={styles.stopHeader}>
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        TYPOGRAPHY.bodyMedium,
                        { color: C.textPrimary },
                      ]}
                    >
                      {stop.label}
                    </Text>
                    <View style={styles.stopMeta}>
                      <Badge text={stop.type} color={TYPE_COLORS[stop.type]} C={C} />
                      <Text
                        style={[
                          TYPOGRAPHY.caption,
                          { color: C.textSecondary },
                        ]}
                      >
                        {stop.time}
                      </Text>
                    </View>
                  </View>
                  <Btn
                    variant="outline"
                    size="md"
                    icon="navigate"
                    onPress={() => openGoogleMaps(stop.label)}
                    C={C}
                  >
                    {'\u0E44\u0E1B'}
                  </Btn>
                </View>
              </Card>
            </View>
          </FadeIn>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, gap: 4 },
  timeline: { paddingHorizontal: 20, paddingBottom: 24 },
  timelineItem: { flexDirection: 'row', gap: 12 },
  timelineLeft: { alignItems: 'center', width: 28 },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: { width: 2, flex: 1, marginVertical: 4 },
  stopCard: { flex: 1, marginBottom: 12 },
  stopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stopMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
});
