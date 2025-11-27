import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { RoutineProvider } from './src/context/RoutineContext';

export default function App() {
  return (
    <AuthProvider>
      <RoutineProvider>
        <AppNavigator />
      </RoutineProvider>
    </AuthProvider>
  );
}
