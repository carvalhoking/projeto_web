import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

export const TelaInicial: React.FC = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('TelaLogin');
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <LinearGradient colors={[colors.background, colors.backgroundLight]} style={styles.container}>
      <View style={styles.logoWrapper}>
        <LinearGradient colors={colors.gradients.primary} style={styles.logo}>
          <Ionicons name="calendar-outline" size={56} color={colors.text} />
        </LinearGradient>
        <Text style={styles.title}>Rotina Controller</Text>
        <Text style={styles.subtitle}>Cuide dos seus hábitos diariamente</Text>
      </View>

      <View style={styles.footer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Preparando sua experiência...</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 48,
  },
  logoWrapper: {
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});
