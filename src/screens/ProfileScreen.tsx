/**
 * ProfileScreen — User info, dark mode toggle, dog card, and menu.
 */

import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../theme';
import { TYPOGRAPHY } from '../theme/typography';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { useDogStore } from '../store/dogStore';
import { FadeIn } from '../components/layout/FadeIn';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Toggle } from '../components/ui/Toggle';
import { Icon } from '../components/ui/Icon';

/** Profile screen with user info, dark mode, and dog card. */
export default function ProfileScreen() {
  const C = useTheme();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const isDark = useThemeStore((s) => s.isDark);
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const dogs = useDogStore((s) => s.dogs);
  const firstDog = dogs[0];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: C.bgGray }]}
      contentContainerStyle={styles.content}
    >
      {/* User card */}
      <FadeIn>
        <Card C={C} style={styles.userCard}>
          {user?.picture ? (
            <Image
              source={{ uri: user.picture }}
              style={styles.avatar}
            />
          ) : (
            <View
              style={[
                styles.avatar,
                styles.avatarPlaceholder,
                { backgroundColor: C.primaryLight },
              ]}
            >
              <Icon name="person" size={32} color={C.primary} />
            </View>
          )}
          <Text style={[TYPOGRAPHY.h3, { color: C.textPrimary }]}>
            {user?.name ?? 'Guest'}
          </Text>
          <Text style={[TYPOGRAPHY.caption, { color: C.textSecondary }]}>
            {user?.email ?? ''}
          </Text>
        </Card>
      </FadeIn>

      {/* Dark mode toggle */}
      <FadeIn delay={100}>
        <Card C={C}>
          <View style={styles.settingRow}>
            <Icon
              name={isDark ? 'moon' : 'sun'}
              size={22}
              color={C.textPrimary}
            />
            <Text
              style={[
                TYPOGRAPHY.body,
                { color: C.textPrimary, flex: 1, marginLeft: 12 },
              ]}
            >
              {'\u0E42\u0E2B\u0E21\u0E14\u0E21\u0E37\u0E14'}
            </Text>
            <Toggle on={isDark} onToggle={toggleTheme} C={C} />
          </View>
        </Card>
      </FadeIn>

      {/* Dog card */}
      {firstDog && (
        <FadeIn delay={200}>
          <Card C={C} style={styles.dogCard}>
            <Text style={[TYPOGRAPHY.h3, { color: C.textPrimary }]}>
              {'\uD83D\uDC3E '}{firstDog.name}
            </Text>
            <View style={styles.dogInfo}>
              {firstDog.breed && (
                <Text
                  style={[TYPOGRAPHY.body, { color: C.textSecondary }]}
                >
                  {firstDog.breed}
                </Text>
              )}
              <Badge
                text={`\u0E02\u0E19\u0E32\u0E14 ${firstDog.size}`}
                C={C}
              />
              <Badge
                text={
                  firstDog.vaccineComplete
                    ? '\u0E27\u0E31\u0E04\u0E0B\u0E35\u0E19\u0E04\u0E23\u0E1A'
                    : '\u0E22\u0E31\u0E07\u0E44\u0E21\u0E48\u0E04\u0E23\u0E1A'
                }
                color={firstDog.vaccineComplete ? C.secondary : C.orange}
                C={C}
              />
            </View>
          </Card>
        </FadeIn>
      )}

      {/* Menu items */}
      <FadeIn delay={300}>
        <Card C={C}>
          {[
            { icon: 'bookmark' as const, label: '\u0E2A\u0E16\u0E32\u0E19\u0E17\u0E35\u0E48\u0E17\u0E35\u0E48\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01' },
            { icon: 'clock' as const, label: '\u0E1B\u0E23\u0E30\u0E27\u0E31\u0E15\u0E34\u0E01\u0E32\u0E23\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19' },
            { icon: 'share' as const, label: '\u0E41\u0E0A\u0E23\u0E4C\u0E41\u0E2D\u0E1B' },
          ].map((item) => (
            <TouchableOpacity key={item.label} style={styles.menuRow}>
              <Icon name={item.icon} size={20} color={C.textSecondary} />
              <Text
                style={[
                  TYPOGRAPHY.body,
                  { color: C.textPrimary, flex: 1, marginLeft: 12 },
                ]}
              >
                {item.label}
              </Text>
              <Icon name="skip" size={16} color={C.textSecondary} />
            </TouchableOpacity>
          ))}
        </Card>
      </FadeIn>

      {/* Logout */}
      <FadeIn delay={400}>
        <Btn variant="outline" full onPress={logout} C={C} icon="back">
          {'\u0E2D\u0E2D\u0E01\u0E08\u0E32\u0E01\u0E23\u0E30\u0E1A\u0E1A'}
        </Btn>
      </FadeIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, gap: 16 },
  userCard: { alignItems: 'center', gap: 8 },
  avatar: { width: 80, height: 80, borderRadius: 40 },
  avatarPlaceholder: { justifyContent: 'center', alignItems: 'center' },
  settingRow: { flexDirection: 'row', alignItems: 'center' },
  dogCard: { gap: 8 },
  dogInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  Btn: {},
});
