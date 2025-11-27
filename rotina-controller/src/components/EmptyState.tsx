import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Props {
  message: string;
}

export const EmptyState: React.FC<Props> = ({ message }) => (
  <View style={styles.container}>
    <Text style={styles.emoji}>🗓️</Text>
    <Text style={styles.title}>Nada por aqui ainda</Text>
    <Text style={styles.message}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2d3d',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: '#607087',
    textAlign: 'center',
    paddingHorizontal: 24,
  },
});
