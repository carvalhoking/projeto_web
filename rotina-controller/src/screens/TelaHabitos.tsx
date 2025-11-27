import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useRoutines } from '../contexts/RoutineContext';
import { colors, categoryIcons } from '../theme/colors';
import { DayOfWeek, Routine } from '../types';

const DAYS: DayOfWeek[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const TelaHabitos: React.FC = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();
  const { getTodayRoutines, toggleComplete, getCompletedCount } = useRoutines();
  const [greeting, setGreeting] = useState('');
  const todayRoutines = getTodayRoutines();
  const completedCount = getCompletedCount();
  const totalRoutines = todayRoutines.length;
  const progress = totalRoutines > 0 ? (completedCount / totalRoutines) * 100 : 0;

  const today = new Date();
  const currentDayIndex = today.getDay();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Bom dia');
    } else if (hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  const getFormattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    };
    return today.toLocaleDateString('pt-BR', options);
  };

  const openRoutineDetails = (routine: Routine) => {
    navigation.navigate('TelaDetalhesHabito', { routineId: routine.id });
  };

  const renderRoutineCard = (routine: Routine) => {
    const iconName = categoryIcons[routine.category] || 'ellipse-outline';
    
    return (
      <TouchableOpacity
        key={routine.id}
        style={[styles.routineCard, routine.isCompleted && styles.routineCardCompleted]}
        onPress={() => openRoutineDetails(routine)}
        activeOpacity={0.7}
      >
        <View style={[styles.routineColorBar, { backgroundColor: routine.color }]} />
        
        <View style={styles.routineContent}>
          <View style={styles.routineHeader}>
            <View style={[styles.routineIconContainer, { backgroundColor: routine.color + '20' }]}>
              <Ionicons name={iconName as any} size={20} color={routine.color} />
            </View>
            <View style={styles.routineInfo}>
              <Text style={[styles.routineTitle, routine.isCompleted && styles.routineTitleCompleted]}>
                {routine.title}
              </Text>
              <Text style={styles.routineTime}>
                <Ionicons name="time-outline" size={12} color={colors.textMuted} /> {routine.time}
              </Text>
            </View>
          </View>
          
          {routine.description && (
            <Text style={styles.routineDescription} numberOfLines={2}>
              {routine.description}
            </Text>
          )}
          
          <View style={styles.routineDays}>
            {routine.days.map(day => (
              <View key={day} style={[styles.dayBadge, { backgroundColor: routine.color + '30' }]}>
                <Text style={[styles.dayBadgeText, { color: routine.color }]}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          style={styles.routineCheck}
          onPress={() => toggleComplete(routine.id)}
          activeOpacity={0.8}
        >
          <View style={[
            styles.checkbox,
            routine.isCompleted && { backgroundColor: colors.success, borderColor: colors.success }
          ]}>
            {routine.isCompleted && (
              <Ionicons name="checkmark" size={16} color={colors.text} />
            )}
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.backgroundLight]}
        style={styles.gradient}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.greeting}>{greeting},</Text>
              <Text style={styles.userName}>{user?.name || 'Usuário'} 👋</Text>
              <Text style={styles.date}>{getFormattedDate()}</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Ionicons name="notifications-outline" size={24} color={colors.text} />
              <View style={styles.notificationBadge} />
            </TouchableOpacity>
          </View>

          {/* Week Days */}
          <View style={styles.weekContainer}>
            {DAYS.map((day, index) => {
              const isToday = index === currentDayIndex;
              const dayDate = new Date();
              dayDate.setDate(today.getDate() - currentDayIndex + index);
              
              return (
                <View key={day} style={styles.dayItem}>
                  <Text style={[styles.dayName, isToday && styles.dayNameActive]}>
                    {day}
                  </Text>
                  <View style={[styles.dayNumber, isToday && styles.dayNumberActive]}>
                    <Text style={[styles.dayNumberText, isToday && styles.dayNumberTextActive]}>
                      {dayDate.getDate()}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Progress Card */}
          <LinearGradient
            colors={colors.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.progressCard}
          >
            <View style={styles.progressHeader}>
              <View>
                <Text style={styles.progressTitle}>Progresso de Hoje</Text>
                <Text style={styles.progressSubtitle}>
                  {completedCount} de {totalRoutines} rotinas concluídas
                </Text>
              </View>
              <View style={styles.progressCircle}>
                <Text style={styles.progressPercent}>{Math.round(progress)}%</Text>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            {progress === 100 && totalRoutines > 0 && (
              <View style={styles.celebrationBadge}>
                <Ionicons name="trophy" size={16} color={colors.warning} />
                <Text style={styles.celebrationText}>Parabéns! Dia completo! 🎉</Text>
              </View>
            )}
          </LinearGradient>

          {/* Routines Section */}
          <View style={styles.routinesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Rotinas de Hoje</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>Ver todas</Text>
              </TouchableOpacity>
            </View>

            {todayRoutines.length === 0 ? (
              <View style={styles.emptyState}>
                <View style={styles.emptyIcon}>
                  <Ionicons name="calendar-outline" size={48} color={colors.textMuted} />
                </View>
                <Text style={styles.emptyTitle}>Nenhuma rotina para hoje</Text>
                <Text style={styles.emptySubtitle}>
                  Adicione novas rotinas para organizar seu dia
                </Text>
              </View>
            ) : (
              <View style={styles.routinesList}>
                {todayRoutines.map(renderRoutineCard)}
              </View>
            )}
          </View>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <LinearGradient
                colors={[colors.success + '20', colors.success + '10']}
                style={styles.statGradient}
              >
                <Ionicons name="checkmark-circle" size={28} color={colors.success} />
                <Text style={styles.statNumber}>{completedCount}</Text>
                <Text style={styles.statLabel}>Concluídas</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={[colors.warning + '20', colors.warning + '10']}
                style={styles.statGradient}
              >
                <Ionicons name="hourglass" size={28} color={colors.warning} />
                <Text style={styles.statNumber}>{totalRoutines - completedCount}</Text>
                <Text style={styles.statLabel}>Pendentes</Text>
              </LinearGradient>
            </View>
            <View style={styles.statCard}>
              <LinearGradient
                colors={[colors.primary + '20', colors.primary + '10']}
                style={styles.statGradient}
              >
                <Ionicons name="flame" size={28} color={colors.primary} />
                <Text style={styles.statNumber}>7</Text>
                <Text style={styles.statLabel}>Sequência</Text>
              </LinearGradient>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '400',
  },
  userName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
    marginTop: 2,
  },
  date: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  notificationBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayItem: {
    alignItems: 'center',
    flex: 1,
  },
  dayName: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
    fontWeight: '500',
  },
  dayNameActive: {
    color: colors.primary,
  },
  dayNumber: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayNumberActive: {
    backgroundColor: colors.primary,
  },
  dayNumberText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  dayNumberTextActive: {
    color: colors.text,
  },
  progressCard: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 25,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  progressSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.text,
    borderRadius: 4,
  },
  celebrationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 10,
    gap: 6,
  },
  celebrationText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  routinesSection: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  routinesList: {
    gap: 12,
  },
  routineCard: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  routineCardCompleted: {
    opacity: 0.7,
  },
  routineColorBar: {
    width: 4,
  },
  routineContent: {
    flex: 1,
    padding: 16,
  },
  routineHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  routineIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routineInfo: {
    flex: 1,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  routineTitleCompleted: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  routineTime: {
    fontSize: 12,
    color: colors.textMuted,
  },
  routineDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 10,
    lineHeight: 18,
  },
  routineDays: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  dayBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  dayBadgeText: {
    fontSize: 10,
    fontWeight: '600',
  },
  routineCheck: {
    justifyContent: 'center',
    paddingRight: 16,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  statGradient: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
