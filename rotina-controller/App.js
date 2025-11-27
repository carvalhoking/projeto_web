import { StatusBar } from 'expo-status-bar';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const initialTasks = [
  {
    id: '1',
    title: 'Alongamento + Água',
    time: '07:00',
    category: 'Bem-estar',
    completed: false,
  },
  {
    id: '2',
    title: 'Planejar prioridades do dia',
    time: '07:30',
    category: 'Planejamento',
    completed: false,
  },
  {
    id: '3',
    title: 'Responder e-mails críticos',
    time: '09:00',
    category: 'Trabalho',
    completed: false,
  },
  {
    id: '4',
    title: 'Revisão de metas semanais',
    time: '16:30',
    category: 'Reflexão',
    completed: false,
  },
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('');

  const completionRate = useMemo(() => {
    const completedCount = tasks.filter((task) => task.completed).length;
    return Math.round((completedCount / tasks.length) * 100) || 0;
  }, [tasks]);

  const nextTask = useMemo(() => {
    const pending = tasks.filter((task) => !task.completed);
    return pending.sort((a, b) => a.time.localeCompare(b.time))[0];
  }, [tasks]);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Ops!', 'Preencha e-mail e senha para continuar.');
      return;
    }

    if (!email.includes('@') || password.length < 4) {
      Alert.alert('Dados inválidos', 'Verifique seu e-mail e uma senha com ao menos 4 dígitos.');
      return;
    }

    setIsAuthenticated(true);
  };

  const toggleTask = (taskId) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) {
      Alert.alert('Sem título', 'Descreva a atividade antes de salvar.');
      return;
    }

    setTasks((current) => [
      ...current,
      {
        id: String(Date.now()),
        title: newTaskTitle.trim(),
        time: newTaskTime.trim() || 'Sem horário',
        category: 'Personalizado',
        completed: false,
      },
    ]);

    setNewTaskTitle('');
    setNewTaskTime('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {!isAuthenticated ? (
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <LoginScreen
            email={email}
            password={password}
            onChangeEmail={setEmail}
            onChangePassword={setPassword}
            onLogin={handleLogin}
          />
        </KeyboardAvoidingView>
      ) : (
        <RoutineScreen
          tasks={tasks}
          completionRate={completionRate}
          nextTask={nextTask}
          newTaskTitle={newTaskTitle}
          newTaskTime={newTaskTime}
          onToggleTask={toggleTask}
          onAddTask={handleAddTask}
          onChangeNewTaskTitle={setNewTaskTitle}
          onChangeNewTaskTime={setNewTaskTime}
        />
      )}
    </SafeAreaView>
  );
}

const LoginScreen = ({
  email,
  password,
  onChangeEmail,
  onChangePassword,
  onLogin,
}) => (
  <View style={styles.loginContainer}>
    <Text style={styles.brand}>FlowRoutine</Text>
    <Text style={styles.subtitle}>
      Centralize hábitos, tarefas e metas em um fluxo simples.
    </Text>

    <TextInput
      placeholder="E-mail"
      placeholderTextColor="#9ea5b1"
      keyboardType="email-address"
      autoCapitalize="none"
      style={styles.input}
      value={email}
      onChangeText={onChangeEmail}
    />

    <TextInput
      placeholder="Senha"
      placeholderTextColor="#9ea5b1"
      secureTextEntry
      style={styles.input}
      value={password}
      onChangeText={onChangePassword}
    />

    <TouchableOpacity style={styles.primaryButton} onPress={onLogin}>
      <Text style={styles.primaryButtonText}>Entrar</Text>
    </TouchableOpacity>

    <Text style={styles.helperText}>
      Dica: use qualquer e-mail válido e uma senha simples para testar.
    </Text>
  </View>
);

