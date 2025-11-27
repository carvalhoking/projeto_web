import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';
import { User } from '../types';

interface AuthContextData {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedUser = await SecureStore.getItemAsync('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    // Simulação de autenticação
    // Em um app real, você faria uma chamada API aqui
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }

    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userData: User = {
      id: '1',
      name: email.split('@')[0],
      email,
    };

    await SecureStore.setItemAsync('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signUp = async (name: string, email: string, password: string) => {
    // Simulação de registro
    if (!name || !email || !password) {
      throw new Error('Todos os campos são obrigatórios');
    }

    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    // Simular delay de rede
    await new Promise(resolve => setTimeout(resolve, 1000));

    const userData: User = {
      id: Date.now().toString(),
      name,
      email,
    };

    await SecureStore.setItemAsync('user', JSON.stringify(userData));
    setUser(userData);
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
