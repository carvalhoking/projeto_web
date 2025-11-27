import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RoutineCard } from '../components/RoutineCard';
import { EmptyState } from '../components/EmptyState';
import { useAuth } from '../context/AuthContext';
import { useRoutine } from '../context/RoutineContext';
import { AppStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<AppStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { routines, stats, toggleRoutine } = useRoutine();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <RoutineCard routine={item} onToggle={() => toggleRoutine(item.id)} />
        )}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View>
                <Text style={styles.welcome}>Olá, {user?.name ?? 'organizador(a)'}</Text>
                <Text style={styles.title}>Sua rotina de hoje</Text>
              </View>
              <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Text style={styles.logoutText}>Sair</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.statsRow}>
              <View style={[styles.statCard, styles.primaryStat]}>
                <Text style={[styles.statLabel, styles.primaryStatText]}>Concluídas</Text>
                <Text style={[styles.statValue, styles.primaryStatText]}>{stats.completed}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Pendentes</Text>
                <Text style={styles.statValue}>{stats.pending}</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>Total</Text>
                <Text style={styles.statValue}>{stats.total}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('RoutineForm')}
            >
              <Text style={styles.addButtonText}>Nova atividade</Text>
            </TouchableOpacity>
          </>
        }
        ListEmptyComponent={<EmptyState message="Adicione sua primeira atividade do dia." />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6fb',
  },
  listContent: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 16,
    color: '#607087',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2d3d',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  logoutText: {
    color: '#1f2d3d',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  primaryStat: {
    backgroundColor: '#38bdf8',
  },
  primaryStatText: {
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 14,
    color: '#607087',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2d3d',
  },
  addButton: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#f8fafc',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default DashboardScreen;
