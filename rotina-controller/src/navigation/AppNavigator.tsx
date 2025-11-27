import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import RoutineFormScreen from '../screens/RoutineFormScreen';
import { useAuth } from '../context/AuthContext';
import { AppStackParamList, AuthStackParamList } from '../types/navigation';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainStack = createNativeStackNavigator<AppStackParamList>();

const LoadingScreen = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#0f172a" />
    <Text style={styles.loaderText}>Preparando seu app...</Text>
  </View>
);

const AuthenticatedStack = () => (
  <MainStack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#f5f6fb' },
      headerTitleStyle: { fontWeight: '600' },
      headerShadowVisible: false,
    }}
  >
    <MainStack.Screen
      name="Dashboard"
      component={DashboardScreen}
      options={{
        headerShown: false,
      }}
    />
    <MainStack.Screen
      name="RoutineForm"
      component={RoutineFormScreen}
      options={{
        title: 'Nova atividade',
      }}
    />
  </MainStack.Navigator>
);

const UnauthenticatedStack = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

const AppNavigator = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>{user ? <AuthenticatedStack /> : <UnauthenticatedStack />}</NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  loaderText: {
    marginTop: 12,
    color: '#1f2d3d',
  },
});

export default AppNavigator;