const RoutineScreen = ({
  tasks,
  completionRate,
  nextTask,
  newTaskTitle,
  newTaskTime,
  onToggleTask,
  onAddTask,
  onChangeNewTaskTitle,
  onChangeNewTaskTime,
}) => (
  <View style={styles.routineContainer}>
    <View style={styles.headerCard}>
      <Text style={styles.greeting}>Bom dia!</Text>
      <Text style={styles.progressLabel}>Concluído hoje</Text>
      <Text style={styles.progressValue}>{completionRate}%</Text>
      {nextTask && (
        <View style={styles.nextTask}>
          <Text style={styles.nextTaskLabel}>Próxima tarefa</Text>
          <Text style={styles.nextTaskTitle}>
            {nextTask.time} • {nextTask.title}
          </Text>
        </View>
      )}
    </View>

    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Sua rotina</Text>
      <Text style={styles.sectionSubtitle}>
        Toque para marcar como concluído.
      </Text>
    </View>

    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.taskCard, item.completed && styles.taskCompleted]}
          onPress={() => onToggleTask(item.id)}
        >
          <View>
            <Text style={styles.taskTime}>{item.time}</Text>
            <Text
              style={[
                styles.taskTitle,
                item.completed && styles.taskTitleCompleted,
              ]}
            >
              {item.title}
            </Text>
            <Text style={styles.taskCategory}>{item.category}</Text>
          </View>
          <View style={[styles.checkbox, item.completed && styles.checkboxDone]}>
            <Text style={styles.checkboxText}>{item.completed ? '✓' : ''}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />

    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Adicionar nova atividade</Text>
    </View>
    <View style={styles.addTaskWrapper}>
      <TextInput
        placeholder="Descrição da atividade"
        placeholderTextColor="#9ea5b1"
        value={newTaskTitle}
        onChangeText={onChangeNewTaskTitle}
        style={styles.input}
      />
      <TextInput
        placeholder="Horário (ex: 14:30)"
        placeholderTextColor="#9ea5b1"
        value={newTaskTime}
        onChangeText={onChangeNewTaskTime}
        style={styles.input}
      />
      <TouchableOpacity style={styles.secondaryButton} onPress={onAddTask}>
        <Text style={styles.secondaryButtonText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#050816',
  },
  flex: {
    flex: 1,
  },
  loginContainer: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    gap: 16,
  },
  brand: {
    fontSize: 34,
    fontWeight: '700',
    color: '#f1f5f9',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#11172a',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#e2e8f0',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  primaryButton: {
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#f8fafc',
    fontSize: 17,
    fontWeight: '600',
  },
  helperText: {
    color: '#64748b',
    fontSize: 14,
    textAlign: 'center',
  },
  routineContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
  headerCard: {
    backgroundColor: '#11172a',
    padding: 24,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1f2937',
    marginBottom: 24,
  },
  greeting: {
    color: '#f8fafc',
    fontSize: 20,
    fontWeight: '600',
  },
  progressLabel: {
    color: '#94a3b8',
    marginTop: 12,
  },
  progressValue: {
    color: '#f8fafc',
    fontSize: 42,
    fontWeight: '700',
    marginVertical: 8,
  },
  nextTask: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  },
  nextTaskLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  nextTaskTitle: {
    color: '#cbd5f5',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '600',
  },
  sectionHeader: {
    marginVertical: 12,
  },
  sectionTitle: {
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionSubtitle: {
    color: '#64748b',
    fontSize: 14,
    marginTop: 2,
  },
  taskCard: {
    backgroundColor: '#0f172a',
    padding: 18,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#1f2937',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskCompleted: {
    opacity: 0.6,
    borderColor: '#22c55e',
  },
  taskTime: {
    color: '#38bdf8',
    fontSize: 14,
    marginBottom: 6,
  },
  taskTitle: {
    color: '#f8fafc',
    fontSize: 16,
    fontWeight: '600',
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#cbd5f5',
  },
  taskCategory: {
    color: '#94a3b8',
    marginTop: 4,
  },
  checkbox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxDone: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  checkboxText: {
    color: '#0f172a',
    fontSize: 18,
    fontWeight: '700',
  },
  listContent: {
    paddingBottom: 24,
  },
  addTaskWrapper: {
    backgroundColor: '#0f172a',
    borderRadius: 16,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#1f2937',
  },
  secondaryButton: {
    backgroundColor: '#22c55e',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#052e16',
    fontWeight: '700',
    fontSize: 16,
  },
});
