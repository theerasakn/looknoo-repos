/**
 * TopBar — Screen header with optional back button and right action.
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Theme } from '../../theme/colors';
import { TYPOGRAPHY } from '../../theme/typography';
import { MIN_TOUCH } from '../../theme/spacing';
import { Icon } from '../ui/Icon';

interface TopBarProps {
  title: string;
  onBack?: () => void;
  right?: React.ReactNode;
  C: Theme;
}

/** Screen top bar with safe area, back button, title, and right slot. */
export const TopBar: React.FC<TopBarProps> = ({
  title,
  onBack,
  right,
  C,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + 8,
          backgroundColor: C.bgCard,
          borderBottomColor: `${C.border}30`,
        },
      ]}
    >
      <View style={styles.row}>
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backBtn}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Icon name="back" size={24} color={C.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.spacer} />
        )}
        <Text
          style={[TYPOGRAPHY.h3, { color: C.textPrimary, flex: 1 }]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {right ?? <View style={styles.spacer} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: MIN_TOUCH,
  },
  backBtn: {
    width: MIN_TOUCH,
    height: MIN_TOUCH,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 4,
  },
  spacer: {
    width: MIN_TOUCH,
  },
});
