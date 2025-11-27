import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useRoutines } from '../contexts/RoutineContext';
import AddRoutineModal from '../components/AddRoutineModal';
import RoutineItem from '../components/RoutineItem';

export default function HomeScreen() {
  const { user, signOut } = useAuth();
  const { routines } = useRoutines();
  const [modalVisible, setModalVisible] = useState(false);

  const completedCount = routines.filter(r => r.completed).length;
  const totalCount = routines.length;

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>Olá!</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>
      
      <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
        <MaterialIcons name="logout" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <MaterialIcons name="check-circle" size={32} color="#00B894" />
        <Text style={styles.statNumber}>{completedCount}</Text>
        <Text style={styles.statLabel}>Concluídas</Text>
      </View>
      
      <View style={styles.statCard}>
        <MaterialIcons name="pending-actions" size={32} color="#6C5CE7" />
        <Text style={styles.statNumber}>{totalCount - completedCount}</Text>
        <Text style={styles.statLabel}>Pendentes</Text>
      </View>
      
      <View style={styles.statCard}>
        <MaterialIcons name="event-note" size={32} color="#0984E3" />
        <Text style={styles.statNumber}>{totalCount}</Text>
        <Text style={styles.statLabel}>Total</Text>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="event-available" size={80} color="#DFE6E9" />
      <Text style={styles.emptyTitle}>Nenhuma rotina ainda</Text>
      <Text style={styles.emptyText}>
        Comece adicionando sua primeira rotina diária!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      {renderHeader()}
      {renderStats()}

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>Minhas Rotinas</Text>
        <Text style={styles.sectionSubtitle}>
          {totalCount === 0 ? 'Comece agora!' : `${totalCount} rotina${totalCount !== 1 ? 's' : ''} cadastrada${totalCount !== 1 ? 's' : ''}`}
        </Text>
      </View>

      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RoutineItem routine={item} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={renderEmptyList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={32} color="#FFF" />
      </TouchableOpacity>

      <AddRoutineModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  userEmail: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 4,
  },
  logoutButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3436',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#636E72',
    marginTop: 4,
  },
  listHeader: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 4,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D3436',
    marginTop: 16,
  },
  emptyText: {
    fontSize: 14,
    color: '#636E72',
    marginTop: 8,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6C5CE7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});
