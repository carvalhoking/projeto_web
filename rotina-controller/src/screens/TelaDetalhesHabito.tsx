import React, { useMemo, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../contexts/RoutineContext';
import { colors } from '../theme/colors';
import { DayOfWeek, RoutineCategory, CategoryInfo } from '../types';

const DAYS: DayOfWeek[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const CATEGORIES: CategoryInfo[] = [
  { name: 'exercício', icon: 'fitness-outline', color: colors.categories.exercício },
  { name: 'trabalho', icon: 'briefcase-outline', color: colors.categories.trabalho },
  { name: 'estudo', icon: 'book-outline', color: colors.categories.estudo },
  { name: 'saúde', icon: 'heart-outline', color: colors.categories.saúde },
  { name: 'lazer', icon: 'game-controller-outline', color: colors.categories.lazer },
  { name: 'alimentação', icon: 'restaurant-outline', color: colors.categories.alimentação },
  { name: 'sono', icon: 'moon-outline', color: colors.categories.sono },
  { name: 'outros', icon: 'ellipsis-horizontal-outline', color: colors.categories.outros },
];

export const TelaDetalhesHabito: React.FC = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();
  const { routines, updateRoutine, deleteRoutine, toggleComplete } = useRoutines();
  const routine = routines.find(r => r.id === params?.routineId);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('08:00');
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<RoutineCategory>('outros');

  useEffect(() => {
    if (routine) {
      setTitle(routine.title);
      setDescription(routine.description);
      setTime(routine.time);
      setSelectedDays(routine.days);
      setSelectedCategory(routine.category);
    }
  }, [routine]);

  const weekHistory = useMemo(() => {
    const today = new Date();
    const todayIndex = today.getDay();

    return Array.from({ length: 7 }).map((_, idx) => {
      const date = new Date();
      date.setDate(today.getDate() - (6 - idx));
      const weekday = DAYS[date.getDay()];
      const isToday = date.getDay() === todayIndex;
      const isScheduled = routine?.days.includes(weekday) ?? false;
      const isCompleted = isToday ? routine?.isCompleted ?? false : false;

      return {
        weekday,
        dateNumber: date.getDate(),
        isToday,
        isScheduled,
        isCompleted,
      };
    });
  }, [routine]);

  const toggleDay = (day: DayOfWeek) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(item => item !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSaveChanges = async () => {
    if (!routine) return;

    if (!title.trim()) {
      Alert.alert('Validação', 'O título é obrigatório.');
      return;
    }

    if (!time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      Alert.alert('Validação', 'Horário inválido. Use o formato HH:MM.');
      return;
    }

    await updateRoutine(routine.id, {
      title: title.trim(),
      description: description.trim(),
      time,
      days: selectedDays,
      category: selectedCategory,
      color: colors.categories[selectedCategory],
    });

    Alert.alert('Sucesso', 'Hábito atualizado com sucesso!');
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (!routine) return;

    Alert.alert(
      'Excluir hábito',
      'Tem certeza que deseja excluir este hábito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteRoutine(routine.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  const handleToggleComplete = () => {
    if (!routine) return;
    toggleComplete(routine.id);
  };

  if (!routine) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Hábito não encontrado</Text>
        <Text style={styles.emptySubtitle}>O item pode ter sido removido.</Text>
        <TouchableOpacity style={styles.emptyButton} onPress={() => navigation.goBack()}>
          <Text style={styles.emptyButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do hábito</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
          <Ionicons name={isEditing ? 'close' : 'create-outline'} size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={colors.gradients.card}
        style={[styles.card, { borderColor: routine.color }]}
      >
        <View style={[styles.iconWrapper, { backgroundColor: routine.color + '25' }]}>
          <Ionicons name="repeat" size={24} color={routine.color} />
        </View>
        <Text style={styles.title}>{routine.title}</Text>
        <Text style={styles.subtitle}>{routine.description || 'Sem descrição'}</Text>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={18} color={colors.textSecondary} />
          <Text style={styles.infoText}>{routine.time}</Text>
        </View>

        <View style={styles.daysList}>
          {DAYS.map(day => {
            const isSelected = routine.days.includes(day);
            return (
              <View
                key={day}
                style={[
                  styles.dayPill,
                  isSelected && { backgroundColor: routine.color + '30', borderColor: routine.color },
                ]}
              >
                <Text
                  style={[
                    styles.dayPillText,
                    isSelected && { color: routine.color, fontWeight: '700' },
                  ]}
                >
                  {day}
                </Text>
              </View>
            );
          })}
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Histórico semanal</Text>
          <Ionicons name="calendar-outline" size={18} color={colors.textSecondary} />
        </View>

        <View style={styles.historyList}>
          {weekHistory.map(item => (
            <View
              key={`${item.weekday}-${item.dateNumber}`}
              style={[
                styles.historyItem,
                item.isToday && styles.historyToday,
                item.isCompleted && styles.historyCompleted,
              ]}
            >
              <Text style={[
                styles.historyWeekday,
                item.isToday && styles.historyWeekdayToday,
              ]}>
                {item.weekday}
              </Text>
              <Text style={styles.historyDate}>{item.dateNumber}</Text>
              <Ionicons
                name={item.isCompleted ? 'checkmark-circle' : item.isScheduled ? 'radio-button-on' : 'ellipse-outline'}
                size={18}
                color={
                  item.isCompleted
                    ? colors.success
                    : item.isScheduled
                      ? colors.primary
                      : colors.textMuted
                }
              />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleToggleComplete}>
          <Ionicons
            name={routine.isCompleted ? 'checkmark-done' : 'checkmark-circle-outline'}
            size={20}
            color={colors.text}
          />
          <Text style={styles.primaryButtonText}>
            {routine.isCompleted ? 'Marcar como pendente' : 'Concluir hoje'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Ionicons name="trash-outline" size={20} color={colors.error} />
          <Text style={styles.deleteButtonText}>Excluir hábito</Text>
        </TouchableOpacity>
      </View>

      {isEditing && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Editar hábito</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="create-outline" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor={colors.textMuted}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <View style={[styles.inputContainer, styles.multiline]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição"
              placeholderTextColor={colors.textMuted}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="time-outline" size={20} color={colors.textSecondary} />
            <TextInput
              style={styles.input}
              placeholder="08:00"
              placeholderTextColor={colors.textMuted}
              value={time}
              onChangeText={setTime}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>

          <Text style={styles.helperLabel}>Dias ativos</Text>
          <View style={styles.editDaysContainer}>
            {DAYS.map(day => {
              const isSelected = selectedDays.includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.editDay,
                    isSelected && { backgroundColor: colors.primary, borderColor: colors.primary },
                  ]}
                  onPress={() => toggleDay(day)}
                >
                  <Text
                    style={[
                      styles.editDayText,
                      isSelected && { color: colors.text, fontWeight: '700' },
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={styles.helperLabel}>Categoria</Text>
          <View style={styles.categories}>
            {CATEGORIES.map(category => {
              const isSelected = selectedCategory === category.name;
              return (
                <TouchableOpacity
                  key={category.name}
                  style={[
                    styles.category,
                    isSelected && { borderColor: category.color, backgroundColor: category.color + '20' },
                  ]}
                  onPress={() => setSelectedCategory(category.name)}
                >
                  <Ionicons
                    name={category.icon as any}
                    size={20}
                    color={isSelected ? category.color : colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && { color: category.color, fontWeight: '600' },
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
            <Text style={styles.saveButtonText}>Salvar alterações</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingTop: 60,
    paddingBottom: 80,
    paddingHorizontal: 20,
    gap: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundCard,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    gap: 12,
  },
  iconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  daysList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayPill: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dayPillText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  section: {
    backgroundColor: colors.backgroundCard,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  historyList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyItem: {
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    width: 44,
    gap: 4,
  },
  historyToday: {
    borderColor: colors.primary,
  },
  historyCompleted: {
    backgroundColor: colors.success + '20',
  },
  historyWeekday: {
    fontSize: 10,
    color: colors.textSecondary,
  },
  historyWeekdayToday: {
    color: colors.primary,
    fontWeight: '700',
  },
  historyDate: {
    color: colors.text,
    fontWeight: '700',
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 16,
    backgroundColor: colors.primary,
  },
  primaryButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.error,
  },
  deleteButtonText: {
    color: colors.error,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
  },
  multiline: {
    alignItems: 'flex-start',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  helperLabel: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  editDaysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  editDay: {
    width: '13%',
    minWidth: 42,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  editDayText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  category: {
    width: '48%',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryText: {
    color: colors.textSecondary,
    fontSize: 13,
  },
  saveButton: {
    marginTop: 8,
    borderRadius: 16,
    paddingVertical: 16,
    backgroundColor: colors.secondary,
    alignItems: 'center',
  },
  saveButtonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    paddingHorizontal: 32,
    gap: 12,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  emptySubtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  emptyButtonText: {
    color: colors.text,
    fontWeight: '600',
  },
});
