import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { colors } from '../theme/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { height } = Dimensions.get('window');

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp } = useAuth();

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não coincidem');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setIsLoading(true);
    try {
      await signUp(name, email, password);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.backgroundLight]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Decorative elements */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />

          {/* Back button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Criar Conta</Text>
              <Text style={styles.subtitle}>
                Comece sua jornada de produtividade
              </Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <Ionicons name="person-outline" size={22} color={colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Nome completo"
                  placeholderTextColor={colors.textMuted}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={22} color={colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={colors.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={22} color={colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Senha"
                  placeholderTextColor={colors.textMuted}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                    size={22}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <Ionicons name="shield-checkmark-outline" size={22} color={colors.textSecondary} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirmar senha"
                  placeholderTextColor={colors.textMuted}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                />
              </View>

              {/* Password requirements */}
              <View style={styles.requirements}>
                <View style={styles.requirementItem}>
                  <Ionicons
                    name={password.length >= 6 ? 'checkmark-circle' : 'ellipse-outline'}
                    size={16}
                    color={password.length >= 6 ? colors.success : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.requirementText,
                      password.length >= 6 && styles.requirementMet,
                    ]}
                  >
                    Mínimo 6 caracteres
                  </Text>
                </View>
                <View style={styles.requirementItem}>
                  <Ionicons
                    name={password === confirmPassword && password.length > 0 ? 'checkmark-circle' : 'ellipse-outline'}
                    size={16}
                    color={password === confirmPassword && password.length > 0 ? colors.success : colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.requirementText,
                      password === confirmPassword && password.length > 0 && styles.requirementMet,
                    ]}
                  >
                    Senhas coincidem
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.registerButton}
                onPress={handleRegister}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={colors.gradients.secondary}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.registerButtonGradient}
                >
                  {isLoading ? (
                    <ActivityIndicator color={colors.text} />
                  ) : (
                    <>
                      <Text style={styles.registerButtonText}>Criar conta</Text>
                      <Ionicons name="arrow-forward" size={20} color={colors.text} />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Terms */}
              <Text style={styles.termsText}>
                Ao criar uma conta, você concorda com nossos{' '}
                <Text style={styles.termsLink}>Termos de Serviço</Text> e{' '}
                <Text style={styles.termsLink}>Política de Privacidade</Text>
              </Text>
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Já tem uma conta?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.loginText}> Fazer login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -80,
    left: -80,
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: colors.secondary,
    opacity: 0.1,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: 50,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: colors.primary,
    opacity: 0.08,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.backgroundCard,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    zIndex: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 120,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: colors.text,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
    letterSpacing: 0.3,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  requirements: {
    marginBottom: 24,
    gap: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: 13,
    color: colors.textMuted,
  },
  requirementMet: {
    color: colors.success,
  },
  registerButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 20,
  },
  registerButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    gap: 8,
  },
  registerButtonText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  termsText: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  loginText: {
    color: colors.secondary,
    fontSize: 15,
    fontWeight: '600',
  },
});
