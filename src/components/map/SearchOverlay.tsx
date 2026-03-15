/**
 * SearchOverlay — Collapsible search bar + filter chips for the map screen.
 */

import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Theme } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { RADIUS, SHADOW } from '../../theme/spacing';
import { PlaceType } from '../../types/place';
import { FadeIn } from '../layout/FadeIn';
import { Icon } from '../ui/Icon';

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

interface SearchOverlayProps {
  topOffset: number;
  searchOpen: boolean;
  searchText: string;
  activeFilter: FilterKey;
  onSearchOpen: () => void;
  onSearchClose: () => void;
  onSearchChange: (text: string) => void;
  onFilterChange: (key: FilterKey) => void;
  C: Theme;
}

/** Search bar + filter chip row overlay for map. */
export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  topOffset,
  searchOpen,
  searchText,
  activeFilter,
  onSearchOpen,
  onSearchClose,
  onSearchChange,
  onFilterChange,
  C,
}) => (
  <>
    <View style={[styles.searchBar, { top: topOffset + 8 }]}>
      {searchOpen ? (
        <FadeIn
          style={[
            styles.searchExpanded,
            SHADOW.card,
            { backgroundColor: C.bgCard },
          ]}
        >
          <TouchableOpacity onPress={onSearchClose}>
            <Icon name="back" size={24} color={C.textPrimary} />
          </TouchableOpacity>
          <TextInput
            style={[styles.searchInput, { color: C.textPrimary }]}
            value={searchText}
            onChangeText={onSearchChange}
            placeholder={'\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48...'}
            placeholderTextColor={C.textSecondary}
            autoFocus
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => onSearchChange('')}>
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
          onPress={onSearchOpen}
        >
          <Icon name="search" size={20} color={C.textSecondary} />
          <Text style={[TYPOGRAPHY.body, { color: C.textSecondary }]}>
            {'\u0E04\u0E49\u0E19\u0E2B\u0E32\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48...'}
          </Text>
        </TouchableOpacity>
      )}
    </View>

    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.filterRow, { top: topOffset + 64 }]}
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
                activeFilter === f.key ? C.primary : `${C.border}50`,
            },
          ]}
          onPress={() => onFilterChange(f.key)}
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
  </>
);

/** Re-export FilterKey type for parent usage. */
export type { FilterKey };

const styles = StyleSheet.create({
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
});
