/**
 * HomeMapScreen — Map with markers, search, filter chips, and SOS button.
 */

import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import { TYPOGRAPHY } from '../theme/typography';
import { RADIUS, SHADOW } from '../theme/spacing';
import { Place, PlaceType } from '../types/place';
import { usePlaceStore } from '../store/placeStore';
import { useLocation } from '../hooks/useLocation';
import { findNearestByType } from '../services/mapService';
import { openGoogleMaps } from '../utils/openMaps';
import { FadeIn } from '../components/layout/FadeIn';
import { Icon } from '../components/ui/Icon';
import { Badge } from '../components/ui/Badge';
import { SOSModal } from '../components/map/SOSModal';

type FilterKey = 'all' | PlaceType;

interface FilterChip {
  key: FilterKey;
  label: string;
}

const FILTERS: FilterChip[] = [
  { key: 'all', label: '\u0E17\u0E31\u0E49\u0E07\u0E2B\u0E21\u0E14' },
  { key: 'restaurant', label: '\u0E23\u0E49\u0E32\u0E19\u0E2D\u0E32\u0E2B\u0E32\u0E23' },
  { key: 'accommodation', label: '\u0E17\u0E35\u0E48\u0E1E\u0E31\u0E01' },
  { key: 'park', label: '\u0E2A\u0E27\u0E19' },
  { key: 'vet', label: '\u0E2A\u0E31\u0E15\u0E27\u0E41\u0E1E\u0E17\u0E22\u0E4C' },
];

/** Demo markers for development */
const DEMO_MARKERS: Place[] = [
  {
    id: 1, type: 'restaurant', label: '\u0E23\u0E49\u0E32\u0E19\u0E2D\u0E32\u0E2B\u0E32\u0E23 Dog Cafe',
    latitude: 13.7563, longitude: 100.5018, dist: '0.5 \u0E01\u0E21.',
    rating: 4.5, petPolicy: { sizeAccepted: 'S-L', leashRequired: true,
    waterBowl: true, shade: true, fencedArea: false },
  },
  {
    id: 2, type: 'park', label: '\u0E2A\u0E27\u0E19\u0E2A\u0E38\u0E19\u0E31\u0E02 Paw Park',
    latitude: 13.758, longitude: 100.505, dist: '1.2 \u0E01\u0E21.',
    rating: 4.8, petPolicy: { sizeAccepted: 'All', leashRequired: false,
    waterBowl: true, shade: true, fencedArea: true },
  },
  {
    id: 3, type: 'vet', label: '\u0E2A\u0E31\u0E15\u0E27\u0E41\u0E1E\u0E17\u0E22\u0E4C Pet Care',
    latitude: 13.754, longitude: 100.499, dist: '0.8 \u0E01\u0E21.',
    rating: 4.2, petPolicy: { sizeAccepted: 'All', leashRequired: true,
    waterBowl: false, shade: true, fencedArea: false },
    phone: '02-123-4567',
  },
  {
    id: 4, type: 'accommodation', label: '\u0E42\u0E23\u0E07\u0E41\u0E23\u0E21 Pet Stay',
    latitude: 13.76, longitude: 100.495, dist: '2.0 \u0E01\u0E21.',
    rating: 4.0, petPolicy: { sizeAccepted: 'S-M', leashRequired: true,
    waterBowl: true, shade: true, fencedArea: false },
  },
];

