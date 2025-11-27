import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAuth } from '../context/AuthContext';
import { AuthStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    try {
      setError('');
      setIsSubmitting(true);
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.subtitle}>Controle sua rotina diária</Text>
          <Text style={styles.title}>Routine Control</Text>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="nome@exemplo.com"
            placeholderTextColor="#94a3b8"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            style={styles.input}
          />
          <Text style={styles.label}>Senha</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Sua senha segura"
            placeholderTextColor="#94a3b8"
            secureTextEntry
            autoComplete="password"
            style={styles.input}
          />
          {!!error && <Text style={styles.error}>{error}</Text>}
          <TouchableOpacity
            style={[styles.button, isSubmitting && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>
          <Text style={styles.hint}>Digite qualquer email válido e uma senha com 4+ caracteres.</Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#f8fafc',
  },
  form: {
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
  },
  label: {
    color: '#cbd5f5',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: '#f8fafc',
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1f2d3d',
  },
  button: {
    backgroundColor: '#38bdf8',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#0f172a',
    fontWeight: '700',
    fontSize: 16,
  },
  error: {
    color: '#f87171',
    marginBottom: 12,
  },
  hint: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default LoginScreen;
