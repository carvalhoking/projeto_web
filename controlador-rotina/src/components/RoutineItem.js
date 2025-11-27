import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoutines } from '../contexts/RoutineContext';

export default function RoutineItem({ routine }) {
  const { toggleRoutine, deleteRoutine } = useRoutines();

  const handleDelete = () => {
    Alert.alert(
      'Excluir Rotina',
      'Tem certeza que deseja excluir esta rotina?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteRoutine(routine.id),
        },
      ]
    );
  };

  const getTimeIcon = () => {
    switch (routine.time) {
      case 'morning':
        return 'wb-sunny';
      case 'afternoon':
        return 'wb-cloudy';
      case 'evening':
        return 'nights-stay';
      default:
        return 'schedule';
    }
  };

  const getTimeLabel = () => {
    switch (routine.time) {
      case 'morning':
        return 'Manhã';
      case 'afternoon':
        return 'Tarde';
      case 'evening':
        return 'Noite';
      default:
        return 'Dia todo';
    }
  };

  const getCategoryColor = () => {
    switch (routine.category) {
      case 'work':
        return '#0984E3';
      case 'health':
        return '#00B894';
      case 'personal':
        return '#6C5CE7';
      case 'study':
        return '#FDCB6E';
      default:
        return '#636E72';
    }
  };

  const getCategoryLabel = () => {
    switch (routine.category) {
      case 'work':
        return 'Trabalho';
      case 'health':
        return 'Saúde';
      case 'personal':
        return 'Pessoal';
      case 'study':
        return 'Estudo';
      default:
        return 'Outro';
    }
  };

  return (
    <View style={[styles.container, routine.completed && styles.completedContainer]}>
      <TouchableOpacity
        onPress={() => toggleRoutine(routine.id)}
        style={styles.checkbox}
      >
        <MaterialIcons
          name={routine.completed ? 'check-box' : 'check-box-outline-blank'}
          size={28}
          color={routine.completed ? '#00B894' : '#B2BEC3'}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, routine.completed && styles.completedText]}>
          {routine.title}
        </Text>
        
        {routine.description ? (
          <Text style={[styles.description, routine.completed && styles.completedText]}>
            {routine.description}
          </Text>
        ) : null}

        <View style={styles.tagsContainer}>
          <View style={[styles.tag, { backgroundColor: getCategoryColor() + '20' }]}>
            <Text style={[styles.tagText, { color: getCategoryColor() }]}>
              {getCategoryLabel()}
            </Text>
          </View>

          <View style={styles.timeTag}>
            <MaterialIcons
              name={getTimeIcon()}
              size={14}
              color="#636E72"
            />
            <Text style={styles.timeText}>{getTimeLabel()}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <MaterialIcons name="delete-outline" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  completedContainer: {
    opacity: 0.6,
  },
  checkbox: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#636E72',
  },
  description: {
    fontSize: 14,
    color: '#636E72',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#636E72',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
});