/** Home map screen with search, filters, and SOS. */
export default function HomeMapScreen() {
  const C = useTheme();
  const insets = useSafeAreaInsets();
  const { location } = useLocation();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(
    null,
  );
  const [sosVisible, setSosVisible] = useState(false);

  const markers = DEMO_MARKERS;

  const filteredMarkers = useMemo(() => {
    let result = markers;
    if (activeFilter !== 'all') {
      result = result.filter((m) => m.type === activeFilter);
    }
    if (searchText.trim()) {
      const q = searchText.toLowerCase();
      result = result.filter((m) => m.label.toLowerCase().includes(q));
    }
    return result;
  }, [markers, activeFilter, searchText]);

  const nearestVet = useMemo(
    () =>
      findNearestByType(
        markers,
        'vet',
        location.latitude,
        location.longitude,
      ),
    [markers, location],
  );

  const handleMarkerPress = useCallback((id: number) => {
    setSelectedMarkerId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: C.bgGray }]}>
      {/* Map placeholder */}
      <View style={[styles.mapArea, { paddingTop: insets.top }]}>
        <View
          style={[styles.mapPlaceholder, { backgroundColor: C.primaryLight }]}
        >
          <Icon name="map" size={48} color={C.primary} />
          <Text style={[TYPOGRAPHY.body, { color: C.textSecondary }]}>
            {'\u0E41\u0E1C\u0E19\u0E17\u0E35\u0E48 (react-native-maps)'}
          </Text>

          {/* Rendered markers list */}
          <ScrollView
            style={styles.markerList}
            showsVerticalScrollIndicator={false}
          >
            {filteredMarkers.map((m) => (
              <TouchableOpacity
                key={m.id}
                style={[
                  styles.markerItem,
                  {
                    backgroundColor: C.bgCard,
                    borderColor:
                      selectedMarkerId === m.id
                        ? C.primary
                        : `${C.border}30`,
                    borderWidth: selectedMarkerId === m.id ? 2 : 1,
                  },
                ]}
                onPress={() => handleMarkerPress(m.id)}
              >
                <Text
                  style={[TYPOGRAPHY.bodyMedium, { color: C.textPrimary }]}
                >
                  {m.label}
                </Text>
                <View style={styles.markerMeta}>
                  <Badge text={m.type} C={C} />
                  <Text
                    style={[TYPOGRAPHY.caption, { color: C.textSecondary }]}
                  >
                    {m.dist}
                  </Text>
                </View>
                {selectedMarkerId === m.id && (
                  <TouchableOpacity
                    style={[styles.navBtn, { backgroundColor: C.primary }]}
                    onPress={() => openGoogleMaps(m.label)}
                  >
                    <Icon name="navigate" size={16} color="#FFFFFF" />
                    <Text style={{ color: '#FFFFFF', fontSize: 13 }}>
                      {'\u0E19\u0E33\u0E17\u0E32\u0E07'}
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
            ))}
            {filteredMarkers.length === 0 && (
              <FadeIn>
                <Text
                  style={[
                    TYPOGRAPHY.body,
                    styles.emptyText,
                    { color: C.textSecondary },
                  ]}
                >
                  {'\u0E44\u0E21\u0E48\u0E21\u0E35\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48\u0E43\u0E19\u0E1A\u0E23\u0E34\u0E40\u0E27\u0E13\u0E19\u0E35\u0E49'}
                </Text>
              </FadeIn>
            )}
          </ScrollView>
        </View>
      </View>

      {/* Search bar */}
      <View style={[styles.searchBar, { top: insets.top + 8 }]}>
        {searchOpen ? (
          <FadeIn
            style={[
              styles.searchExpanded,
              SHADOW.card,
              { backgroundColor: C.bgCard },
            ]}
          >
            <TouchableOpacity onPress={() => setSearchOpen(false)}>
              <Icon name="back" size={24} color={C.textPrimary} />
            </TouchableOpacity>
            <TextInput
              style={[styles.searchInput, { color: C.textPrimary }]}
              value={searchText}
              onChangeText={setSearchText}
              placeholder={'\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48...'}
              placeholderTextColor={C.textSecondary}
              autoFocus
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Icon name="close" size={20} color={C.textSecondary} />
              </TouchableOpacity>
            )}
          </FadeIn>
        ) : (
          <TouchableOpacity
            style={[
              styles.searchPill,
              SHADOW.card,
              { backgroundColor: C.bgCard },
            ]}
            onPress={() => setSearchOpen(true)}
          >
            <Icon name="search" size={20} color={C.textSecondary} />
            <Text style={[TYPOGRAPHY.body, { color: C.textSecondary }]}>
              {'\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48...'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.filterRow, { top: insets.top + 64 }]}
        contentContainerStyle={styles.filterContent}
      >
        {FILTERS.map((f) => (
          <TouchableOpacity
            key={f.key}
            style={[
              styles.chip,
              {
                backgroundColor:
                  activeFilter === f.key ? C.primary : C.bgCard,
                borderColor:
                  activeFilter === f.key
                    ? C.primary
                    : `${C.border}50`,
              },
            ]}
            onPress={() => setActiveFilter(f.key)}
          >
            <Text
              style={[
                TYPOGRAPHY.caption,
                {
                  color:
                    activeFilter === f.key ? '#FFFFFF' : C.textPrimary,
                },
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* SOS button */}
      <TouchableOpacity
        style={[styles.sosBtn, { bottom: insets.bottom + 24 }]}
        onPress={() => setSosVisible(true)}
        activeOpacity={0.8}
      >
        <View style={styles.sosPulse} />
        <View style={styles.sosInner}>
          <Icon name="sos" size={28} color="#FFFFFF" />
        </View>
      </TouchableOpacity>

      <SOSModal
        visible={sosVisible}
        nearestVet={nearestVet}
        onClose={() => setSosVisible(false)}
        C={C}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapArea: { flex: 1 },
  mapPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    padding: 16,
  },
  markerList: { width: '100%', marginTop: 16 },
  markerItem: {
    borderRadius: RADIUS.card,
    padding: 12,
    marginBottom: 8,
    gap: 6,
  },
  markerMeta: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  navBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.tag,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  emptyText: { textAlign: 'center', marginTop: 24 },
  searchBar: { position: 'absolute', left: 16, right: 16, zIndex: 10 },
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.button,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  searchExpanded: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.button,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },
  searchInput: { flex: 1, fontSize: 16, padding: 4 },
  filterRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 9,
    maxHeight: 44,
  },
  filterContent: { paddingHorizontal: 16, gap: 8, alignItems: 'center' },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: RADIUS.tag,
    borderWidth: 1,
  },
  sosBtn: {
    position: 'absolute',
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sosPulse: {
    position: 'absolute',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255,23,68,0.2)',
  },
  sosInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF1744',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
