/**
 * BottomTabNavigator — Main app tabs after authentication.
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { MainTabParamList } from './types';
import { useTheme } from '../theme';
import { Icon, IconName } from '../components/ui/Icon';
import HomeMapScreen from '../screens/HomeMapScreen';
import SearchScreen from '../screens/SearchScreen';
import TripScreen from '../screens/TripScreen';
import ReviewScreen from '../screens/ReviewScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

const TAB_ICONS: Record<keyof MainTabParamList, IconName> = {
  HomeMap: 'map',
  Search: 'search',
  Trip: 'explore',
  Review: 'review',
  Profile: 'person',
};

const TAB_LABELS: Record<keyof MainTabParamList, string> = {
  HomeMap: '\u0E41\u0E1C\u0E19\u0E17\u0E35\u0E48',
  Search: '\u0E04\u0E49\u0E19\u0E2B\u0E32',
  Trip: '\u0E17\u0E23\u0E34\u0E1B',
  Review: '\u0E23\u0E35\u0E27\u0E34\u0E27',
  Profile: '\u0E42\u0E1B\u0E23\u0E44\u0E1F\u0E25\u0E4C',
};

/** Main bottom tab navigator with 5 tabs. */
export default function BottomTabNavigator() {
  const C = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            {focused && (
              <View
                style={[styles.indicator, { backgroundColor: C.primary }]}
              />
            )}
            <Icon
              name={TAB_ICONS[route.name]}
              size={24}
              color={focused ? C.primary : C.textSecondary}
            />
          </View>
        ),
        tabBarLabel: TAB_LABELS[route.name],
        tabBarActiveTintColor: C.primary,
        tabBarInactiveTintColor: C.textSecondary,
        tabBarStyle: {
          backgroundColor: C.bgCard,
          borderTopColor: `${C.border}30`,
        },
      })}
    >
      <Tab.Screen name="HomeMap" component={HomeMapScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Trip" component={TripScreen} />
      <Tab.Screen name="Review" component={ReviewScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
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
