import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Routine } from '../context/RoutineContext';

interface Props {
  routine: Routine;
  onToggle: () => void;
}

const focusAreaColors: Record<Routine['focusArea'], string> = {
  'Bem-estar': '#F8C291',
  'Profissional': '#82ccdd',
  'Pessoal': '#b8e994',
  'Saúde': '#ffcccc',
};

export const RoutineCard: React.FC<Props> = ({ routine, onToggle }) => {
  const badgeColor = focusAreaColors[routine.focusArea];

  return (
    <TouchableOpacity
      onPress={onToggle}
      style={[styles.card, routine.completed && styles.cardCompleted]}
      accessibilityLabel={`Atividade ${routine.title}`}
      accessibilityHint="Toque para alternar o status da atividade"
    >
      <View style={styles.header}>
        <Text style={styles.time}>{routine.time}</Text>
        <View style={[styles.badge, { backgroundColor: badgeColor }]}>
          <Text style={styles.badgeText}>{routine.focusArea}</Text>
        </View>
      </View>
      <Text style={styles.title}>{routine.title}</Text>
      <Text style={styles.description}>{routine.description}</Text>
      <Text style={[styles.status, routine.completed && styles.statusCompleted]}>
        {routine.completed ? 'Concluída' : 'Em andamento'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardCompleted: {
    opacity: 0.6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  time: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2d3d',
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 13,
    color: '#1f2d3d',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2d3d',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#607087',
    marginBottom: 12,
  },
  status: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff9f43',
  },
  statusCompleted: {
    color: '#2ecc71',
  },
});
