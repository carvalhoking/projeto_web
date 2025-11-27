import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useRoutine, FocusArea } from '../context/RoutineContext';
import { AppStackParamList } from '../types/navigation';

const focusOptions: FocusArea[] = ['Profissional', 'Bem-estar', 'Saúde', 'Pessoal'];

type Props = NativeStackScreenProps<AppStackParamList, 'RoutineForm'>;

const RoutineFormScreen: React.FC<Props> = ({ navigation }) => {
  const { addRoutine } = useRoutine();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [focusArea, setFocusArea] = useState<FocusArea>('Profissional');
  const [error, setError] = useState('');

  const handleSave = () => {
    try {
      setError('');
      addRoutine({ title, time, description, focusArea });
      navigation.goBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao salvar.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Nome da atividade</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Ex: Revisão matinal"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <Text style={styles.label}>Horário (HH:MM)</Text>
        <TextInput
          value={time}
          onChangeText={setTime}
          placeholder="07:30"
          placeholderTextColor="#94a3b8"
          style={styles.input}
          keyboardType="numeric"
          maxLength={5}
        />

        <Text style={styles.label}>Área de foco</Text>
        <View style={styles.chipsRow}>
          {focusOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.chip, option === focusArea && styles.chipSelected]}
              onPress={() => setFocusArea(option)}
            >
              <Text
                style={[styles.chipText, option === focusArea && styles.chipTextSelected]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Detalhes rápidos do que precisa ser feito"
          placeholderTextColor="#94a3b8"
          style={[styles.input, styles.textarea]}
          multiline
          numberOfLines={4}
        />

        {!!error && <Text style={styles.error}>{error}</Text>}

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Salvar atividade</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f6fb',
  },
  container: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    color: '#607087',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    color: '#1f2d3d',
  },
  textarea: {
    height: 120,
    textAlignVertical: 'top',
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  chip: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#cbd5f5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    backgroundColor: '#0f172a',
    borderColor: '#0f172a',
  },
  chipText: {
    color: '#475569',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#f8fafc',
  },
  error: {
    color: '#f87171',
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#38bdf8',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#0f172a',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default RoutineFormScreen;
