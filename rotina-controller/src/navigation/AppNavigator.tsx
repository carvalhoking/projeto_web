import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  AddRoutineScreen,
  ProfileScreen,
} from '../screens';
import { colors } from '../theme/colors';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  AddRoutine: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  AddRoutineModal: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const isAddButton = route.name === 'AddRoutine';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let iconName: keyof typeof Ionicons.glyphMap = 'home-outline';
          if (route.name === 'Home') {
            iconName = isFocused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = isFocused ? 'person' : 'person-outline';
          } else if (route.name === 'AddRoutine') {
            iconName = 'add';
          }

          if (isAddButton) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.addButtonContainer}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.primary}
                  style={styles.addButton}
                >
                  <Ionicons name="add" size={28} color={colors.text} />
                </LinearGradient>
              </TouchableOpacity>
            );
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabItem}
              activeOpacity={0.7}
            >
              <View style={[styles.tabIconContainer, isFocused && styles.tabIconContainerActive]}>
                <Ionicons
                  name={iconName}
                  size={24}
                  color={isFocused ? colors.primary : colors.textMuted}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="AddRoutine" component={AddRoutineScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="MainTabs" component={MainTabs} />
      <RootStack.Screen
        name="AddRoutineModal"
        component={AddRoutineScreen}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </RootStack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LinearGradient
          colors={[colors.background, colors.backgroundLight]}
          style={styles.loadingGradient}
        >
          <LinearGradient
            colors={colors.gradients.primary}
            style={styles.loadingLogo}
          >
            <Ionicons name="calendar-outline" size={48} color={colors.text} />
          </LinearGradient>
        </LinearGradient>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
  },
  loadingGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingLogo: {
    width: 100,
    height: 100,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 30 : 16,
    backgroundColor: 'transparent',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    borderRadius: 24,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 12,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconContainerActive: {
    backgroundColor: colors.primary + '20',
  },
  addButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
});
