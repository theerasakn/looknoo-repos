/**
 * Web stub for react-native-gesture-handler.
 */

import React from 'react';
import { View } from 'react-native';

export const GestureHandlerRootView: React.FC<{
  children: React.ReactNode;
  style?: object;
}> = ({ children, style }) => <View style={style}>{children}</View>;

export const ScrollView = View;
export const TouchableOpacity = View;
