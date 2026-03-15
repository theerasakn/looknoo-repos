/**
 * Web stub for @react-navigation/native-stack.
 * Provides a minimal stack navigator using @react-navigation/core directly,
 * avoiding @react-navigation/stack which uses CJS require() for native modules.
 */

import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';

interface ScreenConfig {
  name: string;
  component: React.ComponentType<Record<string, unknown>>;
}

interface ScreenProps {
  name: string;
  component: React.ComponentType<Record<string, unknown>>;
}

interface NavigatorProps {
  screenOptions?: Record<string, unknown>;
  children: React.ReactNode;
}

interface NavigationProp {
  navigate: (name: string, params?: Record<string, unknown>) => void;
  goBack: () => void;
  replace: (name: string, params?: Record<string, unknown>) => void;
  reset: (state: { index: number; routes: Array<{ name: string; params?: Record<string, unknown> }> }) => void;
}

interface RouteProp {
  name: string;
  params?: Record<string, unknown>;
}

/** Minimal Screen placeholder — used only for config extraction. */
function Screen(_props: ScreenProps): React.ReactElement | null {
  return null;
}

/** Minimal stack navigator for web. */
function Navigator({ children, screenOptions: _screenOptions }: NavigatorProps): React.ReactElement {
  const screens: ScreenConfig[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement<ScreenProps>(child) && child.props.name) {
      screens.push({
        name: child.props.name,
        component: child.props.component,
      });
    }
  });

  const [stack, setStack] = useState<Array<{ name: string; params?: Record<string, unknown> }>>([
    { name: screens[0]?.name ?? '' },
  ]);

  const currentEntry = stack[stack.length - 1];
  const currentScreen = screens.find((s) => s.name === currentEntry?.name);

  const navigation: NavigationProp = useCallback(() => ({
    navigate: (name: string, params?: Record<string, unknown>) => {
      setStack((prev) => [...prev, { name, params }]);
    },
    goBack: () => {
      setStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
    },
    replace: (name: string, params?: Record<string, unknown>) => {
      setStack((prev) => [...prev.slice(0, -1), { name, params }]);
    },
    reset: (state: { index: number; routes: Array<{ name: string; params?: Record<string, unknown> }> }) => {
      setStack(state.routes);
    },
  }), [])();

  const route: RouteProp = {
    name: currentEntry?.name ?? '',
    params: currentEntry?.params,
  };

  if (!currentScreen) {
    return <View style={styles.container} />;
  }

  const ActiveComponent = currentScreen.component;

  return (
    <View style={styles.container}>
      <ActiveComponent navigation={navigation} route={route} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

/** Creates a minimal native stack navigator for web. */
export function createNativeStackNavigator() {
  return {
    Navigator,
    Screen,
  };
}
