/**
 * BottomNav — 5-tab bottom navigation with animated active indicator.
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { MIN_TOUCH } from '../../theme/spacing';
import { Icon, IconName } from '../ui/Icon';

type TabKey = 'map' | 'search' | 'explore' | 'review' | 'person';

interface Tab {
  key: TabKey;
  label: string;
  icon: IconName;
}

const TABS: Tab[] = [
  { key: 'map', label: '\u0E41\u0E1C\u0E19\u0E17\u0E35\u0E48', icon: 'map' },
  { key: 'search', label: '\u0E04\u0E49\u0E19\u0E2B\u0E32', icon: 'search' },
  { key: 'explore', label: '\u0E17\u0E23\u0E34\u0E1B', icon: 'explore' },
  { key: 'review', label: '\u0E23\u0E35\u0E27\u0E34\u0E27', icon: 'review' },
  { key: 'person', label: '\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C', icon: 'person' },
];

interface BottomNavProps {
  active: TabKey;
  onNav: (tab: TabKey) => void;
  C: Theme;
}

/** 5-tab bottom navigation bar with active indicator bar. */
export const BottomNav: React.FC<BottomNavProps> = ({
  active,
  onNav,
  C,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom + 4,
          backgroundColor: C.bgCard,
          borderTopColor: `${C.border}30`,
        },
      ]}
    >
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => onNav(tab.key)}
            activeOpacity={0.7}
          >
            {isActive && (
              <View
                style={[
                  styles.indicator,
                  { backgroundColor: C.primary },
                ]}
              />
            )}
            <Icon
              name={tab.icon}
              size={24}
              color={isActive ? C.primary : C.textSecondary}
            />
            <Text
              style={[
                TYPOGRAPHY.caption,
                {
                  color: isActive ? C.primary : C.textSecondary,
                  marginTop: 2,
                },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 6,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: MIN_TOUCH,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: -10,
    width: 24,
    height: 3,
    borderRadius: 1.5,
  },
});
