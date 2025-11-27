import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [routines, setRoutines] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [newRoutineName, setNewRoutineName] = useState('');

  useEffect(() => {
    loadUserData();
    loadRoutines();
  }, []);

  const loadUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('userEmail');
      if (email) {
        setUserEmail(email);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
    }
  };

  const loadRoutines = async () => {
    try {
      const storedRoutines = await AsyncStorage.getItem('routines');
      if (storedRoutines) {
        setRoutines(JSON.parse(storedRoutines));
      }
    } catch (error) {
      console.error('Erro ao carregar rotinas:', error);
    }
  };

  const saveRoutines = async (newRoutines) => {
    try {
      await AsyncStorage.setItem('routines', JSON.stringify(newRoutines));
      setRoutines(newRoutines);
    } catch (error) {
      console.error('Erro ao salvar rotinas:', error);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('isLoggedIn');
              await AsyncStorage.removeItem('userEmail');
              navigation.replace('Login');
            } catch (error) {
              console.error('Erro ao fazer logout:', error);
            }
          },
        },
      ]
    );
  };

  const addRoutine = () => {
    setModalVisible(true);
  };

  const handleAddRoutine = () => {
    if (newRoutineName && newRoutineName.trim()) {
      const newRoutine = {
        id: Date.now().toString(),
        name: newRoutineName.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
      };
      saveRoutines([...routines, newRoutine]);
      setNewRoutineName('');
      setModalVisible(false);
    } else {
      Alert.alert('Erro', 'Por favor, digite um nome para a rotina');
    }
  };

  const cancelAddRoutine = () => {
    setNewRoutineName('');
    setModalVisible(false);
  };

  const toggleRoutine = (id) => {
    const updatedRoutines = routines.map((routine) =>
      routine.id === id
        ? { ...routine, completed: !routine.completed }
        : routine
    );
    saveRoutines(updatedRoutines);
  };

  const deleteRoutine = (id) => {
    Alert.alert(
      'Excluir Rotina',
      'Tem certeza que deseja excluir esta rotina?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            const updatedRoutines = routines.filter((r) => r.id !== id);
            saveRoutines(updatedRoutines);
          },
        },
      ]
    );
  };

  const renderRoutine = ({ item }) => (
    <TouchableOpacity
      style={[styles.routineItem, item.completed && styles.routineItemCompleted]}
      onPress={() => toggleRoutine(item.id)}
      onLongPress={() => deleteRoutine(item.id)}
    >
      <View style={styles.routineContent}>
        <Text
          style={[
            styles.routineName,
            item.completed && styles.routineNameCompleted,
          ]}
        >
          {item.name}
        </Text>
        <Text style={styles.routineStatus}>
          {item.completed ? '✓ Concluída' : 'Pendente'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Bem-vindo!</Text>
          <Text style={styles.emailText}>{userEmail}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Minhas Rotinas</Text>
          <TouchableOpacity style={styles.addButton} onPress={addRoutine}>
            <Text style={styles.addButtonText}>+ Adicionar</Text>
          </TouchableOpacity>
        </View>

        {routines.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Nenhuma rotina cadastrada ainda.
            </Text>
            <Text style={styles.emptyStateSubtext}>
              Toque em "Adicionar" para criar sua primeira rotina!
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={cancelAddRoutine}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Rotina</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Digite o nome da rotina"
              value={newRoutineName}
              onChangeText={setNewRoutineName}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={cancelAddRoutine}
              >
                <Text style={styles.modalButtonTextCancel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonAdd]}
                onPress={handleAddRoutine}
              >
                <Text style={styles.modalButtonTextAdd}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  emailText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 5,
  },
  logoutButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    paddingBottom: 20,
  },
  routineItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  routineItemCompleted: {
    opacity: 0.7,
    borderLeftColor: '#999',
  },
  routineContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  routineName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  routineNameCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  routineStatus: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '80%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalButtonCancel: {
    backgroundColor: '#f5f5f5',
  },
  modalButtonAdd: {
    backgroundColor: '#4CAF50',
  },
  modalButtonTextCancel: {
    color: '#333',
    fontWeight: 'bold',
  },
  modalButtonTextAdd: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
