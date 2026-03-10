/**
 * SearchScreen — Category grid + text search to find places.
 */

import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../theme';
import { TYPOGRAPHY } from '../theme/typography';
import { RADIUS, SHADOW } from '../theme/spacing';
import { PlaceType } from '../types/place';
import { FadeIn } from '../components/layout/FadeIn';
import { Card } from '../components/ui/Card';
import { Icon, IconName } from '../components/ui/Icon';
import { StarR } from '../components/ui/StarR';
import { Badge } from '../components/ui/Badge';

interface Category {
  type: PlaceType;
  label: string;
  icon: IconName;
  color: string;
}

const CATEGORIES: Category[] = [
  { type: 'restaurant', label: '\u0E23\u0E49\u0E32\u0E19\u0E2D\u0E32\u0E2B\u0E32\u0E23', icon: 'restaurant', color: '#FF9100' },
  { type: 'accommodation', label: '\u0E17\u0E35\u0E48\u0E1E\u0E31\u0E01', icon: 'hotel', color: '#AA00FF' },
  { type: 'park', label: '\u0E2A\u0E27\u0E19\u0E2A\u0E32\u0E18\u0E32\u0E23\u0E13\u0E30', icon: 'park', color: '#00C853' },
  { type: 'vet', label: '\u0E2A\u0E31\u0E15\u0E27\u0E41\u0E1E\u0E17\u0E22\u0E4C', icon: 'vet', color: '#FF1744' },
];

/** Demo search results */
const DEMO_PLACES = [
  { id: 1, type: 'restaurant' as PlaceType, label: 'Dog Cafe BKK', dist: '0.5 \u0E01\u0E21.', rating: 4.5 },
  { id: 2, type: 'park' as PlaceType, label: 'Paw Park Sukhumvit', dist: '1.2 \u0E01\u0E21.', rating: 4.8 },
  { id: 3, type: 'vet' as PlaceType, label: 'Pet Care Clinic', dist: '0.8 \u0E01\u0E21.', rating: 4.2 },
  { id: 4, type: 'accommodation' as PlaceType, label: 'Pet Stay Resort', dist: '2.0 \u0E01\u0E21.', rating: 4.0 },
  { id: 5, type: 'restaurant' as PlaceType, label: 'Bark & Brew', dist: '1.5 \u0E01\u0E21.', rating: 4.3 },
];

/** Search screen with category grid and text filter. */
export default function SearchScreen() {
  const C = useTheme();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<PlaceType | null>(
    null,
  );

  const results = useMemo(() => {
    let filtered = DEMO_PLACES;
    if (activeCategory) {
      filtered = filtered.filter((p) => p.type === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter((p) =>
        p.label.toLowerCase().includes(q),
      );
    }
    return filtered;
  }, [query, activeCategory]);

  return (
    <View style={[styles.container, { backgroundColor: C.bgGray }]}>
      <FadeIn style={styles.header}>
        <Text style={[TYPOGRAPHY.h2, { color: C.textPrimary }]}>
          {'\u0E04\u0E49\u0E19\u0E2B\u0E32'}
        </Text>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: C.bgCard, borderColor: `${C.border}50` },
          ]}
        >
          <Icon name="search" size={20} color={C.textSecondary} />
          <TextInput
            style={[styles.input, { color: C.textPrimary }]}
            value={query}
            onChangeText={setQuery}
            placeholder={'\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48...'}
            placeholderTextColor={C.textSecondary}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')}>
              <Icon name="close" size={18} color={C.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </FadeIn>

      <FadeIn delay={100}>
        <View style={styles.catGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.type}
              style={[
                styles.catCard,
                SHADOW.card,
                {
                  backgroundColor: C.bgCard,
                  borderColor:
                    activeCategory === cat.type
                      ? cat.color
                      : `${C.border}30`,
                  borderWidth: activeCategory === cat.type ? 2 : 1,
                },
              ]}
              onPress={() =>
                setActiveCategory(
                  activeCategory === cat.type ? null : cat.type,
                )
              }
            >
              <View
                style={[
                  styles.catIcon,
                  { backgroundColor: `${cat.color}1A` },
                ]}
              >
                <Icon name={cat.icon} size={24} color={cat.color} />
              </View>
              <Text
                style={[TYPOGRAPHY.caption, { color: C.textPrimary }]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </FadeIn>

      <FlatList
        data={results}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <FadeIn delay={index * 80}>
            <Card C={C} style={styles.resultCard}>
              <View style={styles.resultRow}>
                <View style={{ flex: 1, gap: 4 }}>
                  <Text
                    style={[
                      TYPOGRAPHY.bodyMedium,
                      { color: C.textPrimary },
                    ]}
                  >
                    {item.label}
                  </Text>
                  <View style={styles.resultMeta}>
                    <Badge text={item.type} C={C} />
                    <Text
                      style={[
                        TYPOGRAPHY.caption,
                        { color: C.textSecondary },
                      ]}
                    >
                      {item.dist}
                    </Text>
                  </View>
                </View>
                <StarR rating={item.rating} size={14} C={C} />
              </View>
            </Card>
          </FadeIn>
        )}
        ListEmptyComponent={
          <FadeIn style={styles.empty}>
            <Text style={{ fontSize: 48 }}>{'\uD83D\uDC3E'}</Text>
            <Text
              style={[TYPOGRAPHY.body, { color: C.textSecondary }]}
            >
              {'\u0E44\u0E21\u0E48\u0E1E\u0E1A\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48'}
            </Text>
          </FadeIn>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20, gap: 12 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.input,
    borderWidth: 1,
    paddingHorizontal: 12,
    gap: 8,
  },
  input: { flex: 1, fontSize: 16, paddingVertical: 12 },
  catGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  catCard: {
    flex: 1,
    borderRadius: RADIUS.card,
    padding: 12,
    alignItems: 'center',
    gap: 8,
  },
  catIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: { paddingHorizontal: 20, gap: 8, paddingBottom: 20 },
  resultCard: { padding: 14 },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  empty: { alignItems: 'center', paddingTop: 48, gap: 12 },
});
