import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRoutines } from '../contexts/RoutineContext';

export default function AddRoutineModal({ visible, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('personal');
  const [time, setTime] = useState('morning');
  const { addRoutine } = useRoutines();

  const categories = [
    { id: 'work', label: 'Trabalho', icon: 'work', color: '#0984E3' },
    { id: 'health', label: 'Saúde', icon: 'favorite', color: '#00B894' },
    { id: 'personal', label: 'Pessoal', icon: 'person', color: '#6C5CE7' },
    { id: 'study', label: 'Estudo', icon: 'school', color: '#FDCB6E' },
  ];

  const times = [
    { id: 'morning', label: 'Manhã', icon: 'wb-sunny' },
    { id: 'afternoon', label: 'Tarde', icon: 'wb-cloudy' },
    { id: 'evening', label: 'Noite', icon: 'nights-stay' },
    { id: 'anytime', label: 'Dia todo', icon: 'schedule' },
  ];

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'Por favor, insira um título para a rotina');
      return;
    }

    addRoutine({
      title: title.trim(),
      description: description.trim(),
      category,
      time,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setCategory('personal');
    setTime('morning');
    
    onClose();
  };

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setCategory('personal');
    setTime('morning');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Nova Rotina</Text>
            <TouchableOpacity onPress={handleClose}>
              <MaterialIcons name="close" size={28} color="#2D3436" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.section}>
              <Text style={styles.label}>Título *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Fazer exercícios"
                value={title}
                onChangeText={setTitle}
                maxLength={50}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Descrição (opcional)</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Adicione mais detalhes sobre sua rotina..."
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
                maxLength={200}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Categoria</Text>
              <View style={styles.optionsContainer}>
                {categories.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    style={[
                      styles.option,
                      category === cat.id && { 
                        backgroundColor: cat.color + '20',
                        borderColor: cat.color,
                      }
                    ]}
                    onPress={() => setCategory(cat.id)}
                  >
                    <MaterialIcons
                      name={cat.icon}
                      size={24}
                      color={category === cat.id ? cat.color : '#636E72'}
                    />
                    <Text
                      style={[
                        styles.optionText,
                        category === cat.id && { color: cat.color, fontWeight: '600' }
                      ]}
                    >
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.label}>Período</Text>
              <View style={styles.optionsContainer}>
                {times.map((t) => (
                  <TouchableOpacity
                    key={t.id}
                    style={[
                      styles.option,
                      time === t.id && styles.selectedOption
                    ]}
                    onPress={() => setTime(t.id)}
                  >
                    <MaterialIcons
                      name={t.icon}
                      size={24}
                      color={time === t.id ? '#6C5CE7' : '#636E72'}
                    />
                    <Text
                      style={[
                        styles.optionText,
                        time === t.id && styles.selectedOptionText
                      ]}
                    >
                      {t.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D3436',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3436',
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D3436',
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: '47%',
  },
  selectedOption: {
    backgroundColor: '#6C5CE720',
    borderColor: '#6C5CE7',
  },
  optionText: {
    fontSize: 14,
    color: '#636E72',
  },
  selectedOptionText: {
    color: '#6C5CE7',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    padding: 20,
    paddingTop: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#E1E8ED',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#636E72',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});
