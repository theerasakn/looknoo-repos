/**
 * Web stub for react-native-safe-area-context.
 */

import React from 'react';
import { View } from 'react-native';

export function useSafeAreaInsets() {
  return { top: 0, bottom: 0, left: 0, right: 0 };
}

export const SafeAreaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <View style={{ flex: 1 }}>{children}</View>;

export const SafeAreaView = View;
