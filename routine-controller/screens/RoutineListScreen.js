import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { getRoutines, deleteRoutine } from '../utils/auth';

export default function RoutineListScreen({ navigation }) {
  const [routines, setRoutines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRoutines();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadRoutines();
    });
    return unsubscribe;
  }, [navigation]);

  const loadRoutines = async () => {
    setLoading(true);
    const data = await getRoutines();
    setRoutines(data);
    setLoading(false);
  };

  const handleDelete = (routineId, routineTitle) => {
    Alert.alert(
      'Excluir Rotina',
      `Deseja realmente excluir "${routineTitle}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const result = await deleteRoutine(routineId);
            if (result.success) {
              loadRoutines();
            } else {
              Alert.alert('Erro', 'Falha ao excluir rotina');
            }
          },
        },
      ]
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const renderRoutine = ({ item }) => (
    <View style={styles.routineCard}>
      <View style={styles.routineContent}>
        <Text style={styles.routineTitle}>{item.title}</Text>
        {item.description ? (
          <Text style={styles.routineDescription}>{item.description}</Text>
        ) : null}
        <View style={styles.routineInfo}>
          {item.time ? (
            <Text style={styles.routineTime}>🕐 {item.time}</Text>
          ) : null}
          <Text style={styles.routineDate}>
            Criado em {formatDate(item.createdAt)}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id, item.title)}
      >
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Voltar</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Minhas Rotinas</Text>
          <View style={{ width: 60 }} />
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minhas Rotinas</Text>
        <View style={{ width: 60 }} />
      </View>

      {routines.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📋</Text>
          <Text style={styles.emptyText}>Nenhuma rotina cadastrada</Text>
          <Text style={styles.emptySubtext}>
            Adicione uma nova rotina para começar
          </Text>
        </View>
      ) : (
        <FlatList
          data={routines}
          renderItem={renderRoutine}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  list: {
    padding: 20,
  },
  routineCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routineContent: {
    flex: 1,
  },
  routineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  routineDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  routineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routineTime: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  routineDate: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
