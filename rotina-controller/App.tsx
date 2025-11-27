import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/contexts/AuthContext';
import { RoutineProvider } from './src/contexts/RoutineContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <RoutineProvider>
            <StatusBar style="light" />
            <AppNavigator />
          </RoutineProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
