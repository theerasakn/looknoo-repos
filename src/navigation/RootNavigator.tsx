/**
 * RootNavigator — Switches between Auth stack and Main tabs.
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '../store/authStore';
import { AuthStackParamList } from './types';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import DogProfileScreen from '../screens/DogProfileScreen';
import BottomTabNavigator from './BottomTabNavigator';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

/** Root navigator that conditionally shows Auth or Main flow. */
export default function RootNavigator() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasCompletedOnboarding = useAuthStore(
    (s) => s.hasCompletedOnboarding,
  );

  return (
    <NavigationContainer>
      {isAuthenticated && hasCompletedOnboarding ? (
        <BottomTabNavigator />
      ) : (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="Splash" component={SplashScreen} />
          <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen
            name="DogProfile"
            component={DogProfileScreen}
          />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
}
