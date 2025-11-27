import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRoutines } from '../contexts/RoutineContext';
import { colors } from '../theme/colors';
import { DayOfWeek, RoutineCategory, CategoryInfo } from '../types';
import { useNavigation } from '@react-navigation/native';

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

export const TelaNovoHabito: React.FC = () => {
  const navigation = useNavigation();
  const { addRoutine } = useRoutines();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('08:00');
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<RoutineCategory>('outros');
  const [isLoading, setIsLoading] = useState(false);

  const toggleDay = (day: DayOfWeek) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const selectAllDays = () => {
    if (selectedDays.length === DAYS.length) {
      setSelectedDays([]);
    } else {
      setSelectedDays([...DAYS]);
    }
  };

  const selectWeekdays = () => {
    const weekdays: DayOfWeek[] = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];
    setSelectedDays(weekdays);
  };

  const handleTimeChange = (text: string) => {
    // Simple time formatting
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length >= 2) {
      cleaned = cleaned.slice(0, 2) + ':' + cleaned.slice(2, 4);
    }
    if (cleaned.length > 5) {
      cleaned = cleaned.slice(0, 5);
    }
    setTime(cleaned);
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Por favor, insira um título para a rotina');
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert('Erro', 'Por favor, selecione pelo menos um dia da semana');
      return;
    }

    if (!time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      Alert.alert('Erro', 'Por favor, insira um horário válido (HH:MM)');
      return;
    }

    setIsLoading(true);
    try {
      await addRoutine({
        title: title.trim(),
        description: description.trim(),
        time,
        days: selectedDays,
        category: selectedCategory,
        color: colors.categories[selectedCategory],
      });
      
      Alert.alert('Sucesso', 'Rotina adicionada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a rotina');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.background, colors.backgroundLight]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nova Rotina</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Title Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Título</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="create-outline" size={22} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="Ex: Treino na academia"
                placeholderTextColor={colors.textMuted}
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>

          {/* Description Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Descrição (opcional)</Text>
            <View style={[styles.inputContainer, styles.textAreaContainer]}>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Adicione detalhes sobre sua rotina..."
                placeholderTextColor={colors.textMuted}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Time Input */}
          <View style={styles.section}>
            <Text style={styles.label}>Horário</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="time-outline" size={22} color={colors.textSecondary} />
              <TextInput
                style={styles.input}
                placeholder="08:00"
                placeholderTextColor={colors.textMuted}
                value={time}
                onChangeText={handleTimeChange}
                keyboardType="numeric"
                maxLength={5}
              />
            </View>
          </View>

          {/* Days Selection */}
          <View style={styles.section}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>Dias da Semana</Text>
              <View style={styles.quickActions}>
                <TouchableOpacity onPress={selectWeekdays}>
                  <Text style={styles.quickAction}>Dias úteis</Text>
                </TouchableOpacity>
                <Text style={styles.quickActionDivider}>|</Text>
                <TouchableOpacity onPress={selectAllDays}>
                  <Text style={styles.quickAction}>
                    {selectedDays.length === DAYS.length ? 'Limpar' : 'Todos'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.daysContainer}>
              {DAYS.map(day => {
                const isSelected = selectedDays.includes(day);
                return (
                  <TouchableOpacity
                    key={day}
                    style={[styles.dayButton, isSelected && styles.dayButtonSelected]}
                    onPress={() => toggleDay(day)}
                  >
                    <Text style={[styles.dayButtonText, isSelected && styles.dayButtonTextSelected]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Category Selection */}
          <View style={styles.section}>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.categoriesContainer}>
              {CATEGORIES.map(category => {
                const isSelected = selectedCategory === category.name;
                return (
                  <TouchableOpacity
                    key={category.name}
                    style={[
                      styles.categoryButton,
                      isSelected && { borderColor: category.color, backgroundColor: category.color + '20' }
                    ]}
                    onPress={() => setSelectedCategory(category.name)}
                  >
                    <Ionicons
                      name={category.icon as any}
                      size={24}
                      color={isSelected ? category.color : colors.textMuted}
                    />
                    <Text style={[
                      styles.categoryText,
                      isSelected && { color: category.color }
                    ]}>
                      {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            <LinearGradient
              colors={colors.gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitButtonGradient}
            >
              {isLoading ? (
                <Text style={styles.submitButtonText}>Salvando...</Text>
              ) : (
                <>
                  <Ionicons name="add-circle" size={24} color={colors.text} />
                  <Text style={styles.submitButtonText}>Adicionar Rotina</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  headerRight: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quickAction: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '500',
  },
  quickActionDivider: {
    color: colors.textMuted,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textAreaContainer: {
    alignItems: 'flex-start',
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  textArea: {
    marginLeft: 0,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  dayButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.backgroundCard,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  dayButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  dayButtonTextSelected: {
    color: colors.text,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    backgroundColor: colors.backgroundCard,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 10,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  submitButton: {
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  submitButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 10,
  },
  submitButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
  },
});
